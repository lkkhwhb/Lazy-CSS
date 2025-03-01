# Lazy CSS - A Utility-First CSS Framework

Lazy CSS is a lightweight, utility-first CSS framework for rapid web development. It provides a large set of single-purpose classes to style elements directly in your HTML, reducing the need for custom CSS. It also includes a powerful dynamic style generation system.

## Features

*   **Utility-First Classes:** Pre-defined classes for common styling.
*   **Dynamic Style Generation:** Generates CSS rules from class names (details below).
*   **Layout Helpers:** Flexbox and Grid classes.
*   **Shortcuts:** Combined classes for common styles.
*   **Font Styling:** Classes for fonts, styles, weights, etc.
*   **Animations:** Pre-built CSS animations.
*   **Loaders:** Simple loading animations.

## Usage
Place these inside the `<head>` of your HTML.
```html
<link rel="stylesheet" href="https://bhargavxyz738.github.io/Lazy-CSS/lazy.css">
<script src="https://bhargavxyz738.github.io/Lazy-CSS/lazy.js">
```

### Dynamic Styles

The dynamic style generation system uses a specific class naming convention:

*   **`prefix-value[unit]`**  or **`prefix-cssColorValue`**

    *   **`prefix`:** A short code for a CSS property (see table below).
    *   **`value`:**  The numeric value for the property.
    *   **`unit`:** (Optional) The unit (e.g., `px`, `rem`, `em`, `%`). Defaults to `px` if omitted.
    *   **`cssColorValue`:** For color-related properties (`c` for color, `bg` for background-color), use a **valid CSS color value**. This includes:
        *   **Color keywords:**  `red`, `blue`, `transparent`, etc.
        *   **Hexadecimal color codes:** `#ff0000`, `#f0f0f0`, etc.
        *   **`rgb()` and `rgba()` functions:** `rgb(255, 0, 0)`, `rgba(0, 0, 0, 0.5)`, etc.
        *   **`hsl()` and `hsla()` functions:** `hsl(0, 100%, 50%)`, `hsla(120, 100%, 50%, 0.8)`, etc.
        *   **`currentcolor` keyword**

        **Important:**  This framework does *not* support custom color names like `blue-500`.  You *must* use valid CSS color values directly.

**Dynamic Style Prefixes:**

| Prefix | CSS Property      | Example                               | Generated CSS                       |
| :----- | :---------------- | :------------------------------------ | :---------------------------------- |
| `h`    | `height`          | `h-50px` , `h-25rem`, `h-100vh`          | `height: 50px;`, `height: 25rem;`, `height: 100vh;` |
| `w`    | `width`           | `w-100px`, `w-50%`, `w-20em`            | `width: 100px;`, `width: 50%;`, `width: 20em;`      |
| `m`    | `margin`          | `m-10px`, `m-2rem`                     | `margin: 10px;`, `margin: 2rem;`      |
| `mt`   | `margin-top`      | `mt-5px`                              | `margin-top: 5px;`                    |
| `mb`   | `margin-bottom`   | `mb-1em`                              | `margin-bottom: 1em;`                 |
| `ml`   | `margin-left`     | `ml-20px`                             | `margin-left: 20px;`                   |
| `mr`   | `margin-right`    | `mr-0px`                              | `margin-right: 0px;`                  |
| `p`    | `padding`         | `p-15px`, `p-2.5rem`                  | `padding: 15px;`, `padding: 2.5rem;`    |
| `pt`   | `padding-top`     | `pt-8px`                              | `padding-top: 8px;`                   |
| `pb`   | `padding-bottom`  | `pb-12px`                             | `padding-bottom: 12px;`                |
| `pl`   | `padding-left`    | `pl-16px`                             | `padding-left: 16px;`                  |
| `pr`   | `padding-right`   | `pr-24px`                             | `padding-right: 24px;`                 |
| `t`    | `top`             | `t-0px`, `t-50%`                       | `top: 0px;`, `top: 50%;`                |
| `b`    | `bottom`          | `b-10px`                              | `bottom: 10px;`                       |
| `l`    | `left`            | `l-0px`                              | `left: 0px;`                         |
| `r`    | `right`           | `r-5px`                              | `right: 5px;`                        |
| `round`| `border-radius`   | `round-5px`, `round-50%`               | `border-radius: 5px;`,`border-radius: 50%;` |
| `c`    | `color`           | `c-red`, `c-#f0f0f0`, `c-rgba(0,0,0,0.5)`    | `color: red;`, `color: #f0f0f0;`, `color: rgba(0,0,0,0.5);` |
| `bg`   | `background-color`| `bg-black`, `bg-transparent`, `bg-rgb(240,240,240)` | `background-color: black;`, `background-color: transparent;`, `background-color: rgb(240,240,240);` |

**Examples:**

*   `<div class="w-200px h-100px bg-blue"></div>`  Creates a 200px by 100px blue box.
*   `<p class="m-10px p-20px c-white bg-black">Hello</p>` Creates a paragraph with 10px margin, 20px padding, white text, and a black background.
*   `<img class="round-20px" src="...">` Creates an image with 20px of border radius.
*   `<div class="mt-2rem mb-4rem"></div>`  Creates a div with 2rem top margin and 4rem bottom margin.
*   `<div class="bg-rgba(255,0,0,0.5) w-50px h-50px"></div>` Creates a 50x50px box with a semi-transparent red background.

### Layout Classes

These classes provide convenient ways to use Flexbox and Grid.

| Class         | Description                      |
| :------------ | :------------------------------- |
| `flex`        | `display: flex;`                 |
| `flex-column` | `flex-direction: column;`        |
| `justify-c`   | `justify-content: center;`       |
| `items-c`     | `align-items: center;`           |
| `grid`        | `display: grid;`                 |
| `absolute`    | `position: absolute;`           |
| `relative`    | `position: relative;`           |
| `fixed`       | `position: fixed;`              |
| `sticky`      | `position: sticky;`              |
| `s-between`   | `justify-content: space-between;`|
| `s-around`    | `justify-content: space-around;` |
| `s-evenly`    | `justify-content: space-evenly;` |
| `border-box`  | `box-sizing: border-box;`        |

### Shortcut Classes

These combine common styles for convenience.

| Class           | Description                                   |
| :-------------- | :-------------------------------------------- |
| `center`        | `display: flex; align-items: center; justify-content: center;` |
| `center-absolute` | `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);` |
| `full`          | `width: 100%; height: 100%;`                  |
| `cover`         | `position: absolute; top: 0; left: 0; width: 100%; height: 100%;` |
| `fix-cover`    | `position: fixed; top: 0; left: 0; width: 100%; height: 100%;`    |

### Font Styling Classes

| Class          | Description                       |
| :------------- | :-------------------------------- |
| `roboto`       | `font-family: 'Roboto', sans-serif;` |
| `italic`       | `font-style: italic;`             |
| `oblique`      | `font-style: oblique;`            |
| `normal`       | `font-style: normal;`             |
| `serif`        | `font-family: serif;`             |
| `sans`         | `font-family: sans-serif;`         |
| `mono`         | `font-family: monospace;`         |
| `bold`         | `font-weight: bold;`              |
| `t-left`       | `text-align: left;`               |
| `t-center`     | `text-align: center;`             |
| `t-right`      | `text-align: right;`              |
| `t-justify`    | `text-align: justify;`            |
| `underline`    | `text-decoration: underline;`    |
| `line-through` | `text-decoration: line-through;` |
| `no-underline` | `text-decoration: none;`         |
| `break-normal` | `word-break: normal;`             |
| `break-words`  | `word-break: break-word;`         |
| `break-all`    | `word-break: break-all;`          |
| `uppercase`    | `text-transform: uppercase;`    |
| `lowercase`    | `text-transform: lowercase;`    |
| `capitalize`   | `text-transform: capitalize;`   |

### Animation Classes

Apply these classes to trigger animations.

| Class            | Description                                            |
| :--------------- | :----------------------------------------------------- |
| `spin`           | Continuous spinning animation.                         |
| `pulse`          | Pulsating (scaling) animation.                        |
| `fade-in`        | Fades in an element.                                  |
| `fade-out`       | Fades out an element.                                 |
| `slide-in-up`    | Slides an element in from the bottom.                  |
| `slide-in-down`  | Slides an element in from the top.                     |
| `slide-in-left`  | Slides an element in from the left.                    |
| `slide-in-right` | Slides an element in from the right.                   |
| `bounce`         | Bouncing animation.                                   |
| `shake`          | Shaking animation.                                    |
| `flip-horizontal`| Flips an element horizontally.                        |
| `flip-vertical`  | Flips an element vertically.                           |

### Pre defined animations.

| Class            | Description                                      |
| :--------------- | :----------------------------------------------- |
| `loader-b-spin`  |  Black spinner                                   |
| `loader-w-spin`  |  White spinner                                   |
