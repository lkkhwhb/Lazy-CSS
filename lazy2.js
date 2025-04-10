/*
 * Copyright (c) 2025 Bhargav
 * Licensed under the MIT License – see the LICENSE file for details.
 */
document.addEventListener("DOMContentLoaded", () => {
    let config = {};
    if (typeof window.lazyCssConfig === 'object' && window.lazyCssConfig !== null) {
        config = window.lazyCssConfig;
        console.log("Lazy CSS: User configuration loaded from window.lazyCssConfig:", config);
    } else {
        console.log("Lazy CSS: No window.lazyCssConfig found or invalid. Using default settings.");
    }
    const propMap = {
        bg: 'background-color', c: 'color', round: 'border-radius', ml: 'margin-left', m: 'margin', mr: 'margin-right', h: 'height', w: 'width',
        mt: 'margin-top', mb: 'margin-bottom', pl: 'padding-left', p: 'padding', pr: 'padding-right', pt: 'padding-top',
        pb: 'padding-bottom', fs: 'font-size', border: 'border-color', z: 'z-index', gap: 'gap',
        l: { p: 'left', pos: true }, r: { p: 'right', pos: true }, t: { p: 'top', pos: true }, b: { p: 'bottom', pos: true },
        gridCols: 'grid-template-columns'

    };
    const themeCategories = {
        spacing: ['m', 'p', 'ml', 'pl', 'mr', 'pr', 'mt', 'pt', 'mb', 'pb', 'gap'],
        borderRadius: ['round'],
        fontSize: ['fs'],
        height: ['h'],
        width: ['w']

    };
    const propToThemeCategory = {};
    for (const category in themeCategories) {
        themeCategories[category].forEach(prop => {
            propToThemeCategory[prop] = category;
        });
    }
    const pixelPropKeys = new Set([
        'h', 'w', 'ml', 'm', 'mr', 'mt', 'mb', 'pl', 'p', 'pr', 'pt', 'pb',
        'round', 'fs', 'gap', 'l', 'r', 't', 'b'
    ]);
    const colorPalette = {
        orange: { 50: '#fff7ed', 100: '#FFE8D1', 200: '#FFD1A4', 300: '#FFB877', 400: '#FF9F4A', 500: '#FF8500', 600: '#E57700', 700: '#CC6900', 800: '#B35A00', 900: '#994B00', 950: '#431407' },
        black: { 50: '#e6e6e6', 100: '#cccccc', 200: '#999999', 300: '#666666', 400: '#333333', 500: '#1a1a1a', 600: '#0d0d0d', 700: '#080808', 800: '#040404', 900: '#020202', 950: '#000000' },
        gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
        red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
        yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
        green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
        blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
        purple: { 50: '#faf5ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
        pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9d174d', 900: '#831843', 950: '#500724' },
        lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#3f6212', 900: '#365314', 950: '#1a2e05' },
        teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
        cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
        sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
        indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
        violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
        fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
        rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' },
        neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
        stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
        zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
        slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' }
    };
    const breakpoints = {
        'sm': '640px', 'md': '768px', 'lg': '1024px', 'xl': '1280px'
    };
    const DEFAULT_COLOR_SHADE = '500';
    const head = document.head;
    const style = head.appendChild(document.createElement('style'));
    style.id = 'lazy-css-generated';
    const activeCssRules = new Set();
    const styleCache = new Map();
    const escapedClassCache = new Map();
    let mutationTimer = null;
    const lazyBaseLink = head.appendChild(document.createElement('link'));
    lazyBaseLink.rel = 'stylesheet';
    lazyBaseLink.href = 'https://bhargavxyz738.github.io/Lazy-CSS/lazy.css';
    const escapeCls = (className) => {
        if (escapedClassCache.has(className)) {
            return escapedClassCache.get(className);
        }
        let escaped = className.replace(/[^a-zA-Z0-9_-]/g, (match) => `\\${match}`);
        if (/^\d/.test(escaped)) {
            escaped = `\\3${escaped.charAt(0)} ${escaped.slice(1)}`;
        } else if (/^-\d/.test(escaped)) {
             escaped = `\\${escaped.charAt(0)}\\3${escaped.charAt(1)} ${escaped.slice(2)}`;
        } else if (escaped.startsWith('--')) {
             escaped = `\\-${escaped}`;
         }
        escapedClassCache.set(className, escaped);
        return escaped;
    };
    const safeCalculate = (expression) => {
         try {
            const sanitizedExpression = String(expression).replace(/\s+/g, '');
            if (!/^[0-9+\-*/.]+$/.test(sanitizedExpression)) {
                 if (/^[\+\-\*\/]/.test(sanitizedExpression) || /[\+\-\*\/]$/.test(sanitizedExpression) || /[\+\-\*\/]{2,}/.test(sanitizedExpression)) {
                     console.warn(`Lazy CSS: Invalid arithmetic expression format "${expression}"`);
                     return null;
                 }
                 if (!/^(\d+(\.\d+)?)(([\+\-\*\/])(\d+(\.\d+)?))*$/.test(sanitizedExpression)) {
                    console.warn(`Lazy CSS: Potentially unsafe or invalid arithmetic expression "${expression}"`);
                    return null;
                 }
            }
            const calculate = new Function(`return ${sanitizedExpression}`);
            const result = calculate();
            if (typeof result !== 'number' || !isFinite(result)) {
                console.warn(`Lazy CSS: Calculation failed or resulted in non-finite number for "${expression}"`);
                return null;
            }
            return Math.floor(result);
        } catch (error) {
            console.warn(`Lazy CSS: Error calculating expression "${expression}":`, error);
            return null;
        }
    };
    const resolveColor = (type, originalColorName, originalShade) => {
        const cssProperty = propMap[type];
        if (!cssProperty) return null;
        let finalColorValue = null;
        const aliasTarget = config?.theme?.extend?.colors?.[originalColorName];
        let baseColorNameToUse = originalColorName;
        let shadeToUse = originalShade;

        if (aliasTarget && typeof aliasTarget === 'string') {
            if (aliasTarget.startsWith('#') || aliasTarget.startsWith('rgb') || aliasTarget.startsWith('hsl')) {
                finalColorValue = aliasTarget;
            } else {
                const aliasParts = aliasTarget.match(/^([a-z]+)(?:-(\d+))?$/);
                if (aliasParts) {
                    const aliasBaseColor = aliasParts[1];
                    const aliasShade = aliasParts[2];
                    baseColorNameToUse = aliasBaseColor;
                    shadeToUse = aliasShade || originalShade;

                    if (!shadeToUse && colorPalette[baseColorNameToUse]) {
                         shadeToUse = DEFAULT_COLOR_SHADE;
                    }
                    finalColorValue = colorPalette[baseColorNameToUse]?.[shadeToUse];

                } else {
                    console.warn(`Lazy CSS: Unrecognized alias format for "${originalColorName}": "${aliasTarget}". Falling back to original.`);
                     baseColorNameToUse = originalColorName;
                     shadeToUse = originalShade;
                }
            }
        }

        if (!finalColorValue) {
             if (!shadeToUse && colorPalette[baseColorNameToUse]) {
                 shadeToUse = DEFAULT_COLOR_SHADE;
             }
             finalColorValue = colorPalette[baseColorNameToUse]?.[shadeToUse];
        }

        if (finalColorValue) {
             finalColorValue = String(finalColorValue).replace(/[;{}]/g, '');
             return `${cssProperty}:${finalColorValue};`;
        }

        if (!aliasTarget || (aliasTarget && !finalColorValue)) {
             console.warn(`Lazy CSS: Color "${originalColorName}" or resulting value not found in palette or config.`);
        }
        return null;
    };
    const parseStyle = (s) => {
        if (styleCache.has(s)) {
            return styleCache.get(s);
        }
        const original = s;
        s = s.replace(/_/g, ' ');
        let rule = '';
        let match;

        const addProp = (propKey, val, unit = '') => {

            const definition = propMap[propKey];
            if (definition) {
                const property = typeof definition === 'object' ? definition.p : definition;
                const requiresPosition = typeof definition === 'object' && definition.pos;

                const sanitizedVal = String(val).replace(/[;{}]/g, '');
                if (!sanitizedVal && sanitizedVal !== '0') return false;

                rule += `${property}:${sanitizedVal}${unit};`;
                if (requiresPosition) {

                    if (!rule.includes('position:absolute;')) {
                         rule += 'position:absolute;';
                    }
                }
                return true;
            }
            return false;
        };
        const colorMatch = s.match(/^(bg|c|border)-([a-zA-Z]+(?:-[a-zA-Z]+)*)(?:-(\d+))?$/);
        if (colorMatch) {
            const [_, type, colorName, shade] = colorMatch;
            const colorRule = resolveColor(type, colorName, shade);
            if (colorRule) {
                styleCache.set(original, colorRule);
                return colorRule;
            }
             styleCache.set(original, null);
             return null;
        }
        if (match = s.match(/^gridCols-(\d+)$/)) {
            const cols = parseInt(match[1], 10);
            if (!isNaN(cols) && cols > 0) {
                rule = `grid-template-columns: repeat(${cols}, minmax(0, 1fr));`;
                styleCache.set(original, rule);
                return rule;
            }
        }
        if (match = s.match(/^z-(?:\[(.*?)\]|(\d+|auto))$/)) {
            const zIndexValue = match[1] ?? match[2];
             const sanitizedZIndex = String(zIndexValue).replace(/[;{}]/g, '');
             if (sanitizedZIndex && (sanitizedZIndex === 'auto' || /^-?\d+$/.test(sanitizedZIndex))) {
                rule = `z-index: ${sanitizedZIndex};`;
                styleCache.set(original, rule);
                return rule;
            }
        }
        const borderMatch = s.match(/^(border(?:-[trbl])?)-\[(.*?)\]$/);
        if (borderMatch) {
            const prefix = borderMatch[1];
            const borderValues = borderMatch[2].split(',').map(v => v.trim());
            let width = borderValues[0] || '1px';
            let styleVal = borderValues[1] || 'solid';
            let colorInput = borderValues[2] || 'currentColor';
            let finalColor = 'currentColor';
            if (colorInput !== 'currentColor' && colorInput !== 'transparent' && !colorInput.startsWith('#') && !/^(rgb|hsl)a?\(/.test(colorInput) && !colorInput.startsWith('var(') ) {
                const lazyColorMatch = colorInput.match(/^([a-z]+(?:-[a-z]+)*)(?:-(\d+))?$/);
                if (lazyColorMatch) {

                    const resolved = resolveColor('c', lazyColorMatch[1], lazyColorMatch[2]);
                    if (resolved) {

                        finalColor = resolved.substring(resolved.indexOf(':') + 1, resolved.length -1);
                    } else {
                        finalColor = 'currentColor';
                        console.warn(`Lazy CSS: Could not resolve border color "${colorInput}" in class "${original}"`);
                    }
                } else {
                     finalColor = colorInput;
                }
            } else {
                 finalColor = colorInput;
            }
            let borderProperty = 'border';
            if (prefix === 'border-t') borderProperty = 'border-top';
            else if (prefix === 'border-r') borderProperty = 'border-right';
            else if (prefix === 'border-b') borderProperty = 'border-bottom';
            else if (prefix === 'border-l') borderProperty = 'border-left';
            width = String(width).replace(/[;{}]/g, '');
            styleVal = String(styleVal).replace(/[;{}]/g, '');
            finalColor = String(finalColor).replace(/[;{}]/g, '');
            rule = `${borderProperty}:${width} ${styleVal} ${finalColor};`;
            styleCache.set(original, rule);
            return rule;
        }
        if (match = s.match(/^hw-\[(.*?)\]$/)) {
            const valsStr = match[1];
            const vals = valsStr.split(',').map(v => v.trim().replace(/[;{}]/g, ''));
            const [a, b] = vals.length > 1 ? vals : [vals[0], vals[0]];
            if (a == null || b == null) {
                styleCache.set(original, null);
                return null;
            }
            rule = `height:${a};width:${b};`;
            if (rule) {
                 styleCache.set(original, rule);
                 return rule;
            }
        }
         if (match = s.match(/^mp-\[(.*?)\]$/)) {
            const valsStr = match[1];
            const vals = valsStr.split(',').map(v => v.trim().replace(/[;{}]/g, ''));
            const [a, b] = vals.length > 1 ? vals : [vals[0], vals[0]];
            if (a == null || b == null) {
                styleCache.set(original, null);
                return null;
            }
            rule = `margin:${a};padding:${b};`;
            if (rule) {
                 styleCache.set(original, rule);
                 return rule;
            }
        }
        const generalPropMatch = s.match(new RegExp(`^(${Object.keys(propMap).join('|')})-\\[(.*?)\\]$`));
        if (generalPropMatch) {
             const propKey = generalPropMatch[1];
             const innerValue = generalPropMatch[2];
             const sanitizedInnerValue = String(innerValue).replace(/[;{}]/g, '');
             if (sanitizedInnerValue.includes(',')) {
                 const parts = sanitizedInnerValue.split(',').map(p => p.trim());
                 if (parts.length === 3 && ['+', '-', '*', '/'].includes(parts[1])) {
                    const calcValue = `calc(${parts[0]} ${parts[1]} ${parts[2]})`;
                     if (addProp(propKey, calcValue)) {
                        styleCache.set(original, rule);
                        return rule;
                    }
                 } else {
                      if (addProp(propKey, sanitizedInnerValue)) {
                        styleCache.set(original, rule);
                        return rule;
                      }
                 }
             } else {
                 if (addProp(propKey, sanitizedInnerValue)) {
                    styleCache.set(original, rule);
                    return rule;
                }
             }
        }

        match = s.match(/^([a-z]+(?:-[a-z]+)*)-(.+)$/);
        if (match) {
             const prefix = match[1];
             const valuePart = match[2];

             if (pixelPropKeys.has(prefix)) {

                 if (/^[0-9.+\-*/\s]+$/.test(valuePart.trim()) && !valuePart.includes('[') && !valuePart.includes(']') && !valuePart.includes('{') && !valuePart.includes('}')) {
                    const calculatedValue = safeCalculate(valuePart);
                    if (calculatedValue !== null) {

                        if (addProp(prefix, calculatedValue, 'px')) {
                             styleCache.set(original, rule);
                             return rule;
                        }
                    } else {
                         console.warn(`Lazy CSS: Failed to calculate value for "${original}"`);
                    }
                 }
             }
        }
         if (!rule) {
            match = s.match(/^([a-z]+(?:-[a-z]+)*)-(.+)$/);
            if (match) {
                 const propKey = match[1];
                 const configKey = match[2];
                 const themeCategory = propToThemeCategory[propKey];
                 if (themeCategory) {
                     const configValue = config?.theme?.extend?.[themeCategory]?.[configKey];
                     if (configValue !== undefined) {
                        if (addProp(propKey, configValue)) {
                            styleCache.set(original, rule);
                            return rule;
                        }
                     }
                 }
            }
        }
        styleCache.set(original, null);
        return null;
    };
    const generateRuleForClass = (className, newRulesOutput) => {
        if (!className) return false;
        if (styleCache.has(className) && styleCache.get(className) === null) return false;
        if (activeCssRules.has(`.${escapeCls(className)} { /* complex */ }`)) return false;
        const escapedCls = escapeCls(className);
        let generatedNewRule = false;
        const responsiveMatch = className.match(/^(sm|md|lg|xl)-\((.*?)\)$/);
        if (responsiveMatch) {
            const breakpoint = responsiveMatch[1];
            const innerClassesString = responsiveMatch[2];
            const mediaQueryMinWidth = breakpoints[breakpoint];
            const escapedOriginalClassName = escapeCls(className);
            let combinedDeclarations = '';

            innerClassesString.split(',').map(c => c.trim()).filter(Boolean).forEach(innerCls => {
                combinedDeclarations += parseStyle(innerCls) || '';
            });
            if (combinedDeclarations) {
                const fullRule = `@media (min-width: ${mediaQueryMinWidth}) {\n  .${escapedOriginalClassName} { ${combinedDeclarations} }\n}`;
                if (!activeCssRules.has(fullRule)) {
                    activeCssRules.add(fullRule);
                    newRulesOutput.add(fullRule);
                    generatedNewRule = true;

                    styleCache.set(className, `/* complex media rule */`);
                    activeCssRules.add(`.${escapedOriginalClassName} { /* complex */ }`);
                }
            } else {

                 styleCache.set(className, null);
            }
             return generatedNewRule;
        }
        const pseudoMatch = className.match(/^(hover|active|focus|visited|focus-within|focus-visible)-\((.*?)\)$/);
        if (pseudoMatch) {
            const pseudoClass = pseudoMatch[1];
            const innerClasses = pseudoMatch[2].split(',').map(c => c.trim()).filter(Boolean);
            const escapedOriginalClassName = escapeCls(className);
            let combinedInnerRules = '';
            innerClasses.forEach(innerCls => {
                combinedInnerRules += parseStyle(innerCls) || '';
            });
            if (combinedInnerRules) {
                const fullRule = `.${escapedOriginalClassName}:${pseudoClass} { ${combinedInnerRules} }`;
                if (!activeCssRules.has(fullRule)) {
                    activeCssRules.add(fullRule);
                    newRulesOutput.add(fullRule);
                    generatedNewRule = true;

                    styleCache.set(className, `/* complex pseudo rule */`);
                    activeCssRules.add(`.${escapedOriginalClassName} { /* complex */ }`);
                }
            } else {

                 styleCache.set(className, null);
            }
             return generatedNewRule;
        }
        const ruleContent = parseStyle(className);
        if (ruleContent) {
            const fullRule = `.${escapedCls} { ${ruleContent} }`;
            if (!activeCssRules.has(fullRule)) {
                activeCssRules.add(fullRule);
                newRulesOutput.add(fullRule);
                generatedNewRule = true;
            }
            return generatedNewRule;
        }
        return false;
    };
    const collectClassesFromNode = (element, targetSet) => {
        if (element.nodeType !== Node.ELEMENT_NODE) return;
        if (element.classList && element.classList.length > 0) {
            element.classList.forEach(cls => targetSet.add(cls));
        }
        element.childNodes.forEach(child => collectClassesFromNode(child, targetSet));
    };
    const handleMutations = (mutations) => {
        const classesToProcess = new Set();
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        collectClassesFromNode(node, classesToProcess);
                    }
                });
            } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const targetElement = mutation.target;
                if (targetElement.nodeType === Node.ELEMENT_NODE && targetElement.classList) {

                     targetElement.classList.forEach(cls => classesToProcess.add(cls));
                }
            }
        }
        if (classesToProcess.size === 0) {
            return;
        }
        const newRulesGenerated = new Set();
        classesToProcess.forEach(cls => {
             generateRuleForClass(cls, newRulesGenerated);
        });
        if (newRulesGenerated.size > 0) {
             try {
                 const sheet = style.sheet;
                 if (sheet) {

                    const rulesArray = [...newRulesGenerated].join('\n').split(/(?<=\})\s*\n?/);
                    rulesArray.forEach(ruleString => {
                        if (ruleString.trim()) {
                             sheet.insertRule(ruleString.trim(), sheet.cssRules.length);
                        }
                    });
                 } else {

                     style.textContent += '\n' + [...newRulesGenerated].join('\n');
                 }
             } catch (e) {
                  console.error("Lazy CSS: Error inserting new CSS rules:", e, "Rules:", [...newRulesGenerated].join('\n'));

                  try { style.textContent += '\n' + [...newRulesGenerated].join('\n'); } catch {}
             }
        }
    };
    const performInitialScan = () => {
        const initialClasses = new Set();
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (el.classList && el.classList.length > 0) {
                el.classList.forEach(cls => initialClasses.add(cls));
            }
        });
        const initialRules = new Set();
        initialClasses.forEach(cls => {
            generateRuleForClass(cls, initialRules);
        });
        style.textContent = [...initialRules].join('\n');
        console.log(`Lazy CSS: Initialized with ${activeCssRules.size} unique rule declarations generated. Watching for DOM changes.`);
    };
    const observer = new MutationObserver(mutations => {
        if (mutationTimer) {
            cancelAnimationFrame(mutationTimer);
        }
        mutationTimer = requestAnimationFrame(() => {
            handleMutations(mutations);
            mutationTimer = null;
        });
    });
    const observe = () => {
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }
    performInitialScan();
    observe();

});
