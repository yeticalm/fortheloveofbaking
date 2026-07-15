# Deploying fortheloveofbaking.com (GitHub Pages)

The site is a static single page hosted for free on **GitHub Pages** from this
repository. Every change pushed (or edited on github.com) goes live automatically
within a minute or two. No SFTP, no hosting plan needed.

## One-time setup (mostly already done by Claude Code)

1. **Repository + Pages** — the repo is on GitHub with Pages enabled, serving the
   `main` branch, custom domain `fortheloveofbaking.com`. ✅ automated
2. **DNS records (manual, one time)** — wherever the domain's DNS is managed
   (e.g., the DreamHost panel → Manage Websites → DNS), add:

   | Type  | Name / Host | Value |
   |-------|-------------|----------------------------|
   | A     | @           | 185.199.108.153 |
   | A     | @           | 185.199.109.153 |
   | A     | @           | 185.199.110.153 |
   | A     | @           | 185.199.111.153 |
   | CNAME | www         | yeticalm.github.io |

   Remove any conflicting A/CNAME records DreamHost may have pre-created for
   `@` and `www` (ones pointing at DreamHost's own servers).
3. **HTTPS** — after DNS propagates (minutes to a few hours), open the repo on
   github.com → Settings → Pages, wait for the "DNS check successful" state, and
   tick **Enforce HTTPS**. The certificate is free and renews automatically.

## Before the site is "really" live — remaining placeholders

- [ ] **Formspree form ID** — create a form in the Formspree dashboard (recipient:
      megha.chandra@gmail.com, added as a verified linked email). Then in
      `index.html`, replace `FORM_ID_PLACEHOLDER` (one spot, in the `<form action=...>`).
- [x] **Bakery email & phone** — megha.chandra@gmail.com / (317) 361-7066, shown
      in the Contact section.
- [ ] **Photos** — replace the placeholder images in `/images` keeping the same
      filenames: `hero-photo.jpg`, `about-megha-avni.jpg`, `menu-cupcakes.jpg`,
      `menu-loaf-cakes.jpg`, `menu-custom-cookies.jpg`, `menu-special-orders.jpg`,
      `ig-1.jpg` … `ig-4.jpg`. Resize to ≤1200px wide and compress (aim for
      ≤200 KB each) before uploading.

## Everyday updates (no tools needed)

1. Go to the repo on github.com and sign in.
2. To swap a photo: open the `images` folder → **Add file → Upload files** →
   drag the new photo (named exactly like the one it replaces) → **Commit changes**.
3. To edit text: open `index.html` → pencil icon → edit → **Commit changes**.
4. The live site updates automatically in ~1 minute. Hard-refresh to see it.

## Post-deploy test checklist

- Visit https://fortheloveofbaking.com and https://www.fortheloveofbaking.com
- Check the layout on a phone (360px), tablet, and desktop.
- Click every button/link: Market Wagon (new tab), Instagram (new tab), both
  scroll links, the mailto link.
- Send one real message through the contact form and confirm it arrives at the
  bakery email inbox.
