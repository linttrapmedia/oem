(()=>{function Ft(t){let e=t,n=[];return{get:()=>e,set:a=>(e=a,n.forEach(d=>d(e))),sub:a=>n.push(a)}}var Vt=()=>{},O={Atom:Ft,Serialize:Vt};function pt(t){let e=/</g,n=/>/g,o=/\t|\r|\uf8ff/g,r=/\\([\\\|`*_{}\[\]()#+\-~])/g,i=/^([*\-=_] *){3,}$/gm,a=/\n *&gt; *([^]*?)(?=(\n|$){2})/g,d=/\n( *)(?:[*\-+]|((\d+)|([a-z])|[A-Z])[.)]) +([^]*?)(?=(\n|$){2})/g,h=/<\/(ol|ul)>\n\n<\1>/g,x=/(^|[^A-Za-z\d\\])(([*_])|(~)|(\^)|(--)|(\+\+)|`)(\2?)([^<]*?)\2\8(?!\2)(?=\W|_|$)/g,y=/\n((```|~~~).*\n?([^]*?)\n?\2|((    .*?\n)+))/g,g=/((!?)\[(.*?)\]\((.*?)( ".*")?\)|\\([\\`*_{}\[\]()#+\-.!~]))/g,p=/\n(( *\|.*?\| *\n)+)/g,v=/^.*\n( *\|( *\:?-+\:?-+\:? *\|)* *\n|)/,R=/.*\n/g,b=/\||(.*?[^\\])\|/g,G=/(?=^|>|\n)([>\s]*?)(#{1,6}) (.*?)( #*)? *(?=\n|$)/g,q=/(?=^|>|\n)\s*\n+([^<]+?)\n+\s*(?=\n|<|$)/g,$=/-\d+\uf8ff/g;function L(T,w){t=t.replace(T,w)}function H(T,w){return"<"+T+">"+w+"</"+T+">"}function tt(T){return T.replace(a,function(w,M){return H("blockquote",tt(N(M.replace(/^ *&gt; */gm,""))))})}function et(T){return T.replace(d,function(w,M,_,A,Z,W){let j=H("li",N(W.split(RegExp(`
 ?`+M+"(?:(?:\\d+|[a-zA-Z])[.)]|[*\\-+]) +","g")).map(et).join("</li><li>")));return`
`+(_?'<ol start="'+(A?_+'">':parseInt(_,36)-9+'" style="list-style-type:'+(Z?"low":"upp")+'er-alpha">')+j+"</ol>":H("ul",j))})}function N(T){return T.replace(x,function(w,M,_,A,Z,W,j,Pt,ct,Gt){return M+H(A?ct?"strong":"em":Z?ct?"s":"sub":W?"sup":j?"small":Pt?"big":"code",N(Gt))})}function U(T){return T.replace(r,"$1")}let X=[],F=0;return t=`
`+t+`
`,L(e,"&lt;"),L(n,"&gt;"),L(o,"  "),t=tt(t),L(i,"<hr/>"),t=et(t),L(h,""),L(y,function(T,w,M,_,A){return X[--F]=H("pre",H("code",_||A.replace(/^    /gm,""))),F+"\uF8FF"}),L(g,function(T,w,M,_,A,Z,W){return X[--F]=A?M?'<img src="'+A+'" alt="'+_+'"/>':'<a href="'+A+'">'+U(N(_))+"</a>":W,F+"\uF8FF"}),L(p,function(T,w){let M=w.match(v)[1];return`
`+H("table",w.replace(R,function(_,A){return _==M?"":H("tr",_.replace(b,function(Z,W,j){return j?H(M&&!A?"th":"td",U(N(W||""))):""}))}))}),L(G,function(T,w,M,_){return w+H("h"+M.length,U(N(_)))}),L(q,function(T,w){return H("p",U(N(w)))}),L($,function(T){return X[parseInt(T)]}),t.trim()}var I=(t,...e)=>e.some(a=>a===void 0)?!1:typeof t=="function"?t():typeof t=="boolean"?t:typeof t<"u"?Boolean(t):!0,Wt=(t,e,n,o)=>I(o,n)?t.setAttribute(e,String(n)):t.removeAttribute(e),$t=(t,e)=>(...n)=>{t.sub(()=>e.apply(null,n))},Ut=(t,e,n,o,r,i)=>{I(i)&&(t.style.display="flex",t.style.flexDirection=e??"row",t.style.justifyContent=o??"start",t.style.alignItems=r??"start",t.style.gap=n?`${n}px`:"0px")},jt=(t,e)=>I(e)?t.focus:null,Kt=(t,e,n)=>{let o=e();t.innerHTML="",I(n,e)&&o&&(Array.isArray(o)?o.forEach(r=>t.appendChild(r)):t.appendChild(o))},Yt=(t,e,n)=>{let o=e();I(n,e)&&(t.innerText="",t.innerText=String(o))},qt=(t,e)=>t.addEventListener("change",e),Xt=(t,e)=>t.addEventListener("input",()=>e(t.value)),Zt=(t,e,n)=>{I(n,e)&&t.addEventListener("click",e)},Qt=(t,e)=>e(t),Jt=(t,e)=>window.addEventListener("load",()=>e(t)),te=(t,e)=>t.addEventListener("mouseout",e),ee=(t,e)=>t.addEventListener("mouseover",e),ne=(t,e)=>{new ResizeObserver(o=>{for(let r of o){let i=Array.isArray(r.contentBoxSize)?r.contentBoxSize[0]:r.contentBoxSize;e({width:i.inlineSize,height:i.blockSize})}}).observe(t)},oe=(t,e)=>t.addEventListener("submit",n=>{n.preventDefault(),e()}),re=(t,e)=>t.addEventListener("input",()=>e(t.value)),se=(t,e)=>t.addEventListener("input",()=>e(t.innerText)),ie=(t,e)=>{window.addEventListener("resize",()=>{e({width:window.innerWidth,height:window.innerHeight})})},le=(t,e,n,o)=>{if(I(o,n)){let r="print-style",i=r+"-"+globalThis.crypto.randomUUID(),a=document.getElementById(r);a||(a=document.createElement("style"),a.id=r,a.setAttribute("type","text/css"),a.setAttribute("media","print"),document.getElementsByTagName("head")[0].appendChild(a));let d=a.sheet,h=e.replace(/([A-Z])/g,"-$1").toLowerCase(),x=typeof n=="function"?n():n;d.insertRule(`.${i} { ${h}:${x} !important; }`,0),t.classList.add(i)}},ae=(t,e)=>t.src=e,mt=(t,e,n,o)=>{if(!I(o,n))return;let r=t.style,i=typeof n=="function"?n(t):n;return r[e]=i,r},ce=(t,e,n,o,r)=>{if(I(r,n)){let i=o??t.style[e];t.addEventListener("mouseover",()=>t.style[e]=n),t.addEventListener("mouseout",()=>t.style[e]=i)}},pe=(t,e,n)=>{new ResizeObserver(r=>{for(let i of r){let a=Array.isArray(i.contentBoxSize)?i.contentBoxSize[0]:i.contentBoxSize;t.style[e]=n({width:a.inlineSize,height:a.blockSize})}}).observe(t)},me=(t,e,n)=>{let o=()=>t.style[e]=n({width:window.innerWidth,height:window.innerHeight});o(),window.addEventListener("resize",o)},de=(t,e,n)=>I(n,e)?e.forEach(([o,r])=>mt(t,o,r,n)):null,ue=(t,e,n)=>t.setAttribute(e,String(n)),ye=(t,e,n)=>I(n,e)?t.value=typeof e=="string"?e:e():"blank",s={Attr:Wt,Atom:$t,Flex:Ut,Focus:jt,InnerHtml:Kt,InnerText:Yt,OnChange:qt,OnColorInput:Xt,OnClick:Zt,OnCreate:Qt,OnLoad:Jt,OnMouseOut:te,OnMouseOver:ee,OnResize:ne,OnSubmit:oe,OnTextInput:re,OnTextContentInput:se,OnWinResize:ie,PrintStyle:le,Src:ae,Style:mt,Styles:de,StyleOnHover:ce,StyleOnResize:pe,StyleOnWinResize:me,SvgAttr:ue,Value:ye};var nt;(d=>{let t={black:[326,2,13],brown:[28,11,14],blue:[203,81,49],purple:[270,38,40],red:[11,88,56],orange:[16,97,73],yellow:[47,98,55],green:[118,27,49],white:[0,4,98],transparent:"transparent"},e={Monospace:"monospace","Space Grotesk":"Space Grotesk, Arial, sans-serif","Times New Roman":"Times New Roman, sans-serif","Crimson Text":"Crimson Text, serif",Splash:"Splash, cursive",Primary:"Space Grotesk, Arial, sans-serif"};function n({colors:h,fonts:x}={}){let y={...t,...h},g={...e,...x};return{color:p=>p,font:p=>p}}n({colors:{aasd:[1,2,3]}}).color("aasd"),n().color("blue"),d.HtmlTagList=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","menu","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"],d.TraitsDefault={attr:s.Attr,style:s.Style,styles:s.Styles}})(nt||={});function ge(t={}){let e={...nt.TraitsDefault,...t};return nt.HtmlTagList.reduce((n,o)=>(n[o]=(...r)=>(...i)=>{let a=document.createElementNS("http://www.w3.org/1999/xhtml",o);return r.forEach(([d,...h])=>e[d](a,...h)),i.forEach(d=>{d instanceof Node&&a.appendChild(d),(typeof d=="string"||typeof d=="number")&&a.appendChild(dt(String(d)))}),a},n),{})}function fe(...t){let e=document.createDocumentFragment();return t.forEach(n=>{n instanceof Node&&e.appendChild(n),(typeof n=="string"||typeof n=="number")&&e.appendChild(dt(String(n)))}),e}function he(t){let e=document.createElement("div");return e.innerHTML=t.toString(),e.innerHTML}function xe(t,e){let n=document.createElement("div"),o=document.createDocumentFragment();if(e?.styles){let r=document.createElement("style");r.innerHTML=e.styles,document.getElementsByTagName("head")[0].appendChild(r)}for(n.innerHTML=pt(t);n.firstChild;)o.appendChild(n.firstChild);return o}var Te=t=>(e,...n)=>(...o)=>{let r=document.createElementNS("http://www.w3.org/2000/svg",e);return n.forEach(([i,...a])=>t[i](r,...a)),o.forEach(i=>{i instanceof Node&&r.appendChild(i),(typeof i=="string"||typeof i=="number")&&(r.innerHTML+=i)}),r},dt=t=>{let e=document.createElement("template"),n=/&/g,o=/</g,r=/</g,i=/"/g,a=/'/g,d=t.replace(n,"&amp;").replace(o,"&lt;").replace(r,"&gt;").replace(i,"&quot;").replace(a,"&#039;");return e.innerHTML=d,e.content},f={DangerouslySetInnerHTML:he,Html:ge,Markdown:xe,Fragment:fe,Svg:Te};var ut=(t,e={onStart:()=>{},delay:500})=>{let n=e.onStart!==void 0,o;return function(r){let i=()=>{n=!0,t(r)};o&&clearTimeout(o),n&&(e.onStart(),n=!1),o=setTimeout(i,e.delay??500,r)}};function yt({onReady:t,state:e,views:n}){let o=O.Atom(null),r=O.Atom(0),i=n.find(y=>y.transitionView),{div:a}=f.Html({"html@state":s.Atom(e,s.InnerHtml),"html@viewState":s.Atom(o,s.InnerHtml),on_resize:s.OnWinResize,style:s.Style}),d=()=>{let y=n.filter(g=>g.state===e.get()).filter(g=>(g.breakpoint??0)<=r.get()).pop();if(y)return y.view()},h=ut((y=x.offsetWidth)=>(r.set(y),o.set(d())),{delay:500,onStart:()=>i?o.set(i.view()):null}),x=a(["html@viewState",o.get],["html@state",d],["on_resize",({width:y})=>h(y)],["style","display","flex"],["style","minHeight","100%"],["style","width","100%"])(d());window.addEventListener("DOMContentLoaded",async()=>{let y=["*,::after,::before,body{box-sizing:border-box}","html,body{padding:0;margin:0;height:100%;min-height:100%;text-rendering:optimizeSpeed;}","a{color:inherit;cursor:pointer}","a,button,input,select,textarea{font:inherit}","img,picture{max-width:100%;display:block}","@media (prefers-reduced-motion:reduce){","html:focus-within{scroll-behavior:auto}","*,::after,::before{scroll-behavior:auto!important}","}"].join(""),g=document.createElement("style");g.innerHTML=y,document.head.appendChild(g),document.body.appendChild(x);let p=window.location.pathname+window.location.search,v=n.find(R=>R.route===p);console.log(v,p),v&&e.set(v.state),t&&t()})}var ot={black:[326,2,13],brown:[28,11,14],blue:[203,81,49],purple:[270,38,40],red:[11,88,56],orange:[16,97,73],yellow:[47,98,55],green:[118,27,49],white:[0,4,98],transparent:"transparent"},Se={Monospace:"monospace","Space Grotesk":"Space Grotesk, Arial, sans-serif","Times New Roman":"Times New Roman, sans-serif","Crimson Text":"Crimson Text, serif",Splash:"Splash, cursive",Primary:"Space Grotesk, Arial, sans-serif"};function D({colors:t,fonts:e}={}){let n={...ot,...t},o={...Se,...e};return{color:(a,d=1,h=0)=>{if(a==="transparent")return a;let[x,y,g]=n[a];return`hsla(${x}deg,${y}%,${g+h}%,${d})`},font:a=>o[a]}}var c={CONCEPTS:"/?page=concepts",CONTRIBUTING:"/?page=contributing",DESIGN_SYSTEM:"/?page=design-system",LOADING:"/?page=loading",OVERVIEW:"/?page=overview",SPLASH:"/?page=slash",STATE_MANAGEMENT:"/?page=state-management",STYLING:"/?page=styling",HTML:"/?page=html",CONFIG:"/?page=config"},gt=O.Atom("SPLASH"),{color:l,font:B}=D(),S=f.Html({attr:s.Attr,flex:s.Flex,on_click:s.OnClick,on_win_resize:s.OnWinResize,style_on_hover:s.StyleOnHover,style_on_print:s.PrintStyle,style_on_resize:s.StyleOnWinResize,style:s.Style,styles:s.Styles});var E=({content:t,next:e,prev:n})=>{let r=O.Atom("CLOSED"),i=()=>window.innerWidth<1400?"MOBILE":"TABLET",a=O.Atom(i()),d=[["Overview",c.OVERVIEW],["Concepts",c.CONCEPTS],["Html",c.HTML],["Styling",c.STYLING],["State",c.STATE_MANAGEMENT],["Design",c.DESIGN_SYSTEM],["Config",c.CONFIG],["Contributing",c.CONTRIBUTING]],h=()=>r.get()==="CLOSED",x=()=>r.get()==="OPEN",y=()=>a.get()==="MOBILE",g=()=>y()&&h(),p=()=>a.get()==="TABLET",v=()=>a.set(i()),R=()=>r.set(r.get()==="CLOSED"?"OPEN":"CLOSED"),{div:b,a:G}=f.Html({attr:s.Attr,on_click:s.OnClick,on_resize:s.OnResize,on_change:s.OnChange,style_on_hover:s.StyleOnHover,style:s.Style,style_on_win_change:s.Atom(a,s.Style),style_on_menu_change:s.Atom(r,s.Style)}),q=b(["style","gridArea","content-area"],["style","minWidth","0px"]),$=b(["on_resize",v],["style_on_win_change","gridTemplateAreas",'"menu-area content-area"',p],["style_on_win_change","gridTemplateAreas",'"menu-area" "content-area"',y],["style_on_win_change","gridTemplateColumns","auto",y],["style_on_win_change","gridTemplateColumns","min-content 1fr",p],["style_on_win_change","gridTemplateRows","auto",p],["style_on_win_change","gridTemplateRows","min-content 1fr",y],["style","color",l("black")],["style","display","grid"],["style","fontFamily",B("Space Grotesk")],["style","maxWidth",`${1400}px`],["style","minWidth","0px"],["style","gap","50px"],["style","padding","50px"],["style","margin","0 auto"]),L=b(["on_click",R],["style","cursor","pointer"],["style","borderTop",`5px solid ${l("black")}`],["style","borderBottom",`5px solid ${l("black")}`],["style_on_menu_change","borderBottom",`5px solid ${l("black")}`,h],["style_on_menu_change","borderBottom","0px",x],["style","height","13px"],["style","width","25px"],["style","display","block",y],["style","display","none",p],["style_on_win_change","display","block",y],["style_on_win_change","display","none",p]),H=G(["attr","href","/"],["style","letterSpacing","2px"],["style","fontSize","60px"],["style","textAlign","left"],["style","lineHeight","0.9"],["style","color",l("black")],["style","fontFamily",B("Splash")],["style","textDecoration","none"],["style","width","100%"]),tt=b(["style","display","flex"],["style","flexDirection","row"],["style","justifyContent","space-between"],["style","alignItems","center"]),et=b(["style","gridArea","menu-area"],["style","borderRight",`1px solid ${l("black",.1)}`,p],["style","minWidth","200px"],["style","display","flex"],["style","flexDirection","column"],["style","gap","30px"]),N=b(["style","display","none",g],["style","display","block",p],["style_on_menu_change","display","block",x],["style_on_win_change","display","block",p],["style_on_menu_change","display","none",g],["style_on_win_change","display","none",g]);function U(F,T){let w=T==="/"+window.location.search;return G(["attr","href",T],["style","color",l("black",.4),!w],["style","color",l("black"),w],["style","padding","5px 0"],["style","cursor","pointer"],["style","display","block"],["style_on_hover","color",l("black")],["style","textDecoration","none"])(F)}let X=b(["style","textAlign","center"],["style","display","flex"],["style","justifyContent","space-between"],["style","alignItems","center"],["style","margin","50px 0"],["style","backgroundColor",l("black",.02)],["style","borderRadius","50px"])(n?G(["attr","href",n[1]],["style_on_hover","color",l("black",.25),l("black",.5)],["style","color",l("black",.5)],["style","fontSize","16px"],["style","padding","20px"],["style","textDecoration","none"],["style","transition","0.25s"])("\u2190 ",n[0]):null,e?G(["attr","href",e[1]],["style_on_hover","color",l("black",.25),l("black",.5)],["style","color",l("black",.5)],["style","fontSize","16px"],["style","padding","20px"],["style","textDecoration","none"],["style","transition","0.25s"])(e[0]," \u2192 "):null);return $(et(tt(H("oem"),L("")),N(...d.map(([F,T])=>U(F,T)))),q(t,X))};var{div:ft,a:be,section:ve}=S,m=({title:t,subtitle:e,content:n})=>ve(["flex","column",20],["style","width","100%"])(t&&be(["attr","href",`#${t}`],["attr","id",t],["style","fontSize","24px"],["style","color",l("black")],["style","textDecoration","none"])(f.Markdown(t,{styles:"p {margin:0;}"})),e&&ft(["style","color",l("black",.5)],["style","fontSize","16px"],["style","fontStyle","oblique"])(f.Markdown(e,{styles:"p {margin:0;}"})),n&&ft(["style","color",l("black",.6)],["style","fontSize","16px"],["style","position","relative"],["style","width","100%"])(n));var C=({color:t=D().color("blue"),disabled:e=!1,iconLeft:n,iconRight:o,onClick:r,size:i="MD",text:a="Button",textColor:d=D().color("white"),variant:h="OUTLINE"})=>{let{button:x,span:y}=f.Html({on_click:s.OnClick,style_on_hover:s.StyleOnHover,style:s.Style,styles:s.Styles}),g=(G,q)=>{let $=G.split(",");return $.splice(3,1,q),$.join(",")},p={XS:"12px",SM:"14px",MD:"16px",LG:"20px"},v={XS:"8px 15px",SM:"10px 20px ",MD:"14px 20px",LG:"16px 24px"},R={XS:"10px",SM:"12px",MD:"12px",LG:"16px"},b={OUTLINE:{backgroundColor:"transparent",borderColor:g(t,"0.6"),borderColorOnHover:g(t,"1"),textColor:g(t,"0.6"),textColorOnHover:g(t,"1")},SOLID:{backgroundColor:g(t,"0.6"),backgroundColorOnHover:g(t,"1"),borderColor:g(t,"0"),textColor:g(d,"1")},GHOST:{backgroundColor:"transparent",backgroundColorOnHover:g(t,"0.25"),borderColor:"transparent",textColor:t},LINK:{backgroundColor:"transparent",borderColor:"transparent",textColor:g(t,"0.75"),textColorOnHover:t}};return x(["on_click",r,!e],["style_on_hover","backgroundColor",b[h].backgroundColorOnHover,b[h].backgroundColor,!e],["style_on_hover","borderColor",b[h].borderColorOnHover,b[h].borderColor,!e],["style_on_hover","color",b[h].textColorOnHover,b[h].textColor,!e],["style","alignItems","center"],["style","backgroundColor",b[h].backgroundColor],["style","borderColor",b[h].borderColor],["style","borderRadius","5px"],["style","borderStyle","solid"],["style","borderWidth","2px"],["style","color",b[h].textColor],["style","cursor","pointer"],["style","display","flex"],["style","filter","grayscale(100%)",e],["style","fontFamily","Arial"],["style","fontSize",p[i]],["style","gap",R[i]],["style","justifyContent","center"],["style","opacity",.55,e],["style","padding",v[i]],["style","textTransform","uppercase"],["style","transition","all 0.5s"],["style","wordBreak","keep-all"])(n&&y(["style","marginLeft",`calc(${R[i]} * -0.25)`])(n),y()(a),o&&y(["style","marginRight",`calc(${R[i]} * -0.25)`])(o))};var u=(t,e="typescript")=>{let n=Prism.highlight(t,Prism.languages[`${e}`]),{div:o}=f.Html({prism:r=>r.innerHTML=n,style_on_resize:s.StyleOnResize,style:s.Style});return o(["style","width","100%"])(o(["style","overflowX","auto"],["style","borderRadius","5px"],["style","border",0],["style","backgroundColor",l("black",.02)],["style","fontSize","14px"],["style","lineHeight","1"],["style","fontFamily","monospace"],["style","display","flex"],["style","color",l("black",.5)],["style","padding","20px"])(o(["style","whiteSpace","pre"],["prism"])()))};var{div:V}=S,Q=V(["style","fontSize","20px"]),we=V(["style","fontSize","16px"]),Ce=V(["flex","column",20],["style","width","100%"]),k=()=>alert("Clicked!"),ht=V(["flex","row",40])(Ce(we("Buttons exist as first class UI/UX design citizens and are used in so many different contexts they can be tricky to get right. If you're app is formulaic and form heavy then a single set of button components is a good idea, if however button design is more fluid you may opt to create subsets in context."),Q("Interface"),u(`type ButtonProps = {
  color?: string
  disabled?: boolean
  iconLeft?: string | HTMLElement
  iconRight?: string | HTMLElement
  onClick: () => void
  size?: 'XS' | 'SM' | 'MD' | 'LG'
  text: string
  textColor?: string
  variant?: 'OUTLINE' | 'SOLID' | 'GHOST' | 'LINK'
}
`),Q("Style Variations"),u(`Button({ text: 'Button', variant: 'OUTLINE' }),
Button({ text: 'Button', variant: 'SOLID' }),
Button({ text: 'Button', variant: 'GHOST' }),
Button({ text: 'Button', variant: 'LINK' }),
`),V(["flex","row",20],["style","flexWrap","wrap"])(C({onClick:k,text:"Button",variant:"OUTLINE"}),C({onClick:k,text:"Button",variant:"SOLID"}),C({onClick:k,text:"Button",variant:"GHOST"}),C({onClick:k,text:"Button",variant:"LINK"})),Q("Sizing"),u(`Button({ text: 'Button', size: 'LG' })
Button({ text: 'Button', size: 'MD' })
Button({ text: 'Button', size: 'SM' })
Button({ text: 'Button', size: 'XS' })
`),V(["flex","row",20],["style","flexWrap","wrap"])(C({onClick:k,text:"Button",size:"LG"}),C({onClick:k,text:"Button",size:"MD"}),C({onClick:k,text:"Button",size:"SM"}),C({onClick:k,text:"Button",size:"XS"})),Q("Color"),u(`Button({ text: 'Button', color: color('green') }),
Button({ text: 'Button', color: color('red') }),
Button({ text: 'Button', color: color('blue') }),
Button({ text: 'Button', color: color('orange') }),
// Button({ text: 'Button', color: color('ANY COLOR VALUE') }),
`),V(["flex","row",20],["style","flexWrap","wrap"])(C({onClick:k,text:"Button",color:l("green")}),C({onClick:k,text:"Button",color:l("red")}),C({onClick:k,text:"Button",color:l("blue")}),C({onClick:k,text:"Button",color:l("orange")})),Q("State"),u(`Button({ text: 'Button', disabled: true }),
Button({ text: 'Button', disabled: false }),
Button({ text: 'Button', color: color('red'), disabled: true }),
Button({ text: 'Button', color: color('red'), disabled: false }),
`),V(["flex","row",20],["style","flexWrap","wrap"])(C({onClick:k,text:"Button",disabled:!0}),C({onClick:k,text:"Button",disabled:!1}),C({onClick:k,text:"Button",color:l("red"),disabled:!0}),C({onClick:k,text:"Button",color:l("red"),disabled:!1}))));var K=O.Atom(null),{div:P}=f.Html({flex:s.Flex,on_mouse_over:s.OnMouseOver,on_mouse_out:s.OnMouseOut,style:s.Style,style_on_change:s.Atom(K,s.Style),style_on_winsize:s.StyleOnWinResize}),Ee=Object.keys(ot).filter(t=>t!=="transparent"),rt=(t,e,n)=>P(["on_mouse_out",()=>K.set(null)],["on_mouse_over",()=>K.set(n)],["style_on_change","backgroundColor",l("black",.2),()=>K.get()!==n],["style_on_change","backgroundColor",t,()=>K.get()===n],["style_on_change","backgroundColor",t,()=>K.get()===null],["style","backgroundColor",t],["style","border",`1px solid ${l("black",.2)}`],["style","borderRadius","3px"],["style","cursor","pointer"],["style","height","100px"],["style","position","relative"],["style","transition","all 0.5s"],["style","transitionDelay","all 0.25s"],["style","width","100%"])(P(["style","backgroundColor",l("black",.3)],["style","bottom","0"],["style","boxSizing","border-box"],["style","color",l("white")],["style","display","inline-flex"],["style","fontSize","11px"],["style","lineHeight","2"],["style","padding","3px 10px"],["style","position","absolute"],["style","width","100%"],["style","fontFamily",B("Monospace")])(`color(${e})`)),st=({width:t})=>`repeat(${t>=700?"3":"1"}, minmax(0, 1fr))`,it=P(["style","fontSize","20px"]),lt=P(["style","fontSize","16px"]),at=P(["flex","column",20],["style","width","100%"]),xt=P(["flex","column",40])(at(it("Palette"),lt(f.Markdown("The main color palette is accessible through the `Theme().color` function.")),u("const { color } = Theme();"),P(["style","display","grid"],["style","gridTemplateColumns","repeat(3, minmax(0, 1fr))"],["style","gap","20px"],["style","width","100%"],["style_on_winsize","gridTemplateColumns",st])(...Ee.map((t,e)=>rt(l(t),`'${t}'`,e)))),at(it("Override & Customize"),lt("Need to break away from the main theme's color definition?"),u(`const { color } = Theme({ 
  colors: { 
    // overriding red
    red: [0, 98, 44], 
    // overriding blue
    blue: [235, 100, 50], 
    // adding a custom color 
    whatevs: [313, 100, 50],
    // rest of the colors stay the same
    // ...
  }
});`),P(["style","display","grid"],["style","gridTemplateColumns","repeat(3, minmax(0, 1fr))"],["style","gap","20px"],["style","width","100%"],["style_on_winsize","gridTemplateColumns",st])(...["red","blue","whatevs"].map((t,e)=>rt(D({colors:{red:[0,98,44],blue:[235,100,50],whatevs:[313,100,50]}}).color(t),`'${t}'`,e)))),at(it("Adust Colors"),lt(f.Markdown("Being able to add opacity or tweak a color in context goes a long to keep color definitions under control without limiting design expression. The `color` function also accepts opacity and lightness parameters.")),u(`color('blue',0.5); // at 50% opacity
color('blue',1,-10); // darkened by 10%
color('blue',0.5, 0.5); // together`),P(["style","display","grid"],["style","gridTemplateColumns","repeat(3, minmax(0, 1fr))"],["style","gap","20px"],["style","width","100%"],["style_on_winsize","gridTemplateColumns",st])(...[["blue",.5,0],["blue",1,-10],["blue",.5,-10]].map((t,e)=>{let[n,o,r]=t;return rt(l("blue",o,r),`'${n}',${o},${r}`,e)}))));var{div:Tt,a:St}=S;function bt(){return E({prev:["State",c.STATE_MANAGEMENT],next:["Config",c.CONFIG],content:Tt(["flex","column",40])(m({title:"Design System",subtitle:'The OEM "Design System" makes no attempt at trying to be cool. Instead it is a mix of core functions, components, snippets, principles and design philosophy meant to strike the balance of managing overall complexity without getting in the way of design expression and product development.'}),m({title:"Quicklinks",content:Tt(["flex","row",20])(St(["attr","href","#Colors"])("Colors"),St(["attr","href","#Buttons"])("Buttons"))}),m({title:"Colors",content:xt}),m({title:"Buttons",content:ht}))})}var vt=()=>{let t=O.Atom(["Learn OEM"]),e=O.Atom([]),n=p=>t.set([...t.get(),p]),o=p=>t.set(t.get().filter(v=>v!==p)),r=p=>e.set([...e.get(),p]),i=p=>e.set(e.get().filter(v=>v!==p)),a=(p="")=>y.value=p,d=(p,v)=>()=>{p==="ADD"&&(n(y.value),a()),p==="TODO"&&(i(v),n(v)),p==="DONE"&&(o(v),r(v))},{input:h,div:x}=f.Html({attr:s.Attr,flex:s.Flex,on_click:s.OnClick,on_todos_change:s.Atom(t,s.InnerHtml),on_dones_change:s.Atom(e,s.InnerHtml),style:s.Style}),y=h(["attr","type","text"],["attr","placeholder","Enter Something"])(),g=()=>x(["flex","column",20])(x(["flex","row",20])(y,h(["attr","type","button"],["attr","value","add"],["on_click",d("ADD")])()),x(["flex","column",20],["style","cursor","pointer"],["style","display","none",t.get().length===0])(...t.get().map(p=>x(["on_click",d("DONE",p)])(p))),x(["flex","column",20],["style","textDecoration","line-through"],["style","cursor","pointer"],["style","display","none",e.get().length===0])(...e.get().map(p=>x(["on_click",d("TODO",p)])(p))));return x(["on_todos_change",g],["on_dones_change",g])(g())};var{div:ke}=S;function wt(){return E({prev:["Overview",c.OVERVIEW],next:["Html",c.HTML],content:ke(["flex","column",40])(m({title:"Concepts",subtitle:"The core concept of OEM is that you can create your own HTML and give it superpowers",content:f.Markdown("When compared to other UI libraries, OEM takes a fundamentally different approach for generating html, managing state and creating components. There is no central dom or templating engine. Instead there is a factory function (called `Template`) that is used to *declare your own HTML* in scope. While declaring a template, you add behaviors called *Traits*. A trait is a function you map onto a template instance in order to *add* behaviors such as reactivity and styling. This turns out to be a powerful abstraction because it can produce formulaic code that remains easy to read, change, test, extend at scale.")}),m({title:"Rendering Html",subtitle:"Create an template instance, use the returned tag functions to render dom elements",description:"By default a template can only output html tags (no attributes, styles, behaviors, etc.)",content:u(`const { div } = Template.Html();
div('Hello World')`,"typescript")}),m({title:"Adding Styling & Behavior",subtitle:'You then add behaviors to the template by mapping "traits". In this example we add styling to the templating engine.',description:"Here we map the `Trait.Style` trait which will enable inline css.",content:u(`const { div } = Template.Html({  style: Trait.Style });
div(['style', 'fontWeight', 'bold'])('Hello World')`)}),m({title:"Managing State",subtitle:'Lastly, we control State with "Atoms", which are simple but powerful event buses.',description:"Atoms are miniature event buses. We can use the Atom trait to map it to our template and listen for changes, reacting just like you would in a virtual dom.",content:u(`const text = State.Atom('Hi');
text.sub(console.log);  // subscribe to text changes`)}),m({title:"All Together",subtitle:"Here's a basic Todo list which implements: adding a new todo, marking a todo as done/not-done, sorting and styling in ~50 LOC.",content:vt()}),m({content:u(`
const TodoExample = () => {
  
  // State
  const todos = State.Atom<string[]>(['Learn OEM'])
  const dones = State.Atom<string[]>([])

  // Actions
  const addTodo = (item: string) => todos.set([...todos.get(), item])
  const removeTodo = (item: string) => todos.set(todos.get().filter(i => i !== item))
  const addDone = (item: string) => dones.set([...dones.get(), item])
  const removeDone = (item: string) => dones.set(dones.get().filter(i => i !== item))
  const setInput = (val: string = '') => (Input.value = val)

  // State Machine
  const action = (type: 'ADD' | 'TODO' | 'DONE', item?: string) => () => {
    if (type === 'ADD') addTodo(Input.value), setInput()
    if (type === 'TODO') removeDone(item), addTodo(item)
    if (type === 'DONE') removeTodo(item), addDone(item)
  }

  // Template
  const { input, div } = Template.Html({
    attr: Trait.Attr,
    flex: Trait.Flex,
    on_click: Trait.OnClick,
    on_todos_change: Trait.Atom(todos, Trait.InnerHtml),
    on_dones_change: Trait.Atom(dones, Trait.InnerHtml),
    style: Trait.Style,
  })

  // Html
  const Input = input(
    ['attr', 'type', 'text'],
    ['attr', 'placeholder', 'Enter Something'],
  )() as HTMLInputElement

  const Content = () =>
    div(['flex', 'column', 20])(
      div(['flex', 'row', 20])(
        Input,
        input(['attr', 'type', 'button'], ['attr', 'value', 'add'], ['on_click', action('ADD')])(),
      ),
      div(
        ['flex', 'column', 20],
        ['style', 'display', 'none', todos.get().length === 0],
      )(...todos.get().map(i => div(['on_click', action('DONE', i)])(i))),
      div(
        ['flex', 'column', 20],
        ['style', 'textDecoration', 'line-through'],
        ['style', 'display', 'none', dones.get().length === 0],
      )(...dones.get().map(i => div(['on_click', action('TODO', i)])(i))),
    )

  return div(['on_todos_change', Content], ['on_dones_change', Content])(Content())
}`)}))})}var{div:Oe,p:Qn}=S;function Ct(){return E({prev:["Design System",c.DESIGN_SYSTEM],next:["Contributing",c.CONTRIBUTING],content:Oe(["flex","column",40])(m({title:"Config",subtitle:"OEM can be configured to operate as a SPA (Single Page Application), a MPA (Multi-Page Application), a Library, a static site generator and any combination thereof. The assets, typescript to be compiled, html and dev servers are all configured separately. This keeps both the config and tasks code clean.",description:"See the `./oem.js` file for details",content:u(`// config.js
        
module.exports = {
  // copy asset folders
  asset: {
    'dist/app-one/assets': 'src/apps/app-one/assets',
    'dist/app-two/assets': 'src/apps/app-two/assets',
    ...
  },
  // specify the typescript files that need to be compiled
  typescript: {
    'dist/app-one/main-1.0.0.js': 'src/apps/app-one/main.ts',
    'dist/app-two/main-1.0.0.js': 'src/apps/app-two/main.ts',
    ...
  },
  // specify the html files that need to be compiled (each variable is available in the template)
  html: {
    'dist/app-one/index.html': {
      template: 'src/apps/app-one/template.html',
      title: 'And the Gospel',
      bundle: 'main-1.0.0.js',
    },
    'dist/app-two/index.html': {
      template: 'src/apps/app-two/template.html',
    },
   ...
  },
  // specify the folder and port for each "app" you want to serve
  devServers: {
    'dist/app-one': 3000,
    'dist/app-two': 3001,
    ...
  },
}

`)}),m({title:"Testing",subtitle:"Coming soon"}),m({title:"Deploying",subtitle:"Since you are specify where you want assets, html and js to be compiled/copied to it's up to you do what you will with the resulting artifacts. If you keep each app in it's own folder this should be as easy as copying its contents over into an S3 bucket.",content:u(`npm run build
npm run deploy // <= That's up to you! S3?`)}))})}function Et(){return E({content:f.Fragment(m({title:"Contributing",subtitle:"Go to our [github](https://github.com/linttrapmedia/oem) and do a PR!"}))})}var{div:J}=S;function kt(){return E({prev:["Concepts",c.CONCEPTS],next:["Styling",c.STYLING],content:J(["flex","column",40])(m({title:"Html",subtitle:"The core features and behavior of the template html come from the traits you add to it. This allows you to create your own domain specific language. ",content:f.Markdown("The Template engine is unique in that its behaviors are not universal. By declaring its properties and behaviors in a given context you are able specify varying degrees of abstraction for anything you can think of such as custom attributes, styling, event listeners, responsive behaviors, logging, etc. It also makes it incredibly easy to share functionality and behavior between templates, components, elements, functions and more.")}),m({title:"Traits",subtitle:"You can create your own traits or use one of the many that ship with the framework.",description:"The syntax and structure of traits have been carefully crafted to keep a balance between readability, composability, troubleshooting, intellisense features and the power of declarative code.",content:J(["flex","column",10,"start","start"])(...[["Atom","Calls a trait function when an atom changes"],["Attr","Adds an attribute to a dom element."],["Flex","Add flexbox styles on one line"],["Focus","Listens for focus events on a dom element."],["InnerHtml","Replaces html content of a dom element."],["InnerText","Replaces text content of a dom element."],["OnChange","Listens for change events on a dom element."],["OnColorInput","Listens for change events on a HTMLSelectElement."],["OnClick","Listens for click events on a dom element."],["OnCreate","Listens for create events on a dom element."],["OnLoad","Listens for load events on a dom element."],["OnMouseOut","Listens for mouseout events on a dom element."],["OnMouseOver","Listens for mouseover events on a dom element."],["OnResize","Listens for resize events on a dom element."],["OnSubmit","Listens for submit events on a dom element."],["OnTextInput","Listens for textinput events on a HTMLInputElement element."],["OnTextContentInput","Listens for textinput events on a dom element."],["OnWinResize","Listens for winresize events on a dom element."],["PrintStyle","Adds a style to a dom element in print mode"],["Style","Adds a style to a dom element."],["StyleOnHover","Changes styles on a dom element on hover"],["StyleOnResize","Changes styles on a dom element on element resize"],["StyleOnWinResize","Changes styles on a dom element on window resize"],["Styles","Adds a list of styles to a dom element."],["Value","Listens for value events on a dom element."]].map(([t,e])=>J(["flex","row",20],["style","flexWrap","wrap"])(J(["style","fontSize","18px"])(t),J(["style","fontSize","14px"])(e))))}),m({title:"Writing a Custom Trait",subtitle:"If you don't have a trait you need, write one! Writing a custom trait is easy. Here's an example:",content:f.Fragment(u(`// Define a trait function that takes in the HTMLElement as it's first param
const MyCustomTrait = (
  el: HTMLElement,
  prop: string,
  val: string
) => el.dataset[prop] = val


// Map it to a template
const { div } = Template.Html({
  my_custom_trait = MyCustomTrait
})

// Use it in a template tag function (where it will be intellisensed!)
div(['my_custom_trait','id','1'])('Sup!')

...

// Output result
<div data-id="1">Sup!<div>
  `))}))})}var Ot=t=>{let e=globalThis.crypto.randomUUID(),n=document.createElement("style");return document.getElementsByTagName("head")[0].appendChild(n),(()=>{n.innerHTML="";let i=[];Object.entries(t).sort((d,h)=>d[0]<h[0]?-1:1).forEach(([d,h])=>{i.push(`@keyframes ${d}_${e} {
`),h.forEach(([x,y,g])=>i.push(`${x}% { ${y.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${g}; }
`)),i.push(`}
`)}),n.innerHTML=i.join("")})(),(...i)=>i.map(a=>`${String(a)}_${e}`).join(", ")};function _t(t){let e={size:35,thickness:5,color:D().color("white"),speed:.35,...t},n=e.size+"px",o=e.size+"px",r=e.thickness+"px",i=Ot({rotate:[[0,"transform","rotate(0deg)"],[100,"transform","rotate(360deg)"]]}),{div:a}=f.Html({attr:s.Attr,style:s.Style});return a(["style","animationName",i("rotate")],["style","animationDuration",`${e.speed}s`],["style","animationIterationCount","infinite"],["style","animationTimingFunction","linear"],["style","display","block"],["style","width",n],["style","height",n])(a(["style","border",`${r} solid ${e.color}`],["style","borderRadius","50%"],["style","borderTop",`${r} solid ${D().color("transparent")}`],["style","width",o],["style","height",o])())}function Lt(){let{div:t}=S;return t(["style","backgroundColor",l("black")],["style","width","100%"],["style","display","flex"],["style","alignItems","center"],["style","justifyContent","center"])(_t())}function Ht(){let t=O.Atom(0),e=()=>t.set(t.get()+1),n=()=>t.set(t.get()-1),o=()=>t.set(0),{div:r,button:i}=f.Html({on_click:s.OnClick,on_count:s.Atom(t,s.InnerText),style:s.Style,flex:s.Flex});return r(["flex","row",30],["style","fontSize","36px"],["style","cursor","pointer"])(i(["on_click",n],["style","cursor","pointer"])("-"),r(["on_count",t.get],["on_click",o])(t.get()),i(["on_click",e],["style","cursor","pointer"])("+"))}var{div:_e}=S;function Mt(){return E({next:["Concepts",c.CONCEPTS],prev:["Home","/"],content:_e(["flex","column",40])(m({title:"Overview",subtitle:"Think React + Redux + Tailwind + Material UI Together In A Single Syntax",content:"OEM is a dependency-free UI/UX framework and monorepo/micro-frontend platform. It uses a unique declarative syntax to control style and behavior inline which is expressive and easy to read at scale. The core framework is only a handful of modules that are easy to grok while the _extended_ framework includes a library of take-it-or-leave it features including a full blown design system. The overall architecture includes a set of highly configurable dev tasks which allows you to manage multiple apps as a monorepo and/or microfrontend."}),m({title:"Setup",subtitle:"Clone, Install, Start",content:u(`npm i
npm start`,"bash")}),m({title:"A Quick Example",subtitle:"A simple counter"}),m({content:Ht()}),m({content:u(`function CounterExample() {
  const count = State.Atom(0);
  const inc = () => count.set(count.get() + 1);
  const dec = () => count.set(count.get() - 1);
  const reset = () => count.set(0);

  const { div, button } = Template.Html({
    on_click: Trait.OnClick,
    on_count: Trait.Atom(count, Trait.InnerText),
    style: Trait.Style,
    flex: Trait.Flex,
  });

  return div(['flex', 'row', 30])(
    button(['on_click', dec], ['style', 'cursor', 'pointer'])('-'),
    div(['on_count', count.get], ['on_click', reset])(count.get()),
    button(['on_click', inc], ['style', 'cursor', 'pointer'])('+'),
  );
}`)}))})}var{a:zt,div:z,img:At}=S,It=t=>zt(["attr","href",t],["style","fontSize","12px"],["style","fontWeight","bold"],["style","padding","15px 20px"],["style","color",l("black",.8)],["style","cursor","pointer"],["style","margin","0 5px"],["style","textDecoration","none"],["style","borderRadius","5px"],["style","letterSpacing","2px"],["style","textTransform","uppercase"],["style","border",`3px solid ${l("black",.2)}`],["style_on_hover","border",`3px solid ${l("black")}`,`3px solid ${l("black",.2)}`]),Le=z(["style","letterSpacing","2px"],["style","fontSize","120px"],["style","textAlign","center"],["style","textIndent","18px"],["style","lineHeight","0.9"],["style","padding","30px 0px 20px"],["style","color",l("black")],["style","fontFamily",B("Splash")]),He=z(["style","letterSpacing","2px"],["style","fontSize","16px"],["style","textTransform","uppercase"],["style","textTransform","uppercase"],["style","textAlign","center"],["style","textIndent","18px"],["style","lineHeight","1.1"],["style","padding","0px 20px 30px"],["style","color",l("black",.5)]),Me=z(["style","letterSpacing","0px"],["style","fontSize","10px"],["style","textAlign","center"],["style","textIndent","0px"],["style","lineHeight","0.9"],["style","padding","3px 5px"],["style","marginLeft","5px"],["style","borderRadius","3px"],["style","color",l("white")],["style","float","right"],["style","verticalAlign","super"],["style","backgroundColor",l("black",.4)],["style","fontFamily",B("Monospace")],["style","textTransform","uppercase"]),Ae=z(["style","letterSpacing","2px"],["style","textTransform","uppercase"],["style","letterSpacing","2px"],["style","fontWeight","bold"],["style","textAlign","center"],["style","lineHeight","1.1"],["style","margin","0 20px 30px"],["style","color",l("white")],["style","backgroundColor",l("black")],["style","padding","30px"],["style","transform","skew(-10deg)"],["style","borderRadius","5px"],["style_on_resize","fontSize",({width:t})=>t>800?"32px":"18px"]),Ie=z(["style","color",l("black",.7)],["style","fontSize","18px"],["style","margin","0px 20px 10px 20px"],["style","textAlign","center"],["style","lineHeight",1.5]),Dt=t=>zt(["style","marginLeft","10px"],["attr","href",t],["attr","target","_blank"]),De=z(["style","color",l("black",.3)],["style","fontSize","12px"],["style","cursor","pointer"],["style","margin","0px 10px 10px"],["style","textAlign","center"],["style","textTransform","uppercase"],["style","letterSpacing","2px"]),ze=z(["style","width","100%"],["style","padding","50px 0"],["style","minHeight","100vh"],["style","display","flex"],["style","justifyContent","center"],["style","alignItems","center"],["style","backgroundColor",l("white")],["style","fontFamily",B("Space Grotesk")]);function Rt(){return ze(z(["style","maxWidth","500px"],["style","display","flex"],["style","justifyContent","center"],["style","alignItems","center"],["style","flexDirection","column"])(Le("oem",Me("beta")),He("dependency-free web apps"),Ae('"dependencies": {}'),Ie(f.Markdown("OEM is a dependency-free UI/UX framework. It uses a isomorphic syntax to write declarative html, styling and behavior. The result is clean and expressive code that is easy to read.")),z(["style","margin","40px 20px"])(It(c.OVERVIEW)("Docs"),It(c.DESIGN_SYSTEM)("Design")),z(["style","display","flex"],["style","flexDirection","row"],["style","alignItems","center"],["style","paddingBottom","20px"])(Dt("http://linttrap.media")(At(["attr","src","/assets/gfx/lint-trap-logo.svg"],["attr","width",65])()),Dt("http://github.com/linttrapmedia/oem")(At(["attr","src","/assets/gfx/github.svg"],["attr","width",40])())),De(`OEM js ~ the dependency-free u framework.
copryright \xA9 2022 linttrapmedia.`)))}var{div:Re}=S;function Nt(){return E({prev:["Styling",c.STYLING],next:["Design",c.DESIGN_SYSTEM],content:Re(["flex","column",40])(m({title:"State",subtitle:"The `State.Atom` is a miniature event bus.",content:u(`// Create an atom
const msg = State.Atom('hello');

// get an atom
console.log(msg.get()); // outputs => 'hello'

// subscribe to an atom
msg.sub((val) => console.log(val));

// set an atom (which calls all subscribers)
msg.set('HELLO'); // outputs => 'HELLO'`)}),m({title:"Map State With The Atom Trait",subtitle:"Using the `Atom` trait gives you the reactivity you're used to in vdoms. Here's an example:",content:u(`// Create an atom
const textAtom = State.Atom(null);

// Create a template
const html = Template.Html({
  // map a text input listener
  on_text_input: Trait.OnTextInput,
  // now use the Atom Trait to map the textAtom to the innerText Trait
  on_text_update: Trait.Atom(textAtom, Trait.InnerText), 
});

// Output your html
return html('div')(
  // The textAtom is set on input
  html('input', ['on_text_input', textAtom.set])(),
  // The innerText updates each time the textAtom changes
  html('div', ['on_text_update', textAtom.get])(),
);`)}))})}var{div:Y}=S;function Bt(){return E({prev:["Html",c.HTML],next:["State",c.STATE_MANAGEMENT],content:Y(["flex","column",40])(m({title:"Styling",subtitle:'The `Styles` Trait has unique status among the other traits due to it\'s role as the main mechanism for adding styles to the dom. There are actually a "family" of `Style` Traits that support a number of rendering and styling scenarios making it significantly more powerful and expressive than CSS or inline styles alone.',description:'All features and behaviors in OEM are handled by "Traits", this includes things normally accomplished with CSS.'}),m({title:"Conditional Styling:",subtitle:"`Trait.Style` takes an optional boolean function or value as it's last argument which can be used for conditional rendering.",content:u(`const html = Template.Html({  style: Trait.Style });
const hello = div(
  ['style','fontWeight','bold', isActive], // render if isActive is true
  ['style','fontWeight','normal', !isActive] // render if isActive is false
)('Hello World')`)}),m({title:"Sharing Styles",subtitle:"`Trait.Styles` allows you to apply an array of styles which helps when sharing or propagating styles between components.",content:Y(["flex","column",40])(u(`const html = Template.Html({  styles: Trait.Styles });
const headerStyles = [['fontWeight','bold'],['textDecoration','underline']];
const headerOne = h1(['styles', headerStyles])('Main Header');
const headerTwo = h2(['styles', headerStyles])('Sub Header');`))}),m({title:"On Hover",subtitle:"`Trait.StyleOnHover` allows you declare styling inline, eliminating the need for CSS selectors",content:u(`const html = Template.Html({  style_on_hover: Trait.StyleOnHover });
const hello = div(['style_on_hover','color','red'])('Hello World')`)}),m({title:"Responsive Styles",subtitle:"`Trait.StyleOnWinResize` Allows you to define styles inline, eliminating the need for media queries.",content:Y(["flex","column",40])(u(`const html = Template.Html({  style_on_resize: Trait.StyleOnWinResize });
const getFontSize = ({width}) => width < 800 ? '12px' : '24px';
const hello = div(['style_on_resize','fontSize', getFontSize])('Hello Responsively Styled Text`),Y(["style_on_resize","fontSize",({width:t})=>t<800?"12px":"24px"])("Hello Responsively Styled Text"))}),m({title:"Print Styles",subtitle:"Apply a style on print!",content:Y(["flex","column",40])(u(`const html = Template.Html({ style_on_print: Trait.PrintStyle });
const hello = div(
  ['style', 'fontSize', '24px'],
  ['style_on_print', 'fontSize', '60px']
)('Hello Print Styled Text')`),Y(["style","fontSize","24px"],["style_on_print","fontSize","60px"])("Hello Print Styled Text"))}),m({title:"Theming",subtitle:"The theming engine works similarly to the templating engine. Create an instance and use the returned functions to control color and fonts.",content:u(`const { color, font } = Theme();

// output a solid black = HSLA(0, 0%, 0%, 1)
color('black');

// output a black at 50% opacity = HSLA(0, 0%, 0%, 0.5)
color('black', 0.5);

// output a solid black lightened by 5% = HSL(0, 0%, 5%, 1)
color('black', 1, 5);

// Color override
const { color, font } = Theme({ black:[326, 2, 13] });
color('black'); // outputs HSLA(326, 2%, 13%, 1)

// output the Primary font = 'Space Grotesk, Arial, sans-serif'
font('Primary')
`)}))})}yt({state:gt,views:[{route:c.CONCEPTS,state:"CONCEPTS",view:wt},{route:c.CONTRIBUTING,state:"CONTRIBUTING",view:Et},{route:c.DESIGN_SYSTEM,state:"DESIGN_SYSTEM",view:bt},{route:c.LOADING,state:"LOADING",transitionView:!0,view:Lt},{route:c.OVERVIEW,state:"OVERVIEW",view:Mt},{route:c.SPLASH,state:"SPLASH",view:Rt},{route:c.STATE_MANAGEMENT,state:"STATE_MANAGEMENT",view:Nt},{route:c.STYLING,state:"STYLING",view:Bt},{route:c.HTML,state:"HTML",view:kt},{route:c.CONFIG,state:"CONFIG",view:Ct}]});})();
//# sourceMappingURL=main-1.0.0.js.map
