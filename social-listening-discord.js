#!/usr/bin/env node

/**
 * Social Listening Tool - Discord Notifier
 * 
 * Monitors online discussions about PDF automation and sends Discord notifications
 * when relevant posts are found.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  keywords: [
    'PDF extraction',
    'invoice parsing',
    'PDF automation',
    'data entry from PDFs',
    'receipt processing',
    'manual data entry PDF'
  ],
  platforms: {
    reddit: {
      enabled: true,
      subreddits: ['entrepreneur', 'smallbusiness', 'accounting', 'bookkeeping']
    },
    hackernews: {
      enabled: true
    }
  },
  discordChannelId: '1470518363942818002',
  seenPostsFile: path.join(__dirname, 'social-listening-seen.json'),
  dashboardFile: path.join(__dirname, 'social-listening-dashboard.json'),
  daysToLookBack: 1  // Only check last 24h for faster runs
};

// Utility: Make HTTPS request
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'PDF-Social-Listener/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Load seen posts
function loadSeenPosts() {
  try {
    if (fs.existsSync(CONFIG.seenPostsFile)) {
      return new Set(JSON.parse(fs.readFileSync(CONFIG.seenPostsFile, 'utf8')));
    }
  } catch (e) {
    console.error('Error loading seen posts:', e.message);
  }
  return new Set();
}

// Save seen posts
function saveSeenPosts(seenPosts) {
  try {
    fs.writeFileSync(CONFIG.seenPostsFile, JSON.stringify([...seenPosts], null, 2));
  } catch (e) {
    console.error('Error saving seen posts:', e.message);
  }
}

// Check if text matches any keyword
function matchesKeywords(text) {
  const lowerText = text.toLowerCase();
  return CONFIG.keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

// Calculate relevance score
function calculateRelevance(post) {
  let score = 0;
  const text = `${post.title} ${post.excerpt || ''}`.toLowerCase();
  
  // Keyword density
  const keywordMatches = CONFIG.keywords.filter(k => text.includes(k.toLowerCase())).length;
  score += keywordMatches * 15;
  
  // Engagement
  score += Math.min(post.upvotes || post.points || 0, 50);
  score += Math.min((post.comments || 0) * 2, 30);
  
  // Recency (prefer recent posts)
  const hoursAgo = post.hoursAgo || 24;
  if (hoursAgo < 2) score += 20;
  else if (hoursAgo < 12) score += 10;
  
  return Math.min(score, 100);
}

// Reddit search
async function searchReddit(subreddit) {
  const results = [];
  const cutoffTime = Date.now() / 1000 - (CONFIG.daysToLookBack * 86400);
  
  try {
    const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=50`;
    const data = await httpsGet(url);
    
    if (data.data && data.data.children) {
      for (const post of data.data.children) {
        const p = post.data;
        if (p.created_utc < cutoffTime) continue;
        
        const text = `${p.title} ${p.selftext || ''}`;
        if (matchesKeywords(text)) {
          const hoursAgo = (Date.now() / 1000 - p.created_utc) / 3600;
          results.push({
            id: `reddit-${p.id}`,
            platform: 'Reddit',
            subreddit: `r/${subreddit}`,
            title: p.title,
            excerpt: (p.selftext || '').slice(0, 200),
            url: `https://reddit.com${p.permalink}`,
            upvotes: p.ups,
            comments: p.num_comments,
            hoursAgo: Math.round(hoursAgo),
            timestamp: p.created_utc
          });
        }
      }
    }
  } catch (e) {
    console.error(`Error searching Reddit r/${subreddit}:`, e.message);
  }
  
  return results;
}

// Hacker News search
async function searchHackerNews() {
  const results = [];
  const cutoffTime = Date.now() / 1000 - (CONFIG.daysToLookBack * 86400);
  
  try {
    for (const keyword of CONFIG.keywords) {
      const query = encodeURIComponent(keyword);
      const url = `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&numericFilters=created_at_i>${Math.floor(cutoffTime)}`;
      const data = await httpsGet(url);
      
      if (data.hits) {
        for (const hit of data.hits) {
          const hoursAgo = (Date.now() / 1000 - hit.created_at_i) / 3600;
          results.push({
            id: `hn-${hit.objectID}`,
            platform: 'Hacker News',
            subreddit: null,
            title: hit.title,
            excerpt: (hit.story_text || hit.comment_text || '').slice(0, 200),
            url: `https://news.ycombinator.com/item?id=${hit.objectID}`,
            upvotes: hit.points,
            comments: hit.num_comments,
            hoursAgo: Math.round(hoursAgo),
            timestamp: hit.created_at_i
          });
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
    }
  } catch (e) {
    console.error('Error searching Hacker News:', e.message);
  }
  
  return results;
}

// Save posts to dashboard and send notification
function updateDashboardAndNotify(newPosts, allPosts) {
  // Load existing dashboard data
  let existingPosts = [];
  try {
    if (fs.existsSync(CONFIG.dashboardFile)) {
      const data = JSON.parse(fs.readFileSync(CONFIG.dashboardFile, 'utf8'));
      existingPosts = data.posts || [];
    }
  } catch (e) {
    console.error('Error loading existing dashboard:', e.message);
  }
  
  // Merge new posts with existing (avoid duplicates)
  const postMap = new Map();
  for (const post of existingPosts) {
    postMap.set(post.id, post);
  }
  for (const post of allPosts) {
    post.score = calculateRelevance(post);
    postMap.set(post.id, post);
  }
  
  // Convert back to array and sort by relevance
  const allPostsArray = Array.from(postMap.values());
  allPostsArray.sort((a, b) => (b.score || 0) - (a.score || 0));
  
  // Save to dashboard file
  const dashboardData = {
    posts: allPostsArray,
    lastUpdated: new Date().toISOString()
  };
  
  try {
    fs.writeFileSync(CONFIG.dashboardFile, JSON.stringify(dashboardData, null, 2));
    console.log('✅ Dashboard updated');
  } catch (e) {
    console.error('❌ Failed to update dashboard:', e.message);
  }
  
  // Send simple Discord notification if there are new posts
  if (newPosts.length > 0) {
    const highValue = newPosts.filter(p => calculateRelevance(p) >= 70).length;
    const message = `🔔 **Social Listening Alert**

Found **${newPosts.length}** new discussion${newPosts.length === 1 ? '' : 's'}!${highValue > 0 ? ` (${highValue} high-value)` : ''}

📊 View dashboard: file://${path.join(__dirname, 'dashboard.html')}

Auto-refreshes every 2 minutes.`;
    
    try {
      const tmpFile = `/tmp/social-listening-msg-${Date.now()}.txt`;
      fs.writeFileSync(tmpFile, message);
      
      execSync(`openclaw message send --channel discord --target ${CONFIG.discordChannelId} --message "$(cat ${tmpFile})"`, {
        stdio: 'inherit',
        shell: '/bin/bash'
      });
      
      fs.unlinkSync(tmpFile);
      console.log('✅ Discord notification sent');
    } catch (e) {
      console.error('❌ Failed to send Discord notification:', e.message);
      console.log('\n' + message);
    }
  }
}

// Main execution
async function main() {
  console.log('🔍 Social Listening Tool Starting...\n');
  
  const seenPosts = loadSeenPosts();
  const initialSeenCount = seenPosts.size;
  
  let allPosts = [];
  
  // Search Reddit
  if (CONFIG.platforms.reddit.enabled) {
    console.log('📱 Searching Reddit...');
    for (const subreddit of CONFIG.platforms.reddit.subreddits) {
      console.log(`  - r/${subreddit}`);
      const posts = await searchReddit(subreddit);
      allPosts.push(...posts);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Search Hacker News
  if (CONFIG.platforms.hackernews.enabled) {
    console.log('🟠 Searching Hacker News...');
    const posts = await searchHackerNews();
    allPosts.push(...posts);
  }
  
  // Filter duplicates and already seen
  const uniquePosts = [];
  const postIds = new Set();
  
  for (const post of allPosts) {
    if (!postIds.has(post.id) && !seenPosts.has(post.id)) {
      uniquePosts.push(post);
      postIds.add(post.id);
      seenPosts.add(post.id);
    }
  }
  
  console.log(`\n📊 Results:`);
  console.log(`  - Total posts found: ${allPosts.length}`);
  console.log(`  - New unique posts: ${uniquePosts.length}`);
  
  // Update dashboard and send notification
  updateDashboardAndNotify(uniquePosts, allPosts);
  
  if (uniquePosts.length > 0) {
    saveSeenPosts(seenPosts);
    console.log(`\n💾 Saved ${uniquePosts.length} new post IDs.`);
  } else {
    console.log('\n💤 No new posts found.');
  }
  
  console.log('\n✨ Done!\n');
}

// Run
if (require.main === module) {
  main().catch(console.error);
}
