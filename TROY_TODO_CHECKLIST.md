# 🚀 Launch Checklist for Troy

## ✅ DONE - ParsleyPDF is Live! 🌿

**Current Status (Updated Feb 10, 2026):**
- ✅ **Rebranded to ParsleyPDF** with fresh green colors
- ✅ **Parsley leaf logo** designed and implemented
- ✅ Landing page fully redesigned with new branding
- ✅ S3 bucket created and configured
- ✅ CloudFront distribution deployed with HTTPS
- ✅ Site live and accessible

**Live URLs:**
- **CloudFront (HTTPS):** https://d19f32uxc46hkh.cloudfront.net ⭐ **Use This**
- **S3 (HTTP):** http://pdf-extraction-service-1770706737.s3-website-us-west-2.amazonaws.com

**Branding:**
- Name: **ParsleyPDF**
- Tagline: "Fresh, structured data from your documents"
- Colors: Parsley greens (#2D7A3E, #52A461, #A8D5A3)
- Logo: Multi-branch parsley leaf SVG

**Recent Progress (Feb 10, 2026):**
- ✅ Designed custom parsley leaf logo (multi-branch SVG)
- ✅ Recolored entire site with fresh green palette
- ✅ Updated all copy and branding to ParsleyPDF
- ✅ Committed to GitHub and deployed to AWS
- ✅ CloudFront cache invalidated - live now!

---

## 📋 YOUR TODO LIST

### 🔴 TOMORROW (Before Launch)

#### 1. Register Domain
**Action:** Register a domain name for ParsleyPDF

**Top Recommendations:**
- `parsleypdf.com` ⭐ **First Choice** (matches brand exactly)
- `parsleypdf.io` (tech-focused alternative)
- `parsley.pdf` (new .pdf TLD, unique but may be pricey)
- `getparsley.com` (if parsleypdf.com is taken)

**Cost:** ~$12-15/year for .com/.io (Namecheap, Google Domains, AWS Route 53)

**Where to buy:**
- Namecheap (easiest, good prices)
- Google Domains (integrates well with Workspace)
- AWS Route 53 (if you want everything in AWS)

#### 2. Set Up Domain Email
**Action:** Create `samples@parsleypdf.com` email for receiving PDFs

**Options:**

**A) Google Workspace ($6/month):** ⭐ **Recommended**
- Full Gmail interface
- Professional email (@parsleypdf.com)
- Easy to manage
- I can access via IMAP like my current email
- Can auto-monitor for sample requests

**B) AWS WorkMail ($4/month):**
- Cheaper
- AWS-native
- Less user-friendly

**C) Zoho Mail (Free tier available):**
- Free for 1 user
- Basic but functional

**My recommendation:** Google Workspace - I already know how to monitor Gmail accounts, so I can auto-handle `samples@parsleypdf.com` emails just like peggytheclaw@gmail.com.

#### 3. Point Domain to CloudFront
**Action:** Add DNS records to point your domain to CloudFront

**Steps:**
1. Log into your domain registrar (Namecheap, etc.)
2. Go to DNS settings
3. Add a CNAME record:
   - **Name:** `www` (or `@` for root domain)
   - **Value:** `d19f32uxc46hkh.cloudfront.net`
   - **TTL:** 300

**I can help with this once you have the domain!**

#### 4. Add Custom Domain to CloudFront
**Action:** Tell CloudFront to accept your custom domain

**I'll handle this - just tell me your domain name and I'll:**
- Update CloudFront distribution with alternate domain name
- Request an SSL certificate via AWS Certificate Manager
- Configure everything

#### 5. Review Launch Materials
**Action:** Review the `launch-prep` branch materials

**Priority files to review:**
1. `EMAIL_TEMPLATES.md` - Email copy (20 min)
2. `LAUNCH_PLAN.md` - Overall strategy (30 min)
3. `REVIEW_CHECKLIST.md` - Approval guide (10 min)

**Command:**
```bash
cd ~/repos/pdf-extraction-service
git checkout launch-prep
```

**View on GitHub:**
https://github.com/peggytheclaw/pdf-extraction-service/tree/launch-prep

---

### 🟡 WEEK 1 (After Domain Setup)

#### 6. Give Me Green Light on Launch
**Action:** Review materials and approve/modify

**What I need from you:**
- ✅ or ❌ on email templates (or suggested changes)
- ✅ or ❌ on launch strategy
- Any changes to pricing or messaging
- GO/NO-GO decision

#### 7. Decide on Lead List Approach
**Action:** How do we build the initial 100 contacts?

**Options:**

**A) I build it (slower but free):**
- I research eCommerce sellers from Reddit, Shopify forums, etc.
- Extract contact info manually
- Takes a few days
- May hit API limits (as we saw)

**B) You buy a list ($50-200):**
- UpLead, Apollo, ZoomInfo
- Filtered for eCommerce companies
- Instant 100+ contacts
- Better quality

**C) We collaborate:**
- You give me 20-30 companies you know/found
- I research and find contact emails
- Faster, more targeted

**My recommendation:** Option C - you give me company names, I find emails. Quality over quantity.

---

### 🟢 WEEK 2+ (Operational)

#### 8. Handle First Sample Requests
**When:** After we start sending emails

**Your part:**
- Write Python/JS script to extract data from sample PDF
- Send results back to customer
- Aim for 30 min per sample at first
- Build reusable scripts over time

**My part:**
- Handle all email communication
- Track responses in Google Sheet
- Schedule follow-ups
- Convert to paying customers

#### 9. Payment Setup (When First Customer Signs Up)
**Action:** Set up Stripe/PayPal for collecting payments

**Recommended:** Stripe
- Easy recurring billing
- Professional invoicing
- $0 setup fee
- 2.9% + $0.30 per transaction

**I can help integrate Stripe later, but not urgent until first customer.**

---

## 🎯 WHAT I NEED FROM YOU (Summary)

### Tomorrow:
1. ✅ Domain name (tell me what you registered)
2. ✅ Email setup decision (Google Workspace recommended)
3. ✅ Review launch-prep branch materials
4. ✅ Approval to proceed (or changes needed)

### This Week:
5. ✅ Lead list approach decision
6. ✅ GO/NO-GO on launching cold emails

### When Needed:
7. ✅ Extract first sample PDFs (I'll handle everything else)
8. ✅ Set up Stripe when first customer is ready to pay

---

## 💡 LAUNCH TIMELINE (After Domain Setup)

**Day 1 (Domain Ready):**
- Point domain to CloudFront
- Add SSL certificate
- Set up samples@ email
- Website goes live with custom domain

**Day 2:**
- Final review of email templates
- Build/finalize lead list
- Set up Google Sheet tracking

**Day 3:**
- Send first batch of 20 cold emails
- I monitor responses
- Handle initial replies

**Week 1:**
- Send 20 emails/day (100 total)
- Track responses
- Handle sample requests
- Convert to customers

**Week 2:**
- Follow up with non-responders
- Support active customers
- Iterate on messaging
- Goal: 3 paying customers

---

## 🐧 Questions?

Ask me anything! I'm here to make this as smooth as possible.

**Next step:** Register your domain tomorrow and tell me what you choose! 🚀
