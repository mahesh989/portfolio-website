# Professional Portfolio Website - Maheshwor Tiwari

A modern, responsive, and accessible portfolio website built with vanilla HTML, CSS, and JavaScript. Designed specifically for Data Analysts and AI Engineers to showcase their skills and projects effectively.

## 🚀 Features

- **Modern Design**: Clean, professional layout with split-screen design
- **Fully Responsive**: Mobile-first approach with seamless tablet and desktop experience
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Performance Optimized**: Fast loading with lazy loading, image optimization, and efficient animations
- **Interactive Elements**: Smooth scrolling, animated skill bars, typing effects, and hover animations
- **Contact Form**: Functional contact form with validation and multiple backend options
- **Analytics Ready**: Google Analytics 4 integration with custom event tracking
- **SEO Optimized**: Structured data, meta tags, and semantic HTML

## 📁 Project Structure

```
portfolio-website/
├── index.html                          # Main HTML file
├── css/
│   ├── main.css                        # Global styles and CSS variables
│   ├── layout.css                      # Layout structure (grid, flexbox)
│   ├── components/
│   │   ├── hero.css                    # Hero section styles
│   │   ├── sidebar.css                 # Left sidebar styles
│   │   ├── skills.css                  # Skills section styles
│   │   ├── experience.css              # Experience cards styles
│   │   ├── projects.css                # Project cards styles
│   │   ├── education.css               # Education section styles
│   │   ├── contact.css                 # Contact section styles
│   │   └── buttons.css                 # Reusable button styles
│   └── responsive.css                  # All media queries
├── js/
│   ├── main.js                         # Main JavaScript initialization
│   ├── modules/
│   │   ├── smoothScroll.js             # Smooth scrolling functionality
│   │   ├── navHighlight.js             # Active navigation highlighting
│   │   ├── animations.js               # Scroll animations, fade-ins
│   │   ├── contactForm.js              # Contact form validation & handling
│   │   ├── themeToggle.js              # Light/dark mode toggle
│   │   └── analytics.js                # Google Analytics tracking
│   └── utils/
│       ├── helpers.js                  # Utility functions
│       └── constants.js                # Constants and configuration
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   ├── headshot.jpg            # Professional photo
│   │   │   └── headshot-small.jpg      # Mobile version
│   │   ├── projects/
│   │   │   ├── project1-thumbnail.jpg  # Project screenshots
│   │   │   ├── project2-thumbnail.jpg
│   │   │   ├── project3-thumbnail.jpg
│   │   │   └── project4-thumbnail.jpg
│   │   └── icons/
│   │       ├── python.svg              # Technology icons
│   │       ├── sql.svg
│   │       ├── tableau.svg
│   │       └── powerbi.svg
│   ├── resume/
│   │   └── Maheshwor_Tiwari_Resume.pdf # Downloadable CV
│   └── fonts/                          # Local fonts (if not using CDN)
├── data/
│   └── content.json                    # All content in JSON format
├── README.md                           # This file
├── .gitignore                          # Git ignore file
└── package.json                        # NPM dependencies (optional)
```

## 🛠️ Setup Instructions

### 1. Clone or Download
```bash
git clone <repository-url>
cd portfolio-website
```

### 2. Add Your Content
- Replace placeholder images in `assets/images/` with your actual photos
- Update `data/content.json` with your personal information
- Add your resume PDF to `assets/resume/`
- Update social media links and project URLs

### 3. Configure Analytics (Optional)
- Replace `G-XXXXXXXXXX` in `js/modules/analytics.js` with your Google Analytics 4 measurement ID
- Update `js/utils/constants.js` with your GA4 measurement ID

### 4. Configure Contact Form
Choose one of these options:

#### Option A: FormSpree (Recommended)
1. Sign up at [FormSpree](https://formspree.io/)
2. Replace `YOUR_FORM_ID` in `js/modules/contactForm.js` with your form ID

#### Option B: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to the form (already included)
3. No additional configuration needed

#### Option C: EmailJS
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Update the configuration in `js/modules/contactForm.js`

### 5. Deploy
Choose your preferred hosting platform:

#### GitHub Pages
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
# Enable GitHub Pages in repository settings
```

#### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy automatically on every push

#### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push

## 🎨 Customization

### Colors
Update CSS variables in `css/main.css`:
```css
:root {
  --primary-color: #2563eb;        /* Your brand color */
  --accent-color: #10b981;         /* Accent color */
  --text-primary: #111827;         /* Main text color */
  /* ... other variables */
}
```

### Typography
Change fonts in `css/main.css`:
```css
:root {
  --font-primary: 'Your Font', sans-serif;
}
```

### Layout
Modify the split-screen layout in `css/layout.css`:
```css
.sidebar {
  width: 30%; /* Adjust sidebar width */
}
```

### Content
Update `data/content.json` with your information:
- Personal details
- Experience history
- Project portfolio
- Education and certifications
- Skills and technologies

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: ≥ 1440px

## ♿ Accessibility Features

- Semantic HTML5 elements
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Focus indicators
- ARIA labels and roles
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

## 🚀 Performance Features

- Lazy loading for images
- Optimized CSS and JavaScript
- Minimal external dependencies
- Efficient animations
- Compressed images
- Critical CSS inlined
- Preloaded fonts

## 📊 Analytics Events

The website tracks the following events:
- Page views and load times
- Form submissions
- Project views
- Social media clicks
- Download events
- Scroll depth
- Navigation clicks

## 🔧 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue or contact the developer.

## 🙏 Acknowledgments

- Design inspiration from modern portfolio websites
- Icons from Heroicons and Lucide
- Fonts from Google Fonts
- Color palette inspired by Tailwind CSS

---

**Built with ❤️ for the data science community**
