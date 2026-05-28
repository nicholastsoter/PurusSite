# Purus Landing Site

A Next.js landing page for Purus — clean, Apple-aesthetic, white-forward design.

---

## Project Structure

```
purus-site/
├── src/
│   ├── app/
│   │   ├── layout.js          ← Root layout (fonts, metadata)
│   │   ├── globals.css        ← Global styles + CSS variables
│   │   ├── page.js            ← Landing page (all sections)
│   │   └── privacy/
│   │       └── page.js        ← Privacy policy page
│   └── components/
│       └── Nav.js             ← Sticky nav bar
├── package.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

---

## Setup (Step by Step)

### Prerequisites
1. **Node.js** — download from https://nodejs.org (grab the LTS version)
2. **Claude Code** — open Terminal and run:
   ```
   npm install -g @anthropic/claude-code
   ```

### Run the site locally

1. Open Terminal (Mac) or Command Prompt (Windows)
2. Navigate to this folder:
   ```
   cd path/to/purus-site
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the dev server:
   ```
   npm run dev
   ```
5. Open your browser and go to: **http://localhost:3000**

You should see the landing page. The privacy policy lives at **http://localhost:3000/privacy**

---

## Things to Update Before Launch

- [ ] Replace the App Store `href="#"` links with your real App Store URL
- [ ] Update `support@getpurus.app` and `privacy@getpurus.app` with real email addresses
- [ ] Update the effective date in the privacy policy if needed
- [ ] Add your real logo/icon to `/public/` and update Nav.js
- [ ] Add Open Graph image to `/public/og-image.png` and reference in layout.js

---

## Using Claude Code to Make Changes

Once you have Claude Code installed, from inside the project folder run:
```
claude
```

Then just describe what you want in plain English, for example:
- "Change the hero headline to..."
- "Add a testimonials section after the features"
- "Make the CTA button green instead of blue"

Claude Code will read your files and make the changes directly.
