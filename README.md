# Lazy CSS: Just-In-Time Utility CSS Framework

## Introduction

Lazy CSS is a lightweight, on-demand utility-first CSS framework. Unlike traditional CSS frameworks that load a large stylesheet upfront, Lazy CSS dynamically generates CSS rules only as you use them in your HTML or JSX. This approach results in smaller CSS payloads, improved performance, and a more streamlined development experience.

Inspired by the utility-first approach of Tailwind CSS, Lazy CSS aims to provide a similar level of flexibility and speed but with a "lazy" execution model, making it incredibly efficient for projects of any size. It's perfect for developers who want fine-grained control over styling without writing verbose CSS or dealing with large, pre-compiled stylesheets.

**Key Features:**

*   **On-Demand CSS Generation:**  CSS rules are generated and applied only when the corresponding utility classes are used in your HTML or JSX, ensuring minimal CSS overhead.
*   **Utility-First Approach:**  Compose styles by combining small, single-purpose utility classes directly in your HTML.
*   **Highly Customizable:** Configure color palettes, spacing scales, and more to tailor Lazy CSS to your project's design system.
*   **Color Palette Support:** Includes a comprehensive set of predefined color palettes (orange, gray, red, yellow, green, blue, purple, pink, lime, teal, cyan, sky, indigo, violet, fuchsia, rose, neutral, stone, zinc, slate) with shades from 50 to 950.
*   **Shorthand Syntax:**  Use intuitive shorthand notations for common CSS properties like margin, padding, height, width, and more.
*   **Pseudo-Class Support:** Easily apply styles for `:hover` and `:active` states directly in your class names.
*   **Configuration Flexibility:** Customize settings via a `<script type="lazy-config">` tag in HTML or through props in the React component.
*   **Vanilla JavaScript and React Support:** Works seamlessly with plain HTML/JavaScript projects and provides a dedicated React provider component for JSX environments.
*   **Predefined Base Styles:** Includes a `lazy.css` file with essential resets, box-sizing, and common layout utilities to get you started quickly.
*   **No Build Process:**  Start using Lazy CSS immediately without any complex build steps or configuration files. Just include the JS and CSS files in your project.


## Installation

### 1. HTML (Vanilla JavaScript)

For simple HTML projects, you can include Lazy CSS directly from CDN or download the files and include them locally.

**CDN:**

Copy and Paste this code inside the `<head>` of your HTML document.
```html
 <script src="https://bhargavxyz738.github.io/Lazy-CSS/lazy.js"></script>
```


**Local Download:**

1.  Download `lazy.css` and `lazy.js` from the GitHub repository.
2.  Place them in your project directory.
3.  Include them in your HTML file:

```html
<head>
    <link rel="stylesheet" href="./lazy.css"> <!-- Path to your downloaded lazy.css -->
    <script src="./lazy.js"></script>      <!-- Path to your downloaded lazy.js -->
</head>
```

### 2. React

For React projects, install the `lazy.jsx` component and wrap your application with the `LazyCSSProvider`.

1.  Download `lazy.jsx` and place it in your `src` directory (or wherever you keep your components).
2.  Import and use the `LazyCSSProvider` in your main application file (e.g., `index.js` or `App.js`):

```jsx
import React from 'react';
import LazyCSSProvider from './LazyCSSProvider';
const App = () => {
  const config = {
    primaryColor: '#FF8500',
    secondaryColor: '#3b82f6',
    mainPadding: '1.5rem',
    headerSize: '2rem'
  };

  return (
    <LazyCSSProvider configData={config}>
       {/* Your React components here */}
    </LazyCSSProvider>
  );
};

export default App;
```

You can also use the CDN link for the base styles if you prefer:

```jsx
// Inside your component or index.js
import React from 'react';
import LazyCSSProvider from './lazy.jsx';
import './lazy.css'; // Or use CDN link in index.html

function App() {
  return (
    <LazyCSSProvider>
      {/* Your React components here */}
    </LazyCSSProvider>
  );
}

export default App;
```

## Usage

Lazy CSS utilizes utility classes that you apply directly to your HTML elements. Here are some examples and explanations:

### Basic Utility Classes

Lazy CSS provides a wide range of utility classes for common CSS properties. Here are a few examples from `lazy.css`:

*   **Display:**
    *   `.flex`: `display: flex;`
    *   `.grid`: `display: grid;`
    *   `.block`: `display: block;`
    *   `.hide`: `display: none !important;` (Use with caution due to `!important`)
    *   `.hidden`: `display: none;`
*   **Position:**
    *   `.static`: `position: static;`
    *   `.relative`: `position: relative;`
    *   `.absolute`: `position: absolute;`
    *   `.fixed`: `position: fixed;`
    *   `.sticky`: `position: sticky;`
*   **Flexbox:**
    *   `.items-start`, `.items-end`, `.align-c`, `.items-baseline`, `.items-stretch` (for `align-items`)
    *   `.justify-start`, `.justify-end`, `.justify-c`, `.justify-between`, `.justify-around`, `.justify-evenly` (for `justify-content`)
    *   `.flex-1`, `.flex-auto`, `.flex-initial`, `.flex-none` (for `flex`)
    *   `.row`, `.column`, `.wrap`, `.flex-row-reverse`, `.flex-col-reverse`, `.flex-wrap-reverse`, `.flex-nowrap` (for `flex-direction`, `flex-wrap`)
*   **Grid:**
    *   `.grid-cols-1` to `.grid-cols-12`:  Grid column templates (e.g., `.grid-cols-3` for a 3-column grid).
    *   `.col-span-1` to `.col-span-12`, `.col-span-full`: Grid column spanning.
    *   `.row-span-1` to `.row-span-6`, `.row-span-full`: Grid row spanning.
    *   `.gap-0`, `.gap-1`, `.gap-2`, `.gap-4`:  Grid and Flexbox gap utilities (spacing between items).
*   **Typography:**
    *   `.font-sans`, `.font-serif`, `.font-mono`: Font family utilities.
    *   `.font-thin`, `.font-light`, `.font-normal`, `.font-medium`, `.semibold`, `.bold`, `.font-extrabold`, `.bolder`: Font weight utilities.
    *   `.text-left`, `.text-center`, `.text-right`, `.text-justify`: Text alignment utilities.
    *   `.uppercase`, `.lowercase`, `.capitalize`, `.normal-case`: Text transform utilities.
    *   `.italic`, `.not-italic`: Font style utilities.
    *   `.underline`, `.line-through`, `.no-underline`: Text decoration utilities.
    *   `.leading-none`, `.leading-tight`, `.leading-normal`, `.leading-loose`: Line height utilities.
    *   `.tracking-tighter`, `.tracking-tight`, `.tracking-normal`, `.tracking-wide`, `.tracking-wider`, `.tracking-widest`: Letter spacing utilities.
*   **Borders:**
    *   `.rounded-none`, `.rounded`: Border radius utilities.
    *   `.border`, `.border-2`, `.border-t`, `.border-r`, `.border-b`, `.border-l`: Border width utilities.
    *   `.border-solid`, `.border-dashed`, `.border-dotted`, `.border-double`, `.border-none`: Border style utilities.
    *   `.no-border`:  `border: none;`
*   **Background & Color:**
    *   `.bg-transparent`, `.bg-current`, `.bg-black`, `.bg-white`: Basic background color utilities.
    *   For more colors, see the Color Palettes section below.
*   **Sizing:**
    *   `.w-0`, `.w-auto`, `.w-full`, `.w-screen`: Width utilities.
    *   `.h-0`, `.h-auto`, `.h-full`, `.h-screen`, `.h-dvh`: Height utilities.
    *   `.min-w-0`, `.min-w-full`, `.max-w-full`: Min/Max width utilities.
    *   `.min-h-0`, `.min-h-full`, `.min-h-screen`, `.max-h-full`, `.max-h-screen`: Min/Max height utilities.
*   **Overflow:**
    *   `.overflow-hidden`, `.overflow-auto`, `.overflow-scroll`: Overflow utilities.
    *   `.overflow-x-auto`, `.overflow-y-hidden`:  Axis-specific overflow utilities.
    *   `.hide-scrollbar`: Utility to hide scrollbars (webkit and ms).
*   **Cursor:**
    *   `.pointer`: `cursor: pointer;`
    *   `.no-pointer`, `.pointer-events-none`:  Pointer event utilities.
*   **Positioning Helpers:**
    *   `.absolute-c`: Absolutely center an element.
    *   `.c`: Center content using flexbox (horizontally and vertically).
*   **Z-Index:**
    *   `.z-0`, `.z-10`, `.z-20`, `.z-30`, `.z-40`, `.z-50`, `.z-auto`: Z-index utilities.
*   **Aspect Ratio:**
    *   `.aspect-auto`, `.aspect-square`, `.aspect-video`: Aspect ratio utilities.
*   **Float & Clear:**
    *   `.float-left`, `.float-right`, `.float-none`: Float utilities.
    *   `.clear-left`, `.clear-right`, `.clear-both`, `.clear-none`: Clear utilities.
*   **Object Fit & Position:**
    *   `.object-contain`, `.object-cover`, `.object-fill`, `.object-none`, `.object-scale-down`: Object-fit utilities.
    *   `.object-bottom`, `.object-center`, `.object-left`, `.object-top`, etc.: Object-position utilities.

**Example:**

```html
<div class="flex justify-between items-center p-4 bg-gray-100 rounded-md">
  <h2 class="text-xl font-semibold">Dashboard</h2>
  <button class="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Add New
  </button>
</div>
```

### Color Palettes

Lazy CSS provides a rich set of color palettes, including:

*   `orange`, `gray`, `red`, `yellow`, `green`, `blue`, `purple`, `pink`, `lime`, `teal`, `cyan`, `sky`, `indigo`, `violet`, `fuchsia`, `rose`, `neutral`, `stone`, `zinc`, `slate`

Each palette comes with shades from `50` to `950`.  You can use these color palettes with the following syntax for background, text color, and border color:

*   `bg-{color}-{shade}` (e.g., `.bg-blue-500`)
*   `c-{color}-{shade}`  (e.g., `.c-red-700`)
*   `border-{color}-{shade}` (e.g., `.border-green-300`)

**Example:**

```html
<button class="bg-green-500 hover-bg-green-700 c-white border-2 border-green-600 rounded-lg py-2 px-4">
  Save Changes
</button>
```

### Value Shorthands

For properties like height/width and margin/padding, you can use shorthand classes:

*   `hw-[height,width]` : Sets both `height` and `width`. If only one value is provided, it's applied to both.
    *   Example: `.hw-[200px,auto]` sets `height: 200px; width: auto;` , `.hw-[50%]` sets `height: 50%; width: 50%;`
*   `mp-[margin,padding]` : Sets both `margin` and `padding`. If only one value is provided, it's applied to both.
    *   Example: `.mp-[1rem,0.5rem]` sets `margin: 1rem; padding: 0.5rem;` , `.mp-[10px]` sets `margin: 10px; padding: 10px;`

**Example:**

```html
<div class="hw-[300px] mp-[1rem] bg-white border border-gray-200 rounded-md overflow-hidden">
  {/* Content */}
</div>
```

### Pseudo-Classes (Hover & Active)

Apply styles for `:hover` and `:active` states directly in your class names using the following syntax:

*   `hover-(utility-classes)` : Styles applied on hover.
*   `active-(utility-classes)` : Styles applied when the element is active (e.g., clicked).

You can combine multiple utility classes within the parentheses, separated by commas.

**Example:**

```html
<button class="bg-blue-500 hover-(bg-blue-700, c-white) active-(bg-blue-800, border-2 border-blue-900) text-white font-bold py-2 px-4 rounded">
  Click Me
</button>
```

In this example, on hover, the background color will change to `blue-700` and the text color will become `white`. When active, the background will be `blue-800` and a `2px` border with `blue-900` color will be added.

## ⚙️ Configuration

Lazy CSS can be configured to extend or modify its behavior. You can configure it using two methods:

### 1. `<script type="lazy-config">` (HTML)

In your HTML file, you can add a `<script>` tag with the type `lazy-config`. Inside this tag, you can write JSON to define your configuration.

```html
<head>
  <link rel="stylesheet" href="https://bhargavxyz738.github.io/Lazy-CSS/nonredable.css">
  <script type="lazy-config">
    {
      "customSpacing": "2rem",
      "primaryColor": "#007bff"
    }
  </script>
  <script src="https://bhargavxyz738.github.io/Lazy-CSS/lazy.js"></script>
</head>
<body>
  <div class="m-{customSpacing} bg-{primaryColor} c-white p-4">
    {/* Content using configured values */}
  </div>
</body>
```

In this example, we define `customSpacing` and `primaryColor`. You can then use these in your class names like `m-{customSpacing}` and `bg-{primaryColor}`.

### 2. `configData` Prop (React)

When using the `LazyCSSProvider` in React, you can pass a `configData` prop to customize the configuration.

```jsx
import React from 'react';
import LazyCSSProvider from './lazy.jsx';

function App() {
  const customConfig = {
    customPadding: "1.5rem",
    "secondaryColor": "#6c757d"
  };

  return (
    <LazyCSSProvider configData={customConfig}>
      <div className="p-{customPadding} bg-{secondaryColor} c-white">
        {/* Content using configured values */}
      </div>
      {/* ... rest of your app */}
    </LazyCSSProvider>
  );
}

export default App;
```

Similar to the HTML configuration, you can define custom values in the `configData` object and access them in your class names using the `-{configKey}` syntax.

## Files Description

*   **`lazy.css`**:
    *   Contains predefined CSS styles.
    *   Includes basic CSS resets for cross-browser consistency.
    *   Provides foundational utility classes for layout (display, position, flex, grid), typography, borders, and more.
    *   This file is intended to be included in your project for base styles and common utilities.

*   **`lazy.js`**:
    *   The core JavaScript engine of Lazy CSS for Vanilla JavaScript projects.
    *   Parses HTML elements and their class lists.
    *   Generates CSS rules on-demand based on the utility classes found.
    *   Dynamically injects the generated CSS into a `<style>` tag in the `<head>` of your document.
    *   Sets up a MutationObserver to watch for changes in the DOM and apply styles to new elements or class modifications.

*   **`lazy.jsx`**:
    *   A React component (`LazyCSSProvider`) that wraps your application to enable Lazy CSS in React projects.
    *   Uses the same core logic as `lazy.js` but adapted for React's component lifecycle and virtual DOM.
    *   Accepts a `configData` prop for configuration in React environments.
    *   Injects generated CSS into a `<style>` tag within the provider component, ensuring styles are applied within the React application scope.


## Contributing

Contributions to Lazy CSS are welcome! If you have suggestions, bug reports, or want to contribute code, please feel free to:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Submit a pull request.

Please ensure your code is well-documented and follows the existing code style.

##  License

Lazy CSS is open-source and released under the [MIT License](LICENSE).
