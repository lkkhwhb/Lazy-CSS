document.addEventListener("DOMContentLoaded", () => {
    const config = {}, css = [], processed = new Set();
    document.head.appendChild(document.createElement("link")).rel = "stylesheet";
    document.head.lastChild.href = "https://bhargavxyz738.github.io/Lazy-CSS/nonredable.css";
    const style = document.head.appendChild(document.createElement("style"));
    const lazyConfig = document.getElementById('lazy-config');
    if (lazyConfig) try {
        lazyConfig.textContent.trim().split('\n').filter(l => l).forEach(s => {
            try { Object.assign(config, JSON.parse(s)) } catch (e) { console.error("Error parsing JSON:", e, s) }
        });
    } catch (e) { console.error("Error processing lazy-config:", e) }
    const propMap = {
        bg: 'background-color', c: 'color', round: 'border-radius', ml: 'margin-left', m: 'margin', mr: 'margin-right',
        mt: 'margin-top', mb: 'margin-bottom', pl: 'padding-left', p: 'padding', pr: 'padding-right', pt: 'padding-top',
        pb: 'padding-bottom', l: { p: 'left', pos: 1 }, r: { p: 'right', pos: 1 }, t: { p: 'top', pos: 1 }, b: { p: 'bottom', pos: 1 },
        fs: 'font-size', border: 'border', gap: 'gap'};
    const escapeCls = cls => cls.replace(/([#%(),\[\]{}|*?+.^$])/g, '\\$1');
    new Set([...document.querySelectorAll('*')].flatMap(e => [...e.classList])).forEach(cls => {
        if (processed.has(cls)) return;
        processed.add(cls);
        const pseudo = cls.match(/^(hover|active)-\((.*?)\)$/);
        if (pseudo) {
            const [pseudoType, styles] = [pseudo[1], pseudo[2]];
            const combined = styles.split(',').map(s => {
                s = s.replace(/_/g, ' ');
                let rule = '', match;
                if (match = s.match(/^(hw|mp)-\[(.*?)\]$/)) {
                    const [type, vals] = [match[1], match[2].split(',').map(v => v.trim())];
                    if (type === 'hw') {
                        const [h, w] = vals.length > 1 ? vals : [vals[0], vals[0]];
                        rule += `height:${h};width:${w};`;
                    } else if (type === 'mp') {
                        const [m, p] = vals.length > 1 ? vals : [vals[0], vals[0]];
                        rule += `margin:${m};padding:${p};`;}}
                else if (match = s.match(new RegExp(`^(${Object.keys(propMap).join('|')})-\\[(.*?)\\]$`))) {
                    const [prop, val] = [match[1], match[2]];
                    const propDef = propMap[prop];
                    rule += typeof propDef === 'object' ? `${propDef.p}:${val}${propDef.pos ? ';position:absolute' : ''};` : `${propDef}:${val};`;}
                else if (match = s.match(/^(\w+)-\{(.*?)\}$/)) {
                    const [prop, key] = [match[1], match[2]];
                    const val = config[key];
                    if (val) {
                        const propDef = propMap[prop];
                        if (propDef) {
                            rule += typeof propDef === 'object' ? `${propDef.p}:${val}${propDef.pos ? ';position:absolute' : ''};` : `${propDef}:${val};`;}}}
                return rule;
            }).join('');
            if (combined) {
                console.log(`Generated pseudo-class: ${cls} (${pseudoType} state)`);
                css.push(`.${escapeCls(cls)}:${pseudoType}{${combined}}`);}}
        else {
            const style = cls.replace(/_/g, ' ');
            let rule = '', match;
            if (match = style.match(/^(hw|mp)-\[(.*?)\]$/)) {
                const [type, vals] = [match[1], match[2].split(',').map(v => v.trim())];
                if (type === 'hw') {
                    const [h, w] = vals.length > 1 ? vals : [vals[0], vals[0]];
                    rule += `height:${h};width:${w};`;
                } else if (type === 'mp') {
                    const [m, p] = vals.length > 1 ? vals : [vals[0], vals[0]];
                    rule += `margin:${m};padding:${p};`;}}
            else if (match = style.match(new RegExp(`^(${Object.keys(propMap).join('|')})-\\[(.*?)\\]$`))) {
                const [prop, val] = [match[1], match[2]];
                const propDef = propMap[prop];
                rule += typeof propDef === 'object' ? `${propDef.p}:${val}${propDef.pos ? ';position:absolute' : ''};` : `${propDef}:${val};`;}
            else if (match = style.match(/^(\w+)-\{(.*?)\}$/)) {
                const [prop, key] = [match[1], match[2]];
                const val = config[key];
                if (val) {
                    const propDef = propMap[prop];
                    if (propDef) {
                        rule += typeof propDef === 'object' ? `${propDef.p}:${val}${propDef.pos ? ';position:absolute' : ''};` : `${propDef}:${val};`;}}}
            if (rule) {
                css.push(`.${escapeCls(cls)}{${rule}}`);}}});
    style.textContent = css.join('');
    console.log("Hello and welcome to Lazy CSS! This is an early version, so it may contain bugs. For development, you can use the CDN links provided. However, for production, it’s recommended to download the CSS and JS files directly from GitHub. Thank you, and happy styling with Lazy CSS!");});
