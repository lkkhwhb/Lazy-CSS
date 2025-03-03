document.addEventListener("DOMContentLoaded", function () {
    let styleElement = document.createElement("style");
    document.head.appendChild(styleElement);
    let cssRules = "";
    let config = {};

    // 1. Find the lazy-config element
    const lazyConfigElement = document.getElementById('lazy-config');

    // 2. Parse the JSON Data and store in config
    if (lazyConfigElement) {
        try {
            const configText = lazyConfigElement.textContent.trim();
            
            // Try parsing the entire content as a single JSON object first
            try {
                config = JSON.parse(configText);
            
            } catch (e) {
                // If that fails, try the line-by-line approach as fallback
                const configObjects = configText.split('\n').filter(obj => obj.trim() !== '');
                
                configObjects.forEach(jsonString => {
                    try {
                        const parsedConfig = JSON.parse(jsonString);
                        config = { ...config, ...parsedConfig }; // Merge into the main config object
                    } catch (error) {
                        console.error("Error parsing JSON config:", error, jsonString);
                    }
                });
            }
        } catch (error) {
            console.error("Error processing lazy-config:", error);
        }
    }

    function escapeClassName(className) {
        return className.replace(/([\[\]\{\}])/g, '\\$1');
    }

    document.querySelectorAll("*").forEach(element => {
        element.classList.forEach(cls => {
            let safeClass = escapeClassName(cls);
            let match;

            // Height & Width (existing logic - square brackets)
            match = cls.match(/^hw-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { height: ${match[1]}; width: ${match[1]}; }\n`;
            
            match = cls.match(/^(h|w)-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { ${match[1] === "h" ? "height" : "width"}: ${match[2]}; }\n`;

            // Process curly braces styles
            match = cls.match(/^(bg|c|round|ml|m|mr|mt|mb|pl|p|pr|pt|pb|l|r|t|b|fs)-\{(.+?)\}$/);
            if (match) {
                const prefix = match[1];
                const configKey = match[2];
                const value = config[configKey]; // Get value from config
                
            

                if (value !== undefined) {
                    let cssProperty = "";
                    let needsPosition = false;
                    
                    switch (prefix) {
                        case "bg":
                            cssProperty = "background-color";
                            break;
                        case "c":
                            cssProperty = "color";
                            break;
                        case "round":
                            cssProperty = "border-radius";
                            break;
                        case "ml":
                            cssProperty = "margin-left";
                            break;
                        case "m":
                            cssProperty = "margin";
                            break;
                        case "mr":
                            cssProperty = "margin-right";
                            break;
                        case "mt":
                            cssProperty = "margin-top";
                            break;
                        case "mb":
                            cssProperty = "margin-bottom";
                            break;
                        case "pl":
                            cssProperty = "padding-left";
                            break;
                        case "p":
                            cssProperty = "padding";
                            break;
                        case "pr":
                            cssProperty = "padding-right";
                            break;
                        case "pt":
                            cssProperty = "padding-top";
                            break;
                        case "pb":
                            cssProperty = "padding-bottom";
                            break;
                        case "l":
                            cssProperty = "left";
                            needsPosition = true;
                            break;
                        case "r":
                            cssProperty = "right";
                            needsPosition = true;
                            break;
                        case "t":
                            cssProperty = "top";
                            needsPosition = true;
                            break;
                        case "b":
                            cssProperty = "bottom";
                            needsPosition = true;
                            break;
                        case "fs":
                            cssProperty = "font-size";
                            break;
                        default:
                            console.warn(`Unknown prefix: ${prefix} for class ${cls}`);
                            return; // Skip this iteration
                    }
                    
                    if (needsPosition) {
                        cssRules += `.${safeClass} { ${cssProperty}: ${value}; position: absolute; }\n`;
                    } else {
                        cssRules += `.${safeClass} { ${cssProperty}: ${value}; }\n`;
                    }
                } else {
                    console.warn(`Config key "${configKey}" not found for class "${cls}"`);
                }
            }

            // Compound property handling (e.g., p-[8px 16px])
            match = cls.match(/^p-\[(.+?\s+.+?)\]$/);
            if (match && match[1].includes(" ")) {
                const values = match[1].split(" ");
                if (values.length === 2) {
                    cssRules += `.${safeClass} { padding: ${values[0]} ${values[1]}; }\n`;
                } else if (values.length === 4) {
                    cssRules += `.${safeClass} { padding: ${values[0]} ${values[1]} ${values[2]} ${values[3]}; }\n`;
                }
                return; // Skip further padding processing
            }

            // Existing logic - square brackets styles
            match = cls.match(/^bg-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { background-color: ${match[1]}; }\n`;

            match = cls.match(/^c-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { color: ${match[1]}; }\n`;

            match = cls.match(/^round-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { border-radius: ${match[1]}; }\n`;

            match = cls.match(/^(ml|m|mr|mt|mb)-\[(.+?)\]$/);
            if (match) {
                let marginSide = { ml: "margin-left", m: "margin", mr: "margin-right", mt: "margin-top", mb: "margin-bottom" }[match[1]];
                cssRules += `.${safeClass} { ${marginSide}: ${match[2]}; }\n`;
            }

            match = cls.match(/^(pl|p|pr|pt|pb)-\[(.+?)\]$/);
            if (match) {
                let paddingSide = { pl: "padding-left", pr: "padding-right", p: "padding", pt: "padding-top", pb: "padding-bottom" }[match[1]];
                cssRules += `.${safeClass} { ${paddingSide}: ${match[2]}; }\n`;
            }

            match = cls.match(/^(l|r|t|b)-\[(.+?)\]$/);
            if (match) {
                let positionSide = { l: "left", r: "right", t: "top", b: "bottom" }[match[1]];
                cssRules += `.${safeClass} { ${positionSide}: ${match[2]}; position: absolute; }\n`;
            }

            match = cls.match(/^fs-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { font-size: ${match[1]}; }\n`;
            
            // Add support for border styles
            match = cls.match(/^border-\[(.+?)\]$/);
            if (match) cssRules += `.${safeClass} { border: ${match[1]}; }\n`;
            
        });
    });

    styleElement.textContent = cssRules;
    console.log("Lazy CSS should not be used via link for development purpose.");
});
