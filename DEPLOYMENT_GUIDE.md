# 🚀 Deployment Guide

**Get your site live in 10 minutes**

---

## Option 1: Netlify (Recommended - Easiest)

### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Sign up with GitHub

### Step 2: Deploy Site
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from repo
cd ~/repos/pdf-extraction-service
netlify init

# Follow prompts:
- Create new site
- Build command: (leave empty - static HTML)
- Publish directory: . (current directory)

# Deploy!
netlify deploy --prod
```

### Step 3: Custom Domain (Optional)
```
1. Buy domain at Namecheap/Google Domains
2. In Netlify: Site Settings → Domain Management
3. Add custom domain
4. Follow DNS instructions
```

**Your site will be live at:** `[something].netlify.app`  
**Or:** `yourdomain.com` if you added custom domain

---

## Option 2: Vercel (Also Great)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd ~/repos/pdf-extraction-service
vercel

# Follow prompts

# Done! Your site is live
```

---

## Option 3: GitHub Pages (Free, No Server Needed)

```bash
cd ~/repos/pdf-extraction-service

# Create gh-pages branch
git checkout -b gh-pages
git push origin gh-pages

# Enable in GitHub repo settings:
Settings → Pages → Source: gh-pages branch
```

**Your site will be live at:** `https://[username].github.io/pdf-extraction-service`

---

## Email Setup

### Method 1: Forward to Gmail (Easiest)

**If you have a domain:**
1. Go to your domain DNS settings
2. Add MX record pointing to Gmail
3. Set up email forwarding:
   - `samples@yourdomain.com` → forwards to `your-email@gmail.com`
4. Share forwarding address with Peggy

**If using Netlify/Vercel domain:**
- Use ImprovMX (free email forwarding)
- Or use your personal email for now

### Method 2: Google Workspace ($6/mo)
- Full Gmail with custom domain
- Recommended if serious about business

### Method 3: Temp Email (For Testing)
- Use your personal Gmail for samples
- Update contact form with: `samples-troy@gmail.com`
- Forward to Peggy when testing

---

## Post-Deployment Checklist

### Update Contact Form
```html
<!-- In index.html, update this line: -->
<p style="font-size: 13px; ...">
  Or email your sample to: samples@YOUR-ACTUAL-DOMAIN.com
</p>
```

### Test Email
```
1. Send test email to samples@yourdomain.com
2. Verify you receive it
3. Reply from that email address
4. Confirm it works
```

### Update Launch Docs
```
In LAUNCH_PLAN.md and EMAIL_TEMPLATES.md:
- Replace [domain] with your actual domain
- Replace [yourservice] with your actual service name
```

### Share with Peggy
```
1. Site URL: https://...
2. Samples email: samples@...
3. Green light to send first batch of emails? YES/NO
```

---

## Common Issues

### "Site not loading"
- Wait 2-3 minutes after deployment
- Clear browser cache
- Check Netlify/Vercel dashboard for errors

### "Form submissions not working"
- Form is HTML-only (no backend yet)
- Emails go to samples@yourdomain.com
- Peggy monitors and responds

### "Email forwarding not working"
- Check DNS propagation (24-48 hours)
- Use https://mxtoolbox.com to verify MX records
- Test with temporary personal email first

---

## 🎉 Once Live

**Tell Peggy:**
- ✅ Site URL
- ✅ Samples email address
- ✅ Approved email templates?
- ✅ Ready to send first emails?

**Then Peggy will:**
1. Send first batch (20 emails)
2. Monitor responses
3. Handle sample requests
4. Keep you updated via Discord

---

**Need help deploying? Ping Peggy in Discord!** 🐧
