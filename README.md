# Lazy CSS: Client-Side Just-In-Time Utility CSS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Lazy CSS is a lightweight, dependency-free JavaScript library that provides an on-demand, utility-first CSS styling experience directly in the browser. Inspired by utility-first frameworks like Tailwind CSS, Lazy CSS dynamically generates CSS rules *only* for the utility classes you actually use in your HTML, eliminating the need for a build step and resulting in minimal CSS payloads.

It combines a set of **predefined base styles** (`lazy.css`, automatically linked) for common layouts and resets with a powerful **dynamic engine** (`lazy.js`) that parses your classes and generates specific styles for colors, spacing, sizing, responsiveness, pseudo-states, and arbitrary values on the fly.

Here's a boiler plate:-
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
     window.lazyCssConfig = {
        screens: {
            height: {
                min: { sm: '400px' },
                max: { md: '700px' }
            },
            width: {
                min: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
                max: { xl: '1400px' }
            }
        },
        theme: {
          aliases: {},
          extend: {
            colors: {},
            spacing: {},
            borderRadius: {},
            fontSize: {},
            height: {},
            width: {},
            transitions: {}
          }
        },
        plugins: []
      };
  </script>
    <script src="https://lkkhwhb.github.io/Lazy-CSS/lazy2.js" defer></script>
</head>
<body class="">
    
</body>
</html>
```
## Key Features

*   **Client-Side Dynamic Generation:** CSS rules are generated in the browser only for the utility classes detected in your HTML.
*   **Utility-First Syntax:** Compose complex styles using intuitive, single-purpose classes (e.g., `bg-blue-500`, `p-4`, `flex`, `align-c`).
*   **No Build Step Required:** Operates entirely client-side. Perfect for prototypes, demos, static sites, or environments without complex build tooling.
*   **Base CSS Included:** Automatically links `lazy.css` containing essential static utilities (`flex`, `grid`, `text-center`, `rounded`, layout helpers, etc.).
*   **Built-in Color Palette:** Includes a comprehensive color palette (based on Tailwind's) with shades from 50 to 950.
*   **Extensible Configuration:** Customize or extend theme values (colors, spacing, fonts, etc.) via a simple `window.lazyCssConfig` object.
*   **Pixel & Arbitrary Values:** Supports direct pixel values (`m-10` -> `margin: 10px;`) and arbitrary CSS values using bracket notation (`w-[50%]`, `m-[1.5rem]`, `bg-[url(...)]`) we also support `h-[100px]`,`h-100`,`hw-[100px]`(applies for both), `hw-[100px,100px`.
*   **Calculations:** Supports basic arithmetic (`p-4+2` -> `padding: 6px;`) and CSS `calc()` via bracket notation (`m-[100%,-,20px]`).
*   **Responsive Design:** Apply styles at specific breakpoints using prefixes (`sm-(...)`, `md-(...)`, `lg-(...)`, `xl-(...)`).
*   **Pseudo-classes:** Style elements on hover, focus, active states, etc. (`hover-(...)`, `focus-(...)`, `active-(...)`).
*   **Lightweight & Dependency-Free:** Plain JavaScript, works in modern browsers.

## Installation

1.  Download the `lazy.js` file.
2.  Include the script in your HTML file, preferably with the `defer` attribute in the `<head>` or at the end of the `<body>`.
3. You may use the CDN version for quick testing purpose.
   ```html
   <script src="https://lkkhwhb.github.io/Lazy-CSS/lazy.js"></script>
   ```
   New features are first added to lazy2.js so if you like to try new features please feel free to use
   ```html
   <script src="https://lkkhwhb.github.io/Lazy-CSS/lazy2.js"></script>
   ```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lazy CSS Example</title>
    <!-- 
      IMPORTANT: If using custom config, place it BEFORE the lazy-css.js script.
    -->
    <script>
      window.lazyCssConfig = {
        theme: {
          extend: {
            // Example: Add custom colors or aliases
            colors: {
              primary: 'blue-600', // Alias existing color
              brand: '#ff6600',    // Add a new custom color value
            },
            // Example: Add custom spacing values
            spacing: {
             'xl': '3rem',
             '2xl': '4rem',
            }
          }
        }
      };
    </script>

    <!-- 
      Include the Lazy CSS script. 
      It will automatically add a <link> tag in the <head> 
      for the base lazy.css stylesheet from its CDN location.
      No need to link lazy.css manually unless you host it yourself
      and modify the script's CDN link.
    -->
    <script src="path/to/your/lazy-css.js" defer></script> 
</head>
<body>
    <!-- Your HTML content using Lazy CSS classes -->
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <button class="p-4 bg-primary c-white rounded-lg hover-(bg-blue-700) active-(bg-blue-800)">
        Click Me (Uses 'primary' from config)
      </button>
    </div>

    <div class="m-xl bg-brand c-white p-4">
      Uses 'xl' spacing and 'brand' color from config.
    </div>
</body>
</html>
```

**Note:**
*   Ensure the `lazy.js` script has the `defer` attribute or is placed just before the closing `</body>` tag so the DOM is ready for the initial scan.
*   If using `window.lazyCssConfig`, the configuration script *must* appear **before** the `lazy-css.js` script tag.
*   The script automatically links `lazy.css` from `https://lkkhwhb.github.io/Lazy-CSS/lazy.css`. If you host `lazy.css` elsewhere, you'll need to modify the `lazyBaseLink.href` line in the JavaScript.

## Usage

Add utility classes directly to your HTML elements. Lazy CSS detects these classes and generates the necessary CSS rules dynamically, complementing the base styles from `lazy.css`.

**Example:**

```html
<!-- Background color, padding, text color, dynamic rounded corners -->
<div class="bg-green-100 p-6 c-green-800 round-12"> 
  This is a styled div (12px border radius).
</div>

<!-- Flexbox layout using base classes and dynamic gap -->
<div class="flex justify-between items-center p-4 border-b-[1px,solid,gray-300] gap-4">
  <span>Left Item</span>
  <span>Right Item</span>
</div>

<!-- Responsive padding using dynamic classes -->
<div class="p-4 md-(p-8,bg-blue-50)"> 
  Padding changes and background appears on medium screens and up.
</div>

<!-- Hover and active effects using dynamic classes -->
<button class="bg-purple-500 c-white p-2 rounded hover-(bg-purple-700) active-(bg-purple-900,scale-[0.98])">
  Hover & Click Me
</button>

<!-- Arbitrary width and margin -->
<div class="w-[80%] m-[auto]">Centered content</div>

<!-- Calculated height (500 - 50 = 450px) -->
<div class="h-500-50 bg-red-100">Height is 450px</div> 

<!-- Grid layout using base and dynamic classes -->
<div class="grid gridCols-3 gap-2 p-4">
  <div class="bg-gray-200 p-2">Col 1</div>
  <div class="bg-gray-200 p-2">Col 2</div>
  <div class="bg-gray-200 p-2">Col 3</div>
</div>
```

## Syntax Reference

Lazy CSS combines predefined static classes from `lazy.css` with dynamically generated classes parsed by `lazy-css.js`.

### 1. Base CSS Utilities (`lazy.css`)

The `lazy.js` script automatically links the `lazy.css` file, which provides common, static utility classes (these are *not* dynamically generated). Key categories include:

*   **Display:** `flex`, `inline-flex`, `grid`, `inline-grid`, `block`, `inline-block`, `inline`, `hidden`, `table`, `table-row`, `table-cell`, `contents`
*   **Position:** `static`, `fixed`, `absolute`, `relative`, `sticky`
*   **Flexbox:** `items-start`, `items-end`, `align-c` (center), `items-baseline`, `items-stretch`, `justify-start`, `justify-end`, `justify-c` (center), `justify-between`, `justify-around`, `justify-evenly`, `row`, `column`, `wrap`, `flex-1`, `grow`, `shrink`, etc.
*   **Grid:** `grid-flow-row`, `grid-flow-col`, etc. (Note: `grid-cols-N` and `gap-N` are often dynamically generated, but base gaps might exist).
*   **Sizing:** `w-auto`, `w-full`, `w-screen`, `h-auto`, `h-full`, `h-screen`, `h-dvh`, `min-w-0`, `max-w-full`, `min-h-screen`, `max-h-full`, etc.
*   **Typography:** `font-sans`, `font-serif`, `font-mono`, `font-roboto`, `semibold`, `bold`, `bolder`, `text-left`, `text-center`, `text-right`, `italic`, `underline`, `uppercase`, `lowercase`, `capitalize`, `truncate`, `whitespace-nowrap`, etc.
*   **Borders:** `rounded-none`, `rounded` (50%), `no-border`, `border-hidden`, `border-none`. (Specific border widths/styles/colors are usually dynamic).
*   **Background:** `bg-transparent`, `bg-current`.
*   **Overflow:** `hide-flow`, `overflow-auto`, `scroll-flow`, `overflow-x-auto`, `overflow-y-hidden`, `hide-scrollbar`, `scroll-smooth`.
*   **Layout Helpers:** `absolute-c` (absolute center), `grid-c` (grid place-items center), `c` (flex center), `body-base`, `body-c`.
*   **Other:** `bb` (box-sizing), `m-auto`, `pointer`, `no-pointer`, `aspect-square`, `aspect-video`, `object-cover`, `object-center`, etc.

*(Refer to the actual `lazy.css` file for the complete list and exact definitions.)*

### 2. Dynamically Generated Classes (`lazy.js`)

These classes are parsed by the JavaScript and turned into CSS rules.

**a. Colors:**

*   Format: `{property}-{colorName}-{shade?}`
*   Properties: `bg` (background-color), `c` (color), `border` (used for border-color, primarily within border shorthand)
*   `colorName`: Matches keys in the `colorPalette` (e.g., `red`, `blue`, `gray`) or custom colors/aliases from `window.lazyCssConfig`.
*   `shade`: Optional (defaults to `500`). Number from `50`, `100`, ..., `900`, `950`.
*   Examples: `bg-red-500`, `c-blue-700`, `bg-gray` (uses shade 500), `bg-primary` (uses config).

**b. Sizing, Spacing, Font Size, Radius (Numeric Values):**

*   Format: `{property}-{value}` or `{property}-{calculation}`
*   Properties: `m`, `mt`, `mb`, `ml`, `mr`, `p`, `pt`, `pb`, `pl`, `pr`, `w`, `h`, `gap`, `round`, `fs`, `l`, `r`, `t`, `b` (position offsets).
*   `value`: A number, interpreted as pixels (`px`).
*   `calculation`: Simple arithmetic using `+`, `-`, `*`, `/` (no spaces), result interpreted as pixels.
*   Examples: `p-4` -> `padding: 4px;`, `m-10` -> `margin: 10px;`, `w-100` -> `width: 100px;`, `fs-16` -> `font-size: 16px;`, `round-8` -> `border-radius: 8px;`, `ml-5+3` -> `margin-left: 8px;`, `p-10*2` -> `padding: 20px;`, `t-50` -> `top: 50px; position: absolute;` (Positioning props add `position: absolute` if not present).

**c. Theme Values (Requires Configuration):**

*   Format: `{property}-{key}`
*   Requires definition in `window.lazyCssConfig.theme.extend`.
*   Properties: `m`, `p`, `gap`, `round`, `fs`, `h`, `w`, etc. (Mapped via `themeCategories`).
*   `key`: A key defined under the corresponding category (e.g., `spacing`, `fontSize`) in the config.
*   Example (using config from Installation): `p-xl` -> `padding: 3rem;`, `m-xl` -> `margin: 3rem;`

**d. Arbitrary Values (Bracket Notation):**

*   Format: `{property}-[value]`
*   Allows any valid CSS value. Essential for units other than `px`, `calc()`, variables, URLs, etc.
*   Properties: Any mapped property (`bg`, `m`, `p`, `w`, `h`, `fs`, `z`, etc.).
*   `value`: The literal CSS value. Spaces are generally allowed. Avoid raw `;`, `{`, `}`. Use underscores `_` for spaces within `calc()` if needed (`calc(100%_-_20px)`).
*   Examples: `w-[50%]` -> `width: 50%;`, `h-[100dvh]` -> `height: 100dvh;`, `m-[1.5rem_auto]` -> `margin: 1.5rem auto;`, `fs-[clamp(1rem,_4vw,_2rem)]`, `bg-[url('/img.png')]`, `z-[999]`, `border-[rgba(0,0,0,0.1)]`

**e. Responsive Design:**

*   Format: `{breakpoint}-(class1,class2,...)`
*   `breakpoint`: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).
*   `class1,class2,...`: Comma-separated list of *dynamic* Lazy CSS classes (no spaces around commas).
*   Generates a `min-width` media query applying the inner styles.
*   Example: `md-(p-8,bg-blue-100)` applies `padding: 8px; background-color: #dbeafe;` at 768px and up.

**f. Pseudo-classes:**

*   Format: `{pseudo}-(class1,class2,...)`
*   `pseudo`: `hover`, `focus`, `active`, `visited`, `focus-within`, `focus-visible`.
*   `class1,class2,...`: Comma-separated list of *dynamic* Lazy CSS classes (no spaces around commas).
*   Generates a rule targeting the pseudo-class (e.g., `.my-class:hover { ... }`).
*   Example: `hover-(bg-red-700,c-white)` applies styles on hover.

**g. Borders (Shorthand):**

*   Format: `border-[width,style,color]` or `border-{t|r|b|l}-[...]`
*   Uses bracket notation with comma-separated values. Order: width, style, color.
*   `width`: Optional (defaults `1px`). E.g., `2px`, `0.1rem`.
*   `style`: Optional (defaults `solid`). E.g., `dashed`, `dotted`.
*   `color`: Optional (defaults `currentColor`). Can be CSS color (`#ff0000`, `rgba(...)`), `currentColor`, `transparent`, or a Lazy CSS color (`blue-500`, `primary` from config).
*   Examples: `border-[2px,dashed,red-500]`, `border-b-[1px,solid,gray-200]`, `border-[,,blue]` (1px solid resolved blue).

**h. Special Multi-Value Utilities:**

*   `hw-[heightVal,widthVal]`: Sets height and width. One value applies to both.
    *   `hw-[50px,100px]`, `hw-[10rem]`
*   `mp-[marginVal,paddingVal]`: Sets margin and padding. One value applies to both.
    *   `mp-[1rem,2rem]`, `mp-[10px]`

**i. Grid Template Columns:**

*   Format: `gridCols-{N}`
*   `N`: Integer number of columns.
*   Generates `grid-template-columns: repeat(N, minmax(0, 1fr));`
*   Example: `gridCols-3`

**j. Z-Index:**

*   Format: `z-{value}` or `z-[value]`
*   `value`: Integer, `auto`, or arbitrary value in brackets.
*   Examples: `z-10`, `z-[-1]`, `z-auto`, `z-[9999]`

## Configuration (`window.lazyCssConfig`)

Provide a global configuration object *before* the `lazy-css.js` script loads to extend the theme.

```javascript
<script>
  window.lazyCssConfig = {
    theme: {
      extend: { // Only 'extend' is currently supported
        // Define or override colors
        colors: {
          'primary': '#1a1a1a',      // Add new color 'primary'
          'secondary': 'orange-600', // Alias 'secondary' to orange-600
          'danger': 'red',           // Alias 'danger' to default red (red-500)
          // 'blue-500': '#3B82F6',  // Can technically override defaults too
        },
        // Define theme spacing values (used by m-key, p-key, gap-key)
        spacing: {
          '1': '0.25rem', '2': '0.5rem', '4': '1rem', 'px': '1px', 'auto': 'auto',
          'gutter': '1.5rem', // Custom key
        },
        // Define border radius values (used by round-key)
        borderRadius: {
          'sm': '0.125rem', 'md': '0.375rem', 'lg': '0.5rem', 'full': '9999px',
        },
        // Define font size values (used by fs-key)
        fontSize: {
          'xs': '0.75rem', 'sm': '0.875rem', 'base': '1rem', 'lg': '1.125rem',
        },
        // Define height values (used by h-key)
        height: { 'screen': '100vh', 'auto': 'auto', 'px': '1px', 'full': '100%' },
        // Define width values (used by w-key)
        width: { 'screen': '100vw', 'auto': 'auto', 'px': '1px', 'full': '100%' }
      }
    }
    // ... other config options might be added in the future
  };
</script>
<script src="path/to/lazy-css.js" defer></script>
```

When using theme keys (e.g., `p-gutter`, `fs-lg`, `round-md`), Lazy CSS looks up the value in your configuration under the appropriate category (`spacing`, `fontSize`, `borderRadius`). You can also use configured color names like `bg-primary`.

## How It Works

1.  **Initialization (`DOMContentLoaded`):** Waits for HTML parsing, loads config, links `lazy.css`, creates a `<style id="lazy-css-generated">` tag.
2.  **Initial Scan:** Finds all elements, collects unique classes, generates initial CSS rules for dynamic classes found, and injects them into the `<style>` tag.
3.  **Mutation Observer:** Watches the document for added/removed elements or changes to the `class` attribute.
4.  **Handling Changes:** When mutations occur, gathers new/affected class names, debounces processing with `requestAnimationFrame`, parses new classes, generates corresponding CSS rules (handling responsive/pseudo-classes), and efficiently inserts new rules into the stylesheet using `sheet.insertRule()`, utilizing caches to avoid redundant work.

## Performance Considerations

*   **Client-Side Load:** Adds JavaScript execution overhead compared to static CSS.
*   **Initial Scan:** Time depends on initial DOM complexity.
*   **MutationObserver:** Efficient but can be triggered frequently by large/rapid DOM changes.
*   **Caching:** Significantly speeds up processing for repeated classes.
*   **FOUC (Flash of Unstyled Content):** Possible briefly as styles are generated client-side. Minimize by using `defer`, correct script placement, and relying on `lazy.css` or separate static CSS for critical initial layout.
*   **Best For:** Prototyping, demos, admin panels, JAMstack sites without build steps, or where build tooling is undesirable. May require careful consideration for high-traffic, complex public sites.

## Comparison to Build-Time Tools (e.g., Tailwind CSS)

*   **Lazy CSS (Pros):** No build step, easy setup, truly minimal CSS based *only* on runtime usage.
*   **Lazy CSS (Cons):** Client-side JS overhead, potential FOUC, runtime performance depends on DOM complexity/changes.
*   **Tailwind CSS (Pros):** Build-time optimization (purging), mature ecosystem, no runtime JS for core styles.
*   **Tailwind CSS (Cons):** Requires build process (Node.js, PostCSS), configuration, potentially larger initial CSS before purging.

Choose Lazy CSS when the simplicity of a no-build, client-side solution is paramount for your project.
(lease note that this is the **CDN** version of LAZY CSS and not the actual software)
## Contributing

Contributions are welcome! Please feel free to fork the repository, create a branch, make changes, and submit a pull request. Ensure your code is clear and follows the existing style.

## License

Lazy CSS is open-source software licensed under the [MIT License](LICENSE).
