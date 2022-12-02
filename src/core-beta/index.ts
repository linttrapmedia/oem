import { OEM_ARRAY } from './Array';
import { OEM_ELEMENT } from './Element';
import { OEM_LOCATION } from './Location';
import { OEM_NUMBER } from './Number';
import { OEM_STRING } from './String';

export const COMPONENT: OEM.COMPONENT = (
  cb: () => HTMLElement,
  ...buses: any[]
): HTMLElement => {
  const el = cb();
  buses.forEach((bus) => bus.sub(() => (el.innerHTML = cb().innerHTML)));
  return el;
};

export const APP = (
  app: HTMLElement,
  options: { container: string } = {
    container: 'body',
  },
) => {
  const { container } = options;
  const init = () => document.querySelector(container).appendChild(app);
  document.addEventListener('DOMContentLoaded', init);
};

// Create Global Array Object
Object.defineProperty(window, 'ARRAY', {
  get: () => (ary: any[]) => new OEM_ARRAY(ary),
});

// Create Global Location Object
Object.defineProperty(window, 'LOCATION', {
  get: () => () => new OEM_LOCATION(),
});

// Create Global Number Object
Object.defineProperty(window, 'NUMBER', {
  get: () => (n: number) => new OEM_NUMBER(n),
});

// Create Global String Object
Object.defineProperty(window, 'STRING', {
  get: () => (s: string) => new OEM_STRING(s),
});

// Create Global Elements
'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'
  .split(',')
  .forEach((tag: keyof HTMLElementTagNameMap) => {
    Object.defineProperty(window, tag.toUpperCase(), {
      get: () => new OEM_ELEMENT<HTMLElementTagNameMap[typeof tag]>(tag),
    });
  });
