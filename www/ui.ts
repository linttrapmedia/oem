// ui.ts
import pkg from '../package.json';
import { navigate, toggleNav, toggleTheme } from './actions';
import { ANIM_DURATION_MEDIUM, FONT_DISPLAY, FONT_LOGO, FONT_MONO, NAV_ITEMS } from './constants';
import {
  ARCH_DIAGRAM_CODE,
  ARCH_FILES,
  EXAMPLES,
  FEATURES,
  HELLO_WORLD_CODE,
  PHILOSOPHY_POINTS,
  PRIMITIVE_ELEMENT_CODE,
  PRIMITIVE_STATE_CODE,
  PRIMITIVE_TRAIT_CODE,
  SETUP_CODE,
  STATE_DOCS,
  TRAIT_DOCS,
} from './data';
import {
  ArrowRightIcon,
  CloseIcon,
  CopyIcon,
  GitHubIcon,
  ICON_MAP,
  MenuIcon,
  MoonIcon,
  NpmIcon,
  SunIcon,
} from './icons';
import { $dispatch } from './machines';
import { activeSection, isDesktop, navOpen } from './states';
import { tag, trait } from './templates';
import {
  accent_neon_cyan,
  accent_neon_pink,
  accent_neon_purple,
  border_color_accent,
  border_color_cyan,
  border_color_primary,
  gradient_card,
  gradient_hero,
  gradient_horizon,
  nav_fg_active,
  nav_fg_default,
  nav_fg_hover,
  radius_size_full,
  radius_size_lg,
  radius_size_md,
  radius_size_sm,
  shadow_glow_cyan,
  shadow_glow_pink,
  shadow_glow_purple,
  space_gap_lg,
  space_gap_md,
  space_gap_sm,
  space_gap_xl,
  space_padding_2xl,
  space_padding_3xl,
  space_padding_4xl,
  space_padding_lg,
  space_padding_md,
  space_padding_sm,
  space_padding_xl,
  space_padding_xs,
  surface_bg_card,
  surface_bg_code,
  surface_bg_nav,
  surface_bg_primary,
  surface_bg_secondary,
  surface_bg_tertiary,
  text_fg_code,
  text_fg_muted,
  text_fg_primary,
  text_fg_secondary,
  text_gradient_heading,
  text_gradient_hero,
  theme,
  transition_color,
  transition_fast,
  transition_medium,
  type_size_2xl,
  type_size_3xl,
  type_size_base,
  type_size_lg,
  type_size_md,
  type_size_sm,
  type_size_xl,
  type_size_xs,
  type_weight_bold,
  type_weight_light,
  type_weight_medium,
  type_weight_semibold,
  type_weight_thin,
} from './theme';
import type { Section } from './types';

// ═══════════════════════════════════════════════
// ANIMATION HELPERS
// ═══════════════════════════════════════════════

function fadeInUp(el: HTMLElement, delay = 0) {
  el.style.opacity = '0';
  el.animate(
    [
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    {
      duration: ANIM_DURATION_MEDIUM,
      delay,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards',
    },
  );
}

function fadeIn(el: HTMLElement, delay = 0) {
  el.style.opacity = '0';
  el.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: ANIM_DURATION_MEDIUM,
    delay,
    easing: 'ease-out',
    fill: 'forwards',
  });
}

function glowPulse(el: HTMLElement) {
  el.animate(
    [
      { boxShadow: '0 0 20px rgba(255,45,149,0.15), 0 0 60px rgba(123,47,247,0.05)' },
      { boxShadow: '0 0 30px rgba(255,45,149,0.25), 0 0 80px rgba(123,47,247,0.1)' },
      { boxShadow: '0 0 20px rgba(255,45,149,0.15), 0 0 60px rgba(123,47,247,0.05)' },
    ],
    { duration: 3000, iterations: Infinity, easing: 'ease-in-out' },
  );
}

// ═══════════════════════════════════════════════
// APPLIER HELPERS
// ═══════════════════════════════════════════════

// Mount animation — schedules animation on next frame
function onMount(fn: (el: HTMLElement) => void) {
  return (el: HTMLElement | SVGElement) => {
    requestAnimationFrame(() => fn(el as HTMLElement));
  };
}

function webkitBackdrop(val: string) {
  return (el: HTMLElement | SVGElement) => {
    (el as HTMLElement).style.setProperty('-webkit-backdrop-filter', val);
  };
}

// ═══════════════════════════════════════════════
// GLOBAL KEYFRAMES (via CSSStyleSheet API)
// ═══════════════════════════════════════════════

const sheet = new CSSStyleSheet();
sheet.replaceSync(`
  @font-face {
    font-family: 'Splash';
    src: url('assets/Splash.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @keyframes gridScroll {
    0% { background-position: 0 0, 0 0; }
    100% { background-position: 0 40px, 40px 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
`);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

// ═══════════════════════════════════════════════
// PRISM HIGHLIGHTING HELPER
// ═══════════════════════════════════════════════

function highlightCode(el: HTMLElement) {
  if (typeof (window as any).Prism !== 'undefined') {
    (window as any).Prism.highlightAllUnder(el);
  }
}

// ═══════════════════════════════════════════════
// REUSABLE HELPERS
// ═══════════════════════════════════════════════

function SectionContainer(
  id: Section,
  ...children: (HTMLElement | SVGElement | ReturnType<typeof trait.style>)[]
) {
  return tag.section(
    trait.attr('id', id),
    trait.style('position', 'relative'),
    trait.style('padding', space_padding_3xl.$val),
    trait.style('padding', space_padding_4xl.$val, isDesktop.$test(true)),
    trait.style('maxWidth', '1200px'),
    trait.style('margin', '0 auto'),
    trait.style('paddingLeft', space_padding_md.$val),
    trait.style('paddingRight', space_padding_md.$val),
    trait.style('paddingLeft', space_padding_xl.$val, isDesktop.$test(true)),
    trait.style('paddingRight', space_padding_xl.$val, isDesktop.$test(true)),
    ...children,
  );
}

function SectionTitle(text: string) {
  return tag.h2(
    trait.text(text),
    trait.style('margin', '0'),
    trait.style('fontSize', type_size_xl.$val),
    trait.style('fontSize', type_size_2xl.$val, isDesktop.$test(true)),
    trait.style('fontWeight', type_weight_bold.$val),
    trait.style('letterSpacing', '-0.02em'),
    trait.style('marginBottom', space_padding_lg.$val),
    trait.style('background', text_gradient_heading.$val),
    onMount((el) => fadeInUp(el)),
  );
}

function CodeBlock(code: string, language = 'typescript') {
  return tag.div(
    trait.style('position', 'relative'),
    trait.style('borderRadius', radius_size_md.$val),
    trait.style('overflow', 'hidden'),
    trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
    trait.style('boxShadow', shadow_glow_cyan.$val),
    trait.style('marginBottom', space_padding_md.$val),

    // Copy button
    tag.button(
      trait.style('position', 'absolute'),
      trait.style('top', '8px'),
      trait.style('right', '8px'),
      trait.style('background', 'rgba(255,255,255,0.05)'),
      trait.style('border', '1px solid rgba(255,255,255,0.1)'),
      trait.style('borderRadius', radius_size_sm.$val),
      trait.style('padding', '6px'),
      trait.style('cursor', 'pointer'),
      trait.style('color', text_fg_muted.$val),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('zIndex', '2'),
      trait.style('transition', transition_fast.$val),
      trait.styleOnEvent('mouseenter', 'color', () => accent_neon_cyan.val()),
      trait.styleOnEvent('mouseleave', 'color', () => text_fg_muted.val()),
      trait.event('click', (e?: Event) => {
        navigator.clipboard.writeText(code);
        const btn = e?.currentTarget as HTMLElement;
        if (btn) {
          btn.style.color = '#8a9a9c';
          setTimeout(() => (btn.style.color = ''), 1000);
        }
      }),
      CopyIcon({ size: '14' }),
    ),

    // Code content
    tag.pre(
      trait.style('margin', '0'),
      trait.style('padding', space_padding_md.$val),
      trait.style('backgroundColor', surface_bg_code.$val),
      trait.style('overflow', 'auto'),
      trait.style('fontSize', type_size_sm.$val),
      trait.style('lineHeight', '1.65'),
      trait.style('fontFamily', FONT_MONO),
      tag.code(trait.className(`language-${language}`), trait.text(code)),
    ),
    onMount((el) => highlightCode(el)),
  );
}

function Pill(text: string, color: string) {
  return tag.span(
    trait.text(text),
    trait.style('display', 'inline-block'),
    trait.style('padding', '4px 12px'),
    trait.style('borderRadius', radius_size_full.$val),
    trait.style('fontSize', type_size_xs.$val),
    trait.style('fontWeight', type_weight_medium.$val),
    trait.style('letterSpacing', '0.05em'),
    trait.style('textTransform', 'uppercase'),
    trait.style('color', color),
    trait.style('border', `1px solid ${color}33`),
    trait.style('backgroundColor', `${color}11`),
  );
}

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════

const NavBar = tag.header(
  trait.style('position', 'fixed'),
  trait.style('top', '0'),
  trait.style('left', '0'),
  trait.style('right', '0'),
  trait.style('zIndex', '100'),
  trait.style('padding', `${space_padding_sm.val()} ${space_padding_md.val()}`),
  trait.style(
    'padding',
    `${space_padding_sm.val()} ${space_padding_xl.val()}`,
    isDesktop.$test(true),
  ),
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('justifyContent', 'space-between'),
  trait.style('backgroundColor', surface_bg_nav.$val),
  trait.style('backdropFilter', 'blur(16px)'),
  webkitBackdrop('blur(16px)'),
  trait.style(
    'borderBottom',
    () => `1px solid ${border_color_primary.val()}`,
    border_color_primary,
  ),
  trait.style('transition', transition_medium.$val),

  // Logo
  tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', space_gap_sm.$val),
    trait.style('cursor', 'pointer'),
    trait.event('click', $dispatch(navigate('hero'))),
    tag.span(
      trait.text('oem'),
      trait.style('fontSize', type_size_3xl.$val),
      trait.style('fontWeight', type_weight_bold.$val),
      trait.style('fontFamily', FONT_LOGO),
    ),
    tag.span(
      trait.text(`v${pkg.version}`),
      trait.style('fontSize', type_size_xs.$val),
      trait.style('color', text_fg_muted.$val),
      trait.style('fontFamily', FONT_MONO),
    ),
  ),

  // Desktop nav links
  tag.nav(
    trait.style('display', 'none'),
    trait.style('display', 'flex', isDesktop.$test(true)),
    trait.style('alignItems', 'center'),
    trait.style('gap', space_gap_lg.$val),
    ...NAV_ITEMS.filter((n) => n.id !== 'hero').map((item) =>
      tag.a(
        trait.text(item.label),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('fontWeight', type_weight_medium.$val),
        trait.style('textDecoration', 'none'),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_color.$val),
        trait.style(
          'color',
          nav_fg_default.$val,
          activeSection.$test((v) => v !== item.id),
        ),
        trait.style('color', nav_fg_active.$val, activeSection.$test(item.id)),
        trait.styleOnEvent('mouseenter', 'color', () => nav_fg_hover.val()),
        trait.styleOnEvent('mouseleave', 'color', () =>
          activeSection.val() === item.id ? nav_fg_active.val() : nav_fg_default.val(),
        ),
        trait.event('click', $dispatch(navigate(item.id))),
      ),
    ),
  ),

  // Right side controls
  tag.div(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', space_gap_md.$val),

    // GitHub link
    tag.a(
      trait.attr('href', 'https://github.com/linttrapmedia/oem'),
      trait.attr('target', '_blank'),
      trait.attr('rel', 'noopener'),
      trait.style('color', text_fg_secondary.$val),
      trait.style('transition', transition_fast.$val),
      trait.style('display', 'flex'),
      trait.styleOnEvent('mouseenter', 'color', () => accent_neon_pink.val()),
      trait.styleOnEvent('mouseleave', 'color', () => text_fg_secondary.val()),
      GitHubIcon({ size: '20' }),
    ),

    // Theme toggle
    tag.button(
      trait.style('background', 'none'),
      trait.style('border', 'none'),
      trait.style('cursor', 'pointer'),
      trait.style('color', text_fg_secondary.$val),
      trait.style('display', 'flex'),
      trait.style('padding', space_padding_xs.$val),
      trait.style('transition', transition_fast.$val),
      trait.styleOnEvent('mouseenter', 'color', () => accent_neon_cyan.val()),
      trait.styleOnEvent('mouseleave', 'color', () => text_fg_secondary.val()),
      trait.event('click', $dispatch(toggleTheme())),
      trait.innerHTML(
        () => [theme.val() === 'dark' ? SunIcon({ size: '20' }) : MoonIcon({ size: '20' })],
        theme,
      ),
    ),

    // Mobile menu toggle
    tag.button(
      trait.style('background', 'none'),
      trait.style('border', 'none'),
      trait.style('cursor', 'pointer'),
      trait.style('color', text_fg_primary.$val),
      trait.style('padding', space_padding_xs.$val),
      trait.style('display', 'flex'),
      trait.style('display', 'none', isDesktop.$test(true)),
      trait.event('click', $dispatch(toggleNav())),
      trait.innerHTML(
        () => [navOpen.val() ? CloseIcon({ size: '24' }) : MenuIcon({ size: '24' })],
        navOpen,
      ),
    ),
  ),
);

// Mobile nav overlay
const MobileNav = tag.div(
  trait.style('position', 'fixed'),
  trait.style('top', '0'),
  trait.style('left', '0'),
  trait.style('right', '0'),
  trait.style('bottom', '0'),
  trait.style('backgroundColor', () => `${surface_bg_primary.val()}f0`, surface_bg_primary),
  trait.style('backdropFilter', 'blur(20px)'),
  webkitBackdrop('blur(20px)'),
  trait.style('zIndex', '99'),
  trait.style('display', 'flex'),
  trait.style('flexDirection', 'column'),
  trait.style('alignItems', 'center'),
  trait.style('justifyContent', 'center'),
  trait.style('gap', space_gap_xl.$val),
  trait.style('transition', transition_medium.$val),
  trait.style('opacity', '0', navOpen.$test(false)),
  trait.style('opacity', '1', navOpen.$test(true)),
  trait.style('pointerEvents', 'none', navOpen.$test(false)),
  trait.style('pointerEvents', 'auto', navOpen.$test(true)),

  ...NAV_ITEMS.map((item) =>
    tag.a(
      trait.text(item.label),
      trait.style('fontSize', type_size_xl.$val),
      trait.style('fontWeight', type_weight_light.$val),
      trait.style('textDecoration', 'none'),
      trait.style('cursor', 'pointer'),
      trait.style('transition', transition_color.$val),
      trait.style(
        'color',
        nav_fg_default.$val,
        activeSection.$test((v) => v !== item.id),
      ),
      trait.style('color', nav_fg_active.$val, activeSection.$test(item.id)),
      trait.event('click', $dispatch(navigate(item.id))),
    ),
  ),
);

// ═══════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════

const HeroSection = SectionContainer(
  'hero',

  // Background grid effect
  tag.div(
    trait.style('position', 'absolute'),
    trait.style('inset', '0'),
    trait.style('animation', 'gridScroll 4s linear infinite'),
    trait.style('opacity', '0.6'),
    trait.style('pointerEvents', 'none'),
  ),

  // Horizon glow
  tag.div(
    trait.style('position', 'absolute'),
    trait.style('inset', '0'),
    trait.style('backgroundImage', gradient_horizon.$val),
    trait.style('pointerEvents', 'none'),
  ),

  // Hero content
  tag.div(
    trait.style('position', 'relative'),
    trait.style('textAlign', 'center'),
    trait.style('paddingTop', space_padding_4xl.$val),
    trait.style('paddingBottom', space_padding_2xl.$val),

    // Tagline pill
    tag.div(
      trait.style('marginBottom', space_padding_lg.$val),
      onMount((el) => fadeIn(el, 100)),
      Pill('UI, On Your Command', '#a08a92'),
    ),

    // Main heading
    tag.h1(
      trait.style('margin', '0'),
      trait.style('fontSize', type_size_2xl.$val),
      trait.style('fontSize', type_size_3xl.$val, isDesktop.$test(true)),
      trait.style('fontWeight', type_weight_thin.$val),
      trait.style('lineHeight', '1.1'),
      trait.style('letterSpacing', '-0.03em'),
      trait.style('marginBottom', space_padding_lg.$val),
      trait.style('fontFamily', FONT_DISPLAY),
      onMount((el) => fadeInUp(el, 200)),

      tag.span(
        trait.text('Agentic UI'),
        trait.style('display', 'block'),
        trait.style('color', text_fg_primary.$val),
        trait.style('fontFamily', FONT_MONO),
        trait.style('textTransform', 'uppercase'),
      ),
      tag.span(
        trait.text('/oem build something cool'),
        trait.style('display', 'block'),
        trait.style('color', text_gradient_hero.$val),
        trait.style('fontSize', type_size_2xl.$val),
      ),
    ),

    // Subtitle
    tag.p(
      trait.text(
        'Element. Trait. State. — No virtual DOM, no compiler, no dependencies. Just surgical reactivity wired directly to the real DOM.',
      ),
      trait.style('fontSize', type_size_md.$val),
      trait.style('color', text_fg_secondary.$val),
      trait.style('maxWidth', '640px'),
      trait.style('margin', '0 auto'),
      trait.style('lineHeight', '1.7'),
      trait.style('marginBottom', space_padding_xl.$val),
      onMount((el) => fadeInUp(el, 350)),
    ),

    // CTA buttons
    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('flexDirection', 'row', isDesktop.$test(true)),
      trait.style('gap', space_gap_md.$val),
      trait.style('justifyContent', 'center'),
      trait.style('alignItems', 'center'),
      onMount((el) => fadeInUp(el, 500)),

      // Primary CTA
      tag.button(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('padding', '14px 32px'),
        trait.style(
          'background',
          () => `linear-gradient(135deg, ${accent_neon_pink.val()}, ${accent_neon_purple.val()})`,
          accent_neon_pink,
          accent_neon_purple,
        ),
        trait.style('color', '#ffffff'),
        trait.style('border', 'none'),
        trait.style('borderRadius', radius_size_full.$val),
        trait.style('fontSize', type_size_base.$val),
        trait.style('fontWeight', type_weight_semibold.$val),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_medium.$val),
        trait.style('fontFamily', FONT_DISPLAY),
        trait.styleOnEvent('mouseenter', 'transform', () => 'translateY(-2px)'),
        trait.styleOnEvent('mouseleave', 'transform', () => 'translateY(0)'),
        onMount((el) => glowPulse(el)),
        trait.event('click', $dispatch(navigate('setup'))),
        trait.text('Get Started'),
        ArrowRightIcon({ size: '18', color: '#ffffff' }),
      ),

      // Secondary CTA
      tag.button(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('padding', '14px 32px'),
        trait.style('background', 'transparent'),
        trait.style('color', accent_neon_cyan.$val),
        trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
        trait.style('borderRadius', radius_size_full.$val),
        trait.style('fontSize', type_size_base.$val),
        trait.style('fontWeight', type_weight_medium.$val),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_medium.$val),
        trait.style('fontFamily', FONT_DISPLAY),
        trait.styleOnEvent('mouseenter', 'transform', () => 'translateY(-2px)'),
        trait.styleOnEvent('mouseleave', 'transform', () => 'translateY(0)'),
        trait.styleOnEvent('mouseenter', 'backgroundColor', () => `${accent_neon_cyan.val()}11`),
        trait.styleOnEvent('mouseleave', 'backgroundColor', () => 'transparent'),
        trait.event('click', $dispatch(navigate('examples'))),
        trait.text('View Examples'),
      ),
    ),

    // Install snippet
    tag.div(
      trait.style('marginTop', space_padding_2xl.$val),
      trait.style('display', 'flex'),
      trait.style('justifyContent', 'center'),
      onMount((el) => fadeInUp(el, 650)),

      tag.div(
        trait.style('display', 'inline-flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('padding', '10px 20px'),
        trait.style('backgroundColor', surface_bg_code.$val),
        trait.style('borderRadius', radius_size_full.$val),
        trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
        trait.style('fontFamily', FONT_MONO),
        trait.style('fontSize', type_size_sm.$val),

        tag.span(trait.text('$'), trait.style('color', text_fg_muted.$val)),
        tag.span(trait.text('bun add @linttrap/oem'), trait.style('color', accent_neon_cyan.$val)),
        tag.button(
          trait.style('background', 'none'),
          trait.style('border', 'none'),
          trait.style('cursor', 'pointer'),
          trait.style('color', text_fg_muted.$val),
          trait.style('display', 'flex'),
          trait.style('padding', '2px'),
          trait.style('transition', transition_fast.$val),
          trait.styleOnEvent('mouseenter', 'color', () => accent_neon_cyan.val()),
          trait.styleOnEvent('mouseleave', 'color', () => text_fg_muted.val()),
          trait.event('click', () => navigator.clipboard.writeText('bun add @linttrap/oem')),
          CopyIcon({ size: '14' }),
        ),
      ),
    ),
  ),
);

// ═══════════════════════════════════════════════
// PHILOSOPHY SECTION
// ═══════════════════════════════════════════════

const PhilosophySection = SectionContainer(
  'philosophy',
  SectionTitle('Philosophy'),

  tag.p(
    trait.text(
      'OEM is a radically simple approach to building user interfaces. No virtual DOM. No compiler. No dependency tree. Just three composable primitives and a philosophy of total transparency.',
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('maxWidth', '720px'),
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  // Philosophy cards grid
  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_lg.$val),

    ...PHILOSOPHY_POINTS.map((point, i) =>
      tag.div(
        trait.style('padding', space_padding_lg.$val),
        trait.style('borderRadius', radius_size_lg.$val),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('backgroundImage', gradient_card.$val),
        trait.style('transition', transition_medium.$val),
        trait.styleOnEvent('mouseenter', 'transform', () => 'translateY(-4px)'),
        trait.styleOnEvent('mouseleave', 'transform', () => 'translateY(0)'),
        trait.styleOnEvent('mouseenter', 'boxShadow', () => shadow_glow_purple.val()),
        trait.styleOnEvent('mouseleave', 'boxShadow', () => 'none'),
        onMount((el) => fadeInUp(el, i * 100)),

        tag.h3(
          trait.text(point.title),
          trait.style('margin', '0'),
          trait.style('fontSize', type_size_lg.$val),
          trait.style('fontWeight', type_weight_semibold.$val),
          trait.style('color', text_fg_primary.$val),
          trait.style('marginBottom', space_padding_sm.$val),
        ),

        tag.p(
          trait.text(point.body),
          trait.style('fontSize', type_size_base.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.65'),
          trait.style('margin', '0'),
        ),
      ),
    ),
  ),
);

// ═══════════════════════════════════════════════
// FEATURES GRID (part of philosophy section)
// ═══════════════════════════════════════════════

const FeaturesGrid = tag.div(
  trait.style('maxWidth', '1200px'),
  trait.style('margin', '0 auto'),
  trait.style('paddingLeft', space_padding_md.$val),
  trait.style('paddingRight', space_padding_md.$val),
  trait.style('paddingLeft', space_padding_xl.$val, isDesktop.$test(true)),
  trait.style('paddingRight', space_padding_xl.$val, isDesktop.$test(true)),
  trait.style('display', 'grid'),
  trait.style('gridTemplateColumns', '1fr'),
  trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
  trait.style('gap', space_gap_lg.$val),
  trait.style('marginTop', space_padding_2xl.$val),

  ...FEATURES.map((feature, i) =>
    tag.div(
      trait.style('display', 'flex'),
      trait.style('gap', space_gap_md.$val),
      trait.style('padding', space_padding_lg.$val),
      trait.style('borderRadius', radius_size_md.$val),
      trait.style('backgroundColor', surface_bg_card.$val),
      trait.style('border', () => `1px solid ${border_color_primary.val()}`, border_color_primary),
      trait.style('transition', transition_medium.$val),
      trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_accent.val()),
      trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
      onMount((el) => fadeInUp(el, 100 + i * 80)),

      // Icon
      tag.div(
        trait.style('flexShrink', '0'),
        trait.style('width', '40px'),
        trait.style('height', '40px'),
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('justifyContent', 'center'),
        trait.style('borderRadius', radius_size_sm.$val),
        trait.style(
          'background',
          () =>
            `linear-gradient(135deg, ${accent_neon_purple.val()}22, ${accent_neon_pink.val()}22)`,
          accent_neon_purple,
          accent_neon_pink,
        ),
        ICON_MAP[feature.icon]?.({ size: '22', color: '#9088a0' }) || tag.span(trait.text('•')),
      ),

      // Text
      tag.div(
        tag.h4(
          trait.text(feature.title),
          trait.style('margin', '0'),
          trait.style('fontSize', type_size_base.$val),
          trait.style('fontWeight', type_weight_semibold.$val),
          trait.style('color', text_fg_primary.$val),
          trait.style('marginBottom', space_padding_xs.$val),
        ),
        tag.p(
          trait.text(feature.description),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.6'),
          trait.style('margin', '0'),
        ),
      ),
    ),
  ),
);

// ═══════════════════════════════════════════════
// SETUP SECTION
// ═══════════════════════════════════════════════

const SetupSection = SectionContainer(
  'setup',
  SectionTitle('Getting Started'),

  tag.p(
    trait.text(
      'Install OEM with your preferred package manager and start building reactive UIs in seconds.',
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('marginBottom', space_padding_xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  // Step 1: Install
  tag.div(
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 200)),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_sm.$val),
      trait.style('marginBottom', space_padding_md.$val),
      tag.span(
        trait.text('01'),
        trait.style('fontFamily', FONT_MONO),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('color', accent_neon_pink.$val),
        trait.style('fontWeight', type_weight_bold.$val),
      ),
      tag.span(
        trait.text('Install'),
        trait.style('fontSize', type_size_lg.$val),
        trait.style('fontWeight', type_weight_semibold.$val),
        trait.style('color', text_fg_primary.$val),
      ),
    ),
    CodeBlock(SETUP_CODE, 'bash'),
  ),

  // Step 2: Hello World
  tag.div(
    onMount((el) => fadeInUp(el, 350)),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_sm.$val),
      trait.style('marginBottom', space_padding_md.$val),
      tag.span(
        trait.text('02'),
        trait.style('fontFamily', FONT_MONO),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('color', accent_neon_pink.$val),
        trait.style('fontWeight', type_weight_bold.$val),
      ),
      tag.span(
        trait.text('Hello World'),
        trait.style('fontSize', type_size_lg.$val),
        trait.style('fontWeight', type_weight_semibold.$val),
        trait.style('color', text_fg_primary.$val),
      ),
    ),
    CodeBlock(HELLO_WORLD_CODE),
  ),
);

// ═══════════════════════════════════════════════
// PRIMITIVES SECTION
// ═══════════════════════════════════════════════

const PrimitivesSection = SectionContainer(
  'primitives',
  SectionTitle('The Three Primitives'),

  tag.p(
    trait.text(
      'Everything in OEM is built from three concepts: Elements, Traits, and State. No components, no hooks, no lifecycle methods — just composable building blocks.',
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('maxWidth', '720px'),
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  // Element
  tag.div(
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 200)),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_md.$val),
      trait.style('marginBottom', space_padding_md.$val),
      Pill('Element', '#a08a92'),
      tag.span(
        trait.text('— The tag proxy creates real DOM nodes'),
        trait.style('color', text_fg_secondary.$val),
        trait.style('fontSize', type_size_base.$val),
      ),
    ),
    CodeBlock(PRIMITIVE_ELEMENT_CODE),
  ),

  // Trait
  tag.div(
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 350)),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_md.$val),
      trait.style('marginBottom', space_padding_md.$val),
      Pill('Trait', '#8a9a9c'),
      tag.span(
        trait.text('— Behaviors applied to elements'),
        trait.style('color', text_fg_secondary.$val),
        trait.style('fontSize', type_size_base.$val),
      ),
    ),
    CodeBlock(PRIMITIVE_TRAIT_CODE),
  ),

  // State
  tag.div(
    onMount((el) => fadeInUp(el, 500)),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_md.$val),
      trait.style('marginBottom', space_padding_md.$val),
      Pill('State', '#9088a0'),
      tag.span(
        trait.text('— Reactive containers with push-based updates'),
        trait.style('color', text_fg_secondary.$val),
        trait.style('fontSize', type_size_base.$val),
      ),
    ),
    CodeBlock(PRIMITIVE_STATE_CODE),
  ),
);

// ═══════════════════════════════════════════════
// EXAMPLES SECTION
// ═══════════════════════════════════════════════

function ExampleCard(example: typeof EXAMPLES[number], index: number) {
  return tag.div(
    trait.style('borderRadius', radius_size_lg.$val),
    trait.style('border', () => `1px solid ${border_color_primary.val()}`, border_color_primary),
    trait.style('backgroundColor', surface_bg_secondary.$val),
    trait.style('overflow', 'hidden'),
    trait.style('transition', transition_medium.$val),
    trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_accent.val()),
    trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
    trait.styleOnEvent('mouseenter', 'boxShadow', () => shadow_glow_pink.val()),
    trait.styleOnEvent('mouseleave', 'boxShadow', () => 'none'),
    onMount((el) => fadeInUp(el, index * 120)),

    // Header
    tag.div(
      trait.style('padding', space_padding_lg.$val),
      trait.style(
        'borderBottom',
        () => `1px solid ${border_color_primary.val()}`,
        border_color_primary,
      ),

      tag.h3(
        trait.text(example.title),
        trait.style('margin', '0'),
        trait.style('fontSize', type_size_lg.$val),
        trait.style('fontWeight', type_weight_semibold.$val),
        trait.style('color', text_fg_primary.$val),
        trait.style('marginBottom', space_padding_xs.$val),
      ),
      tag.p(
        trait.text(example.description),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('color', text_fg_secondary.$val),
        trait.style('margin', '0'),
      ),
    ),

    // Code
    tag.div(trait.style('padding', '0'), CodeBlock(example.code, example.language)),
  );
}

const ExamplesSection = SectionContainer(
  'examples',
  SectionTitle('Examples'),

  tag.p(
    trait.text(
      "Real patterns. Real code. See how OEM's three primitives compose into interactive applications.",
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('maxWidth', '720px'),
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_lg.$val),

    ...EXAMPLES.map((ex, i) => ExampleCard(ex, i)),
  ),
);

// ═══════════════════════════════════════════════
// TRAITS SECTION
// ═══════════════════════════════════════════════

const TraitsSection = SectionContainer(
  'traits',
  SectionTitle('Built-in Traits'),

  tag.p(
    trait.text(
      'Traits are reusable behaviors that give elements their abilities. OEM ships 10 built-in traits that cover styling, events, content, and more.',
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('maxWidth', '720px'),
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_md.$val),

    ...TRAIT_DOCS.map((t, i) =>
      tag.div(
        trait.style('padding', space_padding_lg.$val),
        trait.style('borderRadius', radius_size_md.$val),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('transition', transition_medium.$val),
        trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_cyan.val()),
        trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
        onMount((el) => fadeInUp(el, i * 60)),

        tag.div(
          trait.style('display', 'flex'),
          trait.style('alignItems', 'center'),
          trait.style('gap', space_gap_sm.$val),
          trait.style('marginBottom', space_padding_sm.$val),

          tag.span(
            trait.text(t.name),
            trait.style('fontSize', type_size_base.$val),
            trait.style('fontWeight', type_weight_semibold.$val),
            trait.style('color', accent_neon_cyan.$val),
            trait.style('fontFamily', FONT_MONO),
          ),
        ),

        tag.div(
          trait.style('fontFamily', FONT_MONO),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_muted.$val),
          trait.style('marginBottom', space_padding_sm.$val),
          trait.style('padding', '4px 8px'),
          trait.style('backgroundColor', surface_bg_code.$val),
          trait.style('borderRadius', radius_size_sm.$val),
          trait.style('display', 'inline-block'),
          trait.text(t.signature),
        ),

        tag.p(
          trait.text(t.description),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.6'),
          trait.style('margin', '0'),
        ),
      ),
    ),
  ),
);

// ═══════════════════════════════════════════════
// STATES SECTION
// ═══════════════════════════════════════════════

const StatesSection = SectionContainer(
  'states',
  SectionTitle('State Management'),

  tag.p(
    trait.text(
      'State objects are module-level singletons with push-based reactivity. No prop drilling, no context providers, no stores. Any trait can subscribe to any state.',
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('maxWidth', '720px'),
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  // State API overview
  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_md.$val),
    trait.style('marginBottom', space_padding_2xl.$val),

    ...STATE_DOCS.map((s, i) =>
      tag.div(
        trait.style('padding', space_padding_lg.$val),
        trait.style('borderRadius', radius_size_md.$val),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('transition', transition_medium.$val),
        trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_accent.val()),
        trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
        onMount((el) => fadeInUp(el, i * 100)),

        tag.h4(
          trait.text(s.name),
          trait.style('margin', '0'),
          trait.style('fontSize', type_size_base.$val),
          trait.style('fontWeight', type_weight_semibold.$val),
          trait.style('color', accent_neon_purple.$val),
          trait.style('fontFamily', FONT_MONO),
          trait.style('marginBottom', space_padding_xs.$val),
        ),

        tag.div(
          trait.text(s.signature),
          trait.style('fontFamily', FONT_MONO),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_muted.$val),
          trait.style('padding', '4px 8px'),
          trait.style('backgroundColor', surface_bg_code.$val),
          trait.style('borderRadius', radius_size_sm.$val),
          trait.style('display', 'inline-block'),
          trait.style('marginBottom', space_padding_sm.$val),
        ),

        tag.p(
          trait.text(s.description),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.6'),
          trait.style('margin', '0'),
        ),
      ),
    ),
  ),

  // The $ convention explanation
  tag.div(
    trait.style('padding', space_padding_lg.$val),
    trait.style('borderRadius', radius_size_lg.$val),
    trait.style('backgroundColor', surface_bg_secondary.$val),
    trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
    trait.style('backgroundImage', gradient_card.$val),
    onMount((el) => fadeInUp(el, 400)),

    tag.h4(
      trait.text('The $ Convention'),
      trait.style('margin', '0'),
      trait.style('fontSize', type_size_lg.$val),
      trait.style('fontWeight', type_weight_semibold.$val),
      trait.style('color', text_fg_primary.$val),
      trait.style('marginBottom', space_padding_md.$val),
    ),

    tag.p(
      trait.text(
        'Every State method has a $-prefixed twin that returns a closure instead of executing immediately. $val is both a getter and a subscribable. $set and $reduce are thunks perfect for event wiring. $test creates reactive conditions.',
      ),
      trait.style('fontSize', type_size_base.$val),
      trait.style('color', text_fg_secondary.$val),
      trait.style('lineHeight', '1.7'),
      trait.style('marginBottom', space_padding_md.$val),
    ),

    CodeBlock(`const count = State(0);

// Direct execution
count.set(5);                              // sets immediately
count.reduce(prev => prev + 1);            // increments immediately

// Thunked (deferred) execution — returns () => void
count.$set(5);                             // returns () => count.set(5)
count.$reduce(prev => prev + 1);           // returns () => count.reduce(...)

// Wire directly to events — no wrapping lambdas
trait.event('click', count.$reduce(prev => prev + 1));

// $val — simultaneously a getter AND subscribable
trait.text(count.$val);                    // reactive text binding
trait.style('opacity', count.$val);        // reactive style binding

// $test — reactive condition AND subscribable
trait.style('color', '#a08a92', count.$test(v => v > 0));`),
  ),
);

// ═══════════════════════════════════════════════
// THEMING SECTION
// ═══════════════════════════════════════════════

const ThemingSection = SectionContainer(
  'theming',
  SectionTitle('Token-Driven Theming'),

  tag.p(
    trait.text(
      'Every visual value — colors, spacing, typography, shadows — lives in a reactive token. No CSS variables, no class toggling. Theme changes propagate instantly through the entire UI.',
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('maxWidth', '720px'),
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  // Diagram
  tag.div(
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 200)),

    CodeBlock(`// Architecture Overview
//
// useThemeState('dark')              ← single source of truth
//         │
//         ├─▸ useTokenState('#fff', '#111113', theme)   ← light/dark pair
//         ├─▸ useTokenState('#1a1a1e', '#d8d8dc', theme)
//         └─▸ ...hundreds of tokens
//
// Tokens are State objects — traits subscribe automatically via $val

const theme = useThemeState('dark');
const bg = useTokenState('#fafafa', '#111113', theme);
const fg = useTokenState('#1a1a1e', '#d8d8dc', theme);

// Use in traits — reactive, automatic, zero flicker
trait.style('backgroundColor', bg.$val);
trait.style('color', fg.$val);`),
  ),

  // Token naming
  tag.div(
    trait.style('padding', space_padding_lg.$val),
    trait.style('borderRadius', radius_size_lg.$val),
    trait.style('backgroundColor', surface_bg_secondary.$val),
    trait.style('border', () => `1px solid ${border_color_primary.val()}`, border_color_primary),
    trait.style('backgroundImage', gradient_card.$val),
    onMount((el) => fadeInUp(el, 300)),

    tag.h4(
      trait.text('Naming Convention'),
      trait.style('margin', '0'),
      trait.style('fontSize', type_size_lg.$val),
      trait.style('fontWeight', type_weight_semibold.$val),
      trait.style('color', text_fg_primary.$val),
      trait.style('marginBottom', space_padding_md.$val),
    ),

    tag.div(
      trait.style('fontFamily', FONT_MONO),
      trait.style('fontSize', type_size_md.$val),
      trait.style('color', accent_neon_cyan.$val),
      trait.style('marginBottom', space_padding_md.$val),
      trait.text('<category>_<property>_<variant>'),
    ),

    // Token examples
    tag.div(
      trait.style('display', 'grid'),
      trait.style('gridTemplateColumns', '1fr'),
      trait.style('gridTemplateColumns', 'repeat(3, 1fr)', isDesktop.$test(true)),
      trait.style('gap', space_gap_md.$val),

      ...[
        { token: 'surface_bg_primary', desc: 'Main page background' },
        { token: 'action_bg_hover', desc: 'Button hover state' },
        { token: 'text_fg_secondary', desc: 'Labels & descriptions' },
        { token: 'border_color_accent', desc: 'Focus ring / active' },
        { token: 'space_padding_lg', desc: '24px section padding' },
        { token: 'type_weight_bold', desc: '700 font weight' },
      ].map((item) =>
        tag.div(
          trait.style('padding', space_padding_sm.$val),
          trait.style('borderRadius', radius_size_sm.$val),
          trait.style('backgroundColor', surface_bg_code.$val),

          tag.div(
            trait.text(item.token),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('color', text_fg_code.$val),
            trait.style('marginBottom', '2px'),
          ),
          tag.div(
            trait.text(item.desc),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('color', text_fg_muted.$val),
          ),
        ),
      ),
    ),
  ),

  // Live theme toggle demo
  tag.div(
    trait.style('marginTop', space_padding_2xl.$val),
    trait.style('textAlign', 'center'),
    onMount((el) => fadeInUp(el, 400)),

    tag.p(
      trait.text(
        'Try it — toggle the theme with the button in the nav bar. Every color on this page is a reactive token.',
      ),
      trait.style('fontSize', type_size_base.$val),
      trait.style('color', text_fg_muted.$val),
      trait.style('fontStyle', 'italic'),
    ),
  ),
);

// ═══════════════════════════════════════════════
// ARCHITECTURE SECTION
// ═══════════════════════════════════════════════

const ArchitectureSection = SectionContainer(
  'architecture',
  SectionTitle('File Architecture'),

  tag.p(
    trait.text(
      'Every OEM application follows a canonical file structure. One file per concern, strict separation, predictable dependency flow. This is what makes OEM uniquely LLM-friendly.',
    ),
    trait.style('fontSize', type_size_md.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.7'),
    trait.style('maxWidth', '720px'),
    trait.style('marginBottom', space_padding_2xl.$val),
    onMount((el) => fadeInUp(el, 100)),
  ),

  // File list
  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_sm.$val),
    trait.style('marginBottom', space_padding_2xl.$val),

    ...ARCH_FILES.map((file, i) =>
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_md.$val),
        trait.style('padding', space_padding_md.$val),
        trait.style('borderRadius', radius_size_sm.$val),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'backgroundColor', () => surface_bg_tertiary.val()),
        trait.styleOnEvent('mouseleave', 'backgroundColor', () => surface_bg_secondary.val()),
        onMount((el) => fadeInUp(el, i * 50)),

        tag.span(
          trait.text(file.name),
          trait.style('fontFamily', FONT_MONO),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('color', accent_neon_cyan.$val),
          trait.style('fontWeight', type_weight_medium.$val),
          trait.style('minWidth', '120px'),
        ),
        tag.span(
          trait.text(file.purpose),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('color', text_fg_secondary.$val),
        ),
      ),
    ),
  ),

  // Dependency diagram
  tag.div(
    onMount((el) => fadeInUp(el, 650)),
    CodeBlock(ARCH_DIAGRAM_CODE),
  ),
);

// ═══════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════

const Footer = tag.footer(
  trait.style('borderTop', () => `1px solid ${border_color_primary.val()}`, border_color_primary),
  trait.style('padding', space_padding_2xl.$val),
  trait.style('textAlign', 'center'),

  tag.div(
    trait.style('maxWidth', '1200px'),
    trait.style('margin', '0 auto'),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('justifyContent', 'center'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_lg.$val),
      trait.style('marginBottom', space_padding_lg.$val),

      tag.a(
        trait.attr('href', 'https://github.com/linttrapmedia/oem'),
        trait.attr('target', '_blank'),
        trait.attr('rel', 'noopener'),
        trait.style('color', text_fg_secondary.$val),
        trait.style('textDecoration', 'none'),
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'color', () => accent_neon_pink.val()),
        trait.styleOnEvent('mouseleave', 'color', () => text_fg_secondary.val()),
        GitHubIcon({ size: '16' }),
        tag.span(trait.text('GitHub')),
      ),

      tag.a(
        trait.attr('href', 'https://www.npmjs.com/package/@linttrap/oem'),
        trait.attr('target', '_blank'),
        trait.attr('rel', 'noopener'),
        trait.style('color', text_fg_secondary.$val),
        trait.style('textDecoration', 'none'),
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'color', () => accent_neon_pink.val()),
        trait.styleOnEvent('mouseleave', 'color', () => text_fg_secondary.val()),
        NpmIcon({ size: '16' }),
        tag.span(trait.text('npm')),
      ),
    ),

    tag.p(
      trait.style('fontSize', type_size_xs.$val),
      trait.style('color', text_fg_muted.$val),
      trait.style('margin', '0'),
      trait.text('Built with OEM — UI, On Command'),
    ),
  ),
);

// ═══════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════

export const app = tag.div(
  trait.style('position', 'relative'),
  trait.style('minHeight', '100vh'),

  // Radial hero gradient background
  tag.div(
    trait.style('position', 'fixed'),
    trait.style('inset', '0'),
    trait.style('backgroundImage', gradient_hero.$val),
    trait.style('pointerEvents', 'none'),
    trait.style('zIndex', '0'),
  ),

  // Content
  tag.div(
    trait.style('position', 'relative'),
    trait.style('zIndex', '1'),

    NavBar,
    MobileNav,

    // Spacer for fixed nav
    tag.div(trait.style('height', '56px')),

    HeroSection,
    FeaturesGrid,
    PhilosophySection,
    SetupSection,
    PrimitivesSection,
    ExamplesSection,
    TraitsSection,
    StatesSection,
    ThemingSection,
    ArchitectureSection,
    Footer,
  ),
);
