# Responsive Breakpoints Quick Reference

## 📱 Standard Breakpoints

```css
/* Extra Small Phones */
@media (max-width: 359px) { }
/* Target: Small devices, older phones */
/* Example: iPhone 5/SE (320px) */

/* Small Mobile */
@media (min-width: 360px) and (max-width: 479px) { }
/* Target: Modern small phones */
/* Example: Galaxy S9 (360px), iPhone 12 Mini (375px) */

/* Medium Mobile */
@media (min-width: 480px) and (max-width: 767px) { }
/* Target: Large phones */
/* Example: iPhone 14 Plus (428px) */

/* Tablet Portrait */
@media (min-width: 768px) and (max-width: 1023px) { }
/* Target: Tablets in portrait */
/* Example: iPad (768px), iPad Air (820px) */

/* Tablet Landscape / Small Desktop */
@media (min-width: 1024px) and (max-width: 1279px) { }
/* Target: Tablets in landscape, small laptops */
/* Example: iPad Pro (1024px), 13" laptops (1280px) */

/* Desktop */
@media (min-width: 1280px) and (max-width: 1439px) { }
/* Target: Standard desktop monitors */
/* Example: 15" laptops, HD monitors */

/* Large Desktop */
@media (min-width: 1440px) and (max-width: 1919px) { }
/* Target: Large monitors */
/* Example: 27" monitors, MacBook Pro 16" */

/* Ultra-wide */
@media (min-width: 1920px) { }
/* Target: 4K monitors, ultra-wide displays */
/* Example: 32" 4K, 34" ultrawide */
```

## 🎨 Layout Changes by Breakpoint

| Breakpoint | Layout | Sidebar | Grid Columns | Font Scale |
|-----------|--------|---------|--------------|------------|
| < 360px | Single col | Drawer | 1 | 0.75x |
| 360-479px | Single col | Drawer | 1 | 0.85x |
| 480-767px | Single col | Drawer | 1 | 0.9x |
| 768-1023px | Two col | Drawer | 2 | 0.95x |
| 1024-1279px | Sidebar + Main | Fixed | 2 | 1x |
| 1280-1439px | Sidebar + Main | Fixed | 3 | 1x |
| 1440-1919px | Sidebar + Main | Fixed | 3 | 1.05x |
| 1920px+ | Sidebar + Main | Fixed | 4 | 1.1x |

## 📐 Common Device Sizes

### Mobile Phones (Portrait)
```
iPhone SE (2022)       : 375 x 667px   @2x
iPhone 12/13/14        : 390 x 844px   @3x
iPhone 14 Pro Max      : 430 x 932px   @3x
Samsung Galaxy S20+    : 412 x 915px   @3.5x
Google Pixel 7         : 412 x 915px   @2.6x
```

### Mobile Phones (Landscape)
```
iPhone SE (2022)       : 667 x 375px   @2x
iPhone 12/13/14        : 844 x 390px   @3x
iPhone 14 Pro Max      : 932 x 430px   @3x
Samsung Galaxy S20+    : 915 x 412px   @3.5x
```

### Tablets (Portrait)
```
iPad (10.2")           : 810 x 1080px  @2x
iPad Air (10.9")       : 820 x 1180px  @2x
iPad Pro 11"           : 834 x 1194px  @2x
iPad Pro 12.9"         : 1024 x 1366px @2x
Samsung Galaxy Tab S7  : 800 x 1280px  @2x
```

### Tablets (Landscape)
```
iPad (10.2")           : 1080 x 810px  @2x
iPad Air (10.9")       : 1180 x 820px  @2x
iPad Pro 11"           : 1194 x 834px  @2x
iPad Pro 12.9"         : 1366 x 1024px @2x
```

### Desktop/Laptop
```
MacBook Air 13"        : 1440 x 900px  @2x
MacBook Pro 14"        : 1512 x 982px  @2x
MacBook Pro 16"        : 1728 x 1117px @2x
1080p Monitor          : 1920 x 1080px @1x
1440p Monitor          : 2560 x 1440px @1x
4K Monitor             : 3840 x 2160px @1x
```

## 🎯 Touch Target Sizes

```css
/* Minimum touch target (WCAG 2.1 Level AA) */
min-height: 44px;
min-width: 44px;

/* Recommended touch target */
min-height: 48px;
min-width: 48px;

/* Touch target with spacing */
min-height: 44px;
min-width: 44px;
margin: 4px; /* Creates 52x52px touch area */
```

## 📏 Spacing Scale

```css
--space-1: 0.25rem;  /* 4px  - Tight spacing */
--space-2: 0.5rem;   /* 8px  - Small gap */
--space-3: 0.75rem;  /* 12px - Medium gap */
--space-4: 1rem;     /* 16px - Default spacing */
--space-5: 1.25rem;  /* 20px - Comfortable spacing */
--space-6: 1.5rem;   /* 24px - Large spacing */
--space-8: 2rem;     /* 32px - Section spacing */
--space-10: 2.5rem;  /* 40px - Large section */
--space-12: 3rem;    /* 48px - Major section */
--space-16: 4rem;    /* 64px - Page section */
```

## 🔤 Typography Scale

```css
/* Extra Small */
--text-xs: clamp(0.65rem, 0.6rem + 0.2vw, 0.75rem);   /* 10-12px */

/* Small */
--text-sm: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem); /* 12-14px */

/* Base */
--text-base: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);   /* 14-16px */

/* Large */
--text-lg: clamp(1rem, 0.9rem + 0.4vw, 1.125rem);     /* 16-18px */

/* Extra Large */
--text-xl: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);    /* 18-20px */

/* 2X Large */
--text-2xl: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);   /* 20-24px */

/* 3X Large */
--text-3xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem);  /* 24-30px */

/* 4X Large */
--text-4xl: clamp(1.875rem, 1.6rem + 1vw, 2.25rem);   /* 30-36px */

/* 5X Large */
--text-5xl: clamp(2.25rem, 1.9rem + 1.5vw, 3rem);     /* 36-48px */
```

## 🖼️ Image Sizes

### Profile Images
```html
<!-- Standard -->
<img src="profile-120.jpg" 
     srcset="profile-120.jpg 1x, profile-240.jpg 2x"
     width="120" height="120">
```

### Project Thumbnails
```html
<!-- Responsive -->
<img src="project-400.jpg"
     srcset="project-400.jpg 400w,
             project-800.jpg 800w,
             project-1200.jpg 1200w"
     sizes="(max-width: 767px) 100vw,
            (max-width: 1023px) 50vw,
            33vw">
```

## 🎨 Grid Layouts

### Projects Grid
```css
/* Mobile */
@media (max-width: 767px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1279px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1280px) and (max-width: 1919px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Ultra-wide */
@media (min-width: 1920px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 🔧 Utility Classes

### Display Utilities
```html
<div class="mobile-only">Visible only on mobile</div>
<div class="desktop-only">Visible only on desktop</div>
```

### Spacing Utilities
```html
<div class="spacing-xs">Extra small margin bottom</div>
<div class="spacing-sm">Small margin bottom</div>
<div class="spacing-md">Medium margin bottom</div>
<div class="spacing-lg">Large margin bottom</div>
<div class="spacing-xl">Extra large margin bottom</div>
```

### Line Clamping
```html
<p class="line-clamp-2">Text limited to 2 lines...</p>
<p class="line-clamp-3">Text limited to 3 lines...</p>
```

## 📱 Safe Areas (iOS Notch)

```css
/* Apply to fixed elements */
.top-nav {
  padding-top: max(var(--space-3), env(safe-area-inset-top));
}

.sidebar {
  padding-bottom: max(var(--space-8), env(safe-area-inset-bottom));
}

body {
  padding-left: max(0px, env(safe-area-inset-left));
  padding-right: max(0px, env(safe-area-inset-right));
}
```

## 🎭 Orientation Specific

```css
/* Portrait */
@media (orientation: portrait) {
  .hero {
    min-height: 80vh;
  }
}

/* Landscape */
@media (orientation: landscape) {
  .hero {
    min-height: 60vh;
  }
}

/* Mobile Landscape */
@media (max-width: 767px) and (orientation: landscape) {
  .hero-stats {
    flex-direction: row;
  }
}
```

## 🖱️ Hover & Touch

```css
/* Touch devices (no hover) */
@media (hover: none) and (pointer: coarse) {
  .btn {
    min-height: 48px;
  }
  
  .btn:hover {
    transform: none;
  }
  
  .btn:active {
    transform: scale(0.95);
  }
}

/* Mouse/trackpad devices */
@media (hover: hover) and (pointer: fine) {
  .btn:hover {
    transform: translateY(-2px);
  }
}
```

## 📊 Pixel Density

```css
/* Standard screens (1x) */
@media (resolution: 1dppx) {
  /* Standard resolution styles */
}

/* Retina screens (2x) */
@media (min-resolution: 2dppx) {
  .project-card {
    border-width: 0.5px;
  }
}

/* High-DPI screens (3x) */
@media (min-resolution: 3dppx) {
  /* Ultra-sharp styles */
}
```

## ♿ Accessibility

```css
/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast */
@media (prefers-contrast: high) {
  .btn {
    border: 2px solid currentColor;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --text-primary: #f9fafb;
  }
}
```

## 🚀 Quick Tips

1. **Mobile First**: Write styles for mobile, then add complexity with `min-width`
2. **Touch Targets**: Minimum 44x44px, recommend 48x48px
3. **Font Size**: Never go below 16px on inputs (prevents iOS zoom)
4. **Horizontal Scroll**: Use `overflow-x: hidden` and `max-width: 100%`
5. **Images**: Always set width/height attributes to prevent layout shift
6. **Testing**: Test on real devices, not just emulators
7. **Safe Areas**: Use `env()` for iOS notch support
8. **Performance**: Use `will-change` sparingly, only when needed

## 📝 Testing Checklist

- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12)
- [ ] 428px (iPhone 14 Plus)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1280px (Small laptop)
- [ ] 1440px (Desktop)
- [ ] 1920px (Full HD)
- [ ] Portrait orientation
- [ ] Landscape orientation
- [ ] Touch interactions
- [ ] Keyboard navigation

---

**Pro Tip**: Use the `responsive-test.html` file to automatically check these breakpoints!

