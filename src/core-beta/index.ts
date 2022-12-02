import { OEM_APP } from './framework/App';
import { OEM_ARRAY } from './framework/Array';
import { OEM_COMPONENT } from './framework/Component';
import { OEM_ELEMENT } from './framework/Element';
import { OEM_LOCATION } from './framework/Location';
import { OEM_NUMBER } from './framework/Number';
import { OEM_STRING } from './framework/String';

export default OEM_APP;

Object.defineProperty(window, 'COMPONENT', {
  get:
    () =>
    (...args: Parameters<OEM.COMPONENT>) =>
      OEM_COMPONENT(...args),
});

Object.defineProperty(window, 'ARRAY', {
  get: () => (ary: any[]) => new OEM_ARRAY(ary),
});

Object.defineProperty(window, 'LOCATION', {
  get: () => () => new OEM_LOCATION(),
});

Object.defineProperty(window, 'NUMBER', {
  get: () => (n: number) => new OEM_NUMBER(n),
});

Object.defineProperty(window, 'STRING', {
  get: () => (s: string) => new OEM_STRING(s),
});

'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'
  .split(',')
  .forEach((tag: keyof HTMLElementTagNameMap) => {
    Object.defineProperty(window, tag.toUpperCase(), {
      get: () => new OEM_ELEMENT<HTMLElementTagNameMap[typeof tag]>(tag),
    });
  });
