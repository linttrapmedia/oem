export * from './Color';
export * from './Markdown';
import { OEM_APP } from './App';
import { OEM_ARRAY } from './Array';
import { OEM_BREAKPOINT } from './Breakpoint';
import { OEM_COMPONENT } from './Component';
import { OEM_ELEMENT } from './Element';
import { OEM_LOCATION } from './Location';
import { OEM_NUMBER } from './Number';
import { OEM_STRING } from './String';
export default OEM_APP;

Object.defineProperty(window, 'ARRAY', {
  get: () => (ary: any[]) => new OEM_ARRAY(ary),
});

Object.defineProperty(window, 'BREAKPOINT', {
  get:
    () =>
    (breakpoint: number = 0, dimension: 'height' | 'width' = 'width', container: string) =>
      new OEM_BREAKPOINT(breakpoint, dimension, container),
});

Object.defineProperty(window, 'COMPONENT', {
  get:
    () =>
    (...args: Parameters<OEM.COMPONENT>) =>
      OEM_COMPONENT(...args),
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

Object.defineProperty(window, 'COMMENT', {
  get: () => (comment: string) => document.createComment(comment),
});

export const NUMBER2 = (n: number) => new OEM_NUMBER(n);

const OEM = {
  NUMBER2,
};

Object.defineProperty(window, 'OEM', { get: () => OEM });
