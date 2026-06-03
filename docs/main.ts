import pkg from '../package.json';
import {
  State,
  Template,
  useAttributeTrait,
  useClassNameTrait,
  useEventTrait,
  useMediaQueryState,
  useStyleTrait,
  useTextContentTrait,
  useThemeState,
  useTokenState,
} from '../src/registry';

type Section =
  | 'hero'
  | 'setup'
  | 'primitives'
  | 'examples'
  | 'traits'
  | 'states'
  | 'theming'
  | 'architecture';
type NavItem = { id: Section; label: string };

type CodeExample = { title: string; description: string; language: string; code: string };
type TraitDoc = { name: string; signature: string; description: string; code: string };
type StateDoc = { name: string; signature: string; description: string };

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Home' },
  { id: 'setup', label: 'Setup' },
  { id: 'primitives', label: 'Primitives' },
  { id: 'examples', label: 'Examples' },
  { id: 'traits', label: 'Traits' },
  { id: 'states', label: 'States' },
  { id: 'theming', label: 'Theming' },
  { id: 'architecture', label: 'Architecture' },
];

const FONT_MONO = "ui-monospace, 'SF Mono', Menlo, Monaco, Consolas, monospace";
const FONT_DISPLAY = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const theme = useThemeState('light');
const surface_bg_primary = useTokenState('#c7c7c7', '#222222', theme);
const surface_bg_code = useTokenState('#383838', '#282828', theme);
const surface_bg_nav = useTokenState('rgba(199,199,199,0.92)', 'rgba(34,34,34,0.92)', theme);
const text_fg_primary = useTokenState('#222222', '#c7c7c7', theme);
const border_color_primary = useTokenState('rgba(80,80,80,0.15)', 'rgba(150,150,150,0.15)', theme);
const space_sm = useTokenState('8px', '8px', theme);
const space_md = useTokenState('16px', '16px', theme);
const space_lg = useTokenState('24px', '24px', theme);
const space_xl = useTokenState('32px', '32px', theme);
const type_bold = useTokenState('700', '700', theme);
const type_semibold = useTokenState('600', '600', theme);
const transition_medium = useTokenState('all 0.3s ease', 'all 0.3s ease', theme);

const activeSection = State<Section>('hero');
const navOpen = State(false);
const isDesktop = useMediaQueryState({ minWidth: 960 });

const DRAWER_WIDTH = '260px';

const [tag, trait] = Template({
  attr: useAttributeTrait,
  className: useClassNameTrait,
  event: useEventTrait,
  style: useStyleTrait,
  text: useTextContentTrait,
});

const SETUP_CODE = `bun add @linttrap/oem`;
const HELLO_WORLD_CODE = `import { Template, useTextContentTrait } from '@linttrap/oem';

const [tag, trait] = Template({ text: useTextContentTrait });

const app = tag.h1(trait.text('Hello, OEM'));

tag.$(document.body)(app);`;
const PRIMITIVE_CODE = `const [tag, trait] = Template({
  style: useStyleTrait,
  text: useTextContentTrait,
  event: useEventTrait,
  attr: useAttributeTrait,
});`;

const EXAMPLES: CodeExample[] = [
  {
    title: 'Counter',
    description: 'State plus event wiring.',
    language: 'typescript',
    code: `const count = State(0);

tag.button(
  trait.text(count.$val),
  trait.event('click', count.$reduce(n => n + 1)),
);`,
  },
  {
    title: 'Theme Toggle',
    description: 'Token-driven light/dark switching.',
    language: 'typescript',
    code: `const theme = useThemeState('light');
const bg = useTokenState('#c7c7c7', '#222222', theme);

tag.div(
  trait.style('backgroundColor', bg.$val),
);`,
  },
];

const TRAIT_DOCS: TraitDoc[] = [
  {
    name: 'useStyleTrait',
    signature: '(el, prop, val, ...rest)',
    description: 'Sets a single CSS style property reactively.',
    code: `tag.div(trait.style('padding', '12px'));`,
  },
  {
    name: 'useTextContentTrait',
    signature: '(el, text, ...rest)',
    description: 'Sets text content reactively.',
    code: `tag.span(trait.text(State('hello').$val));`,
  },
  {
    name: 'useEventTrait',
    signature: '(el, evt, cb, ...rest)',
    description: 'Attaches DOM event listeners.',
    code: `tag.button(trait.event('click', () => alert('Clicked')));`,
  },
  {
    name: 'useAttributeTrait',
    signature: '(el, prop, val, ...rest)',
    description: 'Sets or removes HTML attributes.',
    code: `tag.a(trait.attr('href', 'https://oem.js.org'));`,
  },
  {
    name: 'useClassNameTrait',
    signature: '(el, className, ...rest)',
    description: 'Sets the full class attribute.',
    code: `tag.div(trait.className('item'));`,
  },
];

const STATE_DOCS: StateDoc[] = [
  { name: 'State', signature: 'State<T>(initial)', description: 'Core reactive container.' },
  {
    name: 'useThemeState',
    signature: "useThemeState('light' | 'dark')",
    description: 'Tracks the current theme.',
  },
  {
    name: 'useTokenState',
    signature: 'useTokenState(lightVal, darkVal, themeState)',
    description: 'Derived light/dark token state.',
  },
  {
    name: 'useMediaQueryState',
    signature: 'useMediaQueryState(query)',
    description: 'Tracks a media query reactively.',
  },
];

function CodeBlock(code: string, language = 'ts') {
  return tag.pre(
    trait.style('margin', '0'),
    trait.style('padding', '18px 0 18px 16px'),
    trait.style(
      'borderLeft',
      () => `1px solid ${border_color_primary.val()}`,
      border_color_primary,
    ),
    trait.style('overflowX', 'auto'),
    trait.style('fontSize', '15px'),
    trait.style('lineHeight', '1.6'),
    trait.style('fontFamily', FONT_MONO),
    trait.style('color', '#c7c7c7'),
    tag.code(trait.className(`language-${language}`), trait.text(code)),
  );
}

function LinearSection(
  id: Section,
  title: string,
  description: string,
  ...details: (HTMLElement | SVGElement)[]
) {
  return tag.section(
    trait.attr('id', id),
    trait.style('padding', `${space_lg.val()} ${space_md.val()}`),
    trait.style('scrollMarginTop', '88px'),
    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', space_sm.$val),
      trait.style('marginBottom', space_sm.$val),
      tag.h2(
        trait.text(title),
        trait.style('margin', '0'),
        trait.style('fontSize', '30px'),
        trait.style('fontWeight', type_bold.$val),
        trait.style('color', text_fg_primary.$val),
      ),
      tag.p(
        trait.text(description),
        trait.style('margin', '0'),
        trait.style('fontSize', '18px'),
        trait.style('lineHeight', '1.6'),
        trait.style('color', text_fg_primary.$val),
      ),
    ),
    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', space_md.$val),
      ...details,
    ),
  );
}

function DetailRow(title: string, ...children: (HTMLElement | SVGElement)[]) {
  return tag.div(
    trait.style('padding', `${space_sm.val()} 0`),
    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', '4px'),
      tag.span(
        trait.text(title),
        trait.style('fontSize', '18px'),
        trait.style('fontWeight', type_semibold.$val),
        trait.style('color', text_fg_primary.$val),
      ),
    ),
    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('gap', space_sm.$val),
      ...children,
    ),
  );
}

function goTo(section: Section) {
  return () => {
    activeSection.set(section);
    navOpen.set(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };
}

const Hero = tag.section(
  trait.attr('id', 'hero'),
  trait.style('scrollMarginTop', '88px'),
  trait.style('padding', `${space_xl.val()} ${space_md.val()} ${space_lg.val()}`),
  trait.style(
    'borderBottom',
    () => `1px solid ${border_color_primary.val()}`,
    border_color_primary,
  ),
  tag.h1(
    trait.text('OEM Documentation'),
    trait.style('margin', '0 0 10px 0'),
    trait.style('fontSize', '46px'),
    trait.style('fontWeight', type_bold.$val),
    trait.style('fontFamily', FONT_DISPLAY),
    trait.style('color', text_fg_primary.$val),
    trait.style('lineHeight', '1.1'),
  ),
  tag.p(
    trait.text('A clean, explicit guide to building reactive UIs with OEM.'),
    trait.style('margin', '0'),
    trait.style('fontSize', '20px'),
    trait.style('lineHeight', '1.6'),
    trait.style('color', text_fg_primary.$val),
  ),
  tag.p(
    trait.text(`v${pkg.version}`),
    trait.style('margin', '12px 0 0 0'),
    trait.style('fontSize', '14px'),
    trait.style('fontFamily', FONT_MONO),
    trait.style('color', text_fg_primary.$val),
  ),
);

const DrawerNav = tag.nav(
  trait.style('display', 'flex'),
  trait.style('flexDirection', 'column'),
  trait.style('alignItems', 'stretch'),
  trait.style('gap', '4px'),
  ...NAV_ITEMS.filter((item) => item.id !== 'hero').map((item) =>
    tag.button(
      trait.text(item.label),
      trait.style('padding', '8px 10px'),
      trait.style('border', 'none'),
      trait.style('backgroundColor', 'transparent'),
      trait.style('cursor', 'pointer'),
      trait.style('fontSize', '16px'),
      trait.style('fontFamily', FONT_DISPLAY),
      trait.style('color', text_fg_primary.$val),
      trait.style('textAlign', 'left'),
      trait.style('fontWeight', '700', activeSection.$test(item.id)),
      trait.event('click', goTo(item.id)),
    ),
  ),
);

const ThemeToggle = tag.button(
  trait.style('padding', '0'),
  trait.style('border', 'none'),
  trait.style('backgroundColor', 'transparent'),
  trait.style('cursor', 'pointer'),
  trait.style('fontSize', '12px'),
  trait.style('color', text_fg_primary.$val),
  trait.style('fontFamily', FONT_DISPLAY),
  trait.style('fontWeight', '600'),
  trait.style('textTransform', 'uppercase'),
  trait.style('opacity', '0.5'),
  trait.event('click', () => theme.reduce((t) => (t === 'dark' ? 'light' : 'dark'))),
  trait.text('Dark', theme.$test('light')),
  trait.text('Light', theme.$test('dark')),
);

const TopBar = tag.header(
  trait.style('display', 'flex'),
  trait.style('justifyContent', 'space-between'),
  trait.style('alignItems', 'center'),
  trait.style('position', 'sticky'),
  trait.style('top', '0'),
  trait.style('zIndex', '20'),
  trait.style('padding', `${space_sm.val()} ${space_md.val()}`),
  trait.style('backgroundColor', surface_bg_nav.$val),
  trait.style('transition', transition_medium.$val),
  trait.style('display', 'none', isDesktop.$test(true)),
  tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', '8px'),
    tag.button(
      trait.style('padding', '0'),
      trait.style('border', 'none'),
      trait.style('backgroundColor', 'transparent'),
      trait.style('cursor', 'pointer'),
      trait.style('width', '26px'),
      trait.style('height', '26px'),
      trait.style('display', 'inline-flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('fontSize', '18px'),
      trait.style('lineHeight', '1'),
      trait.style('color', text_fg_primary.$val),
      trait.style('fontFamily', FONT_DISPLAY),
      trait.style('fontWeight', '700'),
      trait.style('opacity', '0.7'),
      trait.event('click', () => navOpen.reduce((v) => !v)),
      trait.text(() => (navOpen.val() ? '✕' : '☰'), navOpen),
    ),
    tag.h1(
      trait.text('OEM'),
      trait.style('margin', '0'),
      trait.style('fontFamily', FONT_DISPLAY),
      trait.style('fontSize', '24px'),
      trait.style('fontWeight', type_bold.$val),
      trait.style('color', text_fg_primary.$val),
    ),
  ),
  ThemeToggle,
);

const Sidebar = tag.aside(
  trait.style(
    'display',
    () => (isDesktop.val() || navOpen.val() ? 'flex' : 'none'),
    isDesktop,
    navOpen,
  ),
  trait.style('position', 'fixed', isDesktop.$test(false)),
  trait.style('position', 'sticky', isDesktop.$test(true)),
  trait.style('top', '0'),
  trait.style('left', '0', isDesktop.$test(false)),
  trait.style('bottom', '0', isDesktop.$test(false)),
  trait.style('zIndex', '30', isDesktop.$test(false)),
  trait.style('zIndex', '1', isDesktop.$test(true)),
  trait.style('width', DRAWER_WIDTH),
  trait.style('minWidth', DRAWER_WIDTH),
  trait.style('height', '100vh'),
  trait.style('overflowY', 'auto'),
  trait.style('flexDirection', 'column'),
  trait.style('gap', '12px'),
  trait.style('padding', `${space_md.val()} ${space_sm.val()}`),
  trait.style('backgroundColor', surface_bg_nav.$val),
  tag.div(
    trait.style('display', 'flex'),
    trait.style('justifyContent', 'space-between'),
    trait.style('alignItems', 'center'),
    tag.h2(
      trait.text('OEM'),
      trait.style('margin', '0'),
      trait.style('fontSize', '22px'),
      trait.style('fontFamily', FONT_DISPLAY),
      trait.style('fontWeight', type_bold.$val),
      trait.style('color', text_fg_primary.$val),
    ),
    tag.button(
      trait.style('display', 'none', isDesktop.$test(true)),
      trait.style('padding', '0'),
      trait.style('border', 'none'),
      trait.style('backgroundColor', 'transparent'),
      trait.style('cursor', 'pointer'),
      trait.style('fontSize', '18px'),
      trait.style('lineHeight', '1'),
      trait.style('color', text_fg_primary.$val),
      trait.event('click', () => navOpen.set(false)),
      trait.text('✕'),
    ),
  ),
  DrawerNav,
  tag.div(trait.style('marginTop', 'auto'), ThemeToggle),
);

const DrawerBackdrop = tag.div(
  trait.style(
    'display',
    () => (!isDesktop.val() && navOpen.val() ? 'block' : 'none'),
    isDesktop,
    navOpen,
  ),
  trait.style('position', 'fixed'),
  trait.style('inset', '0'),
  trait.style('zIndex', '25'),
  trait.style('backgroundColor', 'rgba(0,0,0,0.35)'),
  trait.event('click', () => navOpen.set(false)),
);

const SetupSection = LinearSection(
  'setup',
  'Setup',
  'Install package and render your first element.',
  DetailRow('Install', CodeBlock(SETUP_CODE, 'bash')),
  DetailRow('Hello world', CodeBlock(HELLO_WORLD_CODE)),
);

const PrimitivesSection = LinearSection(
  'primitives',
  'Primitives',
  'Tag, trait, and state are the only primitives you need to start.',
  DetailRow('Template', CodeBlock(PRIMITIVE_CODE)),
);

const ExamplesSection = LinearSection(
  'examples',
  'Examples',
  'A couple of direct snippets to show the shape of OEM code.',
  ...EXAMPLES.map((ex) => DetailRow(ex.title, CodeBlock(ex.code, ex.language))),
);

const TraitsSection = LinearSection(
  'traits',
  'Traits',
  `${TRAIT_DOCS.length} built-in trait helpers.`,
  ...TRAIT_DOCS.map((doc) =>
    DetailRow(
      doc.name,
      tag.p(
        trait.text(doc.signature),
        trait.style('margin', '0'),
        trait.style('fontSize', '13px'),
        trait.style('fontFamily', FONT_MONO),
        trait.style('color', text_fg_primary.$val),
        trait.style('backgroundColor', 'rgba(0,0,0,0.15)'),
        trait.style('padding', '2px 4px'),
      ),
      tag.p(
        trait.text(doc.description),
        trait.style('margin', '0'),
        trait.style('fontSize', '16px'),
        trait.style('color', text_fg_primary.$val),
      ),
      CodeBlock(doc.code),
    ),
  ),
);

const StatesSection = LinearSection(
  'states',
  'States',
  `${STATE_DOCS.length} state utilities for reactive data and environment events.`,
  ...STATE_DOCS.map((doc) =>
    DetailRow(
      doc.name,
      tag.p(
        trait.text(doc.signature),
        trait.style('margin', '0'),
        trait.style('fontSize', '15px'),
        trait.style('fontFamily', FONT_MONO),
        trait.style('color', text_fg_primary.$val),
        trait.style('backgroundColor', 'rgba(0,0,0,0.15)'),
        trait.style('padding', '2px 4px'),
      ),
      tag.p(
        trait.text(doc.description),
        trait.style('margin', '0'),
        trait.style('fontSize', '16px'),
        trait.style('color', text_fg_primary.$val),
      ),
    ),
  ),
);

const ThemingSection = LinearSection(
  'theming',
  'Theming',
  'Themes are tokens. Switching the theme updates all token subscribers.',
  DetailRow(
    'How it works',
    CodeBlock(`const theme = useThemeState('light');
const bg = useTokenState('#c7c7c7', '#222222', theme);
trait.style('backgroundColor', bg.$val);`),
  ),
);

const ArchitectureSection = LinearSection(
  'architecture',
  'Architecture',
  'Everything for the docs site now lives in main.ts.',
  DetailRow(
    'Single-file layout',
    tag.p(
      trait.text(
        'All docs content, theme state, helper functions, and UI are in one file now. The rest of www stays out of the way.',
      ),
      trait.style('margin', '0'),
      trait.style('fontSize', '16px'),
      trait.style('color', text_fg_primary.$val),
    ),
  ),
);

const Footer = tag.footer(
  trait.style('padding', `${space_lg.val()} ${space_md.val()}`),
  trait.style('fontSize', '15px'),
  trait.style('color', text_fg_primary.$val),
  trait.style('textAlign', 'center'),
  tag.span(trait.text('Formulaic docs UI • linear layout • single-file app')),
);

const app = tag.div(
  trait.style('minHeight', '100vh'),
  trait.style('color', text_fg_primary.$val),
  trait.style('fontFamily', FONT_DISPLAY),
  trait.style('display', 'flex'),
  trait.style('alignItems', 'flex-start'),
  DrawerBackdrop,
  Sidebar,
  tag.div(
    trait.style('flex', '1'),
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('minWidth', '0'),
    TopBar,
    tag.main(
      trait.style('maxWidth', '960px'),
      trait.style('margin', '0 auto'),
      trait.style('width', '100%'),
      Hero,
      SetupSection,
      PrimitivesSection,
      ExamplesSection,
      TraitsSection,
      StatesSection,
      ThemingSection,
      ArchitectureSection,
    ),
    Footer,
  ),
);

tag.$(document.body)(
  trait.style('margin', '0'),
  trait.style('padding', '0'),
  trait.style('fontFamily', FONT_DISPLAY),
  trait.style('backgroundColor', surface_bg_primary.$val),
  trait.style('color', text_fg_primary.$val),
  trait.style('minHeight', '100vh'),
  trait.style('height', 'auto'),
  trait.style('overflowY', 'auto'),
  trait.style('overflowX', 'hidden'),
  trait.style('transition', transition_medium.$val),
  app,
);
