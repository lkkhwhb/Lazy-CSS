document.addEventListener("DOMContentLoaded", () => {
    const config = {}, css = [], processed = new Set();
    const propMap = {
        bg: 'background-color', c: 'color', round: 'border-radius', ml: 'margin-left', m: 'margin', mr: 'margin-right',
        mt: 'margin-top', mb: 'margin-bottom', pl: 'padding-left', p: 'padding', pr: 'padding-right', pt: 'padding-top',
        pb: 'padding-bottom', l: { p: 'left', pos: 1 }, r: { p: 'right', pos: 1 }, t: { p: 'top', pos: 1 }, b: { p: 'bottom', pos: 1 },
        fs: 'font-size', border: 'border', gap: 'gap'};
    const head = document.head;
    const escapeCls = cls => cls.replace(/([#%(),\[\]{}|*?+.^$])/g, '\\$1');
    const style = head.appendChild(document.createElement('style'));
    head.appendChild(document.createElement('link')).rel = 'stylesheet';
    head.lastChild.href = 'https://bhargavxyz738.github.io/Lazy-CSS/nonredable.css';
    try {
        const lazyConfig = document.getElementById('lazy-config');
        if (lazyConfig) {
            lazyConfig.textContent.trim().split('\n').filter(Boolean).forEach(s => {
                try { Object.assign(config, JSON.parse(s)) } catch (e) { console.error("Error parsing JSON:", e, s) }});}
    } catch (e) { console.error("Error processing lazy-config:", e) }
    const parseStyle = s => {
        s = s.replace(/_/g, ' ');
        let rule = '', match, [type, vals] = [];
        const addProp = (prop, val) => {
            const def = propMap[prop];
            rule += def ? typeof def === 'object' ? `${def.p}:${val}${def.pos ? ';position:absolute' : ''};` : `${def}:${val};` : '';};  
        if (match = s.match(/^(hw|mp)-\[(.*?)\]$/)) {
            [type, vals] = [match[1], match[2].split(',').map(v => v.trim())];
            const [a, b] = vals.length > 1 ? vals : [vals[0], vals[0]];
            rule = type === 'hw' ? `height:${a};width:${b};` : `margin:${a};padding:${b};`;
        } else if (match = s.match(new RegExp(`^(${Object.keys(propMap).join('|')})-\\[(.*?)\\]$`))) {
            addProp(match[1], match[2]);
        } else if (match = s.match(/^(\w+)-\{(.*?)\}$/)) {
            config[match[2]] && addProp(match[1], config[match[2]]);}
        return rule;};
    const generateRule = cls => {
        if (processed.has(cls)) return '';
        processed.add(cls);
        const pseudoMatch = cls.match(/^(hover|active)-\((.*?)\)$/);
        if (pseudoMatch) {
            const combined = pseudoMatch[2].split(',').map(parseStyle).join('');
            return combined ? `.${escapeCls(cls)}:${pseudoMatch[1]}{${combined}}` : '';}
        const rule = parseStyle(cls);
        return rule ? `.${escapeCls(cls)}{${rule}}` : '';};
    const processClasses = elements => {
        const newRules = [];
        elements.forEach(el => {
            [...el.classList].forEach(cls => {
                const rule = generateRule(cls);
                rule && newRules.push(rule);});});
        newRules.length && css.push(...newRules);};
    processClasses(document.querySelectorAll('*'));
    style.textContent = css.join('');
    const observer = new MutationObserver(mutations => {
        const elements = new Set();
        mutations.forEach(({ addedNodes, attributeName, target }) => {
            if (addedNodes) addedNodes.forEach(node => {
                node.nodeType === 1 && elements.add(node).add(...node.querySelectorAll('*'));});
            if (attributeName === 'class') elements.add(target);});
        processClasses([...elements]);
        style.textContent = css.join('');});
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']});
    console.log("Hello and welcome to Lazy CSS! This is an early version, so it may contain bugs. For development, you can use the CDN links provided. However, for production, it’s recommended to download the CSS and JS files directly from GitHub. Thank you, and happy styling with Lazy CSS!");});
