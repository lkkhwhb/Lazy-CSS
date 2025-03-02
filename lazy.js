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
    'g': 'gap',
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
    'bc': 'border-color',  
    'bt': 'border-top-color',
    'bw': 'border-width',
    'bh': 'border-height',
    'bs': 'border-style'  
  };
  function generateRules(element, className) {
    const numericProperties = ['h', 'w', 'm', 'mt', 'mb', 'ml', 'mr', 'p', 'pt', 'pb', 'pl', 'pr', 't', 'b', 'l', 'r', 'round', 'g', 'bw', 'bh'];
    const colorProperties = ['c', 'bg', 'bc', 'bt'];
    const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden'];
    for (const prefix in propertyMap) {
      const property = propertyMap[prefix];
      let match;     
      if (numericProperties.includes(prefix)) {
        match = className.match(new RegExp(`^(${prefix})-(\\d+(?:\\.\\d+)?)(px|rem|em|vh|vw|%)$`));
        if (match) {
          const value = match[2];
          const unit = match[3];
          insertCSSRule(`.${className} { ${property}: ${value}${unit}; }`);
          return true;
        }
      }
      if (colorProperties.includes(prefix)) {
        match = className.match(new RegExp(`^(${prefix})-([a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)$`));
        if (match) {
          const colorName = match[2];
          insertCSSRule(`.${className} { ${property}: ${colorName}; }`);
          return true;
        }
      }
      if (prefix === 'bs') {
        match = className.match(/^bs-(solid|dashed|dotted|double|groove|ridge|inset|outset|none|hidden)$/);
        if (match) {
          insertCSSRule(`.${className} { border-style: ${match[1]}; }`);
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
