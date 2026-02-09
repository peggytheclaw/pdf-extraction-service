# PDF Extraction & Data Parsing Service

Landing page for a custom PDF extraction and data parsing service.

## Features

- **Calculator-first design**: Transparent pricing calculator as the hero section
- **Page-based pricing**: $0.05 per page processed
- **Clean, professional design**: No generic gradients, efficient vibes
- **Highlights**:
  - Custom parsing (no user configuration needed)
  - Flexible input/output options (email, Dropbox, API)
  - Built for scale
  - Transparent pricing

## Development

Static HTML page - no build process needed.

To preview locally:
```bash
open index.html
```

## Deployment

Can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting

## Social Listening Tool

Automated customer discovery tool that monitors online discussions about PDF automation problems.

```bash
# Run the social listening tool
node social-listening.js

# View the generated digest
open social-listening-results/digest-YYYY-MM-DD.html
```

See [SOCIAL-LISTENING.md](SOCIAL-LISTENING.md) for full documentation.

## TODO

- [ ] Connect contact form to backend (email notification)
- [ ] Set up actual hosting
- [ ] Add file upload capability for examples
- [x] Build social listening tool for customer discovery
