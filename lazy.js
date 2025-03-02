function generateDynamicStyles() {
    const styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);
    const sheet = styleSheet.sheet;

    function insertRule(rule) {
        try {
            sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
            console.warn("Could not insert rule:", rule, e);
        }
    }

    function escapeClassName(className) {
        return className.replace(/([\%\.\:])/g, "\\$1");
    }

    const propertyMap = {
        h: "height", w: "width", g: "gap", m: "margin",
        mt: "margin-top", mb: "margin-bottom", ml: "margin-left", mr: "margin-right",
        p: "padding", pt: "padding-top", pb: "padding-bottom",
        pl: "padding-left", pr: "padding-right", t: "top",
        b: "bottom", l: "left", r: "right", round: "border-radius",
        c: "color", bg: "background-color", bc: "border-color",
        bt: "border-top-color", bw: "border-width",
        bh: "border-height", bs: "border-style"
    };

    function applyStyles(element, className) {
        const numericProps = ["h", "w", "m", "mt", "mb", "ml", "mr", "p", "pt", "pb", "pl", "pr", "t", "b", "l", "r", "round", "g", "bw", "bh"];
        const colorProps = ["c", "bg", "bc", "bt"];
        const borderStyles = ["solid", "dashed", "dotted", "double", "groove", "ridge", "inset", "outset", "none", "hidden"];

        for (const short in propertyMap) {
            const property = propertyMap[short];
            let match;

            if (className.startsWith(`${short}-`) && className.includes("dvh") && (match = className.match(new RegExp(`^(${short})-(\\d+(?:\\.\\d+)?)dvh$`)))) {
                insertRule(`.${escapeClassName(className)} { ${property}: ${match[2]}dvh; }`);
                return true;
            }

            if (colorProps.includes(short) && className.startsWith(`${short}-[#`) && (match = className.match(new RegExp(`^(${short})-\\#([0-9a-fA-F]{3,8})$`)))) {
                insertRule(`.${escapeClassName(className)} { ${property}: #${match[2]}; }`);
                return true;
            }

            if (numericProps.includes(short) && (match = className.match(new RegExp(`^(${short})-(\\d+(?:\\.\\d+)?)(px|rem|em|vh|vw|%)$`)))) {
                insertRule(`.${escapeClassName(className)} { ${property}: ${match[2]}${match[3]}; }`);
                return true;
            }

            if (short === "round" && (match = className.match(new RegExp(`^(${short})-(\\d+)%$`)))) {
                insertRule(`.${escapeClassName(className)} { ${property}: ${match[2]}%; }`);
                return true;
            }

            if ((match = className.match(new RegExp(`^(${short})-(\\d+(?:\\.\\d+)?)$`)))) {
                insertRule(`.${escapeClassName(className)} { ${property}: ${match[2]}px; }`);
                return true;
            }

            if (colorProps.includes(short) && (match = className.match(new RegExp(`^(${short})-([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)$`)))) {
                insertRule(`.${escapeClassName(className)} { ${property}: ${match[2].replace(/-/g, " ")}; }`);
                return true;
            }

            if (short === "bs" && (match = className.match(new RegExp(`^bs-(${borderStyles.join("|")})$`)))) {
                insertRule(`.${escapeClassName(className)} { border-style: ${match[1]}; }`);
                return true;
            }
        }
        return false;
    }

    document.querySelectorAll("*").forEach((element) => {
        element.classList.forEach((className) => {
            applyStyles(element, className);
        });
    });
}

document.addEventListener("DOMContentLoaded", generateDynamicStyles);
if (document.readyState === "complete" || document.readyState === "interactive") {
    generateDynamicStyles();
}
