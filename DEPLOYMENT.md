# Deployment Guide

## Quick Start

1. **Replace Placeholder Content**
   - Add your actual profile photo to `assets/images/profile/headshot.jpg`
   - Add project screenshots to `assets/images/projects/`
   - Add your resume PDF to `assets/resume/Maheshwor_Tiwari_Resume.pdf`
   - Update `data/content.json` with your information

2. **Configure Analytics** (Optional)
   - Get your Google Analytics 4 measurement ID
   - Replace `G-XXXXXXXXXX` in `js/modules/analytics.js` and `js/utils/constants.js`

3. **Set Up Contact Form**
   - Choose FormSpree, Netlify Forms, or EmailJS
   - Update the configuration in `js/modules/contactForm.js`

4. **Deploy to Your Platform**

## Deployment Options

### GitHub Pages (Free)
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
# Enable GitHub Pages in repository settings
```

### Netlify (Free with custom domain)
1. Connect GitHub repository to Netlify
2. Deploy automatically on every push
3. Add custom domain (optional)

### Vercel (Free)
1. Connect GitHub repository to Vercel
2. Deploy automatically on every push

### Traditional Web Hosting
1. Upload all files to your web server
2. Ensure HTTPS is enabled
3. Test all functionality

## Pre-Deployment Checklist

- [ ] All placeholder images replaced
- [ ] Personal information updated in `data/content.json`
- [ ] Resume PDF added
- [ ] Social media links updated
- [ ] Project URLs updated
- [ ] Contact form configured
- [ ] Analytics configured (if desired)
- [ ] All links tested
- [ ] Mobile responsiveness tested
- [ ] Performance tested (Lighthouse)
- [ ] Accessibility tested

## Post-Deployment

- [ ] Test contact form
- [ ] Verify all external links work
- [ ] Check mobile experience
- [ ] Test download functionality
- [ ] Monitor analytics (if configured)
- [ ] Share on LinkedIn and other platforms

## Maintenance

- Update content regularly
- Monitor site performance
- Keep dependencies updated
- Backup site files
- Monitor analytics and user feedback
