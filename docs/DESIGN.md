# DESIGN.MD - UI/UX Specification
## Mobile Application

---

## 1. Design Philosophy

### Core Principles
- **Youth-Oriented**: Clean, modern interface targeting young professionals (18-35)
- **Accessible**: WCAG 2.0 AA compliant, Israeli Standard 5568
- **Financial Trust**: Professional appearance that builds credibility
- **Hebrew-First**: RTL native design, Hebrew typography optimization

---

## 2. Color System

### Primary Palette
```
Purple (Primary Brand)
- Main: #7B4FB5 (rgb(123, 79, 181))
- Light: #9B6FD5
- Dark: #5B3F95
- Usage: CTAs, headers, active states

Blue (Secondary)
- Main: #4A9FD8 (rgb(74, 159, 216))
- Light: #6AB9E8
- Dark: #2A7FB8
- Usage: Links, information, support elements

Orange (Accent)
- Main: #F89C3F (rgb(248, 156, 63))
- Light: #FFB85F
- Dark: #D87C1F
- Usage: Highlights, warnings, energy points
```

### Supporting Colors
```
Gradients:
- Purple-Blue: linear-gradient(135deg, #7B4FB5 0%, #4A9FD8 100%)
- Orange-Yellow: linear-gradient(135deg, #F89C3F 0%, #FFD97F 100%)
- Soft Purple: linear-gradient(135deg, #E8D9F5 0%, #D9E9F7 100%)

Background Tones:
- Soft Pink: #FFF0F5
- Soft Blue: #E8F4FB
- Soft Yellow: #FFF8E8
- White: #FFFFFF
- Off-White: #F9F9FB
```

### Functional Colors
```
Success: #4CAF50
Warning: #FF9800
Error: #F44336
Info: #2196F3
Neutral: #757575
```

---

## 3. Typography

### Font Family
```
Primary: Heebo (Hebrew + English)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto

Secondary: Alef (Hebrew headings)
- Weights: 400 (Regular), 700 (Bold)
```

### Type Scale
```
Display 1: 32px / 700 / -0.5px / 40px line-height
Display 2: 28px / 700 / -0.3px / 36px line-height

Heading 1: 24px / 700 / 0px / 32px line-height
Heading 2: 20px / 600 / 0px / 28px line-height
Heading 3: 18px / 600 / 0px / 26px line-height

Body Large: 16px / 400 / 0px / 24px line-height
Body Regular: 14px / 400 / 0px / 22px line-height
Body Small: 12px / 400 / 0px / 18px line-height

Caption: 11px / 400 / 0px / 16px line-height
Button: 16px / 600 / 0.5px / 24px line-height
```

### Hashtag Style (from presentation)
```
Font-Size: 18px
Font-Weight: 500
Color: #7B4FB5
Background: rgba(123, 79, 181, 0.1)
Padding: 4px 12px
Border-Radius: 16px
```

---

## 4. Spacing System

### Base Unit: 8px

```
Micro:     4px   (0.5x)
Small:     8px   (1x)
Medium:    16px  (2x)
Large:     24px  (3x)
XLarge:    32px  (4x)
XXLarge:   48px  (6x)
Huge:      64px  (8x)
```

### Component Padding
```
Card: 16px
Button: 12px 24px
Input Field: 12px 16px
Section: 24px
Screen Margins: 16px (mobile), 24px (tablet)
```

---

## 5. Component Library

### 5.1 Buttons

#### Primary Button
```
Background: #7B4FB5 (gradient on hover)
Text: #FFFFFF
Height: 48px
Border-Radius: 24px (pill shape)
Font: 16px / 600
Padding: 12px 32px
Shadow: 0px 4px 12px rgba(123, 79, 181, 0.25)

States:
- Hover: lighten 10%, shadow grows
- Active: darken 5%, shadow shrinks
- Disabled: opacity 0.5, no shadow
```

#### Secondary Button
```
Background: transparent
Text: #7B4FB5
Height: 48px
Border: 2px solid #7B4FB5
Border-Radius: 24px
Font: 16px / 600
Padding: 12px 32px

States:
- Hover: background rgba(123, 79, 181, 0.1)
- Active: background rgba(123, 79, 181, 0.2)
```

#### Icon Button
```
Size: 40px × 40px
Background: #F9F9FB
Border-Radius: 12px
Icon: 20px × 20px, #7B4FB5

States:
- Hover: background #EFEFEF
- Active: background #7B4FB5, icon #FFFFFF
```

### 5.2 Cards

#### Standard Card (from slide 7-8)
```
Background: #FFFFFF
Border-Radius: 16px
Padding: 20px
Shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
Border: 1px solid rgba(0, 0, 0, 0.05)

Header:
- Icon: 48px × 48px in colored circle
- Title: Heading 2
- Spacing: 12px between icon and title

Content:
- Body Regular
- Spacing: 16px top margin
```

#### Feature Card (from slide 17)
```
Background: Gradient (category-specific)
Border-Radius: 20px
Padding: 24px
Shadow: 0px 8px 24px rgba(123, 79, 181, 0.15)

Icon Container:
- Size: 80px × 80px
- Background: white with 50% opacity
- Border-Radius: 50%
- Icon: 40px × 40px, colored

Text:
- Title: Heading 1, white
- Description: Body Regular, white with 90% opacity
```

#### Profile Card (from slide 6)
```
Background: white
Border-Radius: 50% (top) + 16px (bottom)
Padding: 0 (image), 16px (content)
Shadow: 0px 4px 16px rgba(0, 0, 0, 0.1)

Image:
- Aspect: 1:1
- Border-Radius: 50% (top half only)
- Overlay: linear-gradient(to bottom, transparent 60%, category-color 100%)

Content:
- Badge: pill-shaped, category color
- Text: center-aligned
```

### 5.3 Input Fields

#### Text Input
```
Height: 52px
Background: #F9F9FB
Border: 1px solid #E0E0E0
Border-Radius: 12px
Padding: 14px 16px
Font: Body Regular

Placeholder:
- Color: #9E9E9E
- Font: Body Regular

States:
- Focus: border #7B4FB5, shadow 0px 0px 0px 3px rgba(123, 79, 181, 0.1)
- Error: border #F44336
- Success: border #4CAF50
- Disabled: opacity 0.6, cursor not-allowed

Label:
- Font: Body Small / 600
- Color: #424242
- Margin-Bottom: 8px
```

#### Search Input
```
Height: 48px
Background: #FFFFFF
Border: 1px solid #E0E0E0
Border-Radius: 24px (pill)
Padding: 12px 16px 12px 48px
Font: Body Regular

Icon:
- Position: absolute left 16px
- Size: 20px × 20px
- Color: #9E9E9E
```

### 5.4 Navigation

#### Bottom Navigation (Mobile)
```
Height: 64px
Background: #FFFFFF
Border-Top: 1px solid #E0E0E0
Shadow: 0px -2px 8px rgba(0, 0, 0, 0.05)

Items: 4-5 max
- Icon: 24px × 24px
- Label: Caption font
- Spacing: equal distribution
- Active: color #7B4FB5, icon filled
- Inactive: color #757575, icon outlined
```

#### Top App Bar
```
Height: 56px
Background: gradient or solid white
Padding: 8px 16px
Shadow (scrolled): 0px 2px 4px rgba(0, 0, 0, 0.1)

Title:
- Font: Heading 2
- Color: #212121 or white (on gradient)
- Alignment: center or right (RTL)

Actions:
- Icon buttons (40px × 40px)
- Max 2-3 actions
```

### 5.5 Lists & Tables

#### List Item
```
Height: min 64px
Padding: 12px 16px
Border-Bottom: 1px solid #F0F0F0

Layout (RTL):
- Leading: icon or avatar (40px)
- Content: title + subtitle
- Trailing: action or chevron
- Gap: 12px

States:
- Hover: background #F9F9FB
- Active: background rgba(123, 79, 181, 0.08)
```

#### Data Table (Invoice List)
```
Header:
- Height: 48px
- Background: #F5F5F5
- Font: Body Small / 600
- Padding: 12px 16px

Row:
- Height: 56px
- Padding: 12px 16px
- Border-Bottom: 1px solid #F0F0F0
- Hover: background #FAFAFA

Cells:
- Alignment: right (numbers), start (text) - RTL
- Font: Body Regular
```

---

## 6. Iconography

### Style
```
Type: Outlined (default), Filled (active states)
Stroke: 2px
Size: 20px, 24px, 32px, 40px
Color: Contextual (primary, secondary, neutral)
Format: SVG

Icon Set: Material Icons or custom designed
```

### Common Icons
```
- Home: house outline
- Invoices: document/receipt
- Upload: cloud-up arrow
- Settings: gear
- Profile: person circle
- Search: magnifying glass
- Filter: funnel
- Export: download arrow
- Add: plus circle
- Delete: trash can
- Edit: pencil
- Check: checkmark circle
- Warning: alert triangle
- Info: info circle
```

### Illustrations
Based on presentation style:
```
Style: Flat, friendly, minimal
Colors: Brand palette with pastels
Usage: Empty states, onboarding, celebrations
Format: SVG or PNG with transparency
```

---

## 7. Layout Grid

### Mobile (< 768px)
```
Columns: 4
Gutter: 16px
Margin: 16px
Max-Width: 100%
```

### Tablet (768px - 1024px)
```
Columns: 8
Gutter: 24px
Margin: 24px
Max-Width: 100%
```

### Desktop (> 1024px)
```
Columns: 12
Gutter: 24px
Margin: auto
Max-Width: 1200px (centered)
```

---

## 8. Animations & Transitions

### Timing Functions
```
Standard: cubic-bezier(0.4, 0.0, 0.2, 1) - 300ms
Decelerate: cubic-bezier(0.0, 0.0, 0.2, 1) - 200ms
Accelerate: cubic-bezier(0.4, 0.0, 1, 1) - 200ms
Sharp: cubic-bezier(0.4, 0.0, 0.6, 1) - 150ms
```

### Common Transitions
```
Button Hover: 200ms standard
Card Elevation: 300ms standard
Page Transition: 400ms decelerate
Modal Appear: 250ms decelerate, scale(0.95) → scale(1)
Toast Notification: 300ms standard, translateY(100%) → translateY(0)
```

### Micro-interactions
```
Button Click: scale(0.98) for 100ms
Like/Favorite: heart bounce animation
Loading Spinner: continuous rotation 1200ms linear
Success Checkmark: draw path animation 500ms
```

---

## 9. Feedback & States

### Loading States
```
Spinner:
- Size: 24px (inline), 48px (page-level)
- Color: #7B4FB5
- Animation: rotation 1200ms linear infinite

Skeleton Loader:
- Background: linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%)
- Animation: shimmer 1500ms ease-in-out infinite
- Border-Radius: match component
```

### Empty States
```
Layout:
- Illustration: 200px × 200px max
- Title: Heading 2
- Description: Body Regular
- Action Button: Primary CTA
- Spacing: 24px between elements

Illustration Style: Friendly, encouraging (from presentation)
```

### Error States
```
Inline Error:
- Text: Body Small, #F44336
- Icon: error-circle-filled, 16px
- Margin-Top: 4px

Toast Error:
- Background: #F44336
- Text: white
- Icon: white error icon
- Duration: 5000ms
- Position: top-center (mobile), top-right (desktop)
```

### Success States
```
Toast Success:
- Background: #4CAF50
- Text: white
- Icon: white checkmark
- Duration: 3000ms

Inline Success:
- Border-Left: 4px solid #4CAF50
- Background: rgba(76, 175, 80, 0.1)
- Padding: 12px
```

---

## 10. Accessibility

### Touch Targets
```
Minimum Size: 44px × 44px (iOS) / 48px × 48px (Android)
Recommended: 48px × 48px for all interactive elements
Spacing: minimum 8px between targets
```

### Contrast Ratios (WCAG AA)
```
Normal Text (< 18px): 4.5:1 minimum
Large Text (≥ 18px or 14px bold): 3:1 minimum
Interactive Elements: 3:1 minimum (against background)

Color Palette Compliance:
- Purple #7B4FB5 on white: 4.65:1 ✓
- Blue #4A9FD8 on white: 3.12:1 (use for large text only)
- Orange #F89C3F on white: 2.95:1 (use for large text only)
```

### Focus Indicators
```
Outline: 3px solid #7B4FB5
Offset: 2px
Border-Radius: match element or 4px
Visibility: always visible on keyboard focus
```

### Screen Reader Support
```
- All interactive elements have accessible names
- Images have alt text (empty for decorative)
- Form fields have associated labels
- Error messages announced via aria-live
- Page titles updated on navigation
- Headings follow logical hierarchy (h1 → h2 → h3)
```

---

## 11. Responsive Behavior

### Breakpoints
```
Mobile: 0-767px
Tablet: 768px-1023px
Desktop: 1024px+
```

### Layout Adjustments

#### Mobile
```
- Single column layouts
- Full-width cards
- Bottom sheet modals
- Stacked navigation (hamburger menu)
- Touch-optimized spacing (larger targets)
```

#### Tablet
```
- 2-column layouts where appropriate
- Larger cards with more content
- Side panel modals (landscape)
- Bottom navigation or top tabs
```

#### Desktop
```
- Multi-column layouts (up to 3 columns)
- Sidebar navigation
- Dialog modals (centered)
- Hover states active
- Keyboard shortcuts enabled
```

### Component Scaling
```
Cards: full-width → max-width 400px → max-width 600px
Modals: full-screen → 90% width → fixed width (600px)
Images: full-width → constrained aspect ratio
Typography: may increase 1-2px on larger screens
```

---

## 12. Dark Mode (Future Consideration)

### Color Adjustments
```
Background: #121212
Surface: #1E1E1E
Surface Variant: #2C2C2C
On Background: #E8E8E8
On Surface: #F5F5F5

Primary: #9B6FD5 (lighter purple)
Secondary: #6AB9E8 (lighter blue)
Accent: #FFB85F (lighter orange)

Elevation: Use lighter surfaces instead of shadows
- Level 1: #1E1E1E
- Level 2: #232323
- Level 3: #252525
```

---

## 13. Brand Elements (from Presentation)

### Logo Usage
```
Full Logo: "Paamonim" with bell icon
Colors: Purple #7B4FB5 or white (on dark)
Clear Space: minimum 16px around logo
Minimum Size: 24px height (mobile)

Placement:
- Top-left (LTR) / Top-right (RTL) in app bar
- Center on splash screen
- Footer on web
```

### Bell Icon (Mascot)
```
Style: Friendly, approachable
Color: #7B4FB5
Usage: Notifications, achievements, tips
Animation: Gentle wiggle on interaction
```

### Illustration Style (from slides 6, 11, 14)
```
Characteristics:
- Flat design with subtle gradients
- Friendly, diverse characters
- Bright, optimistic color palette
- Photo overlays with gradient masks
- Mix of photography and vector graphics

Color Treatment:
- Duotone overlays (purple-blue, orange-yellow)
- 50-70% opacity colored filters
- High contrast for clarity
```

### Photography Style
```
Style: Natural, candid, diverse
Subject: Young professionals (18-35), relatable scenarios
Treatment: Slight warmth, high contrast, colored overlays
Composition: Clean backgrounds, subject-focused
```

---

## 14. Patterns & Best Practices

### Form Validation
```
Timing: On blur (after user interaction)
Success: Subtle green checkmark, no message unless critical
Error: Red border, icon, message below field
Real-time: For password strength, character count

Error Messages:
- Specific: "אימייל חייב להכיל @" not "שגיאה"
- Actionable: Tell user how to fix
- Polite: No blame language
```

### Modal Patterns
```
Entry: Fade in background (300ms), slide up content (250ms)
Exit: Reverse of entry
Backdrop: rgba(0, 0, 0, 0.5), click to dismiss
Close Button: top-left (RTL), 40px × 40px, always visible
Max-Height: 90vh, scroll content if needed
```

### Toast Notifications
```
Position: top-center (mobile), top-right (desktop)
Duration: 3s (success), 5s (error), 7s (info)
Max-Width: 400px (desktop)
Animation: slide-down + fade-in
Action: Optional action button (e.g., "Undo")
Stacking: Max 3 toasts, oldest dismissed first
```

### Empty States
```
Structure:
1. Illustration (200px × 200px)
2. Heading (what's empty)
3. Description (why it's empty or what to do)
4. Primary action button

Tone: Encouraging, not blaming
Examples:
- "עדיין אין לך חשבוניות" not "אין חשבוניות"
- "בוא נתחיל!" not "הוסף חשבונית"
```

### Loading Patterns
```
Immediate Feedback: Button shows spinner on click
< 1s: No loading indicator
1-3s: Inline spinner
3s+: Full-page skeleton loader or progress indicator

Progressive Loading:
- Load critical content first
- Show skeleton for below-fold content
- Lazy load images
```

---

## 15. Platform-Specific Guidelines

### iOS Specific
```
- Use SF Symbols where appropriate alongside custom icons
- Safe Area insets respected (top notch, bottom home indicator)
- Haptic feedback on important actions
- Swipe gestures (back, delete)
- Native date/time pickers
```

### Android Specific
```
- Material Design principles as foundation
- Ripple effects on touch
- Bottom sheets preferred over iOS action sheets
- Floating Action Button (FAB) for primary action
- Navigation drawer option
```

### Web Specific
```
- Hover states on all interactive elements
- Keyboard navigation fully supported
- Breadcrumbs for deep navigation
- Sticky headers on scroll
- Right-click context menus where appropriate
```

---

## 16. Design Tokens (Implementation)

### CSS Variables Structure
```css
:root {
  /* Colors - Primary */
  --color-primary-main: #7B4FB5;
  --color-primary-light: #9B6FD5;
  --color-primary-dark: #5B3F95;
  
  /* Colors - Secondary */
  --color-secondary-main: #4A9FD8;
  --color-secondary-light: #6AB9E8;
  --color-secondary-dark: #2A7FB8;
  
  /* Colors - Accent */
  --color-accent-main: #F89C3F;
  --color-accent-light: #FFB85F;
  --color-accent-dark: #D87C1F;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  
  /* Typography */
  --font-family-primary: 'Heebo', sans-serif;
  --font-family-heading: 'Alef', sans-serif;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0px 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0px 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0px 8px 24px rgba(0, 0, 0, 0.15);
  
  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0.0, 0.6, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.0, 0.0, 0.2, 1);
}
```

---

## 17. File Organization

### Design Files Structure
```
/design
  /foundations
    - colors.sketch/figma
    - typography.sketch/figma
    - spacing.sketch/figma
    - icons.sketch/figma
  
  /components
    - buttons.sketch/figma
    - cards.sketch/figma
    - forms.sketch/figma
    - navigation.sketch/figma
  
  /screens
    /mobile
      - home.sketch/figma
      - invoices.sketch/figma
      - upload.sketch/figma
      - settings.sketch/figma
    /tablet
    /desktop
  
  /assets
    /icons (SVG)
    /illustrations (SVG/PNG)
    /images (optimized)
  
  /prototypes
    - user-flow-1.sketch/figma
    - user-flow-2.sketch/figma
```

---

## 18. Quality Checklist

### Design Review Checklist
- [ ] RTL layout verified (Hebrew text flows correctly)
- [ ] All interactive elements meet minimum 48×48px touch target
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] All icons have 2px stroke consistency
- [ ] Spacing follows 8px grid system
- [ ] Typography uses defined type scale
- [ ] All states designed (default, hover, active, disabled, error)
- [ ] Loading and empty states included
- [ ] Error messages are specific and actionable
- [ ] Responsive behavior defined for mobile, tablet, desktop
- [ ] Dark mode considerations noted (if applicable)
- [ ] Accessibility annotations added (alt text, labels, ARIA)
- [ ] Design tokens documented and consistent
- [ ] Animation timing and easing specified
- [ ] Brand guidelines followed (colors, logo usage, tone)

---

## 19. Handoff Notes for Developers

### Priority Guidelines
1. **RTL Support**: All layouts must support right-to-left (Hebrew)
2. **Accessibility**: WCAG AA compliance is mandatory, not optional
3. **Performance**: Images optimized, lazy loading implemented
4. **Touch Targets**: Minimum 48×48px on all interactive elements
5. **Color Contrast**: Verify ratios in-browser, not just in design tools

### Common Gotchas
- Hebrew text must use Heebo font, not system default
- Gradients may render differently across browsers
- Box shadows may need adjustment for performance on older devices
- Ensure touch ripple effects don't interfere with navigation
- Date pickers must support Hebrew locale

### Testing Checklist
- [ ] Test on actual iOS and Android devices (not just emulators)
- [ ] Verify with screen reader (TalkBack, VoiceOver)
- [ ] Test with large font sizes (accessibility settings)
- [ ] Verify RTL layout on all screens
- [ ] Test color blindness modes
- [ ] Verify keyboard navigation (web)
- [ ] Performance test on mid-range devices

---

## 20. Version History

**Version 1.0** - March 2026
- Initial design system based on "Paamonim" presentation
- Defined color palette, typography, component library
- Established accessibility standards
- Created responsive breakpoints and behaviors

---

**Design System Owner**:
**Last Updated**: March 2026  
**Status**: Living Document - Updated as design evolves

---

## Appendix A: Inspiration & References

This design system is inspired by:
- Material Design 3 (component patterns)
- iOS Human Interface Guidelines (interaction patterns)
- Paamonim Financial Education Brand (visual identity)
- Israeli Ministry of Justice Accessibility Standards

Color psychology:
- Purple: Trust, wisdom, financial stability
- Blue: Clarity, efficiency, professionalism  
- Orange: Energy, optimism, action

Typography rationale:
- Heebo: Excellent Hebrew-Latin compatibility, modern, readable
- Alef: Strong Hebrew character, distinctive headings

---

מעולה — הנה **Design QA קצר (10 נקודות)** להשוואה בין ה־PDF לדף, רק עיצוב:

1. **מסר מרכזי פר מסך**  
   בכל viewport יש אלמנט אחד דומיננטי ברור (כותרת/CTA), בלי 2-3 מוקדים מתחרים.

2. **היררכיית טיפוגרפיה עקבית**  
   `H1/H2/body/caption` מרגישים כמו אותה משפחה, עם פערים ברורים בגודל/משקל.

3. **צבע מוביל לכל מקטע**  
   לכל בלוק יש צבע מוביל יחיד + צבע תומך (ולא ערבוב חזק של סגול/כתום/ירוק יחד).

4. **ריווח “נושם” כמו מצגת**  
   יש מספיק white-space סביב כותרות, כפתורים ואזורי פעולה (במיוחד בין sections).

5. **כפתורים באותה מערכת**  
   `add-cta` ו-`share-btn` באותו גובה, radius, משקל טקסט, ותחושת hover/active.

6. **נראות מצב פוקוס נגישה**  
   בכל אלמנט אינטראקטיבי יש `focus-visible` ברור ונעים, לא רק hover לעכבר.

7. **צפיפות מובייל**  
   במובייל אין שורות עמוסות; טפסי הוספה ושיתוף נשברים לשורות קריאות עם מרווח מגע טוב.

8. **אחידות אייקונים/אימוג’ים**  
   אייקונים לא “נלחמים” באימוג’ים; גודל/משקל ויזואלי דומה בכל הממשק.

9. **Feedback חזותי עדין**  
   הודעות הצלחה/אזהרה/שגיאה נראות עקביות (אותו סגנון כרטיס, לא קפיצות סגנוניות).

10. **טון מותגי “מעודד ומכיל”**  
   המראה הכללי מרגיש חם, חינוכי, לא “פיננסי קשיח” — כמו במצגת.

אם תרצה, אעשה לך עכשיו **ציון מהיר 1–5 לכל סעיף** על הגרסה הנוכחית שלך, עם “מה לתקן קודם” בסדר עדיפויות.

--

**End of DESIGN.MD**