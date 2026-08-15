# Quiet Form

Quiet Form is a dependency-free, multi-page design journal built with plain HTML, CSS, and JavaScript. It is intended as a clean practice site for learning Google Tag Manager and Google Analytics after deployment.

No analytics scripts, tracking attributes, cookies, build tools, or external runtime dependencies are included.

## Content map

- `index.html` — landing page, featured essay, journal index, reading note, and about section
- `blog/typography-that-whispers.html` — essay about typographic rhythm and hierarchy
- `blog/the-discipline-of-a-small-palette.html` — essay about restrained color systems
- `blog/space-is-an-active-material.html` — essay about whitespace and composition
- `css/styles.css` — shared design system, components, responsive rules, and print styles
- `js/main.js` — mobile navigation, scroll-aware header, and current footer year

## Preview locally

You can open `index.html` directly in a browser. For a more realistic local server, run this from the project directory:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Publish manually with GitHub Pages

1. Create a new empty repository on GitHub.
2. Add this project to the repository and push it to the `main` branch.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Wait for GitHub to show the published address and open it to verify the home page and all three articles.

All internal paths are relative, so the site works both at `username.github.io` and at `username.github.io/repository-name/`.

## Add Google Tag Manager later

This project intentionally contains no GTM or GA4 code. When you are ready to practice:

1. Paste the GTM `<script>` snippet as high as possible inside the `<head>` of every HTML page.
2. Paste the GTM `<noscript>` snippet immediately after the opening `<body>` tag on every HTML page.
3. Configure your GA4 tag and events inside Google Tag Manager rather than editing this site's JavaScript.
4. Use Tag Assistant preview mode before publishing your container.

The four HTML documents are the only files that need the GTM container snippets. Keep your GTM container ID out of this README if the repository will be used as a reusable template.

## Add another article

1. Copy one of the files in `blog/` and rename it with a short lowercase slug.
2. Update its title, description, date, category, reading time, article copy, and next-article link.
3. Add a new card to the journal grid in `index.html`.
4. Keep stylesheet and script links prefixed with `../` because article files sit one directory below the project root.
5. Test the article at both a wide and narrow viewport before publishing.

## Before publishing

- Replace the demo `hello@example.com` address in `index.html`.
- Review the fictional dates and editorial copy.
- Confirm every navigation link works from the GitHub Pages URL.
- Check the browser console for errors and use an accessibility audit such as Lighthouse.
