document.addEventListener("DOMContentLoaded", function () {
    let styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    let cssRules = "";
    function escapeClassName(className) {
        return className.replace(/([\[\]])/g, '\\$1');
    }
    document.querySelectorAll("*").forEach(element => {
        element.classList.forEach(cls => {
            let safeClass = escapeClassName(cls);
            let match;
            // Height & Width
            match = cls.match(/^hw-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { height: ${match[1]}; width: ${match[1]}; }\n`;
            match = cls.match(/^(h|w)-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { ${match[1] === "h" ? "height" : "width"}: ${match[2]}; }\n`;
            // Background Color & Text Color
            match = cls.match(/^bg-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { background-color: ${match[1]}; }\n`;
            match = cls.match(/^c-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { color: ${match[1]}; }\n`;
            // Border Radius
            match = cls.match(/^round-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { border-radius: ${match[1]}; }\n`;
            // Margins
            match = cls.match(/^(ml|m|mr|mt|mb)-\[(.+?)\]$/);
            if (match) {
                let marginSide = { ml: "margin-left",m:"margin",mr: "margin-right", mt: "margin-top", mb: "margin-bottom" }[match[1]];
                cssRules += `.${safeClass} { ${marginSide}: ${match[2]}; }\n`;
            }
            // Padding
            match = cls.match(/^(pl|p|pr|pt|pb)-\[(.+?)\]$/);
            if (match) {
                let paddingSide = { pl: "padding-left", pr: "padding-right",p: "padding", pt: "padding-top", pb: "padding-bottom" }[match[1]];
                cssRules += `.${safeClass} { ${paddingSide}: ${match[2]}; }\n`;
            }
            // Positioning (left, right, top, bottom)
            match = cls.match(/^(l|r|t|b)-\[(.+?)\]$/);
            if (match) {
                let positionSide = { l: "left", r: "right", t: "top", b: "bottom" }[match[1]];
                cssRules += `.${safeClass} { ${positionSide}: ${match[2]}; position: absolute; }\n`;
            }
            match = cls.match(/^fs-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { font-size: ${match[1]}; }\n`;
        });
    });
    styleElement.textContent = cssRules;
});
