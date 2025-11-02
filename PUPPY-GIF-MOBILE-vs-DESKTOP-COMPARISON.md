# Puppy GIF Circle Comparison: Mobile vs Desktop

## SIMILARITIES (Same on both)

### Circle Container (`.hero-puppy`)
- **Size**: `132px × 132px` - Same circle size on both platforms
- **Shape**: `border-radius: 50% !important` - Perfect circle on both
- **Overflow**: `overflow: hidden !important` - Circle clips content on both
- **Box Shadow**: `0 8px 20px rgba(0, 0, 0, 0.15)` - Same shadow effect

### GIF/Iframe Styling (`.hero-puppy iframe, .hero-puppy .giphy-embed`)
- **Width/Height**: `100% × 100%` - Fills entire circle on both
- **Position**: `position: relative !important`
- **Vertical Offset**: `top: 10px !important; margin-top: -20px !important` - Same offset adjustment
- **Display**: `display: block` - Same display property
- **Object Fit**: `object-fit: cover` - Same fitting behavior

### Animation Speed
- **Animation Duration**: `8s` - Same glide speed on both platforms
- **Animation Type**: `puppy-glide-x` - Same horizontal glide animation
- **Easing**: `ease-in-out infinite alternate` - Same animation style

### Speech Bubble
- Uses same bubble styling (adjusted sizing for mobile but same structure)

---

## DIFFERENCES

### 1. Container Position (`.hero-puppy-container`)

**Desktop:**
- `top: var(--space-4)` = 16px from top
- `left: var(--space-6)` = 24px from left
- `margin-top: 0` - No negative margin
- `z-index: 1` - Lower z-index (behind text)

**Mobile:**
- `top: 112px !important` - Much lower position (112px from top)
- `margin-top: -66px !important` - Negative margin to compensate for top nav
- `left: var(--space-4)` = 16px from left (slightly less left padding)
- `z-index: 1` - Same z-index (behind text)

### 2. Hero Section Padding

**Desktop:**
- `padding-top: 4rem` = 64px top padding

**Mobile:**
- `padding: 168px 0 var(--space-6) 0 !important` - Much larger top padding (168px) to accommodate top nav bar (66px) + spacing

### 3. Hero Overflow Behavior

**Desktop:**
- `overflow-x: hidden`
- `overflow-y: visible` - Allows vertical overflow for circle

**Mobile:**
- `overflow: visible !important`
- `overflow-x: hidden !important`
- `overflow-y: visible !important` - More explicit overflow settings

### 4. Content Positioning

**Desktop:**
- `.hero-content` has `margin-top: 0`
- No special positioning needed

**Mobile:**
- `.hero-content` has `margin-top: -85px !important` - Pulls content up
- `z-index: 10 !important` - Higher z-index to keep text in front

### 5. Container Max-Width

**Desktop:**
- `max-width: calc(100vw - 2 * var(--space-6) - 132px)` - Accounts for 24px left/right padding + circle width

**Mobile:**
- No explicit max-width override - Uses same calculation but with smaller spacing

### 6. Left Position Adjustments

**Desktop:**
- Container `left: var(--space-6)` = 24px

**Mobile:**
- `.hero-puppy` has `left: var(--space-4)` = 16px (but this might be overridden by animation)

---

## KEY INSIGHT

The **GIF itself** (iframe/embed) is styled **IDENTICALLY** on both platforms:
- Same size (fills 132px circle)
- Same vertical offset (`top: 10px`, `margin-top: -20px`)
- Same clipping (circle shape)
- Same animation speed and style

The **DIFFERENCES** are all about:
1. **Where the circle is positioned** on the page (different `top` values)
2. **How the page layout accommodates it** (different padding/margins)
3. **Mobile top nav bar compensation** (66px top nav requires adjustment)

The actual GIF rendering inside the circle is **100% identical** - both show the same GIF in the same size circle with the same positioning adjustments.

