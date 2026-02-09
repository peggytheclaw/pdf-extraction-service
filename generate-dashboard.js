#!/usr/bin/env node

/**
 * Generate standalone dashboard HTML with embedded data
 * No server needed - works from file://
 */

const fs = require('fs');
const path = require('path');

const DASHBOARD_TEMPLATE = path.join(__dirname, 'dashboard.html');
const DASHBOARD_DATA = path.join(__dirname, 'social-listening-dashboard.json');
const OUTPUT_FILE = path.join(__dirname, 'dashboard-standalone.html');

try {
  // Read dashboard HTML template
  let html = fs.readFileSync(DASHBOARD_TEMPLATE, 'utf8');
  
  // Read dashboard data
  let data = { posts: [], lastUpdated: null };
  if (fs.existsSync(DASHBOARD_DATA)) {
    data = JSON.parse(fs.readFileSync(DASHBOARD_DATA, 'utf8'));
  }
  
  // Inject data directly into HTML before closing </head>
  const dataScript = `
  <script>
    // Embedded data (no fetch needed)
    window.DASHBOARD_DATA = ${JSON.stringify(data)};
  </script>
</head>`;
  
  html = html.replace('</head>', dataScript);
  
  // Replace the fetch code with embedded data usage
  html = html.replace(
    `try {
                const response = await fetch('social-listening-dashboard.json?t=' + Date.now());
                const data = await response.json();`,
    `try {
                // Use embedded data instead of fetching
                const data = window.DASHBOARD_DATA;`
  );
  
  // Write standalone dashboard
  fs.writeFileSync(OUTPUT_FILE, html);
  
  console.log(`✅ Generated standalone dashboard: ${OUTPUT_FILE}`);
  console.log(`   Posts: ${data.posts.length}`);
  console.log(`   Last updated: ${data.lastUpdated || 'Never'}`);
  
} catch (e) {
  console.error('Error generating dashboard:', e.message);
  process.exit(1);
}
