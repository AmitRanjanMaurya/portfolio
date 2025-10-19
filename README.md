## amitranjanmaurya.com (Portfolio)

A modern, responsive, accessible portfolio built with HTML5, CSS3, and vanilla JavaScript.

### Structure

- css/ — global styles
- js/ — scripts per page and shared
- assets/ — icons, SVGs, images, documents

### Run locally

Open `index.html` directly or serve with a simple server.

### Update content

- Home hero text: edit phrases in `js/main.js` (typing effect array).
- About page: edit copy in `about.html`. Replace `assets/Amit_Ranjan_Maurya_CV.pdf` with your CV.
- Skills/services: update lists in `skills.html` and `services.html`.
- Projects: update the array in `js/projects.js` (name, desc, tech, cat, img).
- Contact: form is client-side validated; wire to a backend endpoint if desired.

### Theming

- Colors defined via CSS variables in `css/style.css`. Toggle via header button (persists in localStorage).

### Performance

- Native `loading="lazy"` for images, minimal JS, no frameworks. Use compressed SVGs and WebP if adding photos.

### Accessibility

- Semantic elements, labels, ARIA for modals/nav, keyboard friendly. Ensure alt text is descriptive when adding images.

### SEO

- Meta tags in each page head. Add `sitemap.xml` and `robots.txt` at deploy.


