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
    const escapeCls=cls=>cls.replace(/([#%\[\]{}()|*?+.^$])/g,'\\$1'),propMap={
        bg:'background-color',c:'color',round:'border-radius',ml:'margin-left',m:'margin',mr:'margin-right',
        mt:'margin-top',mb:'margin-bottom',pl:'padding-left',p:'padding',pr:'padding-right',pt:'padding-top',
        pb:'padding-bottom',l:{p:'left',pos:1},r:{p:'right',pos:1},t:{p:'top',pos:1},b:{p:'bottom',pos:1},
        fs:'font-size',border:'border'
    },sideMap={ml:'margin-left',mr:'margin-right',mt:'margin-top',mb:'margin-bottom',m:'margin',
        pl:'padding-left',pr:'padding-right',pt:'padding-top',pb:'padding-bottom',p:'padding'};
    let css='';
    document.querySelectorAll("*").forEach(el=>{
        el.classList.forEach(cls=>{
            const sCls=escapeCls(cls),m=cls.match(/^(hw|h|w|bg|c|round|fs|border|gap)-\[(.*?)\]$/);
            if(m){
                const[p,v]=[m[1],m[2]];
                if(p==='hw')css+=`.${sCls}{height:${v};width:${v};}\n`;
                else if(p==='h'||p==='w')css+=`.${sCls}{${p==='h'?'height':'width'}:${v};}\n`;
                else if(p==='bg'||p==='c'||p==='round'||p==='fs'||p==='gap')css+=`.${sCls}{${{
                    bg:'background-color',c:'color',round:'border-radius',fs:'font-size',gap:'gap'}[p]}:${v};}\n`;
                else if(p==='border')css+=`.${sCls}{border:${v.replace(/_/g,' ')};}\n`;
            }
            const m2=cls.match(/^(ml|mr|mt|mb|m|pl|pr|pt|pb|p)-\[(.+?)\]$/);
            if(m2)css+=`.${sCls}{${sideMap[m2[1]]}:${m2[2]};}\n`;
            const m3=cls.match(/^(l|r|t|b)-\[(.+?)\]$/);
            if(m3)css+=`.${sCls}{${m3[1]==='l'?'left':m3[1]==='r'?'right':m3[1]==='t'?'top':'bottom'}:${m3[2]};position:absolute;}\n`;
            const m4=cls.match(/^(\w+)-\{(.+?)\}$/);
            if(m4){
                const[p,key]=[m4[1],m4[2]],val=config[key];
                if(val===void 0)return console.warn(`Config "${key}" missing for "${cls}"`);
                const pm=propMap[p];
                if(!pm)return console.warn(`Unknown prefix: ${p} in ${cls}`);
                const [prop,pos]=typeof pm==='object'?[pm.p,pm.pos]:[pm,0];
                css+=`.${sCls}{${prop}:${val}${pos?';position:absolute':''};}\n`;
            }
            const m5=cls.match(/^p-\[(.+?)\]$/);
            if(m5){
                const v=m5[1].split(' ');
                css+=v.length===2?`.${sCls}{padding:${v[0]} ${v[1]};}\n`:
                    v.length===4?`.${sCls}{padding:${v.join(' ')};}\n`:'';
            }
        })
    });
    style.textContent=css;
    console.log("Hello and welcome to Lazy CSS! This is an early version, so it may contain bugs. For development, you can use the CDN links provided. However, for production, it’s recommended to download the CSS and JS files directly from GitHub. Thank you, and happy styling with Lazy CSS!");
});
