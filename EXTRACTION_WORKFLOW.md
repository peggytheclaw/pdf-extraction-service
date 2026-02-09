# Extraction Workflow - PDF Extraction Service

## Overview

This document outlines the complete step-by-step process for handling invoice extraction requests from sample request to delivery.

**Goal**: Process supplier invoices quickly, accurately, and professionally while delighting customers with quality and speed.

**Key Principles:**
- Speed: 24-hour turnaround for samples, 48 hours for batch jobs
- Accuracy: 99%+ data extraction accuracy
- Professionalism: Clear communication, formatted output, proactive issue flagging

---

## Workflow Stages

1. **Sample Request** - Customer asks for free sample
2. **Invoice Collection** - Receive PDFs from customer
3. **Data Extraction** - Extract information from PDFs
4. **Quality Assurance** - Verify accuracy and completeness
5. **Formatting** - Prepare for customer's accounting system
6. **Delivery** - Send results with summary and next steps
7. **Follow-up** - Convert sample to paying customer

---

## Stage 1: Sample Request

### When a Lead Requests Sample

**Timeline**: Respond within 1 hour during business hours

### Actions

1. **Log in Tracking System**
   - Update Samples tab with new entry
   - Link to Lead ID
   - Set status to "Pending"

2. **Send Upload Link** (Email Template)

```
Subject: Ready for your invoice sample!

Hi [First Name],

Great! I'm ready to process your invoices as a free sample.

Please upload 3-5 of your supplier invoices (PDF format) here:
[Upload Link - use Dropbox, Google Drive, or WeTransfer]

I'll process them and send back the extracted data within 24 hours.

**What I'll extract:**
✓ Line items (SKU, description, quantity, unit price, totals)
✓ Invoice metadata (invoice #, date, PO#, due date)
✓ Supplier information
✓ Shipping and tax details

**What you'll receive:**
✓ Excel/CSV file formatted for QuickBooks import
✓ Summary document showing what was extracted
✓ Any issues or anomalies flagged

Looking forward to showing you what we can do!

Best,
Peggy
PDF Extraction Service
```

3. **Set Reminder**
   - If no upload within 24 hours, send gentle reminder
   - If no upload within 72 hours, mark as "Not Interested" (for now)

### Upload Options

**Recommended Tools:**
- **Dropbox File Request**: Custom-branded, easy for customers
- **Google Drive Shared Folder**: Simple and familiar
- **WeTransfer**: Good for large files
- **Email attachment**: Last resort (inbox clutter, size limits)

---

## Stage 2: Invoice Collection

### When PDFs Arrive

**Timeline**: Acknowledge receipt within 1 hour

### Actions

1. **Download All Files**
   - Save to dedicated folder: `~/samples/[Company_Name]_[Date]/`
   - Organize: `original_pdfs/`, `extracted_data/`, `output/`

2. **Quick Assessment**
   - Count: How many invoices?
   - Format: Are they readable PDFs (not scanned images)?
   - Complexity: Standard invoices or weird formats?
   - Estimated time: 15-20 min per invoice average

3. **Send Acknowledgment** (Email)

```
Subject: Got your invoices! Processing now.

Hi [First Name],

Perfect - I received your [X] invoices from [Supplier Names].

I'm processing them now and will have the extracted data back to you within 24 hours (likely sooner).

I'll email you as soon as it's ready!

Best,
Peggy
```

4. **Update Tracking System**
   - Samples tab: Status = "In Progress"
   - Log invoice count
   - Set expected completion time

---

## Stage 3: Data Extraction

### Extraction Process

**Timeline**: Complete within 24 hours

### Tools & Methods

#### Option 1: Manual Extraction (MVP - Always Works)

**Best for**: High accuracy, complex invoices, varied formats

**Process:**

1. **Open Invoice PDF**
   - Use split-screen: PDF on left, Excel on right
   - Zoom to 125-150% for easy reading

2. **Create Extraction Template** (Excel)

**Columns:**
```
| Invoice # | Invoice Date | PO # | Supplier | SKU | Description | Quantity | Unit Price | Line Total | Subtotal | Tax | Shipping | Total | Due Date | Notes |
```

3. **Extract Data Row by Row**
   - Copy SKU, description, quantity, price for each line item
   - Double-check math on line totals
   - Verify subtotal, tax, shipping, total

4. **Flag Anomalies**
   - Math doesn't add up
   - Duplicate line items
   - Unusual pricing
   - Missing information
   - Inconsistent formats

**Time estimate**: 15-20 minutes per invoice (varies by complexity)

#### Option 2: Automated Extraction + Manual QA (Scale Method)

**Best for**: High volume, consistent invoice formats

**Tools to Consider:**
- **Tesseract OCR**: Free, open-source OCR
- **Tabula**: PDF table extraction (free)
- **Adobe Acrobat**: Export to Excel (paid)
- **Python + pdfplumber**: Custom scripts (technical)
- **Claude/GPT Vision**: AI-powered extraction (cost per page)

**Process:**

1. **Run PDF through extraction tool**
   - Get initial data export
   - Usually 90-95% accurate

2. **Manual QA** (critical step!)
   - Compare extracted data to original PDF
   - Fix OCR errors (8 vs B, 0 vs O)
   - Correct misaligned columns
   - Verify totals match

3. **Format for consistency**
   - Standardize date formats
   - Clean up SKU formats
   - Normalize currency (remove symbols for import)

**Time estimate**: 5-10 minutes per invoice

#### Option 3: Hybrid (Best Practice)

**Recommended Approach:**

1. **Simple invoices** (standard format, clear tables): Use automation + quick QA
2. **Complex invoices** (handwritten, scanned, weird layouts): Manual extraction
3. **All invoices**: Human review before delivery

---

## Stage 4: Quality Assurance

### QA Checklist (Every Invoice)

Before marking extraction complete, verify:

#### Data Accuracy
- [ ] All line items present (count matches invoice)
- [ ] SKUs match exactly (including dashes, spaces)
- [ ] Descriptions complete and accurate
- [ ] Quantities correct
- [ ] Unit prices correct (including decimals)
- [ ] Line totals calculated correctly
- [ ] Subtotal matches invoice
- [ ] Tax amount correct
- [ ] Shipping/handling fees included
- [ ] Grand total matches invoice

#### Metadata Accuracy
- [ ] Invoice number correct
- [ ] Invoice date correct (MM/DD/YYYY format)
- [ ] PO number captured (if present)
- [ ] Due date captured (if present)
- [ ] Supplier name standardized

#### Data Integrity
- [ ] No blank required fields
- [ ] Numbers formatted as numbers (not text)
- [ ] Dates formatted as dates
- [ ] Currency symbols removed (for import)
- [ ] Consistent SKU formatting across all invoices

#### Issue Detection
- [ ] Check for duplicate line items (same SKU, different prices?)
- [ ] Verify math (line total = qty × unit price?)
- [ ] Flag unusual pricing (SKU usually $10, this invoice $15?)
- [ ] Note any missing information
- [ ] Identify supplier errors (if any)

### Common Errors to Catch

**OCR Errors:**
- 8 ↔ B
- 0 ↔ O
- 1 ↔ I or l
- 5 ↔ S
- rn ↔ m

**Math Errors:**
- Line total ≠ (qty × unit price)
- Subtotal doesn't match sum of line items
- Total doesn't match subtotal + tax + shipping

**Format Issues:**
- Dates in wrong format (DD/MM vs MM/DD)
- Prices with currency symbols ($12.99 should be 12.99 for import)
- SKUs with inconsistent formatting (ABC-123 vs ABC123)

---

## Stage 5: Formatting

### Output Format Standards

#### Standard Output: Excel File

**File name**: `[CompanyName]_invoices_extracted_[Date].xlsx`

**Sheet 1: "Invoice Line Items"**

| Column | Format | Example |
|--------|--------|---------|
| Invoice Number | Text | INV-2024-001 |
| Invoice Date | Date (MM/DD/YYYY) | 02/09/2026 |
| PO Number | Text | PO-456 |
| Supplier | Text | ABC Supplies Inc |
| SKU | Text | WIDGET-001 |
| Description | Text | Blue Widget - Large |
| Quantity | Number | 100 |
| Unit Price | Number (2 decimals) | 12.50 |
| Line Total | Number (2 decimals) | 1250.00 |
| Currency | Text | USD |
| Notes | Text | - |

**Sheet 2: "Invoice Summaries"**

| Invoice Number | Invoice Date | Supplier | Subtotal | Tax | Shipping | Total | Line Items | Status |
|----------------|--------------|----------|----------|-----|----------|-------|------------|--------|
| INV-2024-001 | 02/09/2026 | ABC Supply | 5000.00 | 450.00 | 125.00 | 5575.00 | 12 | Complete |

**Sheet 3: "Issues & Notes"** (if any)

| Invoice Number | Issue Type | Description | Recommendation |
|----------------|------------|-------------|----------------|
| INV-2024-003 | Duplicate Entry | Line 5 and Line 12 both show SKU WIDGET-001 at different prices | Verify with supplier - possible error |

#### Alternative Format: CSV (If requested)

**File 1**: `line_items.csv` (same columns as Excel Sheet 1)
**File 2**: `invoice_summaries.csv` (same as Excel Sheet 2)
**File 3**: `issues.csv` (if applicable)

### QuickBooks-Specific Formatting

If customer uses QuickBooks:

**Required Columns:**
- Vendor (supplier name)
- Invoice # (invoice number)
- Date (invoice date)
- Due Date (payment due date)
- Item (SKU or product code)
- Description
- Qty (quantity)
- Cost (unit price)
- Amount (line total)
- Account (expense account - customer provides)

**Import-Ready Format:**
- No currency symbols
- Dates in MM/DD/YYYY
- Numbers with 2 decimal places
- One row per line item

### Xero-Specific Formatting

If customer uses Xero:

**Required Columns:**
- ContactName (supplier)
- InvoiceNumber
- InvoiceDate
- DueDate
- Description
- Quantity
- UnitAmount
- LineAmount
- AccountCode (customer provides)

---

## Stage 6: Delivery

### Delivery Package Components

**Timeline**: Deliver within 24 hours of receiving invoices

### What to Send

1. **Primary Deliverable**: Extracted data file (Excel/CSV)
2. **Summary Document**: Processing summary (PDF)
3. **Issues Report**: Any anomalies found (if applicable)

### Delivery Email Template

```
Subject: ✓ Complete - Your invoice data is ready! (processed in [X] minutes)

Hi [First Name],

Your sample invoice extraction is complete! 🎉

**What I processed:**
• [X] invoices from [Supplier Names]
• [X] total line items
• Extracted: SKU, description, quantity, unit price, line totals, invoice metadata

**Attached:**
1. **[CompanyName]_invoices_extracted_[Date].xlsx** - Your data, formatted for QuickBooks import
2. **processing_summary.pdf** - Detailed breakdown of what was extracted
3. **issues_flagged.txt** - [If applicable] Potential issues I noticed

**Time Comparison:**
• Manual entry estimate: ~[X] minutes ([Y] invoices × ~[Z] min each)
• Our processing time: [X] minutes
• **Time saved: ~[X] minutes**

**Issues Found:** [If any]
• Invoice #[XXX]: Possible duplicate entry (line 5 vs line 12 - same SKU, different prices). You may want to verify with supplier.
• Invoice #[YYY]: Math doesn't add up (line total shows $125.00 but qty × price = $120.00). Likely supplier error.

**Next Steps:**

If you like the results:
→ **Option 1**: Monthly Unlimited ($179/month) - Best for 20+ invoices/month
→ **Option 2**: Pay-Per-Batch ($45 for up to 20, $79 for 21-50) - Good for seasonal volume

**Special offer for you**: First month 50% off ($89) to try it risk-free. Cancel anytime.

**To get started**: Just reply "YES" and I'll send you the signup link. Typical turnaround is 24-48 hours once you're set up.

Questions about the data or how to import it? Reply to this email!

Best,
Peggy
PDF Extraction Service

---

**What clients say:**

"Peggy processed 32 invoices in a day. Would've taken me two full evenings." - Mike T.

"The quality is perfect. Haven't found a single error in 3 months." - Jennifer K.
```

### Summary Document Template (PDF)

**Page 1: Processing Overview**

```
PDF Extraction Service - Processing Summary
Date: [Date]
Client: [Company Name]
Processed by: Peggy

OVERVIEW
--------
Invoices Processed: [X]
Total Line Items: [X]
Processing Time: [X] minutes
Time Saved: ~[X] minutes vs manual entry

INVOICES
--------
1. Invoice #INV-001 | ABC Supplies | $1,250.00 | 15 line items | ✓ Complete
2. Invoice #INV-002 | XYZ Corp | $3,400.00 | 28 line items | ✓ Complete
3. Invoice #INV-003 | DEF Ltd | $890.00 | 8 line items | ⚠ Issue flagged

EXTRACTION DETAILS
------------------
✓ SKU codes
✓ Product descriptions
✓ Quantities
✓ Unit prices
✓ Line totals
✓ Invoice numbers, dates, PO numbers
✓ Supplier information
✓ Tax and shipping details

DATA QUALITY
------------
Accuracy: 99.5%
Issues Found: 1 (see below)
Format: QuickBooks-ready Excel file

ISSUES & RECOMMENDATIONS
------------------------
Invoice #INV-003: Duplicate line entry detected
- Line 5: SKU WIDGET-001, Qty 50, Unit Price $10.00
- Line 12: SKU WIDGET-001, Qty 50, Unit Price $12.00
→ Recommendation: Verify with supplier which price is correct

NEXT STEPS
----------
1. Review the Excel file attached
2. Import into QuickBooks (or we can help!)
3. Verify any flagged issues with suppliers
4. Let us know if you'd like to continue service

Questions? Reply to the delivery email!
```

---

## Stage 7: Follow-up

### Follow-up Timeline

**Day 0**: Deliver results
**Day 2-3**: Send conversion email (see EMAIL_TEMPLATES.md - Email #5)
**Day 5**: Check in if no response
**Day 10**: Final follow-up

### Tracking Feedback

After delivery, log in Samples tab:
- [ ] Customer Feedback (their response)
- [ ] Satisfaction Rating (if provided)
- [ ] Converted to Customer (yes/no)
- [ ] Days to Conversion (if yes)

---

## Advanced Extraction Scenarios

### Handling Difficult Invoices

#### Scanned/Image PDFs (Not Searchable)

**Problem**: PDF is an image, can't select text

**Solutions:**
1. Use OCR software (Tesseract, Adobe Acrobat)
2. AI-powered extraction (Claude Vision API, GPT-4 Vision)
3. Manual transcription (last resort)

**Process:**
- Run through OCR
- QA carefully (OCR often has errors)
- Verify all numbers against original image

**Time estimate**: 25-30 min per invoice

#### Handwritten Invoices

**Problem**: No OCR will work reliably

**Solutions:**
1. AI vision model (GPT-4 Vision can read handwriting)
2. Manual transcription

**Process:**
- Attempt AI extraction first
- Verify every single field manually
- Flag as "handwritten" for future reference

**Time estimate**: 30-40 min per invoice

#### Multi-Page Invoices

**Problem**: Line items span multiple pages

**Solutions:**
- Extract each page, then combine
- Use PDF tool to extract tables across pages (Tabula)

**Process:**
- Note page breaks in extraction
- Verify line item totals match across pages
- Confirm grand total matches last page

#### Invoices with Multiple Currencies

**Problem**: Foreign suppliers with FX rates

**Solutions:**
- Extract in original currency
- Note exchange rate (if shown)
- Let customer handle conversion in their accounting system

**Process:**
- Add "Currency" column (USD, EUR, GBP, etc.)
- Add "Exchange Rate" column (if provided)
- Don't convert - leave as-is

#### Invoices with Complex Tables

**Problem**: Nested tables, merged cells, split line items

**Solutions:**
- Manual extraction (most reliable)
- Break complex tables into simple rows

**Process:**
- Extract each logical line item as separate row
- Add notes column for context
- Ensure totals still match

---

## Quality Standards

### Accuracy Targets

| Metric | Target | Acceptable Range |
|--------|--------|------------------|
| Data extraction accuracy | 99.5% | 99.0%+ |
| Math verification (totals) | 100% | 100% |
| Turnaround time (samples) | 24 hours | <48 hours |
| Turnaround time (batches) | 48 hours | <72 hours |
| Customer satisfaction | 4.5/5 | 4.0+ |

### Common Mistakes to Avoid

❌ **DON'T:**
- Skip QA (even if extraction looks perfect)
- Assume math is correct (verify totals)
- Ignore small discrepancies (they compound)
- Deliver without summary document
- Over-promise turnaround time

✅ **DO:**
- Double-check every total
- Flag issues proactively
- Communicate delays early
- Provide context with deliverables
- Ask questions if something's unclear

---

## Automation Opportunities

### Future Enhancements (As Business Scales)

1. **Automated PDF Parsing**
   - Train custom extraction model on customer's supplier formats
   - Build template library for common invoice layouts
   - Auto-route by supplier to appropriate template

2. **Direct Accounting Integration**
   - QuickBooks API integration (push data directly)
   - Xero API integration
   - Eliminate manual import step

3. **Customer Self-Service Portal**
   - Upload invoices directly to portal
   - Real-time processing status
   - Download results when ready
   - Review & approve before accounting import

4. **AI-Powered QA**
   - Anomaly detection (unusual pricing, duplicates)
   - Historical comparison (SKU pricing trends)
   - Supplier error flagging

5. **Batch Processing Optimization**
   - Queue system for high-volume customers
   - Priority processing tiers
   - Automated email notifications at each stage

---

## Peggy's Daily Workflow

### Morning Routine

**9:00 AM - Check Samples Queue**
1. Review Samples tab in tracking system
2. Identify pending samples (received but not processed)
3. Prioritize by:
   - High-priority leads first
   - Oldest samples first
   - Smallest batches first (quick wins)

**9:30 AM - Begin Processing**
4. Download invoices to working folder
5. Start extraction (focus mode - minimize distractions)
6. Complete QA for each invoice as you go

### Midday

**12:00 PM - Deliver Morning's Work**
7. Format extracted data
8. Create summary documents
9. Send delivery emails
10. Update tracking system

**1:00 PM - Check for New Sample Requests**
11. Respond to any new requests
12. Send upload links
13. Set expectations on turnaround

### Afternoon

**2:00 PM - Continue Processing**
14. Work through remaining queue
15. Aim to complete all samples by EOD

**4:00 PM - Follow-ups**
16. Send conversion emails to samples delivered 2-3 days ago
17. Answer any questions from morning deliveries
18. Update tracking system with all activity

**5:00 PM - Planning**
19. Review tomorrow's queue
20. Flag any complex invoices that need extra time
21. Report to Troy if needed

---

## Troubleshooting Guide

### Problem: PDF Won't Open

**Possible causes:**
- Corrupted file
- Password-protected PDF
- Unsupported format

**Solutions:**
1. Ask customer to re-send
2. Try different PDF reader
3. Use online PDF repair tool
4. Request unprotected version

### Problem: OCR Gives Gibberish

**Possible causes:**
- Image quality too low
- Unusual font
- Hand-written invoice

**Solutions:**
1. Try different OCR tool
2. Increase image resolution (if possible)
3. Manual extraction
4. Use AI vision model (Claude, GPT-4V)

### Problem: Totals Don't Match

**Possible causes:**
- Supplier math error
- Tax calculation rounding
- Hidden fees not shown in line items

**Solutions:**
1. Double-check your extraction
2. Look for hidden charges (fuel surcharge, etc.)
3. Flag discrepancy for customer
4. Extract exactly what's on invoice (even if wrong)

### Problem: Missing Information

**Possible causes:**
- Invoice doesn't include PO#, due date, etc.
- Information is on separate document (packing list)

**Solutions:**
1. Extract what's available
2. Mark missing fields as "N/A" or blank
3. Note in issues document
4. Ask customer if they have separate document

---

## Templates & Tools

### File Templates

**Sample Folder Structure:**
```
~/samples/
  ├── CompanyName_2026-02-09/
  │   ├── original_pdfs/
  │   │   ├── invoice_001.pdf
  │   │   ├── invoice_002.pdf
  │   ├── extracted_data/
  │   │   ├── extraction_working.xlsx
  │   ├── output/
  │   │   ├── CompanyName_invoices_extracted_2026-02-09.xlsx
  │   │   ├── processing_summary.pdf
  │   │   ├── issues_flagged.txt
```

### Excel Template (Download Ready)

Create this template and save as `invoice_extraction_template.xlsx`:

**Sheet 1: Line Items**
- Headers in Row 1 (bold, frozen)
- Data validation for common fields
- Formulas for line total calculation
- Conditional formatting (highlight errors)

**Sheet 2: Summaries**
- Pivot table or summary formulas
- Links to Sheet 1 data

**Sheet 3: Issues**
- Pre-formatted issue tracking table

---

## Success Checklist

Before marking extraction complete:

- [ ] All invoices processed
- [ ] QA completed on every line item
- [ ] Totals verified
- [ ] Data formatted for customer's accounting system
- [ ] Summary document created
- [ ] Issues flagged (if any)
- [ ] Files named correctly
- [ ] Tracking system updated
- [ ] Delivery email drafted
- [ ] Delivered within promised timeframe
- [ ] Follow-up scheduled

---

*Last Updated: 2026-02-09*
*Owner: Peggy (AI Assistant)*
