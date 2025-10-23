# Personal Website

This repository contains the source for a minimalist, academic-themed personal website suitable for GitHub Pages deployment.

## Structure

- `index.html` – main single-page layout with sections for About, Research, What's New, Blog, and Contact.
- `assets/css/style.css` – typography-forward styling with responsive behavior.
- `assets/js/main.js` – lightweight scripts (auto-updates footer year, loads blog previews).
- `assets/cv/` – place a PDF copy of your latest CV here (update the filename if needed).
- `assets/blog/` – plain-text source files for blog and prose entries (loaded dynamically).

## Customization

1. **Profile details** – Update the hero headline, tagline, and biography text in `index.html`.
2. **Navigation + Footer** – Adjust links and social profiles in `index.html`.
3. **Research entries** – Each research highlight is an `<article class="card">`; replace titles, venues, summaries, and links.
4. **What's New feed** – Swap the sample items with your updates; upload images to `assets/images/`, host short MP4 clips, and point the `<img>` or `<video>` sources accordingly.
5. **Blog posts** – Update or add `.txt` files in `assets/blog/`. The homepage automatically loads the first paragraph as a preview and links to the full text.
6. **Design tweaks** – Modify colors, spacing, or typography tokens in `assets/css/style.css`.

## GitHub Pages Deployment

1. Push this repository to a GitHub repo named `<username>.github.io`.
2. Ensure `index.html` is in the repository root (already satisfied).
3. Commit and push your changes; GitHub Pages will publish automatically within minutes.
4. Visit `https://<username>.github.io` to confirm the site is live.

For custom domains, add a `CNAME` file with the desired domain and configure your DNS to point to GitHub Pages.
