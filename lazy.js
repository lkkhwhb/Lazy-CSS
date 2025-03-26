document.addEventListener("DOMContentLoaded", () => {
    const config = {}, css = [], processed = new Set();
    const propMap = {
        bg: 'background-color', c: 'color', round: 'border-radius', ml: 'margin-left', m: 'margin', mr: 'margin-right', h: 'height', w: 'width',
        mt: 'margin-top', mb: 'margin-bottom', pl: 'padding-left', p: 'padding', pr: 'padding-right', pt: 'padding-top',
        pb: 'padding-bottom', l: { p: 'left', pos: 1 }, r: { p: 'right', pos: 1 }, t: { p: 'top', pos: 1 }, b: { p: 'bottom', pos: 1 },
        fs: 'font-size', border: 'border-color',z: 'z-index',gridCols: 'grid-template-columns', gap: 'gap'
    };
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
    const head = document.head;
    const escapeCls = cls => cls.replace(/[-/\\^$*+?.()|[\]{},]/g, '\\$&');
                                                
    const style = head.appendChild(document.createElement('style'));
    head.appendChild(document.createElement('link')).rel = 'stylesheet';
    head.lastChild.href = 'https://bhargavxyz738.github.io/Lazy-CSS/lazy.css';
    try {
        const lazyConfig = document.getElementById('lazy-config');
        if (lazyConfig) {
            lazyConfig.textContent.trim().split('\n').filter(Boolean).forEach(s => {
                try { Object.assign(config, JSON.parse(s)) } catch (e) { console.error("Error parsing JSON:", e, s) } });
        }
    } catch (e) { console.error("Error processing lazy-config:", e) }
     const parseStyle = s => {
        s = s.replace(/_/g, ' ');
        let rule = '';
        const colorMatch = s.match(/^(bg|c|border)-([a-z]+)-(\d+)$/);
        if (colorMatch) {
            const [_, type, color, shade] = colorMatch;
            const hex = colorPalette[color]?.[shade];
            if (hex) { return `${propMap[type]}:${hex};` }
            return '';
        }
        let match, [type, vals] = [];
        const addProp = (prop, val) => {
            const def = propMap[prop];
            rule += def ? typeof def === 'object' ? `${def?.p}:${val}${def?.pos ? ';position:absolute' : ''};` : `${def}:${val};` : '';
        };
        const borderMatch = s.match(/^(border(?:-[trbl])?)-\[(.*?)\]$/);
        if (borderMatch) {
            const prefix = borderMatch[1];
            const borderValues = borderMatch[2].split(',').map(v => v.trim());
            let width = borderValues[0] || '1px';
            let style = borderValues[1] || 'solid';
            let color = borderValues[2] || 'currentColor';
            const lazyColorMatch = color.match(/^([a-z]+)-(\d+)$/);
            if (lazyColorMatch) {
                const colorName = lazyColorMatch[1];
                const shade = lazyColorMatch[2];
                const hexColor = colorPalette[colorName]?.[shade];
                if (hexColor) {
                    color = hexColor;
                }
            }
            let borderProperty = 'border';
            if (prefix === 'border-t') borderProperty = 'border-top';
            else if (prefix === 'border-r') borderProperty = 'border-right';
            else if (prefix === 'border-b') borderProperty = 'border-bottom';
            else if (prefix === 'border-l') borderProperty = 'border-left';

            rule += `${borderProperty}:${width} ${style} ${color};`;
            return rule;
        }
        if(match = s.match(/^gridCols-(\d+)$/)){
            const cols = parseInt(match[1], 10);
              if (!isNaN(cols)) {
                  rule += `grid-template-columns: repeat(${cols}, minmax(0, 1fr));`;
                  return rule; 
              }
          }
        if(match = s.match(/^zIndex-\[(.*?)\]$/)) {
            const zIndexValue = match[1];
            if (!isNaN(parseInt(zIndexValue)) || zIndexValue === 'auto') {
                rule += `z-index: ${zIndexValue};`;
                return rule; 
             }
        }
        if (match = s.match(/^(hw|mp)-\[(.*?)\]$/)) {
            [type, vals] = [match[1], match[2].split(',').map(v => v.trim())];
            const [a, b] = vals.length > 1 ? vals : [vals[0], vals[0]];
            rule = type === 'hw' ? `height:${a};width:${b};` : `margin:${a};padding:${b};`;
        } else if (match = s.match(new RegExp(`^(${Object.keys(propMap).join('|')})-\\[(.*?)\\]$`))) {
            addProp(match[1], match[2]);
        } else if (match = s.match(/^(\w+)-\{(.*?)\}$/)) {
            config[match[2]] && addProp(match[1], config[match[2]]);
        }
        return rule;
    };
    const breakpoints = {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px'
    };
    const mediaQueries = {};
    let uniqueClassCounter = 0;
   const generateRule = (cls, isResponsiveContext = false) => {
        if (processed.has(cls)) {
          return '';
        }
        processed.add(cls);
        const responsiveMatch = cls.match(/^(sm|md|lg|xl)-\((.*?)\)$/);
        if (responsiveMatch) {
            return ''; 
        }
        const pseudoMatch = cls.match(/^(hover|active)-\((.*?)\)$/);
        if (pseudoMatch) {
            const pseudoClass = pseudoMatch[1];
            const innerClasses = pseudoMatch[2].split(',');
            let combinedRule = '';
            for (const innerCls of innerClasses) {
              const innerRule = parseStyle(innerCls.trim());
              if (innerRule) {
                combinedRule += `.${escapeCls(cls)}:${pseudoClass}{${innerRule}}`;
              }
            }
            return combinedRule;
        };
        const rule = parseStyle(cls);
        return rule ? `.${escapeCls(cls)}{${rule}}` : '';
    };
    const processClasses = elements => {
        const newRules = [];
        elements.forEach(el => {
            [...el.classList].forEach(cls => {
                if(processed.has(cls)) return;
                const responsiveMatch = cls.match(/^(sm|md|lg|xl)-\((.*?)\)$/);
                if (responsiveMatch) {
                    const breakpoint = responsiveMatch[1];
                    const classQueries = responsiveMatch[2].split(',').map(c => c.trim());
                    classQueries.forEach(query => {
                        const uniqueClassName = `lazy-responsive-${breakpoint}-${uniqueClassCounter++}`;
                        if (!el.classList.contains(uniqueClassName)) {
                            el.classList.add(uniqueClassName);
                        }
                        const rule = parseStyle(query);
                        if (rule) {
                            const mediaRule = `.${escapeCls(uniqueClassName)} { ${rule} }`; 
                            mediaQueries[breakpoint] = mediaQueries[breakpoint] || [];
                            mediaQueries[breakpoint].push(mediaRule);
                        }
                    });
                } else {
                    const rule = generateRule(cls); 
                    rule && newRules.push(rule);
                }
            });
        });
        newRules.length && css.push(...newRules);
    };
    processClasses(document.querySelectorAll('*'));
    let cssOutput = css.join('');
    for (const breakpoint in mediaQueries) {
        const mediaRules = mediaQueries[breakpoint].join('\n');
        cssOutput += `@media (min-width: ${breakpoints[breakpoint]}) {\n${mediaRules}\n}\n`;
    }
    style.textContent = cssOutput;
    const observer = new MutationObserver(mutations => {
        const elements = new Set();
        mutations.forEach(({ addedNodes, attributeName, target }) => {
            if (addedNodes) addedNodes.forEach(node => {
                node.nodeType === 1 && elements.add(node).add(...node.querySelectorAll('*'));
            });
            if (attributeName === 'class') elements.add(target);
        });
        processClasses([...elements]);
        let updatedCssOutput = css.join('');
        for (const breakpoint in mediaQueries) {
            const mediaRules = mediaQueries[breakpoint].join('\n');
            updatedCssOutput += `@media (min-width: ${breakpoints[breakpoint]}) {\n${mediaRules}\n}\n`;
        }
        style.textContent = updatedCssOutput;
    });
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
    console.log("Hello and welcome to Lazy CSS! This is an early version, so it may contain bugs. For development, you can use the CDN links provided. However, for production, it’s recommended to download the CSS and JS files directly from GitHub. Thank you, and happy styling with Lazy CSS!");
});
