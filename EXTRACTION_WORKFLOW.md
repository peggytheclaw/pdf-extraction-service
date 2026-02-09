# 🛠️ Extraction Workflow - From Sample to Delivery

**Step-by-step guide to handling document extraction efficiently**

---

## 🎯 WORKFLOW OVERVIEW

```
Sample Request → Peggy Responds → Troy Extracts → Peggy Delivers → Convert to Customer
      ↓              (instant)        (24hrs)        (instant)          (2-7 days)
  RECEIVED         CONFIRMED       PROCESSING       DELIVERED          CONVERTED
```

**Goal:** Consistent, high-quality extractions with fast turnaround

---

## 📥 STEP 1: SAMPLE REQUEST ARRIVES

### Detection (Automated - Peggy)
```
Email arrives at samples@domain.com with subject containing:
- "sample"
- "free extraction"
- "try"
- reply to outreach email
```

### Instant Response (Automated - Peggy)
**Within 5 minutes:**
```
From: Peggy via samples@domain.com
To: [Customer]
Subject: Re: Free sample request

Hi [Name]!

Got it! Excited to show you what we can extract.

To confirm:
- Document type: [Invoice/Receipt/Statement - Peggy guesses from context]
- What you need extracted: [From their email or "vendor, amount, date, line items"]
- Output format: CSV or Excel? (your preference)

We'll have your extracted data back within 24-48 hours (usually much faster).

I'll email you as soon as it's ready!

- Peggy (on behalf of Troy)
PDF Extraction Service
[domain]
```

### Notification to Troy (Discord):
```
🚨 NEW SAMPLE REQUEST

Name: Jane Doe
Email: jane@acmestore.com
Company: AcmeStore
Source: Reddit r/FBA outreach
Document: Invoice from supplier (attached)
Needs: Vendor, invoice#, date, line items, total
Priority: P1 (good fit eCommerce seller)

Action: Extract within 24 hours
Sample: [link to email]
Sheet: [link to SAMPLES tab]
```

### Tracking Update (Auto):
```
SAMPLES tab new row:
- Date: [today]
- Name: Jane Doe
- Email: jane@acmestore.com
- Company: AcmeStore
- Type: Invoice
- Needs: Vendor, invoice#, date, line items, total
- Status: RECEIVED
```

---

## 🔍 STEP 2: EXTRACTION PROCESS

### Phase A: Document Review (5 mins)

**Troy reviews:**
1. **Document quality:**
   - Is it readable? (clear text or needs OCR?)
   - Is it structured? (consistent format)
   - Any issues? (handwriting, poor scan, unusual format)

2. **Extraction complexity:**
   - Simple (text-based, clear fields) → 15-30 mins
   - Medium (needs OCR, some complexity) → 30-60 mins
   - Complex (handwritten, unusual format) → 1-2 hours

3. **Go/No-Go decision:**
   - ✅ CAN DO: Proceed to extraction
   - ❌ CAN'T DO: Email honest assessment

**If CAN'T DO reliably:**
```
Email to customer:
"Hey [Name], reviewed your sample. Honest feedback:

[Issue - handwritten/poor quality/unusual format]

I could try it, but accuracy would be <90% and I don't want 
to promise something I can't deliver reliably.

Recommendation: [Alternative solution if you have one]

Sorry we can't help with this one! If you have different 
invoices (clearer format), happy to try those instead.

- Troy"
```

**Update tracking:**
```
Status: LOST
Notes: "Can't extract reliably - [reason]"
```

---

### Phase B: Manual Extraction (Option 1 - Quick & Dirty)

**Tools:**
- Copy-paste from PDF
- Excel/Google Sheets
- 15-30 minutes

**Process:**
```
1. Open PDF in Preview/Adobe
2. Copy text fields:
   - Vendor name
   - Invoice number
   - Date
   - Line items (if any)
   - Amounts
   - Total
3. Paste into spreadsheet
4. Format cleanly
5. QA check (all fields correct?)
6. Save as CSV
```

**Pros:**
- Fast
- No coding needed
- Good for one-off samples

**Cons:**
- Not reusable
- Manual = potential errors
- Doesn't scale

---

### Phase C: Scripted Extraction (Option 2 - Scalable)

**When to use:**
- Multiple similar documents expected
- Customer likely to convert
- Format is consistent

**Tools:**
- Python + PyPDF2 or pdfplumber
- Regex for pattern matching
- 30-60 minutes first time, then reusable

**Process:**
```python
# Example script (saves to ~/extraction-scripts/[customer-name].py)

import pdfplumber
import csv

def extract_invoice(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        page = pdf.pages[0]
        text = page.extract_text()
        
        # Extract fields with regex
        vendor = extract_field(text, r'Vendor:\s*(.+)')
        invoice_num = extract_field(text, r'Invoice #:\s*(\d+)')
        date = extract_field(text, r'Date:\s*(\d{2}/\d{2}/\d{4})')
        total = extract_field(text, r'Total:\s*\$?([\d,]+\.\d{2})')
        
        # Extract line items
        lines = extract_line_items(text)
        
        return {
            'vendor': vendor,
            'invoice': invoice_num,
            'date': date,
            'total': total,
            'lines': lines
        }

# Save to CSV
data = extract_invoice('sample.pdf')
save_to_csv(data, 'output.csv')
```

**Peggy can help:**
- Write initial script based on PDF structure
- Test and refine
- Save script for future use
- Troy QAs the output

**Pros:**
- Reusable for similar docs
- Faster for bulk processing
- More accurate (consistent logic)

**Cons:**
- Upfront time investment
- Requires some coding

**Decision Rule:**
- Sample only? → Manual (faster now)
- Likely to convert? → Script (pays off later)

---

### Phase D: Quality Assurance (Critical!)

**Always QA before sending:**

**Checklist:**
```
✓ All requested fields present
✓ Data matches source (spot check 3-5 items)
✓ Numbers formatted correctly ($1,234.56 not "1234.56")
✓ Dates in requested format (MM/DD/YYYY vs DD/MM/YYYY)
✓ Line items properly structured (if applicable)
✓ No truncated text or encoding errors
✓ CSV opens cleanly in Excel
✓ File named clearly: [company]_invoice_extracted.csv
```

**Common Mistakes to Catch:**
- OCR errors (O vs 0, l vs 1)
- Missing decimal points ($100 vs $1.00)
- Wrong date format
- Incomplete line items
- Extra/missing columns

**If errors found:**
- Fix them NOW (don't send bad data)
- Note in extraction script/process
- Improve for next time

---

### Update Tracking:
```
Status: PROCESSING → DELIVERED
Date Delivered: [today]
Turnaround Time: [calculate hours]
Notes: [Any issues encountered]
```

---

## 📤 STEP 3: DELIVERY

### Email to Customer (Peggy drafts, Troy approves/sends)

**Subject:** Your Extracted Data - [Company Name]

**Body:**
```
Hey [Name],

Here's your extracted invoice data! 📊

[Attachment: [company]_invoice_extracted.csv]

We pulled:
✓ Vendor name, invoice number, date
✓ Line items with descriptions & amounts
✓ Tax breakdown & total

[If any notes/caveats]:
Note: [Mention any assumptions, edge cases, or things to verify]

---

If this looks good and you'd like us to handle extraction 
for your ongoing invoices, here's how it works:

💰 Pricing:
• Starter: $49/mo - up to 200 pages
• Business: $149/mo - up to 1,000 pages
• Enterprise: $399/mo - up to 5,000 pages

📧 Process:
1. Email invoices to invoices@[domain]
2. We extract data (usually within 2 hours)
3. You get CSV files back automatically

Want to get set up? Just reply "yes, let's do it" and I'll 
send you a payment link.

Any questions, let me know!

- Troy
[Service Name]
[domain]
```

**Attachments:**
- Extracted CSV file
- (Optional) Screenshot showing where data came from

---

## 🔄 STEP 4: CONVERSION FOLLOW-UP

### Day 0: Delivery sent
```
Status: DELIVERED
Conversion Status: PENDING
```

### Day 2: No response?
**Peggy sends (auto):**
```
Hey [Name],

Following up - did the extracted data look good?

Happy to answer any questions about our service or pricing!

- Troy
```

### Day 7: Still no response?
**Peggy sends (final):**
```
[Name],

Last email! If this isn't a fit, totally cool. But if you do 
want help with ongoing invoices, you know where to find me.

Either way, mind if I ask - was there anything missing from 
the extraction, or just not the right timing?

Always helpful to get feedback.

- Troy
```

**Update tracking:**
```
If no response by Day 7:
Status: LOST
Conversion Status: NO
Notes: [Track reason if they told us]
```

---

## ✅ STEP 5: CONVERSION (They Say Yes!)

### Immediate Actions:

**1. Send Payment Link**
```
Hey [Name]!

Awesome! Here's how to get started:

Payment link: [Stripe checkout URL for their plan]

Once payment goes through:
1. Start emailing invoices to: invoices@[domain]
2. We'll extract & send back within hours
3. That's it!

Looking forward to working with you!

- Troy
```

**2. Update Tracking**
```
LEADS tab:
- Status: CONVERTED
- Date: [today]

SAMPLES tab:
- Conversion Status: YES
- Conversion Date: [today]

CUSTOMERS tab (new row):
- Name: [name]
- Email: [email]
- Company: [company]
- Plan: [Starter/Business/Enterprise]
- MRR: [$49/$149/$399]
- Sign-Up Date: [today]
- Status: ACTIVE
```

**3. Celebrate! 🎉**
```
Discord message:
"🎉 NEW CUSTOMER! [Name] signed up for [Plan] plan!
MRR: +$[amount]
Total MRR: $[total]"
```

---

## 🚀 ONGOING CUSTOMER WORKFLOW

### Document Processing (Paying Customers)

**Step 1: Document Arrives**
```
Email to invoices@domain with invoice attached

Peggy detects:
- From: [customer email]
- Customer: [lookup in CUSTOMERS tab]
- Document: [attached file]
```

**Step 2: Instant Confirmation**
```
Auto-reply:
"Got your invoice! Processing now, you'll have data 
within 2 hours. - Peggy"

Add to DOCUMENTS tab:
- Date: [today]
- Customer: [name]
- Type: Invoice
- Pages: [count]
- Status: RECEIVED
```

**Step 3: Extract (Troy or Peggy)**
```
If script exists for this customer:
- Run script automatically
- Troy QAs output
- Usually <30 mins

If new format:
- Troy extracts manually or updates script
- Build script for future efficiency
- 30-60 mins first time, faster after
```

**Step 4: Deliver**
```
Email back:
"Hey [Name], here's your extracted data!
[Attachment: [company]_invoice_[date].csv]
- Troy"

Update DOCUMENTS tab:
- Status: DELIVERED
- Date Delivered: [timestamp]
- Turnaround: [calculate hours]
```

---

## 📊 EFFICIENCY IMPROVEMENTS

### After 5-10 Documents:

**Build Automation:**
1. **Email Parser:**
   - Auto-detect customer from email
   - Auto-download attachments
   - Auto-run extraction script

2. **Extraction Library:**
   - Save scripts per customer
   - Reuse for similar formats
   - Build template library

3. **Delivery Automation:**
   - Auto-email results
   - Auto-update tracking
   - Auto-invoice tracking (pages used)

**Goal:** Reduce Troy's time from 30 mins/doc to 5 mins/doc (QA only)

---

## 🆘 EDGE CASES & TROUBLESHOOTING

### Bad Quality PDF
**Problem:** Scanned, blurry, or handwritten

**Solution:**
1. Try OCR (Tesseract, Adobe)
2. If still bad → ask for clearer scan
3. Last resort → manual entry + charge premium?

### Unusual Format
**Problem:** Non-standard invoice layout

**Solution:**
1. Manual extraction for first one
2. Ask if all their invoices are like this
3. Build custom script if they convert
4. Charge more for complex formats?

### Missing Information
**Problem:** They want field that's not in document

**Solution:**
- Ask customer where to find it
- If truly missing → explain we can only extract what's there
- Suggest asking vendor for better invoices?

### Wrong Data
**Problem:** Customer says extraction is incorrect

**Solution:**
1. Apologize immediately
2. Ask for specific errors
3. Fix within 4 hours
4. Update script to prevent recurrence
5. Offer credit if it happens repeatedly

---

## ⏱️ TIME TRACKING

**Track your time to identify bottlenecks:**

```
Sample Extraction Times:
- Document review: 5 mins
- Manual extraction: 15-30 mins
- Script writing: 30-60 mins (one-time)
- Script execution: 2-5 mins (reusable)
- QA: 5-10 mins
- Total: 25-70 mins per sample

Goal Over Time:
- Month 1: 30-45 mins/sample (mostly manual)
- Month 2: 15-20 mins/sample (scripts built)
- Month 3: 5-10 mins/sample (mostly automated, just QA)
```

**When to hire help:**
- If processing >20 docs/day
- If Troy's time is >2 hours/day on extraction
- Hire VA at $15-20/hr to handle QA + simple cases

---

## 📝 EXTRACTION SCRIPT LIBRARY

**Save scripts in:** `~/extraction-scripts/`

**Naming:**
- `[customer-name]-invoice.py`
- `[vendor-name]-format.py`
- `generic-invoice-template.py`

**Document in script:**
```python
"""
Customer: AcmeStore
Vendor: SupplierXYZ
Format: Standard invoice with line items
Created: 2026-02-09
Last Updated: 2026-02-09
Notes: OCR required, watch for O/0 confusion
"""
```

**Version Control:**
```bash
cd ~/extraction-scripts
git init
git commit -m "Initial script for AcmeStore invoices"

# After refinements:
git commit -m "Fix date regex for AcmeStore format"
```

---

## ✅ QUALITY CHECKLIST (Print & Use)

```
□ Document reviewed (can extract reliably?)
□ All requested fields identified
□ Extraction method chosen (manual/script)
□ Data extracted
□ QA performed (spot check 3-5 items)
□ Numbers formatted correctly
□ Dates in right format
□ File named clearly
□ Opens in Excel without errors
□ Customer notified
□ Tracking updated
□ Script saved (if applicable)
```

---

**Goal: Fast, accurate, scalable extraction that builds trust and converts!** 🎯🐧
