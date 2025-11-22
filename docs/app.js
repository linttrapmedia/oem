(()=>{var f=new WeakMap,M=new MutationObserver((a)=>{for(let l of a)if(l.type==="childList")l.removedNodes.forEach((c)=>{if(c instanceof HTMLElement&&f.has(c))f.get(c).forEach((u)=>u()),f.delete(c)})});M.observe(document.documentElement,{childList:!0,subtree:!0});function T(a){let l=new Proxy({},{get:(g,u)=>{let h=(...b)=>{let p=document.createElement(u);return b.forEach((m)=>{if(m.type==="trait")m(p);else if(typeof m==="function")if(m.hasOwnProperty("sub")){let s=document.createTextNode("");p.appendChild(s);let y=()=>s.data=m(p);y();let d=m.sub(y);f.set(p,[...f.get(p)||[],d])}else p.append(m(p));else p.append(m)}),p};return h.type="tag",h}}),c=new Proxy({},{get:(g,u)=>(...h)=>{let b=(p)=>{let m=a[u],s=m(p,...h),y=f.get(p)||[];y.push(s),f.set(p,y)};return b.type="trait",b}});return[l,c]}var x=(a,l,c,...g)=>{let u=(s)=>Object.keys(s).includes("sub"),h=[c??"",...g].filter(u),b=g.filter((s)=>!u(s)),p=()=>{let s=typeof c==="function"?c():c;if(b.every((d)=>typeof d==="function"?d():d))if(s===void 0)a.removeAttribute(l);else a.setAttribute(l,String(s));else a.removeAttribute(l)};p();let m=h.map((s)=>s.sub(p));return()=>m.forEach((s)=>s())};function S(a,l,c,...g){let u=(y)=>Object.keys(y).includes("sub"),h=g.filter(u),b=g.filter((y)=>!u(y)),p=!1,m=()=>{if(b.every((d)=>typeof d==="function"?d():d)&&!p)a.addEventListener(l,c),p=!0;else a.removeEventListener(l,c),p=!1};m();let s=h.map((y)=>y.sub(m));return()=>{a.removeEventListener(l,c),s.forEach((y)=>y())}}function w(a,l,...c){let g=(s)=>Object.keys(s).includes("sub"),u=(s)=>typeof s==="function"&&s.type==="$test",h=[l,...c].filter(g),b=c.filter((s)=>!g(s)||u(s)),p=()=>{let s=typeof l==="function"?l():l;if(b.every((d)=>typeof d==="function"?d():d)){if(a.innerHTML="",s!==void 0)if(Array.isArray(s))s.filter((d)=>d).forEach((d)=>{if(d instanceof HTMLElement||d instanceof SVGElement)a.appendChild(d);else a.appendChild(document.createTextNode(String(d)))});else if(s instanceof HTMLElement||s instanceof SVGElement)a.appendChild(s);else a.innerHTML=String(s)}};p();let m=h.map((s)=>s.sub(p));return()=>m.forEach((s)=>s())}function k(a,l,c,...g){let u=(s)=>Object.keys(s).includes("sub"),h=g.filter(u),b=g.filter((s)=>!u(s)),p=()=>{let s=typeof c==="function"?c():c;if(b.every((d)=>typeof d==="function"?d():d))l.startsWith("--")?a.style.setProperty(l,s):a.style[l]=s};p();let m=h.map((s)=>s.sub(p));return()=>m.forEach((s)=>s())}var $=(a,l)=>{a.style.display="block",a.style.whiteSpace="pre",a.style.fontFamily="'Courier New', Courier, monospace",a.style.color="white",a.style.backgroundColor="#222222",a.style.padding="30px",a.style.borderRadius="5px",a.style.overflowX="auto",a.style.maxWidth="100%",a.style.width="100%",a.style.minWidth="0",a.style.boxSizing="border-box",a.style.wordBreak="normal";let c=new MutationObserver((g)=>{g.forEach((u)=>{if(u.type==="childList"){if(u.addedNodes.length>0){c.disconnect();let h=Prism.highlight(a.innerText,Prism.languages.typescript);a.innerHTML=h}}})});return c.observe(a,{childList:!0}),a},[t,e]=T({attr:x,event:S,style:k,html:w,prism:$});var r=(a,l,...c)=>{return t.div(e.style("display","flex"),e.style("flexDirection",a),e.style("gap",`${l}px`),e.style("width","100%"),...c)};var i=(a,l="typescript")=>{return t.pre(e.prism(l),a.trim())},o=(a)=>{return t.code(e.style("backgroundColor","#858585"),e.style("color","#d4d4d4"),e.style("padding","2px 6px"),e.style("borderRadius","3px"),e.style("fontSize","12px"),a)};var C={name:"@linttrap/oem",version:"2.0.0",author:"@linttrapmedia",repository:{type:"git",url:"git+https://github.com/linttrapmedia/oem.git"},main:"./src/oem.ts",module:"./src/oem.ts",devDependencies:{"@types/bun":"latest",prettier:"2.7.1"},peerDependencies:{typescript:"^5"},exports:{".":"./src/oem.ts"},bugs:{url:"https://github.com/linttrapmedia/oem/issues"},description:"A novel UI library for writing reactive html with vanilla javascript",homepage:"https://oem.js.org",license:"MIT",private:!1,title:"oem",type:"module",dependencies:{"@linttrap/oem":"^1.0.2"}};var v=(...a)=>{return t.div(e.style("display","flex"),e.style("flexDirection","column"),e.style("gap","30px"),e.style("maxWidth","900px"),e.style("margin","0 auto"),e.style("width","100%"),...a)};v.Header=(a,l)=>{return t.div(e.style("position","relative"),t.h1(e.style("fontFamily","Splash"),e.style("fontSize","64px"),e.style("fontWeight","normal"),a,t.small(e.style("fontSize","10px"),e.style("fontFamily","Arial, sans-serif"),e.style("top","20px"),e.style("position","absolute"),e.style("marginLeft","10px"),e.style("opacity","0.4"),C.version)),t.p(l))};var n=(a)=>{return t.div(e.attr("id",a.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")),t.div(e.style("display","flex"),e.style("alignItems","center"),e.style("gap","10px"),a.type==="main"?t.h2(a.title):t.h3(a.title),t.a(e.style("fontSize","14px"),e.style("textDecoration","none"),e.style("border","1px solid #a4a4a4ff"),e.style("padding","2px 6px"),e.style("borderRadius","4px"),e.attr("href","#"),"¶")),a.subtitle?t.p(a.subtitle):"",a.content)};var E=()=>v(v.Header("oem","The roll your own framework framework"),n({title:"Menu",type:"main",content:r("column",0,t.ul(t.li(t.a(e.attr("href","#what-is-oem"),"What is OEM?")),t.li(t.a(e.attr("href","#philosophy"),"Philosophy")),t.li(t.a(e.attr("href","#why-oem"),"Why OEM?")),t.li(t.a(e.attr("href","#installation"),"Installation")),t.li(t.a(e.attr("href","#quick-example"),"Quick Example")),t.li(t.a(e.attr("href","#state"),"State")),t.li(t.a(e.attr("href","#the-dollar-pattern"),"The $ Pattern")),t.li(t.a(e.attr("href","#templating"),"Templating")),t.li(t.a(e.attr("href","#components"),"Components")),t.li(t.a(e.attr("href","#svg-support"),"SVG Support")),t.li(t.a(e.attr("href","#storage"),"Storage")),t.li(t.a(e.attr("href","#traits"),"Traits")),t.li(t.a(e.attr("href","#reactive-pattern"),"The Reactive Pattern")),t.li(t.a(e.attr("href","#ready-made-states"),"Ready-Made States")),t.li(t.a(e.attr("href","#creating-custom-traits"),"Creating Custom Traits")),t.li(t.a(e.attr("href","#examples"),"Examples")),t.li(t.a(e.attr("href","#core-methods"),"Core Methods"))))}),n({title:"What is OEM?",type:"main",subtitle:"A ~2KB micro-library for building reactive UIs with vanilla TypeScript",content:r("column",20,t.p("OEM provides three minimal building blocks that you combine to create your own UI framework. ","Think of it as a construction kit rather than a complete framework."),t.ul(e.style("listStyle","none"),e.style("marginTop","20px"),t.li(t.strong(e.style("fontWeight","bold"),"State")," - Reactive state management with pub/sub pattern"),t.li(t.strong("Template")," - Proxy-based HTML/SVG element creation with trait behaviors"),t.li(t.strong("Storage")," - Persistent state with web storage and custom sync methods")),t.p(e.style("marginTop","20px"),"OEM itself is just the core. Traits (event handlers, styles, attributes, etc.) are ",t.strong("reference implementations")," you copy and customize for your needs."))}),n({title:"Philosophy",type:"main",subtitle:"Understand every line of code in your framework",content:r("column",20,t.p("Most frameworks are black boxes. OEM is different - it gives you the minimal core and ",t.strong("shows you how to build the rest"),". This means:"),t.ul(e.style("marginTop","20px"),t.li(t.strong("You control the code")," - Traits are copied into your project, not imported from a package"),t.li(t.strong("No magic")," - The entire core is ~300 lines of readable TypeScript"),t.li(t.strong("Learn by doing")," - Modify traits or create new ones to understand how reactivity works"),t.li(t.strong("AI-friendly")," - Simple, predictable patterns that AI assistants can understand and extend")),t.p(e.style("marginTop","20px"),`When you use OEM, you're not "using a framework" - you're building your own with guidance.`))}),n({title:"Why OEM?",type:"main",content:r("column",0,t.ul(e.style("listStyle","none"),t.li("✓ Lightweight (~2KB minified core)"),t.li("✓ Zero dependencies"),t.li("✓ Locality of behavior - traits keep behavior next to markup"),t.li("✓ Full TypeScript support with excellent type inference"),t.li("✓ Reactive DOM without virtual DOM overhead"),t.li("✓ Copy only what you need - no bloat"),t.li("✓ Perfect for learning reactive patterns")))}),n({title:"Quick Example",subtitle:"Here's a simple counter to show you how OEM works:",content:i(`
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
`)}),n({title:"Installation",content:i("npm install @linttrap/oem","bash")}),n({title:"State",type:"main",subtitle:"Create a state object with an initial value:",content:i(`import { State } from '@linttrap/oem';

const count = State(0);
const name = State('Alice');
const user = State({ id: 1, name: 'Bob' });

// With TypeScript
const color = State<'red' | 'green' | 'blue'>('red');`)}),n({title:"Getting Values",content:r("column",0,t.p("Use ",o("val()")," to get the current value:"),i(`const count = State(10);
count.val(); // 10`),t.p("Use ",o("$val()")," to get a closure that returns the value:"),i(`const getCount = count.$val();
getCount(); // 10`))}),n({title:"Setting Values",content:r("column",0,t.p("Set a new value with ",o("set(value)"),":"),i("count.set(5);"),t.p("Use ",o("$set(value)")," to get a closure that sets the value when called:"),i(`const setToTen = count.$set(10);
setToTen(); // count is now 10

// Perfect for event handlers
tag.button(trait.event('click', count.$set(0)), 'Reset')`),t.p("Update based on previous value with ",o("reduce(fn)"),":"),i("count.reduce((prev) => prev + 1);"),t.p("Use ",o("$reduce(fn)")," to get a closure for event handlers:"),i(`tag.button(
  trait.event('click', count.$reduce((n) => n + 1)), 'Increment')
)`))}),n({title:"Subscribing to Changes",content:r("column",0,t.p("Subscribe to state changes. Returns an unsubscribe function:"),i(`const unsub = count.sub((newValue) => {
  console.log('Count changed:', newValue);
});

count.set(5); // Logs: "Count changed: 5"

// Unsubscribe
unsub();`))}),n({title:"Testing Values",content:r("column",0,t.p("Test if current value matches a condition:"),i(`const color = State('red');
    
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
)`))}),n({title:"Method Calls",content:r("column",0,t.p(o("call(...)")," to call methods on boxed primitives (String, Number, Boolean):"),i(`const text = State('hello world');
text.call('toUpperCase'); // 'HELLO WORLD'

const num = State(3.14159);
num.call('toFixed', 2); // '3.14'

// Use $call for reactive updates
tag.div(
  trait.html(count.$call('toUpperCase'))
)`),t.p(o("chain(...)")," to chain multiple method calls:"),i(`const text = State('  hello world  ');
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
)`))}),n({title:"The $ Pattern",type:"main",subtitle:"Understanding closures and reactive bindings",content:r("column",20,t.p("Every State method has a $ version that returns a ",t.strong("closure")," - a function you can call later. This is crucial for two reasons:"),t.h4(e.style("marginTop","20px"),"1. Event Handlers"),t.p("Without closures, you'd need wrapper functions everywhere:"),i(`// Without $ pattern - verbose
tag.button(
  trait.event('click', () => count.set(0)),
  'Reset'
)

// With $ pattern - clean
tag.button(
  trait.event('click', count.$set(0)),
  'Reset'
)`),t.h4(e.style("marginTop","20px"),"2. Reactive UI Updates"),t.p("The Template system automatically subscribes to ",o("$val"),", ",o("$test"),", and other $ methods, updating the UI when state changes:"),i(`const count = State(0);

// This text auto-updates when count changes
tag.h1(count.$val)

// This button appears/disappears based on count
tag.div(
  trait.style('display', 'block', count.$test(0, false)), // Hide when count is 0
  trait.style('display', 'none', count.$test(0)),          // Show when count is 0
  'Count is not zero'
)`),t.h4(e.style("marginTop","20px"),"Complete Method Reference"),t.table(e.style("width","100%"),e.style("borderCollapse","collapse"),e.style("marginTop","20px"),e.html([t.thead(e.html(t.tr(e.html([t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Method"),t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"$ Version"),t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Primary Use")])))),t.tbody(e.html([t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("val()"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("$val()"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Reactive text/content")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("set(v)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("$set(v)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Event handlers")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("reduce(fn)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("$reduce(fn)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Event handlers")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("test(p)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("$test(p)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Conditional visibility/styles")])),t.tr(e.html([t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("call(m)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),e.html(o("$call(m)"))),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Transform values (map, filter, etc.)")]))]))])))}),n({title:"Templating",type:"main",subtitle:"The Template function takes a configuration object mapping trait names to functions:",content:i(`import { Template } from '@linttrap/oem';
import { useStyleTrait } from '@linttrap/oem/traits/Style';
import { useEventTrait } from '@linttrap/oem/traits/Event';

const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`)}),n({title:"The Tag Proxy",subtitle:"Creates HTML/SVG elements with full TypeScript support:",content:i(`const div = tag.div();
const button = tag.button();
const svg = tag.svg();
const circle = tag.circle();

// All HTML and SVG elements available!`)}),n({title:"The Trait Proxy",subtitle:"Provides access to configured trait functions:",content:i(`// After configuration, you have:
trait.style('color', 'red');
trait.event('click', handleClick);
// ... all your configured traits`)}),n({title:"Applying Traits",subtitle:"Pass traits as arguments to tag functions:",content:r("column",0,i(`tag.div(
  trait.style('padding', '20px'),
  trait.style('color', 'blue'),
 ...
)`))}),n({title:"Working with Children",content:r("column",0,t.p("Simple Children"),i(`tag.p('This is a paragraph')
tag.h1('Title')
tag.span(123)`),t.p("Nested Elements"),i(`tag.div(
  tag.h1('Title'),
  tag.p('Description'),
  tag.button('Click me')
)`),t.p("Dynamic Children"),i(`
const msg = State('Hello, World!');
const items = State(['Apple', 'Banana', 'Orange']);

tag.div(msg.$val); // Reactive message

tag.ul(
  trait.html(
    items.$call('map', (item) => tag.li(item)) // Reactive list items
  )
)`))}),n({title:"Subscribing to State Changes",content:r("column",0,t.p("Using ",o("$val()")," in traits automatically subscribes to changes:"),i("tag.p(someState.$val)"),t.p("To subscribe manually, simply add the state object to the trait arguments (trait must support it):"),i("trait.style('display', 'block', isVisible.val, isVisible)"),t.p("This pattern then supports multiple state objects. The value needs to be a function (so you can recompute it when the state changes):"),i("trait.style('opacity', () => 'computed value', stateObject1, stateObject2)"))}),n({title:"Component Functions",type:"main",subtitle:"Components are just functions that return elements:",content:i(`function Button(text: string, onClick: () => void) {
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
);`)}),n({title:"SVG Support",type:"main",subtitle:"Full support for SVG elements:",content:i(`const icon = tag.svg(
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
);`)}),n({title:"How It All Works Together",type:"main",subtitle:"Understanding the complete picture",content:r("column",20,t.p("Let's connect the dots on how OEM's pieces create a reactive UI:"),t.h4(e.style("marginTop","20px"),"1. You Create State"),i("const count = State(0);"),t.h4(e.style("marginTop","20px"),"2. You Configure a Template with Traits"),i(`const [tag, trait] = Template({
  event: useEventTrait,
  style: useStyleTrait,
});`),t.h4(e.style("marginTop","20px"),"3. You Build Elements with Reactive Bindings"),i(`const app = tag.div(
  // This text updates when count changes
  tag.h1(count.$val),

  // This button modifies count
  tag.button(
    trait.event('click', count.$reduce(n => n + 1)),
    'Increment'
  )
);`),t.h4(e.style("marginTop","20px"),"4. Behind the Scenes"),t.ul(e.style("marginTop","10px"),t.li("The Template sees ",o("count.$val")," and automatically subscribes to it"),t.li("When you click the button, ",o("count.$reduce")," updates the state"),t.li("State notifies all subscribers (including the h1's text node)"),t.li("The UI updates automatically - no manual DOM manipulation needed")),t.p(e.style("marginTop","20px"),t.strong("This is the entire reactive loop.")," No virtual DOM diffing, no complex lifecycle hooks, no magic. Just pub/sub with smart subscription management."))}),n({title:"Storage",type:"main",subtitle:"Automatically sync state with localStorage, sessionStorage, or memory:",content:i(`import { Storage, State } from '@linttrap/oem';

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
});`)}),n({title:"Storage Types",content:r("column",0,t.ul(e.style("fontSize","16px"),e.style("lineHeight","1.2"),e.html([t.li(o("localStorage")," - Persists across browser sessions"),t.li(o("sessionStorage")," - Cleared when tab/window closes"),t.li(o("memory")," - No persistence, runtime only")])))}),n({title:"Accessing State",subtitle:"Access state objects directly from the storage:",content:i(`// Get value
console.log(storage.data.username.val());

// Set value (automatically saves to localStorage)
storage.data.username.set('Alice');

// Subscribe to changes
storage.data.username.sub((value) => {
  console.log('Username changed:', value);
});`)}),n({title:"Sync Methods",subtitle:"Define custom methods for syncing with external sources:",content:i(`const storage = Storage({
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
await storage.sync.saveTodo({ title: 'New Todo', completed: false });`)}),n({title:"Complete Storage Example",subtitle:"Todo app with persistent storage:",content:i(`import { Storage, State } from '@linttrap/oem';

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
});`)}),n({title:"What are Traits?",type:"main",subtitle:"The secret sauce behind OEM's extensibility",content:r("column",20,t.p("A trait is a function that applies behavior to a DOM element. Traits are what make OEM powerful - ","they're how you add event handlers, styles, attributes, and any other behavior you can imagine."),t.h4(e.style("marginTop","20px"),"Basic Structure"),i(`function useMyTrait(
  el: HTMLElement,
  param1: string,
  ...rest: (StateType<any> | Condition)[]
) {
  // Apply behavior to element
  el.textContent = param1;

  // Return cleanup function
  return () => {
    // Clean up resources when element is removed
  };
}`),t.p(e.style("marginTop","20px"),t.strong("Key Point:")," Traits are ",t.strong("NOT imported from OEM"),". You copy the reference implementations from the ",o("src/traits/")," folder into your project and customize them as needed."))}),n({title:"Ready-Made Traits",subtitle:"Pre-built traits you can copy from src/traits/ and install in your project",content:r("column",0,t.table(e.style("width","100%"),e.style("borderCollapse","collapse"),t.thead(t.tr(t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Trait"),t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Description"))),t.tbody(t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useAttributeTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Apply HTML attributes")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useClassNameTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Manage CSS classes")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useEventTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Attach event listeners")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useFocusTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Control element focus")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useInnerHTMLTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Set innerHTML reactively")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useInputValueTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Bind input values")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useInputEvent")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Handle input events")),t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useStyleTrait")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Apply CSS styles")),t.tr(t.td(e.style("padding","10px"),o("useTextContentTrait")),t.td(e.style("padding","10px"),"Set text content reactively")))))}),n({title:"Example Usage of Ready-Made Traits",content:r("column",0,t.p("Apply HTML attributes to elements"),i(`import { useAttributeTrait } from '@linttrap/oem/traits/Attribute';

trait.attr('type', 'text')
trait.attr('placeholder', 'Enter name')
trait.attr('disabled', 'true', isDisabled.$val)`),t.p("Manage CSS classes"),i(`import { useClassNameTrait } from '@linttrap/oem/traits/ClassName';

trait.class('container')
trait.class('active', isActive.$val)`),t.p("Attach event listeners"),i(`import { useEventTrait } from '@linttrap/oem/traits/Event';

trait.event('click', handleClick)
trait.event('submit', handleSubmit, 'Click me')`),t.p("Apply CSS styles"),i(`import { useStyleTrait } from '@linttrap/oem/traits/Style';

trait.style('padding', '20px')
trait.style('color', 'red')
trait.style('--custom-var', 'blue') // CSS variables
trait.style('display', 'block', isVisible.$test(true)) // Show when true
trait.style('display', 'none', isVisible.$test(false)) // Hide when false
`),t.p("Set innerHTML reactively with arrays of elements"),i(`import { useInnerHTMLTrait } from '@linttrap/oem/traits/InnerHTML';

trait.html('<strong>Bold</strong>')
trait.html(items.$call('map', item => tag.li(item))) // Reactive list
trait.html('Visible', isVisible.$val)`),t.p("Bind input values to state"),i(`import { useInputValueTrait } from '@linttrap/oem/traits/InputValue';

tag.input(trait.value(name.$val))`),t.p("Control element focus"),i(`import { useFocusTrait } from '@linttrap/oem/traits/Focus';

trait.focus(shouldFocus.$val)`))}),n({title:"The Reactive Pattern",type:"main",subtitle:"All Ready-Made traits support reactive parameters:",content:r("column",0,t.p("You can subscribe to state changes two ways. Support is 100% dependent on the trait implementation."),i(`
// by using a $ methods
trait.style('display', 'block', isVisible.$val)
trait.style('display', 'none', isVisible.$test(false))
trait.style('display', 'flex', isVisible.$call('toString'))

// by passing state objects as additional arguments
trait.style('opacity', () => 'computed value', stateObject1, stateObject2)
          `))}),n({title:"Ready-Made States",type:"main",subtitle:"Pre-built state utilities you can copy from src/states/ and install in your project",content:r("column",20,t.p("Just like traits, OEM provides ready-made State utilities that handle common patterns. ","These are located in ",o("src/states/")," and you copy them into your project as needed."),t.h4(e.style("marginTop","20px"),"Available States"),t.table(e.style("width","100%"),e.style("borderCollapse","collapse"),e.style("marginTop","10px"),t.thead(t.tr(t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"State"),t.th(e.style("textAlign","left"),e.style("padding","10px"),e.style("borderBottom","2px solid black"),"Description"))),t.tbody(t.tr(t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),o("useMediaQueryState")),t.td(e.style("padding","10px"),e.style("borderBottom","1px solid black"),"Reactive media query state that updates on window resize")))),t.h4(e.style("marginTop","20px"),"Example: Media Query State"),i(`import { useMediaQueryState } from '@linttrap/oem/states/MediaQuery';

// Create reactive state for mobile breakpoint
const isMobile = useMediaQueryState({
  maxWidth: 768,
});

// Use it in your UI
const nav = tag.nav(
  trait.style('display', 'block', isMobile.$test(true)),
  trait.style('display', 'none', isMobile.$test(false)),
  'Mobile Navigation'
);

// Or with desktop
const isDesktop = useMediaQueryState({
  minWidth: 1024,
});`),t.p(e.style("marginTop","20px"),t.strong("More coming soon! "),"We're adding more ready-made state utilities like router state, form state, async data state, and more. ","Check ",o("src/states/")," for the latest additions."))}),n({title:"Creating Custom Traits",subtitle:"Here's the basic ou1tline for creating a custom trait:",content:i(`function useMyCustomTrait(
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
)`)}),n({title:"Examples",type:"main",subtitle:"Real-world examples showing how the pieces fit together",content:r("column",0)}),n({title:"Example: Counter App",subtitle:"A simple counter demonstrating state and events:",content:i(`// Create template with traits
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
);`)}),n({title:"Example: Todo List",subtitle:"Complete todo app with localStorage persistence:",content:i(`
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
);`)}),n({title:"Core Methods",subtitle:"Method signatures for core OEM functions:",type:"main",content:r("column",20)}),n({title:"State<T>(initialValue)",subtitle:"State objects provide the following methods:",content:r("column",0,i("State<T>(initialValue: T): StateType<T>"),t.ul(e.style("lineHeight","1.8"),t.li(o("val()")," - Get current value"),t.li(o("set(value)")," - Set new value"),t.li(o("reduce(fn)")," - Update based on previous value"),t.li(o("sub(callback)")," - Subscribe to changes, returns unsubscribe function"),t.li(o("test(predicate, truthCheck?)")," - Test value against condition"),t.li(o("call(method, ...args)")," - Call methods on boxed primitives"),t.li(o("chain(...calls)")," - Chain method calls")),t.p("All methods have $ prefixed versions that return closures:"),t.ul(e.style("lineHeight","1.8"),t.li(o("$val()"),", ",o("$set()"),", ",o("$reduce()"),", ",o("$test()"),", ",o("$call()"),", ",o("$chain()"))))}),n({title:"Template<P>(config)",subtitle:"Create custom templating engines",content:r("column",0,t.h4("Signature"),i("Template<P>(config?: P): [TagProxy, TraitProxy]"),t.h4("Returns"),t.p("Tuple of [tag, trait] proxies:"),t.ul(e.style("lineHeight","1.8"),t.li(o("tag")," - Creates HTML/SVG elements"),t.li(o("trait")," - Applies configured behaviors")),t.h4("Example"),i(`const [tag, trait] = Template({
  style: useStyleTrait,
  event: useEventTrait,
});`))}),n({title:"Storage<Data, Sync>(config)",subtitle:"Create persistent state with browser storage",content:r("column",0,t.h4("Signature"),i("Storage<Data, Sync>(config): { data, sync }"),t.h4("Storage Types"),t.ul(e.style("lineHeight","1.8"),t.li(o("localStorage")," - Persists across sessions"),t.li(o("sessionStorage")," - Current session only"),t.li(o("memory")," - No persistence")),t.h4("Returns"),t.ul(e.style("lineHeight","1.8"),t.li(o("data")," - Object with state instances"),t.li(o("sync")," - Object with sync methods")))}),n({title:"Browser Support",type:"main",content:r("column",10,t.p("OEM works in all modern browsers that support ES6+"),t.p("Minimum versions: Chrome 49+, Firefox 18+, Safari 10+, Edge 12+"))}),n({title:"License",type:"main",content:r("column",10,t.p("MIT License"),t.p("© ",new Date().getFullYear()," Lint Trap Media"))}));function O(){return t.div(e.attr("data-app","OEM Documentation"),e.style("padding","2rem"),e.html(t.div(e.attr("data-part","AppContent"),e.style("display","flex"),e.style("flexDirection","column"),e.html(E))))}document.addEventListener("DOMContentLoaded",()=>{let a=document.getElementById("root");if(!a)return;a.appendChild(O())});})();

//# debugId=B470AE782DF1941B64756E2164756E21
//# sourceMappingURL=app.js.map
