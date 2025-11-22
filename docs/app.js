(()=>{function k(o){let n=o,r=new Set,u=(d)=>{n=d,r.forEach((v)=>v(d))},m=(d)=>()=>u(d),h=(d)=>u(d(n)),f=(d)=>()=>u(d(b())),c=(d)=>{return r.add(d),()=>r.delete(d)},y=(d,v=!0)=>{let x=JSON.stringify(n);if(d instanceof RegExp){let T=d.test(x);return v?T:!T}else if(typeof d==="function"&&d instanceof Function){let T=d(n);return v?T:!T}else{let T=JSON.stringify(d),C=x===T;return v?C:!C}},i=(d,v=!0)=>{let x=()=>y(d,v);return x.sub=c,x.type="$test",x},b=()=>n,p=()=>n;return p.sub=c,p.type="$val",{$call:(d,v)=>{let x=()=>n[d](v);return x.sub=c,x.type="$call",x},$chain:(...d)=>{let v=()=>d.reduce((x,[T,...C])=>x[T](...C),b());return v.sub=c,v.type="$chain",v},$reduce:f,$set:m,$test:i,$val:p,call:(d,...v)=>n[d](...v),chain:(...d)=>d.reduce((v,[x,...T])=>v[x](...T),n),reduce:h,set:u,sub:c,test:y,val:b,_subs:r}}var w=new WeakMap,D=new MutationObserver((o)=>{for(let n of o)if(n.type==="childList")n.removedNodes.forEach((r)=>{if(r instanceof HTMLElement&&w.has(r))w.get(r).forEach((m)=>m()),w.delete(r)})});D.observe(document.documentElement,{childList:!0,subtree:!0});function E(o){let n=new Proxy({},{get:(u,m)=>{let h=(...f)=>{let c=document.createElement(m);return f.forEach((y)=>{if(y.type==="trait")y(c);else if(typeof y==="function")if(y.hasOwnProperty("sub")){let i=document.createTextNode("");c.appendChild(i);let b=()=>i.data=y(c);b();let p=y.sub(b);w.set(c,[...w.get(c)||[],p])}else c.append(y(c));else c.append(y)}),c};return h.type="tag",h}}),r=new Proxy({},{get:(u,m)=>(...h)=>{let f=(c)=>{let y=o[m],i=y(c,...h),b=w.get(c)||[];b.push(i),w.set(c,b)};return f.type="trait",f}});return[n,r]}var M=(o,n,r,...u)=>{let m=(i)=>Object.keys(i).includes("sub"),h=[r??"",...u].filter(m),f=u.filter((i)=>!m(i)),c=()=>{let i=typeof r==="function"?r():r;if(f.every((p)=>typeof p==="function"?p():p))if(i===void 0)o.removeAttribute(n);else o.setAttribute(n,String(i));else o.removeAttribute(n)};c();let y=h.map((i)=>i.sub(c));return()=>y.forEach((i)=>i())};function B(o,n,r,...u){let m=(b)=>Object.keys(b).includes("sub"),h=u.filter(m),f=u.filter((b)=>!m(b)),c=!1,y=()=>{if(f.every((p)=>typeof p==="function"?p():p)&&!c)o.addEventListener(n,r),c=!0;else o.removeEventListener(n,r),c=!1};y();let i=h.map((b)=>b.sub(y));return()=>{o.removeEventListener(n,r),i.forEach((b)=>b())}}function L(o,n,...r){let u=(i)=>Object.keys(i).includes("sub"),m=(i)=>typeof i==="function"&&i.type==="$test",h=[n,...r].filter(u),f=r.filter((i)=>!u(i)||m(i)),c=()=>{let i=typeof n==="function"?n():n;if(f.every((p)=>typeof p==="function"?p():p)){if(o.innerHTML="",i!==void 0)if(Array.isArray(i))i.filter((p)=>p).forEach((p)=>{if(p instanceof HTMLElement||p instanceof SVGElement)o.appendChild(p);else o.appendChild(document.createTextNode(String(p)))});else if(i instanceof HTMLElement||i instanceof SVGElement)o.appendChild(i);else o.innerHTML=String(i)}};c();let y=h.map((i)=>i.sub(c));return()=>y.forEach((i)=>i())}function $(o,n,r,...u){let m=(i)=>Object.keys(i).includes("sub"),h=u.filter(m),f=u.filter((i)=>!m(i)),c=()=>{let i=typeof r==="function"?r():r;if(f.every((p)=>typeof p==="function"?p():p))n.startsWith("--")?o.style.setProperty(n,i):o.style[n]=i};c();let y=h.map((i)=>i.sub(c));return()=>y.forEach((i)=>i())}var I=(o,n)=>{o.style.display="block",o.style.whiteSpace="pre",o.style.fontFamily="'Courier New', Courier, monospace",o.style.color="white",o.style.backgroundColor="#222222",o.style.padding="30px",o.style.borderRadius="5px",o.style.overflowX="auto",o.style.maxWidth="100%",o.style.width="100%",o.style.minWidth="0",o.style.boxSizing="border-box",o.style.wordBreak="normal";let r=new MutationObserver((u)=>{u.forEach((m)=>{if(m.type==="childList"){if(m.addedNodes.length>0){r.disconnect();let h=Prism.highlight(o.innerText,Prism.languages.typescript);o.innerHTML=h}}})});return r.observe(o,{childList:!0}),o},[t,e]=E({attr:M,event:B,style:$,html:L,prism:I});var g=(o,n,...r)=>{return t.div(e.style("display","flex"),e.style("flexDirection",o),e.style("gap",`${n}px`),e.style("width","100%"),...r)};var a=(o,n="typescript")=>{return t.pre(e.prism(n),o.trim())},s=(o)=>{return t.code(e.style("backgroundColor","#858585"),e.style("color","#d4d4d4"),e.style("padding","2px 6px"),e.style("borderRadius","3px"),e.style("fontSize","12px"),o)};var O={name:"@linttrap/oem",version:"2.0.0",author:"@linttrapmedia",repository:{type:"git",url:"git+https://github.com/linttrapmedia/oem.git"},main:"./src/oem.ts",module:"./src/oem.ts",devDependencies:{"@types/bun":"latest",prettier:"2.7.1"},peerDependencies:{typescript:"^5"},exports:{".":"./src/oem.ts"},bugs:{url:"https://github.com/linttrapmedia/oem/issues"},description:"A novel UI library for writing reactive html with vanilla javascript",homepage:"https://oem.js.org",license:"MIT",private:!1,title:"oem",type:"module",dependencies:{"@linttrap/oem":"^1.0.2"}};var A=(...o)=>{return t.div(e.style("display","flex"),e.style("flexDirection","column"),e.style("gap","30px"),e.style("maxWidth","900px"),e.style("margin","0 auto"),e.style("width","100%"),...o)};A.Header=(o,n)=>{return t.div(e.style("position","relative"),t.h1(e.style("fontFamily","Splash"),e.style("fontSize","64px"),e.style("fontWeight","normal"),o,t.small(e.style("fontSize","10px"),e.style("fontFamily","Arial, sans-serif"),e.style("top","20px"),e.style("position","absolute"),e.style("marginLeft","10px"),e.style("opacity","0.4"),O.version)),t.p(n))};var l=(o)=>{return t.div(e.attr("id",o.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")),t.div(e.style("display","flex"),e.style("alignItems","center"),e.style("gap","10px"),o.type==="main"?t.h2(o.title):t.h3(o.title),t.a(e.style("fontSize","14px"),e.style("textDecoration","none"),e.style("border","1px solid #a4a4a4ff"),e.style("padding","2px 6px"),e.style("borderRadius","4px"),e.attr("href","#"),"¶")),o.subtitle?t.p(o.subtitle):"",o.content)};var j=()=>A(A.Header("oem","The roll your your own framework framework"),l({title:"Menu",type:"main",content:g("column",0,t.ul(t.li(t.a(e.attr("href","#what-is-oem"),"What is OEM?")),t.li(t.a(e.attr("href","#why-oem"),"Why OEM?")),t.li(t.a(e.attr("href","#state"),"State")),t.li(t.a(e.attr("href","#templating"),"Templating")),t.li(t.a(e.attr("href","#components"),"Components")),t.li(t.a(e.attr("href","#svg-support"),"SVG Support")),t.li(t.a(e.attr("href","#storage"),"Storage")),t.li(t.a(e.attr("href","#traits"),"Traits")),t.li(t.a(e.attr("href","#reactive-pattern"),"The Reactive Pattern")),t.li(t.a(e.attr("href","#creating-custom-traits"),"Creating Custom Traits")),t.li(t.a(e.attr("href","#core-methods"),"Core Methods"))))}),l({title:"What is OEM?",type:"main",subtitle:"Building blocks for creating your own framework. There are three:",content:g("column",20,t.ul(e.style("listStyle","none"),t.li(t.strong(e.style("fontWeight","bold"),"State")," - Reactive state management with pub/sub pattern"),t.li(t.strong("Template")," - Create custom templating engines with trait-based behaviors"),t.li(t.strong("Storage")," - Persistent state with web storage and remote syncing")))}),l({title:"Why OEM?",type:"main",subtitle:"Understand the code you write (and AI generates) down to every single line of your framework",content:g("column",0,t.ul(e.style("listStyle","none"),t.li("✓ Lightweight (~2KB minified)"),t.li("✓ Zero dependencies"),t.li("✓ Locality of behavior patterns with traits"),t.li("✓ Build your own declarative UI framework"),t.li("✓ Full TypeScript support"),t.li("✓ Reactive DOM without a virtual DOM")))}),l({title:"Quick Example",subtitle:"Here's a simple counter to show you how OEM works:",content:a(`
// Create template with traits
const [tag, trait] = Template({
  event: useEventTrait,
});

// Create reactive state
const count = State(0);

// Generate DOM
const app = tag.div(
  tag.h1(count.$val),
  tag.button(
    trait.event('click', count.$reduce((n) => n + 1)),
    'Increment',
  ),
);
`)}),l({title:"Installation",content:a("npm install @linttrap/oem","bash")}),l({title:"State",type:"main",subtitle:"Create a state object with an initial value:",content:a(`import { State } from '@linttrap/oem';

const count = State(0);
const name = State('Alice');
const user = State({ id: 1, name: 'Bob' });

// With TypeScript
const color = State<'red' | 'green' | 'blue'>('red');`)}),l({title:"Getting Values",content:g("column",0,t.p("Use ",s("val()")," to get the current value:"),a(`const count = State(10);
count.val(); // 10`),t.p("Use ",s("$val()")," to get a closure that returns the value:"),a(`const getCount = count.$val();
getCount(); // 10`))}),l({title:"Setting Values",content:g("column",0,t.p("Set a new value with ",s("set(value)"),":"),a("count.set(5);"),t.p("Use ",s("$set(value)")," to get a closure that sets the value when called:"),a(`const setToTen = count.$set(10);
setToTen(); // count is now 10

// Perfect for event handlers
tag.button(trait.event('click', count.$set(0)), 'Reset')`),t.p("Update based on previous value with ",s("reduce(fn)"),":"),a("count.reduce((prev) => prev + 1);"),t.p("Use ",s("$reduce(fn)")," to get a closure for event handlers:"),a(`tag.button(
  trait.event('click', count.$reduce((n) => n + 1)), 'Increment')
)`))}),l({title:"Subscribing to Changes",content:g("column",0,t.p("Subscribe to state changes. Returns an unsubscribe function:"),a(`const unsub = count.sub((newValue) => {
  console.log('Count changed:', newValue);
});

count.set(5); // Logs: "Count changed: 5"

// Unsubscribe
unsub();`))}),l({title:"Testing Values",content:g("column",0,t.p("Test if current value matches a condition:"),a(`const color = State('red');
    
// Direct comparison
color.test('red'); // true
color.test('blue'); // false

// Inverse check
color.test('red', false); // false

// Function predicate
const items = State([1, 2, 3]);
items.test((arr) => arr.length > 2); // true

// Regular expression
const name = State('Alice');
name.test(/^A/); // true

// Use in traits
tag.div(
  trait.style('display', 'block', isVisible.$test(true))
)`))}),l({title:"Method Calls",content:g("column",0,t.p(s("call(...)")," to call methods on boxed primitives (String, Number, Boolean):"),a(`const text = State('hello world');
text.call('toUpperCase'); // 'HELLO WORLD'

const num = State(3.14159);
num.call('toFixed', 2); // '3.14'

// Use $call for reactive updates
tag.div(
  trait.html(count.$call('toUpperCase'))
)`),t.p(s("chain(...)")," to chain multiple method calls:"),a(`const text = State('  hello world  ');
text.chain(
  ['trim'],
  ['toUpperCase'],
  ['split', ' ']
); // ['HELLO', 'WORLD']

// Use $chain for reactive updates
tag.div(
  trait.html(
    text.$chain(['toUpperCase'], ['split', ''])
  )
)`))}),l({title:"The $ Pattern",subtitle:"Methods prefixed with $ return closures that can be passed as callbacks. Additionally, they support reactive traits:",content:g("column",0,t.table(e.style("width","100%"),e.style("borderCollapse","collapse"),e.html([t.thead(e.html(t.tr(e.html([t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Method"),t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"$ Version"),t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Use Case")])))),t.tbody(e.html([t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("val()"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("$val()"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Get value reactively")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("set(v)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("$set(v)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Event handlers")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("reduce(fn)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("$reduce(fn)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Event handlers")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("test(p)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("$test(p)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Conditional traits")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("call(m)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(s("$call(m)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Reactive innerHTML")]))]))])))}),l({title:"Templating",type:"main",subtitle:"The Template function takes a configuration object mapping trait names to functions:",content:a(`import { Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useEventTrait } from '@linttrap/oem/traits/Event';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`)}),l({title:"The Tag Proxy",subtitle:"Creates HTML/SVG elements with full TypeScript support:",content:a(`const div = tag.div();
const button = tag.button();
const svg = tag.svg();
const circle = tag.circle();

// All HTML and SVG elements available!`)}),l({title:"The Trait Proxy",subtitle:"Provides access to configured trait functions:",content:a(`// After configuration, you have:
trait.style('color', 'red');
trait.event('click', handleClick);
// ... all your configured traits`)}),l({title:"Applying Traits",subtitle:"Pass traits as arguments to tag functions:",content:g("column",0,a(`tag.div(
  trait.style('padding', '20px'),
  trait.style('color', 'blue'),
 ...
)`))}),l({title:"Working with Children",content:g("column",0,t.p("Simple Children"),a(`tag.p('This is a paragraph')
tag.h1('Title')
tag.span(123)`),t.p("Nested Elements"),a(`tag.div(
  tag.h1('Title'),
  tag.p('Description'),
  tag.button('Click me')
)`),t.p("Dynamic Children"),a(`
const msg = State('Hello, World!');
const items = State(['Apple', 'Banana', 'Orange']);

tag.div(msg.$val); // Reactive message

tag.ul(
  trait.html(
    items.$call('map', (item) => tag.li(item)) // Reactive list items
  )
)`))}),l({title:"Subscribing to State Changes",content:g("column",0,t.p("Using ",s("$val()")," in traits automatically subscribes to changes:"),a("tag.p(someState.$val)"),t.p("To subscribe manually, simply add the state object to the trait arguments (trait must support it):"),a("trait.style('display', 'block', isVisible.val, isVisible)"),t.p("This pattern then supports multiple state objects. The value needs to be a function (so you can recompute it when the state changes):"),a("trait.style('opacity', () => 'computed value', stateObject1, stateObject2)"))}),l({title:"Component Functions",type:"main",subtitle:"Components are just functions that return elements:",content:a(`function Button(text: string, onClick: () => void) {
  return tag.button(
    trait.style('padding', '10px 20px'),
    trait.style('backgroundColor', 'blue'),
    trait.style('color', 'white'),
    trait.style('border', 'none'),
    trait.style('borderRadius', '5px'),
    trait.style('cursor', 'pointer'),
    trait.event('click', onClick),
    text
  );
}

// Use it
const app = tag.div(
  Button('Click me', () => console.log('Clicked!'))
);`)}),l({title:"SVG Support",type:"main",subtitle:"Full support for SVG elements:",content:a(`const icon = tag.svg(
  trait.attr('width', '24'),
  trait.attr('height', '24'),
  trait.attr('viewBox', '0 0 24 24'),

  tag.circle(
    trait.attr('cx', '12'),
    trait.attr('cy', '12'),
    trait.attr('r', '10'),
    trait.style('fill', 'blue')
  ),

  tag.path(
    trait.attr('d', 'M12 2L2 22h20L12 2z'),
    trait.style('fill', 'white')
  )
);`)}),l({title:"Storage",type:"main",subtitle:"Automatically sync state with localStorage, sessionStorage, or memory:",content:a(`import { Storage, State } from '@linttrap/oem';

const storage = Storage({
  data: {
    username: {
      key: 'app-username',
      state: State(''),
      storage: 'localStorage',
    },
    theme: {
      key: 'app-theme',
      state: State<'light' | 'dark'>('light'),
      storage: 'localStorage',
    },
    sessionToken: {
      key: 'app-session',
      state: State(''),
      storage: 'sessionStorage',
    },
  },
});`)}),l({title:"Storage Types",content:g("column",0,t.ul(e.style("fontSize","16px"),e.style("lineHeight","1.2"),e.html([t.li(s("localStorage")," - Persists across browser sessions"),t.li(s("sessionStorage")," - Cleared when tab/window closes"),t.li(s("memory")," - No persistence, runtime only")])))}),l({title:"Accessing State",subtitle:"Access state objects directly from the storage:",content:a(`// Get value
console.log(storage.data.username.val());

// Set value (automatically saves to localStorage)
storage.data.username.set('Alice');

// Subscribe to changes
storage.data.username.sub((value) => {
  console.log('Username changed:', value);
});`)}),l({title:"Sync Methods",subtitle:"Define custom methods for syncing with external sources:",content:a(`const storage = Storage({
  data: {
    todos: {
      key: 'todos',
      state: State([]),
      storage: 'localStorage',
    },
  },
  sync: {
    fetchTodos: async () => {
      const response = await fetch('/api/todos');
      const todos = await response.json();
      storage.data.todos.set(todos);
    },
    saveTodo: async (todo) => {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(todo),
      });
      storage.sync.fetchTodos();
    },
  },
});

// Use sync methods
await storage.sync.fetchTodos();
await storage.sync.saveTodo({ title: 'New Todo', completed: false });`)}),l({title:"Complete Storage Example",subtitle:"Todo app with persistent storage:",content:a(`import { Storage, State } from '@linttrap/oem';

const storage = Storage({
  data: {
    newTodo: {
      key: 'todo-input',
      state: State(''),
      storage: 'localStorage',
    },
    todos: {
      key: 'todos',
      state: State([]),
      storage: 'localStorage',
    },
  },
  sync: {
    addTodo: () => {
      const title = storage.data.newTodo.val().trim();
      if (title) {
        storage.data.todos.reduce((curr) => [
          ...curr,
          { title, completed: false }
        ]);
        storage.data.newTodo.set('');
      }
    },
    toggleTodo: (id) => {
      storage.data.todos.reduce((curr) =>
        curr.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        )
      );
    },
  },
});`)}),l({title:"Traits?",type:"main",subtitle:"A trait is a function that takes an element and applies behavior to it:",content:a(`function useMyTrait(
  el: HTMLElement,
  param1: string,
  ...rest: (StateType<any> | Condition)[]
) {
  // Apply behavior to element
  el.textContent = param1;

  // Return cleanup function
  return () => {
    // Clean up resources
  };
}`)}),l({title:"Ready-Made Traits",subtitle:"OEM provides a set of traits for common behaviors which covers most use cases but you have to install them separately. Separating them from the core library keeps the core small and lets you pick only what you need, including building your own custom traits.",content:g("column",0,t.table(e.style("width","100%"),e.style("borderCollapse","collapse"),t.thead(t.tr(t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Trait"),t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Description"))),t.tbody(t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useAttributeTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Apply HTML attributes")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useClassNameTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Manage CSS classes")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useEventTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Attach event listeners")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useFocusTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Control element focus")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useInnerHTMLTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Set innerHTML reactively")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useInputValueTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Bind input values")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useInputEvent")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Handle input events")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),s("useStyleTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Apply CSS styles")),t.tr(t.td(e.style("padding","10px"),s("useTextContentTrait")),t.td(e.style("padding","10px"),"Set text content reactively")))))}),l({title:"Example Usage of Ready-Made Traits",content:g("column",0,t.p("Apply HTML attributes to elements"),a(`import { useAttributeTrait } from '@linttrap/oem/traits/Attribute';

trait.attr('type', 'text')
trait.attr('placeholder', 'Enter name')
trait.attr('disabled', 'true', isDisabled.$val)`),t.p("Manage CSS classes"),a(`import { useClassNameTrait } from '@linttrap/oem/traits/ClassName';

trait.class('container')
trait.class('active', isActive.$val)`),t.p("Attach event listeners"),a(`import { useEventTrait } from '@linttrap/oem/traits/Event';

trait.event('click', handleClick)
trait.event('submit', handleSubmit, 'Click me')`),t.p("Apply CSS styles"),a(`import { useStyleTrait } from '@linttrap/oem/traits/Style';

trait.style('padding', '20px')
trait.style('color', 'red')
trait.style('--custom-var', 'blue') // CSS variables
trait.style('display', 'block', isVisible.$test(true)) // Show when true
trait.style('display', 'none', isVisible.$test(false)) // Hide when false
`),t.p("Set innerHTML reactively with arrays of elements"),a(`import { useInnerHTMLTrait } from '@linttrap/oem/traits/InnerHTML';

trait.html('<strong>Bold</strong>')
trait.html(items.$call('map', item => tag.li(item))) // Reactive list
trait.html('Visible', isVisible.$val)`),t.p("Bind input values to state"),a(`import { useInputValueTrait } from '@linttrap/oem/traits/InputValue';

tag.input(trait.value(name.$val))`),t.p("Control element focus"),a(`import { useFocusTrait } from '@linttrap/oem/traits/Focus';

trait.focus(shouldFocus.$val)`))}),l({title:"The Reactive Pattern",type:"main",subtitle:"All Ready-Made traits support reactive parameters:",content:g("column",0,t.p("You can subscribe to state changes two ways. Support is 100% dependent on the trait implementation."),a(`
// by using a $ methods
trait.style('display', 'block', isVisible.$val)
trait.style('display', 'none', isVisible.$test(false))
trait.style('display', 'flex', isVisible.$call('toString'))

// by passing state objects as additional arguments
trait.style('opacity', () => 'computed value', stateObject1, stateObject2)
          `))}),l({title:"Creating Custom Traits",subtitle:"Here's the basic ou1tline for creating a custom trait:",content:a(`function useMyCustomTrait(
  el: HTMLElement,
  text: string,
  ...rest: (StateType<any> | Condition)[]
) {

  // get your list of conditions and state
  const isStateObj = (i: any) => i && 'sub' in i;
  const states = rest.filter(isStateObj);
  const conditions = rest.filter(i => !isStateObj(i));

  // create an apply function to set the trait behavior
  const apply = () => {
    const applies = conditions.every(c =>
      typeof c === 'function' ? c() : c
    );
    if (applies) {
      // YOUR CODE GOES HERE
    }
  };

  // initial application
  apply();

  // subscribe to state changes
  const unsubs = states.map(state => state.sub(apply));

  // return cleanup function
  return () => unsubs.forEach(unsub => unsub());
}

// Use it
const [tag, trait] = Template({
  tooltip: useTooltipTrait,
});

tag.button(
  trait.tooltip('Click to submit'),
  'Submit'
)`)}),l({title:"Counter App",subtitle:"A simple counter demonstrating state and events:",content:a(`// Create template with traits
const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
  html: useInnerHTMLTrait,
  text: useTextContentTrait,
});

// Create reactive state
const count = State(0);

// Build UI
const app = tag.div(
  tag.h1(count.$val),
  tag.button(
    trait.event(
      'click',
      count.$reduce((n) => n + 1),
    ),
    'Increment',
  ),
);`)}),l({title:"Todo List",subtitle:"Complete todo app with localStorage persistence:",content:a(`
const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
  attr: useAttributeTrait,
  focus: useFocusTrait,
  value: useInputValueTrait,
  input: useInputEvent,
  html: useInnerHTMLTrait,
});

const view = tag.div(
  tag.form(
    trait.event('submit', (e) => e!.preventDefault()),
    tag.input(
      trait.attr('id', 'new-todo'),
      trait.attr('type', 'text'),
      trait.attr('placeholder', 'New todo...'),
      trait.attr('autofocus', 'true'),
      trait.focus(storage.data.newTodo.$test('')),
      trait.input('input', storage.data.newTodo.set),
      trait.value(storage.data.newTodo.val, storage.data.newTodo),
    ),
    tag.button(trait.event('click', $fsm('ADD')), 'Add'),
  ),
  tag.ul(
    trait.html(
      storage.data.todos.$call('map', (todo: TodoType) =>
        tag.li(
          trait.style('display', 'grid'),
          trait.style('gridTemplateColumns', 'auto min-content min-content'),
          tag.span(trait.style('textDecoration', 'line-through', todo.completed), todo.title),
          tag.button(trait.event('click', $fsm('TOGGLE', todo)), 'Toggle'),
          tag.button(trait.event('click', $fsm('DELETE', todo)), 'Delete'),
        ),
      ),
    ),
  ),
);`)}),l({title:"Core Methods",subtitle:"Method signatures for core OEM functions:",type:"main",content:g("column",20)}),l({title:"State<T>(initialValue)",subtitle:"State objects provide the following methods:",content:g("column",0,a("State<T>(initialValue: T): StateType<T>"),t.ul(e.style("lineHeight","1.8"),t.li(s("val()")," - Get current value"),t.li(s("set(value)")," - Set new value"),t.li(s("reduce(fn)")," - Update based on previous value"),t.li(s("sub(callback)")," - Subscribe to changes, returns unsubscribe function"),t.li(s("test(predicate, truthCheck?)")," - Test value against condition"),t.li(s("call(method, ...args)")," - Call methods on boxed primitives"),t.li(s("chain(...calls)")," - Chain method calls")),t.p("All methods have $ prefixed versions that return closures:"),t.ul(e.style("lineHeight","1.8"),t.li(s("$val()"),", ",s("$set()"),", ",s("$reduce()"),", ",s("$test()"),", ",s("$call()"),", ",s("$chain()"))))}),l({title:"Template<P>(config)",subtitle:"Create custom templating engines",content:g("column",0,t.h4("Signature"),a("Template<P>(config?: P): [TagProxy, TraitProxy]"),t.h4("Returns"),t.p("Tuple of [tag, trait] proxies:"),t.ul(e.style("lineHeight","1.8"),t.li(s("tag")," - Creates HTML/SVG elements"),t.li(s("trait")," - Applies configured behaviors")),t.h4("Example"),a(`const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`))}),l({title:"Storage<Data, Sync>(config)",subtitle:"Create persistent state with browser storage",content:g("column",0,t.h4("Signature"),a("Storage<Data, Sync>(config): { data, sync }"),t.h4("Storage Types"),t.ul(e.style("lineHeight","1.8"),t.li(s("localStorage")," - Persists across sessions"),t.li(s("sessionStorage")," - Current session only"),t.li(s("memory")," - No persistence")),t.h4("Returns"),t.ul(e.style("lineHeight","1.8"),t.li(s("data")," - Object with state instances"),t.li(s("sync")," - Object with sync methods")))}),l({title:"Browser Support",type:"main",content:g("column",10,t.p("OEM works in all modern browsers that support ES6+"),t.p("Minimum versions: Chrome 49+, Firefox 18+, Safari 10+, Edge 12+"))}),l({title:"License",type:"main",content:g("column",10,t.p("MIT License"),t.p("© ",new Date().getFullYear()," Lint Trap Media"))}));var H=(o)=>{let{type:n="all",minWidth:r=0,maxWidth:u=1/0}=o,m=k(!1),h=()=>{let f=window.innerWidth,c=f>=r&&f<=u,y=n==="all"||window.matchMedia(n).matches;m.set(c&&y)};return h(),window.addEventListener("resize",h),m};var R=(o)=>{o.style.display="block",o.style.whiteSpace="pre",o.style.fontFamily="monospace",o.style.color="white",o.style.backgroundColor="black",o.style.padding="30px",o.style.borderRadius="5px",o.style.overflowX="auto",o.style.maxWidth="100%",o.style.width="100%",o.style.minWidth="0",o.style.boxSizing="border-box",o.style.wordBreak="normal";let n=new MutationObserver((r)=>{r.forEach((u)=>{if(u.type==="childList"){if(u.addedNodes.length>0){n.disconnect();let m=Prism.highlight(o.innerText,Prism.languages.typescript);o.innerHTML=m}}})});return n.observe(o,{childList:!0}),o},Et=k("introduction"),Mt=k(!1),Bt=H({type:"screen",minWidth:0,maxWidth:959}),Lt=H({type:"screen",minWidth:960,maxWidth:1/0}),[$t,S]=E({attr:M,event:B,prism:R,style:$,html:L});function W(){return t.div(S.attr("data-app","OEM Documentation"),S.style("padding","2rem"),S.html(t.div(S.attr("data-part","AppContent"),S.style("display","flex"),S.style("flexDirection","column"),S.html(j))))}document.addEventListener("DOMContentLoaded",()=>{let o=document.getElementById("root");if(!o)return;o.appendChild(W())});})();

//# debugId=F8B082D5F2F3855C64756E2164756E21
//# sourceMappingURL=app.js.map
