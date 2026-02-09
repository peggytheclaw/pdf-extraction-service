#!/usr/bin/env node

/**
 * Reads social listening digest and sends to Discord via OpenClaw stdin
 * This avoids shell escaping issues
 */

const fs = require('fs');
const path = require('path');

const DIGEST_FILE = path.join(__dirname, 'social-listening-digest.json');
const DISCORD_CHANNEL = '1470518363942818002';

if (!fs.existsSync(DIGEST_FILE)) {
  process.exit(0);  // No digest to send
}

try {
  const digest = JSON.parse(fs.readFileSync(DIGEST_FILE, 'utf8'));
  
  if (digest.posts.length === 0) {
    process.exit(0);  // No posts
  }
  
  // Output message in format OpenClaw can handle
  console.log(JSON.stringify({
    action: 'send',
    channel: 'discord',
    target: DISCORD_CHANNEL,
    message: digest.message
  }));
  
  // Delete digest after sending
  fs.unlinkSync(DIGEST_FILE);
  
} catch (e) {
  console.error('Error sending digest:', e.message);
  process.exit(1);
}
