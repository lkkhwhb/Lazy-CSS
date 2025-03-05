document.addEventListener("DOMContentLoaded",()=>{
    const link=document.head.appendChild(document.createElement("link"));
    link.rel="stylesheet",link.href="https://bhargavxyz738.github.io/Lazy-CSS/nonredable.css";
    const style=document.head.appendChild(document.createElement("style")),config={};
    const lazyConfig=document.getElementById('lazy-config');
    if(lazyConfig) try{
        lazyConfig.textContent.trim().split('\n').filter(l=>l).forEach(s=>{
            try{Object.assign(config,JSON.parse(s))}catch(e){console.error("Error parsing JSON:",e,s)}
        })
    }catch(e){console.error("Error processing lazy-config:",e)}
    const escapeCls=cls=>cls.replace(/([#%(),\[\]{}|*?+.^$])/g,'\\$1'),propMap={
        bg:'background-color',c:'color',round:'border-radius',ml:'margin-left',m:'margin',mr:'margin-right',
        mt:'margin-top',mb:'margin-bottom',pl:'padding-left',p:'padding',pr:'padding-right',pt:'padding-top',
        pb:'padding-bottom',l:{p:'left',pos:1},r:{p:'right',pos:1},t:{p:'top',pos:1},b:{p:'bottom',pos:1},
        fs:'font-size',border:'border',gap:'gap'
    },sideMap={ml:'margin-left',mr:'margin-right',mt:'margin-top',mb:'margin-bottom',m:'margin',
        pl:'padding-left',pr:'padding-right',pt:'padding-top',pb:'padding-bottom',p:'padding'};
    let css='';
    
    const parseStyle=style=>{
        let rule='',match;
        style=style.replace(/_/g,' ');
        
        if(match=style.match(/^(hw|mp)-\[(.*?)\]$/)){
            const[type,vals]=[match[1],match[2].split(',').map(v=>v.trim())];
            if(type==='hw'){
                const[h,w]=vals.length>1?vals:[vals[0],vals[0]];
                rule+=`height:${h};width:${w};`;
            }
            else if(type==='mp'){
                const[m,p]=vals.length>1?vals:[vals[0],vals[0]];
                rule+=`margin:${m};padding:${p};`;
            }
        }
        else if(match=style.match(/^(bg|c|round|fs|border|gap)-\[(.*?)\]$/)){
            rule+=`${propMap[match[1]]}:${match[2]};`;
        }
        else if(match=style.match(/^(ml|mr|mt|mb|m|pl|pr|pt|pb|p)-\[(.*?)\]$/)){
            rule+=`${sideMap[match[1]]}:${match[2]};`;
        }
        else if(match=style.match(/^(l|r|t|b)-\[(.*?)\]$/)){
            rule+=`${match[1]==='l'?'left':match[1]==='r'?'right':match[1]==='t'?'top':'bottom'}:${match[2]};position:absolute;`;
        }
        else if(match=style.match(/^(\w+)-\{(.*?)\}$/)){
            const[p,key]=[match[1],match[2]],val=config[key];
            if(!val)return '';
            const pm=propMap[p];
            if(!pm)return '';
            const[prop,pos]=typeof pm==='object'?[pm.p,pm.pos]:[pm,0];
            rule+=`${prop}:${val}${pos?';position:absolute':''};`;
        }
        else if(match=style.match(/^p-\[(.*?)\]$/)){
            const v=match[1].split(' ');
            rule+=`padding:${v.length===2?`${v[0]} ${v[1]}`:v.length===4?v.join(' '):v[0]};`;
        }
        return rule;
    };

    document.querySelectorAll("*").forEach(el=>{
        el.classList.forEach(cls=>{
            const pseudoMatch=cls.match(/^(hover|active)-\((.*?)\)$/);
            if(pseudoMatch){
                const[pseudo,styles]=[pseudoMatch[1],pseudoMatch[2]];
                let combined='';
                styles.split(',').forEach(s=>{
                    combined+=parseStyle(s.trim());
                });
                if(combined){
                    const escaped=escapeCls(cls);
                    css+=`.${escaped}:${pseudo}{${combined}}`;
                }
            }
            else{
                const rule=parseStyle(cls);
                if(rule){
                    const escaped=escapeCls(cls);
                    css+=`.${escaped}{${rule}}`;
                }
            }
        })
    });
    style.textContent=css;
    console.log("Lazy CSS initialized successfully!");
});
