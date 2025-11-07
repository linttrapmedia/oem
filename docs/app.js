(()=>{var E=new WeakMap,X=new MutationObserver((e)=>{for(let o of e)if(o.type==="childList")o.removedNodes.forEach((n)=>{if(n instanceof HTMLElement&&E.has(n))E.get(n).forEach((i)=>i()),E.delete(n)})});X.observe(document.documentElement,{childList:!0,subtree:!0});function J(e){return(...o)=>{let n=o[0],s=e(...o),i=E.get(n)||[];return i.push(s),E.set(n,i),()=>{let r=E.get(n);if(r){let f=r.indexOf(s);if(f!==-1)r.splice(f,1);if(r.length===0)E.delete(n)}s()}}}function Z(e,o){return(...n)=>{let i=document.createElementNS("http://www.w3.org/1999/xhtml",e);return tt(i,n,o)}}function tt(e,o=[],n={}){o.forEach(([i,...r])=>J(n[i])(e,...r));function s(...i){return i.forEach((r)=>{if(r)e.append(r)}),e}return s}function O(e){return new Proxy({},{get:(o,n)=>Z(n,e)})}function et(e,o){if(!o)return e;let n=o.storage.getItem(o.key),s=JSON.parse(n),i=s!==null&&s!==void 0;if((o.overwrite??!0)&&i)return s;if(!(o.overwrite??!0)&&i){if(Array.isArray(e)&&Array.isArray(s))return[...e,...s];else if(typeof e==="object"&&typeof s==="object")return{...e,...s}}return e}function C(e,o){let n=et(e,o),s=new Set,i=()=>n,r=(a)=>{if(n=a,s.forEach((k)=>k(a)),o)o.storage.setItem(o.key,JSON.stringify(a))},f=(a)=>()=>r(a),w=(a)=>r(a(n)),y=(a)=>()=>r(a(i())),g=(a)=>{return s.add(a),()=>x(a)},A=(a,k=!0)=>{let I=JSON.stringify(n);if(a instanceof RegExp){let b=a.test(I);return k?b:!b}else if(typeof a==="function"&&a instanceof Function){let b=a(n);return k?b:!b}else{let b=JSON.stringify(a),N=I===b;return k?N:!N}},h=(a,k=!0)=>()=>{let I=JSON.stringify(n);if(a instanceof RegExp){let b=a.test(I);return k?b:!b}else if(typeof a==="function"&&a instanceof Function){let b=a(n);return k?b:!b}else{let b=JSON.stringify(a),N=I===b;return k?N:!N}},x=(a)=>{s.delete(a)};return{reduce:w,set:r,sub:g,test:A,unsub:x,val:i,$reduce:y,$set:f,$test:h,_subs:s}}function P(e,o=[],n={}){o.forEach(([i,...r])=>n[i](e,...r));function s(...i){return i.forEach((r)=>e.append(r)),e}return s}function W(e){return new Proxy({},{get:(o,n)=>{if(n==="el")return(s)=>(...i)=>P(s,i,e);return(...s)=>{let r=document.createElementNS("http://www.w3.org/2000/svg",n);return P(r,s,e)}}})}var $=(e)=>{let{type:o="all",minWidth:n=0,maxWidth:s=1/0}=e,i=C(!1),r=()=>{let f=window.innerWidth,w=f>=n&&f<=s,y=o==="all"||window.matchMedia(o).matches;i.set(w&&y)};return r(),window.addEventListener("resize",r),i};var R=(...e)=>{let[o,n,s,i=!0,r=[]]=e,f=()=>{let g=typeof s==="function"?s():s;if((Array.isArray(i)?i:[i]).every((x)=>{return typeof x==="function"?x():x}))if(g===void 0)o.removeAttribute(n);else o.setAttribute(n,String(g));else o.removeAttribute(n)};f();let y=(Array.isArray(r)?r:[r]).map((g)=>g.sub(f));return()=>y.forEach((g)=>g())};var z=(...e)=>{let[o,n,s,i=!0,r=[]]=e,f=!1,w=()=>{if((Array.isArray(i)?i:[i]).every((x)=>{return typeof x==="function"?x():x})&&!f)o.addEventListener(n,s),f=!0;else o.removeEventListener(n,s),f=!1};w();let g=(Array.isArray(r)?r.flat():[r]).map((A)=>A.sub(w));return()=>{o.removeEventListener(n,s),g.forEach((A)=>A())}};var F=(...e)=>{let[o,n,s=!0,i=[]]=e,r=()=>{let y=n();if((Array.isArray(s)?s:[s]).every((h)=>{return typeof h==="function"?h():h})){if(o.innerHTML="",y!==void 0)if(Array.isArray(y))y.filter((h)=>h).forEach((h)=>{if(h instanceof HTMLElement||h instanceof SVGElement)o.appendChild(h);else o.appendChild(document.createTextNode(String(h)))});else if(y instanceof HTMLElement||y instanceof SVGElement)o.appendChild(y);else o.innerHTML=String(y)}};r();let w=(Array.isArray(i)?i.flat():[i]).map((y)=>y.sub(r));return()=>w.forEach((y)=>y())};var G=(...e)=>{let[o,n,s,i=!0,r=[]]=e,f=()=>{let g=typeof s==="function"?s():s;if((Array.isArray(i)?i:[i]).every((x)=>{return typeof x==="function"?x():x}))n.startsWith("--")?o.style.setProperty(n,g):o.style[n]=g};f();let y=(Array.isArray(r)?r.flat():[r]).map((g)=>g.sub(f));return()=>y.forEach((g)=>g())};var ot=(e)=>{e.style.display="block",e.style.whiteSpace="pre",e.style.fontFamily="monospace",e.style.color="white",e.style.backgroundColor="black",e.style.padding="30px",e.style.borderRadius="5px",e.style.overflowX="auto",e.style.maxWidth="100%",e.style.width="100%",e.style.minWidth="0",e.style.boxSizing="border-box",e.style.wordBreak="normal";let o=new MutationObserver((n)=>{n.forEach((s)=>{if(s.type==="childList"){if(s.addedNodes.length>0){o.disconnect();let i=Prism.highlight(e.innerText,Prism.languages.typescript);e.innerHTML=i}}})});return o.observe(e,{childList:!0}),e},c=C("introduction",{key:"menuState",storage:localStorage}),M=C(!1),v=$({type:"screen",minWidth:0,maxWidth:959}),p=$({type:"screen",minWidth:960,maxWidth:1/0}),t=O({attr:R,event:z,prism:ot,style:G,html:F}),At=W({attr:R,style:G,event:z});var d=(e,o,...n)=>t.div(["attr","data-part","Box"],["style","flexDirection",e],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","grid"],["style","fontFamily","Space Grotesk"],["style","gap",`${o}px`],["style","minWidth",0],["style","overflow","hidden"],["style","width","100%"],["style","alignItems","stretch"])(...n);var T=({next:e,prev:o})=>t.div(["style","display","flex"],["style","flexDirection","row"],["style","justifyContent","space-evenly"],["style","alignItems","center"],["style","width","100%"],["style","boxSizing","border-box"],["style","padding","20px"],["style","fontFamily","monospace"],["style","fontSize","14px"],["style","backgroundColor","black"],["style","color","white"],["style","borderRadius","5px"])(o&&t.div(["style","cursor","pointer"],["event","click",()=>c.set(o.menuState)])(`← ${o.title}`),e&&t.div(["style","cursor","pointer"],["event","click",()=>c.set(e.menuState)])(`${e.title} →`));var u=(...e)=>t.div(["attr","data-part","Page"],["style","flexDirection","column"],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","flex"],["style","fontFamily","Space Grotesk"],["style","justifyContent","center"],["style","gap","30px"],["style","maxWidth","1000px"],["style","minWidth",0])(...e);u.Header=(e,o)=>t.div(["style","display","flex"],["style","flexDirection","column"],["style","alignItems","center"],["style","justifyContent","center"],["style","textAlign","center"],["style","gap","10px"])(t.h1(["style","fontSize","48px"],["style","margin","0"],["style","padding","0"],["style","fontWeight","bold"])(e),o?t.h2(["style","fontSize","18px"],["style","margin","0"],["style","padding","0"],["style","fontWeight","normal"],["style","opacity",0.7])(o):null);var l=({content:e,title:o,subtitle:n})=>t.div(["attr","data-part","Section"],["style","flexDirection","column"],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","flex"],["style","fontFamily","Space Grotesk"],["style","minWidth",0])(t.h2(["style","fontSize","32px"],["style","textAlign","center"],["style","padding",0],["style","margin",0])(o),n&&t.div(["style","fontSize","16px"],["style","opacity",0.5],["style","textAlign","center"],["style","padding","10px 20px 20px 20px"])(n),t.div(["attr","data-part","SectionContent"],["style","flexDirection","column"],["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","flex"],["style","fontFamily","Space Grotesk"],["style","justifyContent","center"],["style","width","100%"],["style","display","flex"],["style","minWidth",0])(e));var S=(e)=>t.code(["style","backgroundColor","rgba(0,0,0,0.1)"],["style","borderRadius","3px"],["style","fontFamily","monospace"],["style","fontSize","14px"],["style","padding","2px 5px"],["style","margin","0 2px"])(e),H=(...e)=>t.small(["style","display","block"],["style","fontSize","13px"],["style","opacity",0.5],["style","textAlign","center"],["style","padding","20px"],["style","marginBottom","20px"],["style","backgroundColor","rgba(0,0,0,0.1)"])(...e);var j=()=>u(u.Header("Docs","OEM only has two functions — HTML and State. Here's how they work."),l({title:"HTML",subtitle:"OEM's HTML template engine is a lightweight and efficient way to create and manage HTML elements in your application.",content:d("column",10,t.pre(["prism"])(`import { HTML } from 'oem';
      
// create a template engine
const tmpl = HTML();

// you can now generate HTML elements
tmpl.div()('Hello, OEM!');
// <div>Hello, OEM!</div>
`))}),H("There's also an ",S("SVG")," version of the HTML function for creating SVG elements."),l({title:"State",subtitle:"OEM's built-in state management is simple yet powerful. Each state object is a micro event bus that can be used anywhere in your application.",content:d("column",10,t.pre(["prism"])(`import { State } from 'oem'; 

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
`))}),l({title:"Learn (~10min)",subtitle:"Get started with OEM by following our step-by-step guide. You'll be building a small app in no time!",content:T({next:{title:"Templates",menuState:"templates"},prev:{title:"Intro",menuState:"introduction"}})}));var D=()=>t.div(["style","alignItems","center"],["style","boxSizing","border-box"],["style","borderRadius","5px"],["style","display","grid"],["style","display","flex"],["style","flexWrap","wrap"],["style","fontFamily","Space Grotesk"],["style","gap","5px"],["style","justifyContent","center"],["style","width","100%"])(...[["\uD83D\uDCAB","Reactive DOM"],["\uD83D\uDC85","Responsive Styles"],["\uD83D\uDCFC","State Management"],["\uD83D\uDD4A️","No Dependencies"],["\uD83E\uDEB6","Flyweight Size"],["\uD83E\uDDF1","Isomorphic Syntax"],["\uD83E\uDDE9","Typescript"],["\uD83E\uDD16","AI-Friendly"],["\uD83D\uDD12","Secure"],["\uD83E\uDDEA","100% Test Coverage"],["\uD83D\uDCA9","No Virtual DOM"]].map(([e,o])=>t.div(["style","alignItems","center"],["style","backgroundColor","black"],["style","boxSizing","border-box"],["style","borderRadius","20px"],["style","display","flex"],["style","fontSize","13px"],["style","gap","10px"],["style","justifyContent","center"],["style","border","none"],["style","border","1px solid rgba(255,255,255,0.3)"],["style","padding","10px 15px"],["style","color","white"])(t.span(["style","fontSize","11px"])(e),t.span(["style","fontWeight","bold"])(o))));var B=()=>u(u.Header("OEM","The flyweight UI library for the modern web"),l({title:"Features",subtitle:"OEM is a tiny layer-one utility that provides just enough structure to build powerful micro-templating engines with the following features:",content:d("column",20,t.div(["style","alignItems","center"],["style","boxSizing","border-box"],["style","display","grid"],["style","flexWrap","wrap"],["style","gap","20px"],["style","justifyContent","center"],["style","width","100%"],["style","borderRight","1px dashed black",p.val,p],["style","borderBottom","none",p.val,p],["style","borderRight","none"])(D()))}),l({title:"Install",subtitle:"Get started with OEM in seconds.",content:d("column",20,t.div(["prism"])("npm i @linttrap/oem"),t.div(["style","opacity",0.35],["style","fontSize","14px"],["style","textAlign","center"])("Or download with unpkg at ",t.a(["attr","href","https://unpkg.com/@linttrap/oem@latest/dist/oem.min.js"],["attr","target","_blank"])("unpkg")))}),l({title:"Docs",subtitle:"Explore the full documentation to learn more about OEM's core concepts and how to build with it.",content:T({next:{title:"Docs",menuState:"docs"}})}));var _=()=>u(u.Header("Patterns","Common patterns for building applications with OEM"),l({title:"Application Structure",subtitle:"The missing piece for many UI libraries is a clear structure for organizing your application. With OEM, you can establish a consistent structure that separates concerns and promotes maintainability.",content:d("column",10,t.div(["style","textAlign","center"])("Separate concerns by feature. For small apps, make them single files, for larger apps, make them folders/files."),t.div(["prism"])(`- components // reusable stateless components
- features // stateful features of your app
- pages // pages
- state // your state objects
- actions // your state manipulation functions
- fsm // a finite state machine
- templates // your template engines
- traits // your traits
// models, entities, utils, etc.
`),H("See the ",t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/examples"],["attr","target","_blank"])("Examples")," source code for more."))}),l({title:"Component Composition",subtitle:'Creating a "component" is just making a function that returns templated elements. However, there are certain practices that make them easier to work with and reuse.',content:d("column",10,t.div(["style","textAlign","center"])("Here's a simple button component that accepts a label and an onClick handler:"),t.pre(["prism"])(`// define a reusable button component
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
const Card = (title, content, tmpl) => {

  // local state
  const alertState = State(0);

  // local template engine for the Card component
  const cardTmpl = HTML({ 
   myCustomTrait: useMyCustomTrait,
   style: useStyleTrait
  });

  // use the local template engine to create the card
  return cardTmpl.div(
    ['style', 'border', '1px solid #ccc'],
    ['style', 'padding', '20px'],
    ['style', 'borderRadius', '5px'],
    ['myCustomTrait', 'someValue']
  )(
    cardTmpl.h2(
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
`))}),l({title:"Idiomatic Traits",subtitle:"You want your traits to be configurable, declarative, able to respond to state changes and play nice with the Locality of Behavior pattern.",content:d("column",10,t.div(["style","textAlign","center"])("Here's a documented version of the useClassNameTrait available in the Factory section."),t.pre(["prism"])(`import { Condition, StateType } from '@/types';

// Props for the useClassNameTrait
type Props = [
  el: HTMLElement, 
  className: string | (() => string),
  conditions?: Condition | Condition[],
  states?: StateType<any> | StateType<any>[],
];

export const useClassNameTrait = (...props: Props) => {
  // destructure props with default values
  const [el, className, conditions = true, states = []] = props;
  // function to apply the class name based on conditions
  const apply = () => {
    const _className = typeof className === 'function' ? className() : className;
    // normalize conditions to an array
    const _conditions = Array.isArray(conditions) ? conditions : [conditions];
    // check if all conditions are met
    const isConditionMet = _conditions.every((condition) => (typeof condition === 'function' ? condition() : condition));
    // apply the class name if conditions are met
    if (isConditionMet) el.setAttribute('class', String(_className));
  };
  // initial application
  apply();
  // subscribe to state changes to re-apply the class name
  const _states = Array.isArray(states) ? states.flat() : [states];
  // map over states to create unsubscribe functions
  const unsubs = _states.map((state) => state.sub(apply));
  // return a cleanup function to unsubscribe from all states should the element be removed
  return () => unsubs.forEach((unsub) => unsub());
};
`),t.div(["style","textAlign","center"])("The Locality of Behavior pattern: Using the template above you can not only register this trait across multiple template engines, but same engine, multiple times. Prefixing with the trait name and what it applies to helps keeps things straight"),t.pre(["prism"])(`// define some state
const someSwitch = State(false);

// create a template engine with the style trait
const tmpl = HTML({ 'style': useStyleTraitTrait});

// use the style trait with conditions based on state
// note: you can apply the same trait multiple times with different conditions
tmpl.div(
  ['style', 'color', 'red', someSwitch.$test(true)],
  ['style', 'color', 'green', someSwitch.$test(false)],
)();
`),H("Notice how with this pattern you can apply the same style property multiple times based on different conditions? You can't do that with JSX or CSS without ugly if statements or complex class management. This keeps your code declarative and easy to reason about."))}),l({title:"Thank You!",subtitle:"We appreciate your interest in OEM. We hope you find this project useful. Feel free to contribute or provide feedback!",content:T({prev:{title:"State",menuState:"state"},next:{title:"Introduction",menuState:"introduction"}})}));var m={Grid:(...e)=>t.div(["style","borderRadius","5px"],["style","boxSizing","border-box"],["style","display","grid"],["style","gridTemplateColumns","1fr 1fr"],["style","width","100%"])(...e),Header:(e)=>t.div(["style","backgroundColor","rgba(0,0,0,0.1)"],["style","padding","10px"])(e),Cell:(e)=>t.div(["style","padding","10px"],["style","borderBottom","1px solid rgba(0,0,0,0.1)"],["style","fontSize","13px"],["style","fontSize","16px",p.val,p])(e)};var q=()=>u(u.Header("State","Managing dynamic data with OEM State"),l({title:"The State Object",subtitle:"Each state object in OEM is a micro event bus that can be used anywhere in your application. Although OEM is state management agnostic, it's built-in state management works great for most use cases.",content:d("column",10,t.div(["style","textAlign","center"])("Import the State function to create a state object"),t.pre(["prism"])(`import { State } from 'oem';
const color = State<'red' | 'green'>('red');`))}),l({title:"Getting",subtitle:"Getting the current value of the state is straight forward.",content:d("column",10,t.div(["style","textAlign","center"])("Or with the method  ",S("val()"),"."),t.pre(["prism"])("color.val();"))}),l({title:"Setting",subtitle:"Setting state is straight forward as well and includes a few helper methods which begins to introduce some OEM specific patterns.",content:d("column",10,t.div(["style","textAlign","center"])("Set state with the  ",S("set")," method."),t.pre(["prism"])("color.set('blue');"),t.div(["style","textAlign","center"])("Or create callback version of it with  ",S("$set")," to be called later. More on this in the patterns section."),t.pre(["prism"])(`const setToBlue = color.$set('blue');
setToBlue();`),t.div(["style","textAlign","center"])("State can also be set using a reducer with the ",S("reduce")," method."),t.pre(["prism"])("color.reduce((prev) => prev === 'red' ? 'blue' : 'red');"),t.div(["style","textAlign","center"])("Or create callback version of it with  ",S("$reduce")," to call it later."),t.pre(["prism"])(`const toggleColor = color.$reduce((prev) => prev === 'red' ? 'blue' : 'red');
toggleColor();`))}),l({title:"Subscribing",subtitle:"Subscribing to state changes is an important part of state management. OEM makes this easy with the built-in pub/sub pattern.",content:d("column",10,t.div(["style","textAlign","center"])("Subscribe by calling the ",S("sub")," method."),t.pre(["prism"])(`const cb = (val) => console.log(val)
color.sub(cb);`),t.div(["style","textAlign","center"])("You can unsubscribe from state changes by calling ",S("unsub(cb)")),t.pre(["prism"])("color.unsub(callback);"))}),l({title:"Testing",subtitle:"Testing the current state value is useful for conditionally applying traits or other logic in your application.",content:d("column",10,t.div(["style","textAlign","center"])("Test if the current state matches a value with the ",S("test")," method. Use this for simple values like strings and numbers."),t.pre(["prism"])(`color.test('red');
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
color.$test(/red/, false); // callback version NOT equal`))}),l({title:"Ready-Made States",subtitle:"Here's a set of powerful pre-built states which covers 95% of use cases out of the box.",content:m.Grid(m.Header("State"),m.Header("Description"),m.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/states/MediaQuery.ts"],["attr","target","_blank"])("useMediaQueryState")),m.Cell("Tracks window resize event and matches against a media query"))}),l({title:"Patterns",subtitle:"Now that you know the basics of creating elements with templates, manipulating it with traits and managing state, let's look at some common patterns to build a real application.",content:T({next:{title:"Patterns",menuState:"patterns"},prev:{title:"Traits",menuState:"traits"}})}));var V=()=>u(u.Header("Templates","Creating micro-templating engines with OEM"),l({title:"The HTML function",subtitle:"The HTML function creates a templating engine that can generate HTML elements.",content:d("column",10,t.div(["style","textAlign","center"])("Import the HTML function to create an HTML templating engine"),t.pre(["prism"])(`import { HTML } from 'oem';
const tmpl = HTML({...});`),t.div(["style","textAlign","center"])("You can now generate HTML elements with the templating engine. Notice that the tag generating function is curried. More on that later."),t.pre(["prism"])(`html.div()('Hello World!');
// returns <div>Hello World!</div>`))}),l({title:"Traits",subtitle:"Your template engine can generate html tags, but that's it. How can we add functionality? Small functions called traits. ",content:T({next:{title:"Traits",menuState:"traits"},prev:{title:"Intro",menuState:"introduction"}})}));var K=()=>u(u.Header("Traits","Adding functionality to your templating engine with traits"),l({title:"Creating Traits",subtitle:'A "trait" is just a function that takes an element as its first argument and does something to it.',content:d("column",20,t.div(["style","textAlign","center"])("Here's the basic structure of a trait function:"),t.div(["prism"])(`import { Trait } from 'oem';
const useStyleTrait = (el: HTMLElement) => {
  // do something with the element
  return () => { /* optional cleanup function */ }
}`),t.div(["style","textAlign","center"])('Here is an example of a very simple "style" trait for applying css styles to an element.'),t.div(["prism"])(`const useStyleTrait = (el: HTMLElement, prop: string, value: string) => {
  el.style[prop] = value;
  return () => {}; // nothing to clean up in this case
}`),t.div(["style","textAlign","center"])("This trait can now be added to your templating engine like this:"),t.div(["prism"])('const tmpl = HTML({ "style": useStyleTrait });'),t.div(["style","textAlign","center"])(`Now, when you render an element, the first curried function takes a list of traits to apply to the element. 'style' will be intellisensed along with it's arguments 'prop' and 'value' (everything after the 'el' argument in your trait function). Here is how you would use the "style" trait to make some text red, 24px, and centered:`),t.div(["prism"])(`tmpl.div(
  ['style','color', 'red'],
  ['style','fontSize','24px'],
  ['style','textAlign','center']
)('...');`),H("Note: you could have applied the style textAlign trait multiple times to the same element with different values, and it would apply them in order. However, that would only make sense if we had a way to add a condition. That's exactly what we cover in the Patterns section. First, let's see how State works."))}),l({title:"Ready-Made Traits",subtitle:"Here's a set of powerful pre-built traits that include configurations for responding to events, media queries and state objects with the Locality of Behavior pattern included which covers 95% of use cases out of the box.",content:m.Grid(m.Header("Trait"),m.Header("Description"),m.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Style.ts"],["attr","target","_blank"])("useAttributeTrait")),m.Cell("Apply attributes"),m.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/ClassName.ts"],["attr","target","_blank"])("useClassNameTrait")),m.Cell("Apply class names"),m.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Event.ts"],["attr","target","_blank"])("useEventTrait")),m.Cell("Attach event listener"),m.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/InnerHTML.ts"],["attr","target","_blank"])("useInnerHTMLTrait")),m.Cell("Attach event listener"),m.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/TextContent.ts"],["attr","target","_blank"])("useTextContentTrait")),m.Cell("Apply inner text"),m.Cell(t.a(["attr","href","https://raw.githubusercontent.com/linttrapmedia/oem/refs/heads/main/src/lib/traits/Style.ts"],["attr","target","_blank"])("useStyleTrait")),m.Cell("Apply styles"))}),l({title:"State",subtitle:'OK, we can generate html, and now have a way to manipulate it with traits. But how do we make it dynamic? What if we could reapply traits when something changes? Enter "State".',content:T({next:{title:"State",menuState:"state"},prev:{title:"Templates",menuState:"templates"}})}));var U={name:"@linttrap/oem",author:"@linttrapmedia",title:"oem",version:"1.0.2",description:"A novel UI library for writing reactive html with vanilla javascript",type:"module",exports:{".":"./src/index.ts"},main:"./src/index.ts",module:"./src/index.ts",repository:{type:"git",url:"git+https://github.com/linttrapmedia/oem.git"},license:"MIT",bugs:{url:"https://github.com/linttrapmedia/oem/issues"},homepage:"https://oem.js.org",devDependencies:{"@types/bun":"latest",prettier:"2.7.1"},dependencies:{"@linttrap/oem":"^1.0.0"},private:!1,peerDependencies:{typescript:"^5"}};var L=(e,o)=>{let n=C(!1);return t.div(["style","padding","10px 20px"],["style","cursor","pointer"],["style","transition","background-color 0.3s"],["style","textTransform","uppercase"],["style","color","yellow",!0,n,c],["style","color","white",()=>n.test(!1)&&c.test(o,!1),n,c],["event","click",c.$set(o)],["event","mouseover",n.$set(!0)],["event","mouseout",n.$set(!1)])(e)},Y=()=>t.div(["style","backgroundColor","black"],["style","color","white"],["style","padding","10px"],["style","fontWeight","bold"],["style","fontFamily","monospace"],["style","display","flex"],["style","flexDirection","column"],["style","alignItems","center"],["style","justifyContent","center"],["style","textAlign","center"],["html",()=>[t.div(["style","position","absolute"],["style","top","10px"],["style","right","10px"],["style","cursor","pointer"],["style","fontSize","21px"],["style","textTransform","uppercase"],["style","padding","5px"],["style","opacity","0.5"],["style","display","flex",v.val,v],["style","display","none",p.val,p],["event","click",M.$reduce((e)=>!e)],["html",()=>"-",M.$test(!0),M],["html",()=>"=",M.$test(!1),M])(),t.div(["style","display","flex"],["style","flexDirection","column"],["style","alignItems","center"],["style","justifyContent","center"],["style","position","relative"])(t.div(["style","display","flex"],["style","letterSpacing","2px"],["style","fontSize","40px"],["style","textAlign","left"],["style","lineHeight",0.75],["style","color","white"],["style","fontFamily","Splash"],["style","gap","5px"],["style","fontWeight","normal"],["style","cursor","pointer"],["event","click",c.$set("introduction")])("oem",t.span(["style","fontSize","10px"],["style","fontWeight","bold"],["style","fontFamily","monospace"],["style","letterSpacing","0"],["style","color","yellow"])(U.version))),t.div(["style","display","flex"],["style","flexDirection","column"],["style","justifyContent","center"],["style","display","none",()=>v.val()&&!M.val(),M,v],["style","display","flex",()=>p.val()||M.val(),M,p],["style","paddingTop","20px"])(L("Intro","introduction"),L("Docs","docs"),L("Templates","templates"),L("Traits","traits"),L("State","state"),L("Patterns","patterns"),t.a(["style","marginTop","20px"],["style","color","white"],["style","padding","10px"],["style","textDecoration","none"],["style","border","1px solid rgba(255,255,255,0.2)"],["attr","href","https://github.com/linttrapmedia/oem"],["attr","target","_blank"])("GITHUB"))]])();function st(){return t.div(["attr","data-part","App"],["style","display","grid"],["style","gridTemplateRows","max-content 1fr",v.val,v],["style","gridTemplateColumns","1fr",v.val,v],["style","gridTemplateRows","auto",p.val,p],["style","gridTemplateColumns","max-content 1fr",p.val,p],["style","height","100vh",p.val,p],["style","height","auto",v.val,v],["style","justifyContent","start"],["style","width","100vw",p.val,p],["style","width","auto",v.val,v],["style","overflow","hidden"],["style","minWidth",0])(t.div(["style","backgroundColor","black"],["style","padding","10px"])(Y()),t.div(["attr","data-part","AppContent"],["style","display","flex"],["style","flexDirection","column"],["style","gap","50px"],["style","boxSizing","border-box"],["style","padding","20px 20px 100px"],["style","height","100%"],["style","overflowY","auto"],["style","overflowX","hidden"],["style","maxWidth","100%"],["style","minWidth",0],["html",B,c.$test("introduction"),c],["html",j,c.$test("docs"),c],["html",V,c.$test("templates"),c],["html",K,c.$test("traits"),c],["html",q,c.$test("state"),c],["html",_,c.$test("patterns"),c])())}document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("root");if(!e)return null;e.appendChild(st())});function Q(){document.querySelector("[data-part='AppContent']")?.scrollTo({top:0})}c.sub(Q);document.addEventListener("keydown",(e)=>{let o=e.key,n=c.val();if(o!=="ArrowRight"&&o!=="ArrowLeft")return;let i={introduction:o==="ArrowRight"?"docs":"patterns",docs:o==="ArrowRight"?"templates":"introduction",templates:o==="ArrowRight"?"traits":"docs",traits:o==="ArrowRight"?"state":"templates",state:o==="ArrowRight"?"patterns":"traits",patterns:o==="ArrowRight"?"introduction":"state"}[n];if(!i)return;c.set(i),Q()});})();

//# debugId=93CEA636703C151564756E2164756E21
//# sourceMappingURL=app.js.map
