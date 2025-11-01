function J(e,n){return(...o)=>{let i=document.createElementNS("http://www.w3.org/1999/xhtml",e);return Z(i,o,n)}}function Z(e,n=[],o={}){n.forEach(([i,...s])=>o[i](e,...s));function r(...i){return i.forEach((s)=>{if(s)e.append(s)}),e}return r}function O(e){return new Proxy({},{get:(n,o)=>J(o,e)})}function tt(e,n){if(!n)return e;let o=n.storage.getItem(n.key),r=JSON.parse(o),i=r!==null&&r!==void 0;if((n.overwrite??!0)&&i)return r;if(!(n.overwrite??!0)&&i){if(Array.isArray(e)&&Array.isArray(r))return[...e,...r];else if(typeof e==="object"&&typeof r==="object")return{...e,...r}}return e}function k(e,n){let o=tt(e,n),r=new Set,i=()=>o,s=(l)=>{if(o=l,r.forEach((M)=>M(l)),n)n.storage.setItem(n.key,JSON.stringify(l))},d=(l)=>()=>s(l),c=(l)=>s(l(o)),b=(l)=>()=>s(l(i())),u=(l)=>{return r.add(l),()=>T(l)},E=(l,M=!0)=>{let L=JSON.stringify(o);if(l instanceof RegExp){let h=l.test(L);return M?h:!h}else if(typeof l==="function"&&l instanceof Function){let h=l(o);return M?h:!h}else{let h=JSON.stringify(l),I=L===h;return M?I:!I}},P=(l,M=!0)=>()=>{let L=JSON.stringify(o);if(l instanceof RegExp){let h=l.test(L);return M?h:!h}else if(typeof l==="function"&&l instanceof Function){let h=l(o);return M?h:!h}else{let h=JSON.stringify(l),I=L===h;return M?I:!I}},T=(l)=>{r.delete(l)};return{reduce:c,set:s,sub:u,test:E,unsub:T,val:i,$reduce:b,$set:d,$test:P,_subs:r}}function j(e,n=[],o={}){n.forEach(([i,...s])=>o[i](e,...s));function r(...i){return i.forEach((s)=>e.append(s)),e}return r}function R(e){return new Proxy({},{get:(n,o)=>{if(o==="el")return(r)=>(...i)=>j(r,i,e);return(...r)=>{let s=document.createElementNS("http://www.w3.org/2000/svg",o);return j(s,r,e)}}})}var $=(e)=>{let{type:n="all",minWidth:o=0,maxWidth:r=1/0}=e,i=k(!1),s=()=>{let d=window.innerWidth,c=d>=o&&d<=r,b=n==="all"||window.matchMedia(n).matches;i.set(c&&b)};return s(),window.addEventListener("resize",s),i};function A(e){return(...n)=>{let o=n[0],r=e(...n),i=null,s=()=>{if(typeof r==="function")r();if(i)i.disconnect(),i=null};if(o.parentNode)i=new MutationObserver((d)=>{for(let c of d)if(c.type==="childList"){if(Array.from(c.removedNodes).includes(o)){s();return}}}),i.observe(o.parentNode,{childList:!0});return s}}var F=A((...e)=>{let[n,o,r,i=!0,s=[]]=e,d=()=>{let u=typeof r==="function"?r():r;if((Array.isArray(i)?i:[i]).some((T)=>{return typeof T==="function"?T():T}))if(u===void 0)n.removeAttribute(o);else n.setAttribute(o,String(u));else n.removeAttribute(o)};d();let b=(Array.isArray(s)?s:[s]).map((u)=>u.sub(d));return()=>b.forEach((u)=>u())});var W=A((...e)=>{let[n,o,r,i=!0,s=[]]=e,d=!1,c=()=>{if((Array.isArray(i)?i:[i]).some((T)=>{return typeof T==="function"?T():T})&&!d)n.addEventListener(o,r),d=!0;else n.removeEventListener(o,r),d=!1};c();let u=(Array.isArray(s)?s.flat():[s]).map((E)=>E.sub(c));return()=>{n.removeEventListener(o,r),u.forEach((E)=>E())}});var z=A((...e)=>{let[n,o,r=!0,...i]=e,s=()=>{let c=o();if(typeof r==="function"?r():r){if(n.innerHTML="",c!==void 0)if(Array.isArray(c))c.filter((u)=>u).forEach((u)=>{if(u instanceof HTMLElement||u instanceof SVGElement)n.appendChild(u);else n.appendChild(document.createTextNode(String(u)))});else if(c instanceof HTMLElement||c instanceof SVGElement)n.appendChild(c);else n.innerHTML=String(c)}};s();let d=i.map((c)=>c.sub(s));return()=>d.forEach((c)=>c())});var N=A((...e)=>{let[n,o,r,i=!0,...s]=e,d=()=>{let b=typeof r==="function"?r():r;if(typeof i==="function"?i():i)o.startsWith("--")?n.style.setProperty(o,b):n.style[o]=b};d();let c=s.map((b)=>b.sub(d));return()=>c.forEach((b)=>b())});var et=(e)=>{e.style.display="block",e.style.whiteSpace="pre",e.style.fontFamily="monospace",e.style.color="white",e.style.backgroundColor="black",e.style.padding="30px",e.style.borderRadius="5px",e.style.overflowX="auto",e.style.maxWidth="100%",e.style.width="100%",e.style.minWidth="0",e.style.boxSizing="border-box",e.style.wordBreak="normal";let n=new MutationObserver((o)=>{o.forEach((r)=>{if(r.type==="childList"){if(r.addedNodes.length>0){n.disconnect();let i=Prism.highlight(e.innerText,Prism.languages.typescript);e.innerHTML=i}}})});return n.observe(e,{childList:!0}),e},p=k("introduction",{key:"menuState",storage:localStorage}),S=k(!1),w=$({type:"screen",minWidth:0,maxWidth:959}),f=$({type:"screen",minWidth:960,maxWidth:1/0}),t=O({attr:F,event:W,prism:et,style:N,html:z}),Ct=R({attr:F,style:N,event:W});var y=(e,n,...o)=>t.div(["attr","data-part","Box"],["style","flexDirection",e],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","grid"],["style","fontFamily","Space Grotesk"],["style","gap",`${n}px`],["style","minWidth",0],["style","overflow","hidden"],["style","width","100%"],["style","alignItems","stretch"])(...o);var x=({next:e,prev:n})=>t.div(["style","display","flex"],["style","flexDirection","row"],["style","justifyContent","space-evenly"],["style","alignItems","center"],["style","width","100%"],["style","boxSizing","border-box"],["style","padding","20px"],["style","fontFamily","monospace"],["style","fontSize","14px"],["style","backgroundColor","black"],["style","color","white"],["style","borderRadius","5px"])(n&&t.div(["style","cursor","pointer"],["event","click",()=>p.set(n.menuState)])(`← ${n.title}`),e&&t.div(["style","cursor","pointer"],["event","click",()=>p.set(e.menuState)])(`${e.title} →`));var m=(...e)=>t.div(["attr","data-part","Page"],["style","flexDirection","column"],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","flex"],["style","fontFamily","Space Grotesk"],["style","justifyContent","center"],["style","gap","30px"],["style","maxWidth","1000px"],["style","minWidth",0])(...e);m.Header=(e,n)=>t.div(["style","display","flex"],["style","flexDirection","column"],["style","alignItems","center"],["style","justifyContent","center"],["style","textAlign","center"],["style","gap","10px"])(t.h1(["style","fontSize","48px"],["style","margin","0"],["style","padding","0"],["style","fontWeight","bold"])(e),n?t.h2(["style","fontSize","18px"],["style","margin","0"],["style","padding","0"],["style","fontWeight","normal"],["style","opacity",0.7])(n):null);var a=({content:e,title:n,subtitle:o})=>t.div(["attr","data-part","Section"],["style","flexDirection","column"],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","flex"],["style","fontFamily","Space Grotesk"],["style","minWidth",0])(t.h2(["style","fontSize","32px"],["style","textAlign","center"],["style","padding",0],["style","margin",0])(n),o&&t.div(["style","fontSize","16px"],["style","opacity",0.5],["style","textAlign","center"],["style","padding","10px 20px 20px 20px"])(o),t.div(["attr","data-part","SectionContent"],["style","flexDirection","column"],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","flex"],["style","fontFamily","Space Grotesk"],["style","justifyContent","center"],["style","width","100%"],["style","display","flex"],["style","minWidth",0])(e));var v=(e)=>t.code(["style","backgroundColor","rgba(0,0,0,0.1)"],["style","borderRadius","3px"],["style","fontFamily","monospace"],["style","fontSize","14px"],["style","padding","2px 5px"],["style","margin","0 2px"])(e),H=(...e)=>t.small(["style","display","block"],["style","fontSize","13px"],["style","opacity",0.5],["style","textAlign","center"],["style","padding","20px"],["style","marginBottom","20px"],["style","backgroundColor","rgba(0,0,0,0.1)"])(...e);var G=()=>m(m.Header("Docs","OEM only has three functions — HTML, State, and Trait. Here's how they work."),a({title:"HTML",subtitle:"OEM's HTML template engine is a lightweight and efficient way to create and manage HTML elements in your application.",content:y("column",10,t.pre(["prism"])(`import { HTML } from 'oem';
      
// create a template engine
const tmpl = HTML();

// you can now generate HTML elements
tmpl.div()('Hello, OEM!');
// <div>Hello, OEM!</div>
`))}),H("There's also an ",v("SVG")," version of the HTML function for creating SVG elements."),a({title:"State",subtitle:"OEM's built-in state management is simple yet powerful. Each state object is a micro event bus that can be used anywhere in your application.",content:y("column",10,t.pre(["prism"])(`import { State } from 'oem'; 

// create a state object
const color = State<'green' | 'red'>('red');

// getting
color.val;
color.$val(); // method version

// setting
color.set('green'); 
const setToRed = color.$set('red'); // cb version

// reducing
color.reduce((prev) => prev === 'red' ? 'green' : 'red');
color.$reduce((prev) => prev === 'red' ? 'green' : 'red'); // cb version

// subscribe/unsubscribe to changes
const colorSub = (updatedColor) => {...};
color.sub(colorSub);
color.unsub(colorSub);

// testing value
color.test('red'); // by string
color.test('red', false); // by string, false for NOT equal
color.$test('red');  // by string, cb version
color.$test('red', false); // by string, cb version NOT equal
color.test(/red/); // by regex
color.$test(/red/); // by regex, cb version
color.test((val) => val === 'red'); // by function
color.$test((val) => val === 'red'); // by function, cb version
`))}),a({title:"Trait",subtitle:"Traits are functions that extend the functionality of HTML elements. They can be used to add attributes, styles, event listeners, and more.",content:y("column",10,t.pre(["prism"])(`import { HTML, Trait } from 'oem';

// create a trait
const useAttrTrait = Trait((el: HTMLElement, key: string, value: string) => {
  el.setAttribute(key, value);
})

// create a template engine and map the trait
const tmpl = HTML({ attr: useAttrTrait });

// use it
tmpl.div(['attr','id','test'])('Hello, OEM!');
// <div id="test">Hello, OEM!</div>
`))}),a({title:"Learn (~10min)",subtitle:"Get started with OEM by following our step-by-step guide. You'll be building a small app in no time!",content:x({next:{title:"Templates",menuState:"templates"},prev:{title:"Intro",menuState:"introduction"}})}));var g={Grid:(...e)=>t.div(["style","borderRadius","5px"],["style","boxSizing","border-box"],["style","display","grid"],["style","gridTemplateColumns","1fr 1fr"],["style","width","100%"])(...e),Header:(e)=>t.div(["style","backgroundColor","rgba(0,0,0,0.1)"],["style","padding","10px"])(e),Cell:(e)=>t.div(["style","padding","10px"],["style","borderBottom","1px solid rgba(0,0,0,0.1)"],["style","fontSize","13px"],["style","fontSize","16px",f.val,f])(e)};var B=()=>m(m.Header("Factory","Pre-built components,  templates and generators for rapid development"),a({title:"Ready-Made Traits",subtitle:"OEM Factory provides a set of powerful pre-built traits that include configurations for responding to events, media queries and state objects with the Locality of Behavior pattern included which covers 95% of use cases out of the box.",content:g.Grid(g.Header("Trait"),g.Header("Description"),g.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Style.ts"],["attr","target","_blank"])("useAttributeTrait")),g.Cell("Apply attributes"),g.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/ClassName.ts"],["attr","target","_blank"])("useClassNameTrait")),g.Cell("Apply class names"),g.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Event.ts"],["attr","target","_blank"])("useEventTrait")),g.Cell("Attach event listener"),g.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/InnerHTML.ts"],["attr","target","_blank"])("useInnerHTMLTrait")),g.Cell("Attach event listener"),g.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/TextContent.ts"],["attr","target","_blank"])("useTextContentTrait")),g.Cell("Apply inner text"),g.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Style.ts"],["attr","target","_blank"])("useStyleTrait")),g.Cell("Apply styles"))}),a({title:"Thank You",subtitle:"We appreciate your interest in OEM. We hope you find this project useful. Feel free to contribute or provide feedback!",content:x({next:{title:"Intro",menuState:"introduction"},prev:{title:"Patterns",menuState:"patterns"}})}));var D=()=>t.div(["style","alignItems","center"],["style","boxSizing","border-box"],["style","borderRadius","5px"],["style","display","grid"],["style","display","flex"],["style","flexWrap","wrap"],["style","fontFamily","Space Grotesk"],["style","gap","5px"],["style","justifyContent","center"],["style","width","100%"])(...[["\uD83D\uDCAB","Reactive DOM"],["\uD83D\uDC85","Responsive Styles"],["\uD83D\uDCFC","State Management"],["\uD83D\uDD4A️","No Dependencies"],["\uD83E\uDEB6","Flyweight Size"],["\uD83E\uDDF1","Isomorphic Syntax"],["\uD83E\uDDE9","Typescript"],["\uD83E\uDD16","AI-Friendly"],["\uD83D\uDD12","Secure"],["\uD83E\uDDEA","100% Test Coverage"],["\uD83D\uDCA9","No Virtual DOM"]].map(([e,n])=>t.div(["style","alignItems","center"],["style","backgroundColor","black"],["style","boxSizing","border-box"],["style","borderRadius","20px"],["style","display","flex"],["style","fontSize","13px"],["style","gap","10px"],["style","justifyContent","center"],["style","border","none"],["style","border","1px solid rgba(255,255,255,0.3)"],["style","padding","10px 15px"],["style","color","white"])(t.span(["style","fontSize","11px"])(e),t.span(["style","fontWeight","bold"])(n))));var K=()=>m(m.Header("OEM","The flyweight UI library for the modern web"),a({title:"Features",subtitle:"OEM is a tiny layer-one utility that provides just enough structure to build powerful micro-templating engines with the following features:",content:y("column",20,t.div(["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","grid"],["style","flexWrap","wrap"],["style","gap","20px"],["style","justifyContent","center"],["style","width","100%"],["style","borderRight","1px dashed black",f.val,f],["style","borderBottom","none",f.val,f],["style","borderRight","none"])(D()))}),a({title:"Install",subtitle:"Get started with OEM in seconds.",content:y("column",20,t.div(["prism"])("npm i @linttrap/oem"),t.div(["style","opacity",0.35],["style","fontSize","14px"],["style","textAlign","center"])("Or download with unpkg at ",t.a(["attr","href","https://unpkg.com/@linttrap/oem@latest/dist/oem.min.js"],["attr","target","_blank"])("unpkg")))}),a({title:"Docs",subtitle:"Explore the full documentation to learn more about OEM's core concepts and how to build with it.",content:x({next:{title:"Docs",menuState:"docs"}})}));var q=()=>m(m.Header("Patterns","Common patterns for building applications with OEM"),a({title:"Idiomatic Traits",subtitle:"You want your traits to be configurable, declarative, able to respond to state changes and play nice with the Locality of Behavior pattern.",content:y("column",10,t.div(["style","textAlign","center"])("Here's a documented version of the useStyleTrait available in the Factory section."),t.pre(["prism"])(`// Your trait's props
type Props = [

  // element must be first
  el: HTMLElement,

  // CSS property or custom property
  prop: keyof CSSStyleDeclaration,

  // value or function that returns the value
  val: (() => string | number | undefined) | (string | number | undefined),
  
  // optional condition to apply the style
  condition?: boolean | (() => boolean),

  // state objects to subscribe to for re-evaluation
  ...states: StateType<any>[],
];

// The useStyleTrait definition
export const useStyleTrait = Trait((...props: Props) => {

  // destructure props and define defaults
  const [el, prop, val, condition = true, ...states] = props;

  // function to apply the trait's behavior
  const apply = () => {

    // determine the value
    const _val = typeof val === 'function' ? val() : val;

    // determine the condition
    const _condition = typeof condition === 'function' ? condition() : condition;

    // if condition is met, apply the style
    if (_condition) (el.style[prop as any] = _val as any);
  };

  // initial application
  apply();

  // subscribe to state changes
  const unsubs = states.map((state) => state.sub(apply));

  // return a cleanup function
  return () => unsubs.forEach((unsub) => unsub());
});`),t.div(["style","textAlign","center"])("The Locality of Behavior pattern: Using the template above you can not only register this trait across multiple template engines, but same engine, multiple times. Prefixing with the trait name and what it applies to helps keeps things straight"),t.pre(["prism"])(`// register the trait multiple times and 
// have them respond to different state objects
const tmpl = HTML({
  'style:a': useStyleTraitTrait({ state: stateObjectA }),
  'style:b': useStyleTraitTrait({ state: stateObjectB }),
});

// somewhere in your app
// use both traits, multiple times
// on state change, re-evaluate and re-apply
// this is the Locality of Behavior pattern
tmpl.div(
  ['style:a', 'color', 'red', isAchecked],
  ['style:a', 'color', 'green', isAunchecked],
  ['style:b', 'fontSize', '10px', isBchecked],
  ['style:b', 'fontSize', '20px', isBunchecked],
)();
`),H("Notice how with this pattern you can conditionally apply the same style property multiple times based on different state objects? You can't do that with JSX or CSS without ugly if statements or complex class management. This keeps your code declarative and easy to reason about."))}),a({title:"Component Composition",subtitle:'Creating a "component" is just making a function that returns templated elements. However, there are certain practices that make them easier to work with and reuse.',content:y("column",10,t.div(["style","textAlign","center"])(`Since all state and template behavior comes from a template engine, you don't have to "prop drill" behavioral and presentational logic into your components. This keeps your components simple and focused on just rendering.`),t.pre(["prism"])(`// define a reusable button component
const Button = (label, onClick) => 
  tmpl.button(
    ['style', 'padding', '10px 20px'],
    ['style', 'backgroundColor', 'blue'],
    ['style', 'color', 'white'],
    ['onClick', onClick]
  )(label);

// use the Button component within another component
const App = () => 
  tmpl.div()(
    Button('Click Me', () => alert('Button Clicked!')),
    Button('Submit', () => alert('Form Submitted!'))
  );
`),H("With this pattern, you don't need crazy CSS frameworks that require compile time optimization etc, the syntax isn't crazy and following some abstract naming convention. It keeps everything declarative and makes for an excellent foundation for an AI friendly design system."),t.div(["style","textAlign","center"])("What if you don't want to use the same template engine for your entire app? No problem, just define a template engine within your component! Heck, you even use more than one template engine within the same component if you want."),t.pre(["prism"])(`// define a component with its own template engine
const Card = (title, content) => {
  const cardTmpl = HTML({ /* traits specific to Card */ });
  return cardTmpl.div(
    ['style', 'border', '1px solid #ccc'],
    ['style', 'padding', '20px'],
    ['style', 'borderRadius', '5px']
  )(
    tmpl.h2( // <-- using the global tmpl engine
      ['style', 'color', 'red', alertState.$test(1)],
      ['style', 'color', 'black', alertState.$test(1, false)]
    )(title),
    cardTmpl.p()(content)
  );
};

// use the Card component
const App = () => 
  tmpl.div()(
    Card('Card Title', 'This is the content of the card.'),
    Card('Another Card', 'More content here.')
  );
`))}),a({title:"Application Structure",subtitle:"The missing piece for many UI libraries is a clear structure for organizing your application. With OEM, you can establish a consistent structure that separates concerns and promotes maintainability.",content:y("column",10,t.div(["style","textAlign","center"])("Separate concerns by feature. For small apps, make them single files, for larger apps, make them folders/files."),t.div(["prism"])(`- components // reusable stateless components
- features // stateful features of your app
- pages // pages
- state // your state objects
- actions // your state manipulation functions
- fsm // a finite state machine
- templates // your template engines
- traits // your traits
// models, entities, utils, etc.
`))}),a({title:"Factory",subtitle:"Now that you know the basics of creating elements with templates, manipulating it with traits and managing state, let's look at some common patterns to build a real application.",content:x({prev:{title:"State",menuState:"state"},next:{title:"Factory",menuState:"factory"}})}));var V=()=>m(m.Header("State","Managing dynamic data with OEM State"),a({title:"The State Object",subtitle:"Each state object in OEM is a micro event bus that can be used anywhere in your application. Although OEM is state management agnostic, it's built-in state management works great for most use cases.",content:y("column",10,t.div(["style","textAlign","center"])("Import the State function to create a state object"),t.pre(["prism"])(`import { State } from 'oem';
const color = State<'red' | 'green'>('red');`))}),a({title:"Getting",subtitle:"Getting the current value of the state is straight forward.",content:y("column",10,t.div(["style","textAlign","center"])("Get the current value with the  ",v("val")," property."),t.pre(["prism"])("color.val;"),t.div(["style","textAlign","center"])("Or with the method  ",v("$val()"),"."),t.pre(["prism"])("color.$val();"))}),a({title:"Setting",subtitle:"Setting state is straight forward as well and includes a few helper methods which begins to introduce some OEM specific patterns.",content:y("column",10,t.div(["style","textAlign","center"])("Set state with the  ",v("set")," method."),t.pre(["prism"])("color.set('blue');"),t.div(["style","textAlign","center"])("Or create callback version of it with  ",v("$set")," to be called later. More on this in the patterns section."),t.pre(["prism"])(`const setToBlue = color.$set('blue');
setToBlue();`),t.div(["style","textAlign","center"])("State can also be set using a reducer with the ",v("reduce")," method."),t.pre(["prism"])("color.reduce((prev) => prev === 'red' ? 'blue' : 'red');"),t.div(["style","textAlign","center"])("Or create callback version of it with  ",v("$reduce")," to call it later."),t.pre(["prism"])(`const toggleColor = color.$reduce((prev) => prev === 'red' ? 'blue' : 'red');
toggleColor();`))}),a({title:"Subscribing",subtitle:"Subscribing to state changes is an important part of state management. OEM makes this easy with the built-in pub/sub pattern.",content:y("column",10,t.div(["style","textAlign","center"])("Subscribe by calling the ",v("sub")," method."),t.pre(["prism"])(`const cb = (val) => console.log(val)
color.sub(cb);`),t.div(["style","textAlign","center"])("You can unsubscribe from state changes by calling ",v("unsub(cb)")),t.pre(["prism"])("color.unsub(callback);"))}),a({title:"Testing",subtitle:"Testing the current state value is useful for conditionally applying traits or other logic in your application.",content:y("column",10,t.div(["style","textAlign","center"])("Test if the current state matches a value with the ",v("test")," method. Use this for simple values like strings and numbers."),t.pre(["prism"])(`color.test('red');
color.test('red', false); // NOT equal
color.$test('red'); // callback version
color.$test('red', false); // callback version NOT equal
`),t.div(["style","textAlign","center"])("Or use a predicate function to test the value. Works better for arrays and objects."),t.pre(["prism"])(`color.test((val) => val === 'red');
color.test((val) => val === 'red', false); // NOT equal
color.$test((val) => val === 'red'); // callback version
color.$test((val) => val === 'red', false); // callback version NOT equal
`),t.div(["style","textAlign","center"])("Works with regular expressions too"),t.pre(["prism"])(`color.test(/red/);
color.test(/red/, false); // NOT equal
color.$test(/red/); // callback version
color.$test(/red/, false); // callback version NOT equal`))}),a({title:"Patterns",subtitle:"Now that you know the basics of creating elements with templates, manipulating it with traits and managing state, let's look at some common patterns to build a real application.",content:x({next:{title:"Patterns",menuState:"patterns"},prev:{title:"Traits",menuState:"traits"}})}));var U=()=>m(m.Header("Templates","Creating micro-templating engines with OEM"),a({title:"The HTML function",subtitle:"The HTML function creates a templating engine that can generate HTML elements.",content:y("column",10,t.div(["style","textAlign","center"])("Import the HTML function to create an HTML templating engine"),t.pre(["prism"])(`import { HTML } from 'oem';
const tmpl = HTML({...});`),t.div(["style","textAlign","center"])("You can now generate HTML elements with the templating engine. Notice that the tag generating function is curried. More on that later."),t.pre(["prism"])(`html.div()('Hello World!');
// returns <div>Hello World!</div>`))}),a({title:"Traits",subtitle:"Your template engine can generate html tags, but that's it. How can we add functionality? Small functions called traits. ",content:x({next:{title:"Traits",menuState:"traits"},prev:{title:"Intro",menuState:"introduction"}})}));var Y=()=>m(m.Header("Traits","Adding functionality to your templating engine with traits"),a({title:"The Trait Function",subtitle:'A "trait" is just a function that takes an element as its first argument and does something to it.',content:y("column",20,t.div(["style","textAlign","center"])("Use the Trait function to define a trait:"),t.div(["prism"])(`import { Trait } from 'oem';
const useStyleTrait = Trait(el: HTMLElement) => {...}`),t.div(["style","textAlign","center"])('Here is an example of a very simple "style" trait for applying css styles to an element.'),t.div(["prism"])(`const useStyleTrait = Trait(el: HTMLElement, prop: string, value: string) => {
  el.style[prop] = value;
}`),t.div(["style","textAlign","center"])("This trait can now be added to your templating engine like this:"),t.div(["prism"])('const tmpl = HTML({ "style": useStyleTrait });'),t.div(["style","textAlign","center"])(`Now, when you render an element, the first curried function takes a list of traits to apply to the element. 'style' will be intellisensed along with it's arguments 'prop' and 'value' (everything after the 'el' argument in your trait function). Here is how you would use the "style" trait to make some text red, 24px, and centered:`),t.div(["prism"])(`tmpl.div(
  ['style','color', 'red'],
  ['style','fontSize','24px'],
  ['style','textAlign','center']
)('...');`),H("Note: you could have applied the style textAlign trait multiple times to the same element with different values, and it would apply them in order. However, that would only make sense if we had a way to add a condition. That's exactly what we cover in the Patterns section. First, let's see how State works."))}),a({title:"State",subtitle:'OK, we can generate html, and now have a way to manipulate it with traits. But how do we make it dynamic? What if we could reapply traits when something changes? Enter "State".',content:x({next:{title:"State",menuState:"state"},prev:{title:"Templates",menuState:"templates"}})}));var _={name:"@linttrap/oem",author:"@linttrapmedia",title:"oem",version:"1.0.0",description:"A novel UI library for writing reactive html with vanilla javascript",type:"module",exports:{".":"./src/index.ts"},main:"./src/index.ts",module:"./src/index.ts",repository:{type:"git",url:"git+https://github.com/linttrapmedia/oem.git"},license:"MIT",bugs:{url:"https://github.com/linttrapmedia/oem/issues"},homepage:"https://oem.js.org",devDependencies:{"@types/bun":"latest","@types/jsdom":"^27.0.0","resize-observer-polyfill":"^1.5.1",jsdom:"^27.1.0",prettier:"2.7.1"},dependencies:{},private:!1,peerDependencies:{typescript:"^5"}};var C=(e,n)=>{let o=k(!1);return t.div(["style","padding","10px 20px"],["style","cursor","pointer"],["style","transition","background-color 0.3s"],["style","textTransform","uppercase"],["style","color","yellow",!0,o,p],["style","color","white",()=>o.test(!1)&&p.test(n,!1),o,p],["event","click",p.$set(n)],["event","mouseover",o.$set(!0)],["event","mouseout",o.$set(!1)])(e)},X=()=>t.div(["style","backgroundColor","black"],["style","color","white"],["style","padding","10px"],["style","fontWeight","bold"],["style","fontFamily","monospace"],["style","display","flex"],["style","flexDirection","column"],["style","alignItems","center"],["style","justifyContent","center"],["style","textAlign","center"],["html",()=>[t.div(["style","position","absolute"],["style","top","10px"],["style","right","10px"],["style","cursor","pointer"],["style","fontSize","21px"],["style","textTransform","uppercase"],["style","padding","5px"],["style","opacity","0.5"],["style","display","flex",w.val,w],["style","display","none",f.val,f],["event","click",S.$reduce((e)=>!e)],["html",()=>"-",S.$test(!0),S],["html",()=>"=",S.$test(!1),S])(),t.div(["style","display","flex"],["style","flexDirection","column"],["style","alignItems","center"],["style","justifyContent","center"],["style","position","relative"])(t.div(["style","display","flex"],["style","letterSpacing","2px"],["style","fontSize","40px"],["style","textAlign","left"],["style","lineHeight",0.75],["style","color","white"],["style","fontFamily","Splash"],["style","gap","5px"],["style","fontWeight","normal"])("oem",t.span(["style","fontSize","10px"],["style","fontWeight","bold"],["style","fontFamily","monospace"],["style","letterSpacing","0"],["style","color","yellow"])(_.version))),t.div(["style","display","flex"],["style","flexDirection","column"],["style","justifyContent","center"],["style","display","none",()=>w.val()&&!S.val(),S,w],["style","display","flex",()=>f.val()||S.val(),S,f],["style","paddingTop","20px"])(C("Intro","introduction"),C("Docs","docs"),C("Templates","templates"),C("Traits","traits"),C("State","state"),C("Patterns","patterns"),C("Factory","factory"),t.a(["style","marginTop","20px"],["style","color","white"],["style","padding","10px"],["style","textDecoration","none"],["style","border","1px solid rgba(255,255,255,0.2)"],["attr","href","https://github.com/linttrapmedia/oem"],["attr","target","_blank"])("GITHUB"))]])();function ot(){return t.div(["attr","data-part","App"],["style","display","grid"],["style","gridTemplateRows","max-content 1fr",w.val,w],["style","gridTemplateColumns","1fr",w.val,w],["style","gridTemplateRows","auto",f.val,f],["style","gridTemplateColumns","max-content 1fr",f.val,f],["style","height","100vh"],["style","justifyContent","start"],["style","width","100vw"],["style","overflow","hidden"],["style","minWidth",0])(t.div(["style","backgroundColor","black"],["style","padding","10px"])(X()),t.div(["attr","data-part","AppContent"],["style","display","flex"],["style","flexDirection","column"],["style","gap","50px"],["style","boxSizing","border-box"],["style","padding","20px 20px 100px"],["style","height","100%"],["style","overflowY","auto"],["style","overflowX","hidden"],["style","maxWidth","100%"],["style","minWidth",0],["html",K,p.$test("introduction"),p],["html",G,p.$test("docs"),p],["html",U,p.$test("templates"),p],["html",Y,p.$test("traits"),p],["html",V,p.$test("state"),p],["html",q,p.$test("patterns"),p],["html",B,p.$test("factory"),p])())}document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("root");if(!e)return null;e.appendChild(ot())});function Q(){document.querySelector("[data-part='AppContent']")?.scrollTo({top:0})}p.sub(Q);document.addEventListener("keydown",(e)=>{let n=e.key,o=p.val();if(n!=="ArrowRight"&&n!=="ArrowLeft")return;let i={introduction:n==="ArrowRight"?"docs":"factory",docs:n==="ArrowRight"?"templates":"introduction",templates:n==="ArrowRight"?"traits":"docs",traits:n==="ArrowRight"?"state":"templates",state:n==="ArrowRight"?"patterns":"traits",patterns:n==="ArrowRight"?"factory":"state",factory:n==="ArrowRight"?"introduction":"patterns"}[o];if(!i)return;p.set(i),Q()});

//# debugId=A87AA00AA3E2A25D64756E2164756E21
//# sourceMappingURL=app.js.map
