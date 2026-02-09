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

// Send Discord notification
function sendDiscordNotification(posts) {
  if (posts.length === 0) return;
  
  // Sort by relevance
  posts.sort((a, b) => calculateRelevance(b) - calculateRelevance(a));
  
  // Format message
  let message = `🔍 **Social Listening Update** - Found ${posts.length} new discussion${posts.length === 1 ? '' : 's'}!\n\n`;
  
  const highValue = posts.filter(p => calculateRelevance(p) >= 70);
  const mediumValue = posts.filter(p => calculateRelevance(p) >= 50 && calculateRelevance(p) < 70);
  const lowValue = posts.filter(p => calculateRelevance(p) < 50);
  
  // High value posts
  if (highValue.length > 0) {
    message += `**🔥 HIGH VALUE (${highValue.length})**\n`;
    for (const post of highValue.slice(0, 3)) {  // Top 3
      const score = calculateRelevance(post);
      message += `• **[${post.platform}]** ${post.title.slice(0, 80)}${post.title.length > 80 ? '...' : ''}\n`;
      message += `  ${post.url}\n`;
      message += `  ↑${post.upvotes} 💬${post.comments} • ${post.hoursAgo}h ago • Score: ${score}\n\n`;
    }
  }
  
  // Medium value posts
  if (mediumValue.length > 0) {
    message += `**📊 MEDIUM VALUE (${mediumValue.length})**\n`;
    for (const post of mediumValue.slice(0, 2)) {  // Top 2
      message += `• **[${post.platform}]** ${post.title.slice(0, 60)}...\n`;
      message += `  ${post.url}\n`;
    }
    message += '\n';
  }
  
  // Low value summary
  if (lowValue.length > 0) {
    message += `📋 ${lowValue.length} additional low-value mention${lowValue.length === 1 ? '' : 's'}\n`;
  }
  
  // Send via OpenClaw message tool
  try {
    const escaped = message.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    execSync(`openclaw message send --channel discord --target ${CONFIG.discordChannelId} --message "${escaped}"`, {
      stdio: 'inherit'
    });
    console.log('✅ Discord notification sent');
  } catch (e) {
    console.error('❌ Failed to send Discord notification:', e.message);
    // Fallback: just log the message
    console.log('\n' + message);
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
  
  // Send Discord notification if we found new posts
  if (uniquePosts.length > 0) {
    sendDiscordNotification(uniquePosts);
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
