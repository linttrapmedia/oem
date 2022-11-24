import { Traits } from './Trait';

const StripHtml = (text: string) => {
  const el = document.createElement('template');
  const htmlAmp = /&/g;
  const htmlLT = /</g;
  const htmlGT = /</g;
  const htmlQuote = /"/g;
  const htmlSingleQuote = /'/g;
  const cleanedText = text
    .replace(htmlAmp, '&amp;')
    .replace(htmlLT, '&lt;')
    .replace(htmlGT, '&gt;')
    .replace(htmlQuote, '&quot;')
    .replace(htmlSingleQuote, '&#039;');
  el.innerHTML = cleanedText;
  return el.content;
};

export default 'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'
  .split(',')
  .reduce((acc, key) => {
    acc[key] =
      (...traits: any[]) =>
      (...children: any[]) => {
        const el = document.createElement(key);
        traits.forEach(([trait, ...args]: [keyof typeof Traits, any]) => Traits[trait](el)(...args));
        children.forEach((child) => {
          if (child instanceof Node) el.appendChild(child);
          if (typeof child === 'string' || typeof child === 'number') el.appendChild(StripHtml(String(child)));
        });
        return el;
      };
    return acc;
  }, {} as Record<string, (...traits: any[]) => (...children: any[]) => any>);
