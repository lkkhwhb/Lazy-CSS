function generateDynamicStyles() {
  const styleElement = document.createElement('style');
  document.head.appendChild(styleElement);
  const styleSheet = styleElement.sheet;
  function insertCSSRule(rule) {
    try {
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    } catch (e) {
      console.warn("Could not insert rule:", rule, e);
    }
  }
  const propertyMap = {
    'h': 'height',
    'w': 'width',
    'm': 'margin',
    'mt': 'margin-top',
    'mb': 'margin-bottom',
    'ml': 'margin-left',
    'mr': 'margin-right',
    'p': 'padding',
    'pt': 'padding-top',
    'pb': 'padding-bottom',
    'pl': 'padding-left',
    'pr': 'padding-right',
    't': 'top',
    'b': 'bottom',
    'l': 'left',
    'r': 'right',
    'round': 'border-radius',
    'c': 'color',
    'bg': 'background-color',
  };
  function generateRules(element, className) {
    for (const prefix in propertyMap) {
      const property = propertyMap[prefix];
      let match;
      if (['h', 'w', 'm', 'mt', 'mb', 'ml', 'mr', 'p', 'pt', 'pb', 'pl', 'pr', 't', 'b', 'l', 'r', 'round'].includes(prefix)) {
        match = className.match(new RegExp(`^(${prefix})-(\\d+(?:\\.\\d+)?)(px|rem|em|vh|dvh|vw|%)$`));
        if (match) {
          const value = match[2];
          const unit = match[3] || 'px'; 
          insertCSSRule(`.${className} { ${property}: ${value}${unit}; }`);
          return true; 
        }
      }
      if (['c', 'bg'].includes(prefix)) {
        match = className.match(new RegExp(`^(${prefix})-([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)$`));
          if (match) {
              const colorName = match[2];
              insertCSSRule(`.${className} { ${property}: ${colorName}; }`);
              return true; 
          }
      }
    }
      return false; 
  }
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    const classList = element.classList;
    for (const className of classList) {
      generateRules(element, className);
    }
  });
}
document.addEventListener('DOMContentLoaded', generateDynamicStyles);
