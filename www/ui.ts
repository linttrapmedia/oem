// ui.ts
import pkg from '../package.json';
import {
  closeDialog,
  navigate,
  openDialog,
  setPrimitiveTab,
  showToast,
  toggleExample,
  toggleNav,
  toggleTheme,
} from './actions';
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
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  CommandIcon,
  CopyIcon,
  GitHubIcon,
  ICON_MAP,
  MenuIcon,
  MoonIcon,
  NpmIcon,
  SunIcon,
} from './icons';
import { dispatch, $dispatch } from './machines';
import {
  activeSection,
  dialogOpen,
  expandedExample,
  isDesktop,
  navOpen,
  primitiveTab,
  toastMessage,
  toastVisible,
} from './states';
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
  text_fg_muted,
  text_fg_primary,
  text_fg_secondary,
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
import type { PrimitiveTab, Section } from './types';

// ═══════════════════════════════════════════════
// ANIMATION HELPERS
// ═══════════════════════════════════════════════

function fadeInUp(el: HTMLElement, delay = 0) {
  el.style.opacity = '0';
  el.animate(
    [
      { opacity: 0, transform: 'translateY(16px)' },
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

// ═══════════════════════════════════════════════
// APPLIER HELPERS
// ═══════════════════════════════════════════════

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
// GLOBAL KEYFRAMES
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
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
`);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

// ═══════════════════════════════════════════════
// PRISM HIGHLIGHTING
// ═══════════════════════════════════════════════

function highlightCode(el: HTMLElement) {
  if (typeof (window as any).Prism !== 'undefined') {
    (window as any).Prism.highlightAllUnder(el);
  }
}

// ═══════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dialogOpen.val()) {
    dispatch(closeDialog());
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    dialogOpen.val() ? dispatch(closeDialog()) : dispatch(openDialog());
  }
});

// ═══════════════════════════════════════════════
// COPY HELPER
// ═══════════════════════════════════════════════

function copyCode(code: string) {
  navigator.clipboard.writeText(code);
  dispatch(showToast('Copied to clipboard'));
}

// ═══════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════

function SectionContainer(
  id: Section,
  ...children: (HTMLElement | SVGElement | ReturnType<typeof trait.style>)[]
) {
  return tag.section(
    trait.attr('id', id),
    trait.style('position', 'relative'),
    trait.style('padding', `${space_padding_2xl.val()} ${space_padding_md.val()}`),
    trait.style(
      'padding',
      `${space_padding_3xl.val()} ${space_padding_xl.val()}`,
      isDesktop.$test(true),
    ),
    trait.style('maxWidth', '1100px'),
    trait.style('margin', '0 auto'),
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
    trait.style('marginBottom', space_padding_md.$val),
    trait.style('color', text_fg_primary.$val),
    onMount((el) => fadeInUp(el)),
  );
}

function SectionSubtitle(text: string) {
  return tag.p(
    trait.text(text),
    trait.style('fontSize', type_size_base.$val),
    trait.style('color', text_fg_secondary.$val),
    trait.style('lineHeight', '1.6'),
    trait.style('maxWidth', '640px'),
    trait.style('marginBottom', space_padding_lg.$val),
    trait.style('marginTop', '0'),
    onMount((el) => fadeInUp(el, 80)),
  );
}

function CodeBlock(code: string, language = 'typescript') {
  return tag.div(
    trait.style('position', 'relative'),
    trait.style('borderRadius', radius_size_md.$val),
    trait.style('overflow', 'hidden'),
    trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
    trait.style('boxShadow', shadow_glow_cyan.$val),

    // Copy button
    tag.button(
      trait.style('position', 'absolute'),
      trait.style('top', '6px'),
      trait.style('right', '6px'),
      trait.style('background', 'rgba(255,255,255,0.05)'),
      trait.style('border', '1px solid rgba(255,255,255,0.1)'),
      trait.style('borderRadius', radius_size_sm.$val),
      trait.style('padding', '4px'),
      trait.style('cursor', 'pointer'),
      trait.style('color', text_fg_muted.$val),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('justifyContent', 'center'),
      trait.style('zIndex', '2'),
      trait.style('transition', transition_fast.$val),
      trait.styleOnEvent('mouseenter', 'color', () => accent_neon_cyan.val()),
      trait.styleOnEvent('mouseleave', 'color', () => text_fg_muted.val()),
      trait.event('click', () => copyCode(code)),
      CopyIcon({ size: '12' }),
    ),

    // Code content
    tag.pre(
      trait.style('margin', '0'),
      trait.style('padding', space_padding_md.$val),
      trait.style('backgroundColor', surface_bg_code.$val),
      trait.style('color', '#c7c7c7'),
      trait.style('overflow', 'auto'),
      trait.style('fontSize', type_size_xs.$val),
      trait.style('lineHeight', '1.6'),
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
    trait.style('padding', '3px 10px'),
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
// TOAST NOTIFICATION
// ═══════════════════════════════════════════════

const Toast = tag.div(
  trait.style('position', 'fixed'),
  trait.style('bottom', '24px'),
  trait.style('left', '50%'),
  trait.style('zIndex', '1000'),
  trait.style('padding', '10px 20px'),
  trait.style('borderRadius', radius_size_full.$val),
  trait.style('backgroundColor', surface_bg_code.$val),
  trait.style('color', '#c7c7c7'),
  trait.style('fontSize', type_size_sm.$val),
  trait.style('fontFamily', FONT_MONO),
  trait.style('boxShadow', '0 4px 24px rgba(0,0,0,0.3)'),
  trait.style('display', 'flex'),
  trait.style('alignItems', 'center'),
  trait.style('gap', space_gap_sm.$val),
  trait.style('pointerEvents', 'none'),
  trait.style('transition', 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'),
  // hidden
  trait.style('opacity', '0', toastVisible.$test(false)),
  trait.style('transform', 'translateX(-50%) translateY(8px)', toastVisible.$test(false)),
  // visible
  trait.style('opacity', '1', toastVisible.$test(true)),
  trait.style('transform', 'translateX(-50%) translateY(0)', toastVisible.$test(true)),
  CheckIcon({ size: '14', color: '#888888' }),
  tag.span(trait.text(toastMessage.$val)),
);

// ═══════════════════════════════════════════════
// API REFERENCE DIALOG (Cmd+K)
// ═══════════════════════════════════════════════

const Dialog = tag.div(
  trait.style('position', 'fixed'),
  trait.style('inset', '0'),
  trait.style('zIndex', '200'),
  trait.style('display', 'flex'),
  trait.style('alignItems', 'flex-start'),
  trait.style('justifyContent', 'center'),
  trait.style('paddingTop', '10vh'),
  trait.style('transition', 'opacity 0.2s ease'),
  // hidden
  trait.style('opacity', '0', dialogOpen.$test(false)),
  trait.style('pointerEvents', 'none', dialogOpen.$test(false)),
  // visible
  trait.style('opacity', '1', dialogOpen.$test(true)),
  trait.style('pointerEvents', 'auto', dialogOpen.$test(true)),

  // Backdrop
  tag.div(
    trait.style('position', 'absolute'),
    trait.style('inset', '0'),
    trait.style('backgroundColor', 'rgba(0,0,0,0.5)'),
    trait.style('backdropFilter', 'blur(8px)'),
    webkitBackdrop('blur(8px)'),
    trait.event('click', $dispatch(closeDialog())),
  ),

  // Dialog panel
  tag.div(
    trait.style('position', 'relative'),
    trait.style('width', '90%'),
    trait.style('maxWidth', '680px'),
    trait.style('maxHeight', '70vh'),
    trait.style('overflow', 'auto'),
    trait.style('backgroundColor', surface_bg_secondary.$val),
    trait.style('borderRadius', radius_size_lg.$val),
    trait.style('border', () => `1px solid ${border_color_primary.val()}`, border_color_primary),
    trait.style('padding', space_padding_lg.$val),
    trait.style('boxShadow', '0 24px 80px rgba(0,0,0,0.4)'),

    // Header row
    tag.div(
      trait.style('display', 'flex'),
      trait.style('justifyContent', 'space-between'),
      trait.style('alignItems', 'center'),
      trait.style('marginBottom', space_padding_md.$val),

      tag.h3(
        trait.text('API Quick Reference'),
        trait.style('margin', '0'),
        trait.style('fontSize', type_size_lg.$val),
        trait.style('fontWeight', type_weight_bold.$val),
        trait.style('color', text_fg_primary.$val),
      ),
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        tag.span(
          trait.text('ESC'),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_muted.$val),
          trait.style('padding', '2px 6px'),
          trait.style('borderRadius', '4px'),
          trait.style(
            'border',
            () => `1px solid ${border_color_primary.val()}`,
            border_color_primary,
          ),
        ),
        tag.button(
          trait.style('background', 'none'),
          trait.style('border', 'none'),
          trait.style('cursor', 'pointer'),
          trait.style('color', text_fg_muted.$val),
          trait.style('display', 'flex'),
          trait.style('padding', '2px'),
          trait.event('click', $dispatch(closeDialog())),
          CloseIcon({ size: '18' }),
        ),
      ),
    ),

    // Traits list
    tag.div(
      trait.style('marginBottom', space_padding_md.$val),
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('marginBottom', space_padding_sm.$val),
        tag.span(
          trait.text('Traits'),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('fontWeight', type_weight_bold.$val),
          trait.style('color', accent_neon_cyan.$val),
          trait.style('textTransform', 'uppercase'),
          trait.style('letterSpacing', '0.08em'),
        ),
        tag.span(
          trait.text(`${TRAIT_DOCS.length}`),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_muted.$val),
          trait.style('padding', '1px 6px'),
          trait.style('borderRadius', radius_size_full.$val),
          trait.style('backgroundColor', surface_bg_tertiary.$val),
        ),
      ),
      ...TRAIT_DOCS.map((t) =>
        tag.div(
          trait.style('display', 'flex'),
          trait.style('alignItems', 'baseline'),
          trait.style('gap', space_gap_sm.$val),
          trait.style('padding', '3px 0'),
          trait.style(
            'borderBottom',
            () => `1px solid ${border_color_primary.val()}08`,
            border_color_primary,
          ),
          tag.span(
            trait.text(t.name),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('color', text_fg_primary.$val),
            trait.style('fontWeight', type_weight_medium.$val),
            trait.style('minWidth', '175px'),
            trait.style('flexShrink', '0'),
          ),
          tag.span(
            trait.text(t.signature),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', '9px'),
            trait.style('color', text_fg_muted.$val),
            trait.style('minWidth', '150px'),
            trait.style('flexShrink', '0'),
            trait.style('display', 'none'),
            trait.style('display', 'inline', isDesktop.$test(true)),
          ),
          tag.span(
            trait.text(t.description),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('color', text_fg_secondary.$val),
            trait.style('display', 'none'),
            trait.style('display', 'inline', isDesktop.$test(true)),
          ),
        ),
      ),
    ),

    // States list
    tag.div(
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('marginBottom', space_padding_sm.$val),
        tag.span(
          trait.text('States'),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('fontWeight', type_weight_bold.$val),
          trait.style('color', accent_neon_purple.$val),
          trait.style('textTransform', 'uppercase'),
          trait.style('letterSpacing', '0.08em'),
        ),
        tag.span(
          trait.text(`${STATE_DOCS.length}`),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_muted.$val),
          trait.style('padding', '1px 6px'),
          trait.style('borderRadius', radius_size_full.$val),
          trait.style('backgroundColor', surface_bg_tertiary.$val),
        ),
      ),
      ...STATE_DOCS.map((s) =>
        tag.div(
          trait.style('display', 'flex'),
          trait.style('alignItems', 'baseline'),
          trait.style('gap', space_gap_sm.$val),
          trait.style('padding', '3px 0'),
          trait.style(
            'borderBottom',
            () => `1px solid ${border_color_primary.val()}08`,
            border_color_primary,
          ),
          tag.span(
            trait.text(s.name),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('color', text_fg_primary.$val),
            trait.style('fontWeight', type_weight_medium.$val),
            trait.style('minWidth', '175px'),
            trait.style('flexShrink', '0'),
          ),
          tag.span(
            trait.text(s.signature),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', '9px'),
            trait.style('color', text_fg_muted.$val),
            trait.style('minWidth', '150px'),
            trait.style('flexShrink', '0'),
            trait.style('display', 'none'),
            trait.style('display', 'inline', isDesktop.$test(true)),
          ),
          tag.span(
            trait.text(s.description),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('color', text_fg_secondary.$val),
            trait.style('display', 'none'),
            trait.style('display', 'inline', isDesktop.$test(true)),
          ),
        ),
      ),
    ),
  ),
);

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
      trait.style('fontSize', type_size_2xl.$val),
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
    trait.style('gap', space_gap_md.$val),
    ...NAV_ITEMS.filter((n) => n.id !== 'hero').map((item) =>
      tag.a(
        trait.text(item.label),
        trait.style('fontSize', type_size_xs.$val),
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
    trait.style('gap', space_gap_sm.$val),

    // API Reference button (desktop)
    tag.button(
      trait.style('display', 'none'),
      trait.style('display', 'flex', isDesktop.$test(true)),
      trait.style('alignItems', 'center'),
      trait.style('gap', '4px'),
      trait.style('padding', '4px 10px'),
      trait.style('background', 'none'),
      trait.style(
        'border',
        () => `1px solid ${border_color_primary.val()}`,
        border_color_primary,
      ),
      trait.style('borderRadius', radius_size_sm.$val),
      trait.style('cursor', 'pointer'),
      trait.style('color', text_fg_muted.$val),
      trait.style('fontSize', type_size_xs.$val),
      trait.style('fontFamily', FONT_MONO),
      trait.style('transition', transition_fast.$val),
      trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_accent.val()),
      trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
      trait.event('click', $dispatch(openDialog())),
      CommandIcon({ size: '12' }),
      tag.span(trait.text('K')),
    ),

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
      GitHubIcon({ size: '18' }),
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
        () => [theme.val() === 'dark' ? SunIcon({ size: '18' }) : MoonIcon({ size: '18' })],
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
        () => [navOpen.val() ? CloseIcon({ size: '22' }) : MenuIcon({ size: '22' })],
        navOpen,
      ),
    ),
  ),
);

// Mobile nav drawer (slide from right)
const MobileNav = tag.div(
  trait.style('position', 'fixed'),
  trait.style('top', '0'),
  trait.style('right', '0'),
  trait.style('bottom', '0'),
  trait.style('width', '280px'),
  trait.style('backgroundColor', surface_bg_secondary.$val),
  trait.style('backdropFilter', 'blur(20px)'),
  webkitBackdrop('blur(20px)'),
  trait.style('zIndex', '99'),
  trait.style('display', 'flex'),
  trait.style('flexDirection', 'column'),
  trait.style(
    'padding',
    `${space_padding_4xl.val()} ${space_padding_lg.val()} ${space_padding_lg.val()}`,
  ),
  trait.style('gap', space_gap_md.$val),
  trait.style('transition', 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'),
  trait.style(
    'borderLeft',
    () => `1px solid ${border_color_primary.val()}`,
    border_color_primary,
  ),
  trait.style('boxShadow', '-8px 0 32px rgba(0,0,0,0.2)'),
  trait.style('transform', 'translateX(100%)', navOpen.$test(false)),
  trait.style('transform', 'translateX(0)', navOpen.$test(true)),

  ...NAV_ITEMS.map((item) =>
    tag.a(
      trait.text(item.label),
      trait.style('fontSize', type_size_lg.$val),
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

  // API Reference in mobile nav
  tag.button(
    trait.style('display', 'flex'),
    trait.style('alignItems', 'center'),
    trait.style('gap', space_gap_sm.$val),
    trait.style('padding', '10px 0'),
    trait.style('background', 'none'),
    trait.style('border', 'none'),
    trait.style('cursor', 'pointer'),
    trait.style('color', accent_neon_cyan.$val),
    trait.style('fontSize', type_size_base.$val),
    trait.style('fontFamily', FONT_MONO),
    trait.event('click', () => {
      navOpen.set(false);
      dispatch(openDialog());
    }),
    CommandIcon({ size: '14' }),
    tag.span(trait.text('API Reference')),
  ),
);

// Mobile nav backdrop
const MobileNavBackdrop = tag.div(
  trait.style('position', 'fixed'),
  trait.style('inset', '0'),
  trait.style('zIndex', '98'),
  trait.style('backgroundColor', 'rgba(0,0,0,0.3)'),
  trait.style('transition', 'opacity 0.3s ease'),
  trait.style('opacity', '0', navOpen.$test(false)),
  trait.style('pointerEvents', 'none', navOpen.$test(false)),
  trait.style('opacity', '1', navOpen.$test(true)),
  trait.style('pointerEvents', 'auto', navOpen.$test(true)),
  trait.event('click', $dispatch(toggleNav())),
);

// ═══════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════

const HeroSection = SectionContainer(
  'hero',

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
    trait.style('paddingTop', space_padding_3xl.$val),
    trait.style('paddingBottom', space_padding_lg.$val),

    // Tagline pill
    tag.div(
      trait.style('marginBottom', space_padding_md.$val),
      onMount((el) => fadeIn(el, 100)),
      Pill('Agentic UI', '#555555'),
    ),

    // Main heading
    tag.h1(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('margin', '0'),
      trait.style('gap', '4px'),
      trait.style('fontSize', type_size_2xl.$val),
      trait.style('fontSize', type_size_3xl.$val, isDesktop.$test(true)),
      trait.style('fontWeight', type_weight_thin.$val),
      trait.style('lineHeight', '1.1'),
      trait.style('letterSpacing', '-0.03em'),
      trait.style('marginBottom', space_padding_md.$val),
      trait.style('fontFamily', FONT_DISPLAY),
      onMount((el) => fadeInUp(el, 150)),
      tag.span(
        trait.text('/oem <prompt>'),
        trait.style('color', text_gradient_hero.$val),
        trait.style('fontSize', type_size_3xl.$val),
      ),
    ),

    // Subtitle
    tag.p(
      trait.text(
        'The human-AI collaboration toolkit for building front-end web applications with natural language.',
      ),
      trait.style('fontSize', type_size_base.$val),
      trait.style('color', text_fg_secondary.$val),
      trait.style('maxWidth', '540px'),
      trait.style('margin', '0 auto'),
      trait.style('lineHeight', '1.6'),
      trait.style('marginBottom', space_padding_lg.$val),
      onMount((el) => fadeInUp(el, 250)),
    ),

    // CTA buttons
    tag.div(
      trait.style('display', 'flex'),
      trait.style('flexDirection', 'column'),
      trait.style('flexDirection', 'row', isDesktop.$test(true)),
      trait.style('gap', space_gap_sm.$val),
      trait.style('justifyContent', 'center'),
      trait.style('alignItems', 'center'),
      onMount((el) => fadeInUp(el, 350)),

      // Primary CTA
      tag.button(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('padding', '10px 24px'),
        trait.style(
          'background',
          () =>
            `linear-gradient(135deg, ${accent_neon_pink.val()}, ${accent_neon_purple.val()})`,
          accent_neon_pink,
          accent_neon_purple,
        ),
        trait.style('color', '#c7c7c7'),
        trait.style('border', 'none'),
        trait.style('borderRadius', radius_size_full.$val),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('fontWeight', type_weight_semibold.$val),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_medium.$val),
        trait.style('fontFamily', FONT_DISPLAY),
        trait.styleOnEvent('mouseenter', 'transform', () => 'translateY(-2px)'),
        trait.styleOnEvent('mouseleave', 'transform', () => 'translateY(0)'),
        trait.event('click', $dispatch(navigate('setup'))),
        trait.text('Get Started'),
        ArrowRightIcon({ size: '14', color: '#c7c7c7' }),
      ),

      // Secondary CTA
      tag.button(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('padding', '10px 24px'),
        trait.style('background', 'transparent'),
        trait.style('color', accent_neon_cyan.$val),
        trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
        trait.style('borderRadius', radius_size_full.$val),
        trait.style('fontSize', type_size_sm.$val),
        trait.style('fontWeight', type_weight_medium.$val),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_medium.$val),
        trait.style('fontFamily', FONT_DISPLAY),
        trait.styleOnEvent('mouseenter', 'transform', () => 'translateY(-2px)'),
        trait.styleOnEvent('mouseleave', 'transform', () => 'translateY(0)'),
        trait.event('click', $dispatch(navigate('examples'))),
        trait.text('View Examples'),
      ),
    ),

    // Install snippet
    tag.div(
      trait.style('marginTop', space_padding_lg.$val),
      trait.style('display', 'flex'),
      trait.style('justifyContent', 'center'),
      onMount((el) => fadeInUp(el, 450)),

      tag.div(
        trait.style('display', 'inline-flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('padding', '8px 16px'),
        trait.style('backgroundColor', surface_bg_code.$val),
        trait.style('borderRadius', radius_size_full.$val),
        trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
        trait.style('fontFamily', FONT_MONO),
        trait.style('fontSize', type_size_xs.$val),
        tag.span(trait.text('$'), trait.style('color', '#888888')),
        tag.span(trait.text('bun add @linttrap/oem'), trait.style('color', '#c7c7c7')),
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
          trait.event('click', () => copyCode('bun add @linttrap/oem')),
          CopyIcon({ size: '12' }),
        ),
      ),
    ),
  ),
);

// ═══════════════════════════════════════════════
// FEATURES GRID
// ═══════════════════════════════════════════════

const FeaturesGrid = tag.div(
  trait.style('maxWidth', '1100px'),
  trait.style('margin', '0 auto'),
  trait.style('paddingLeft', space_padding_md.$val),
  trait.style('paddingRight', space_padding_md.$val),
  trait.style('display', 'grid'),
  trait.style('gridTemplateColumns', '1fr'),
  trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
  trait.style('gap', space_gap_sm.$val),

  ...FEATURES.map((feature, i) =>
    tag.div(
      trait.style('display', 'flex'),
      trait.style('gap', space_gap_sm.$val),
      trait.style('padding', space_padding_md.$val),
      trait.style('borderRadius', radius_size_sm.$val),
      trait.style('backgroundColor', surface_bg_card.$val),
      trait.style(
        'border',
        () => `1px solid ${border_color_primary.val()}`,
        border_color_primary,
      ),
      trait.style('transition', transition_fast.$val),
      trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_accent.val()),
      trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
      onMount((el) => fadeInUp(el, 80 + i * 60)),

      // Icon
      tag.div(
        trait.style('flexShrink', '0'),
        trait.style('width', '32px'),
        trait.style('height', '32px'),
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
        ICON_MAP[feature.icon]?.({ size: '18', color: '#666666' }) ||
          tag.span(trait.text('•')),
      ),

      tag.div(
        tag.h4(
          trait.text(feature.title),
          trait.style('margin', '0'),
          trait.style('fontSize', type_size_sm.$val),
          trait.style('fontWeight', type_weight_semibold.$val),
          trait.style('color', text_fg_primary.$val),
          trait.style('marginBottom', '2px'),
        ),
        tag.p(
          trait.text(feature.description),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.5'),
          trait.style('margin', '0'),
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
  SectionSubtitle(
    'Three composable primitives. Total transparency. Built for the age of AI.',
  ),

  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_sm.$val),

    ...PHILOSOPHY_POINTS.map((point, i) =>
      tag.div(
        trait.style('padding', space_padding_md.$val),
        trait.style('borderRadius', radius_size_md.$val),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('backgroundImage', gradient_card.$val),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'transform', () => 'translateY(-2px)'),
        trait.styleOnEvent('mouseleave', 'transform', () => 'translateY(0)'),
        onMount((el) => fadeInUp(el, i * 80)),

        tag.h3(
          trait.text(point.title),
          trait.style('margin', '0'),
          trait.style('fontSize', type_size_base.$val),
          trait.style('fontWeight', type_weight_semibold.$val),
          trait.style('color', text_fg_primary.$val),
          trait.style('marginBottom', space_padding_xs.$val),
        ),
        tag.p(
          trait.text(point.body),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.55'),
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
  SectionSubtitle('Install and start building reactive UIs in seconds.'),

  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_lg.$val),
    trait.style('alignItems', 'start'),

    // Step 1
    tag.div(
      onMount((el) => fadeInUp(el, 100)),
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('marginBottom', space_padding_sm.$val),
        tag.span(
          trait.text('01'),
          trait.style('fontFamily', FONT_MONO),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', accent_neon_pink.$val),
          trait.style('fontWeight', type_weight_bold.$val),
        ),
        tag.span(
          trait.text('Install'),
          trait.style('fontSize', type_size_base.$val),
          trait.style('fontWeight', type_weight_semibold.$val),
          trait.style('color', text_fg_primary.$val),
        ),
      ),
      CodeBlock(SETUP_CODE, 'bash'),
    ),

    // Step 2
    tag.div(
      onMount((el) => fadeInUp(el, 200)),
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style('marginBottom', space_padding_sm.$val),
        tag.span(
          trait.text('02'),
          trait.style('fontFamily', FONT_MONO),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', accent_neon_pink.$val),
          trait.style('fontWeight', type_weight_bold.$val),
        ),
        tag.span(
          trait.text('Hello World'),
          trait.style('fontSize', type_size_base.$val),
          trait.style('fontWeight', type_weight_semibold.$val),
          trait.style('color', text_fg_primary.$val),
        ),
      ),
      CodeBlock(HELLO_WORLD_CODE),
    ),
  ),
);

// ═══════════════════════════════════════════════
// PRIMITIVES SECTION (TABBED)
// ═══════════════════════════════════════════════

const PRIMITIVE_TABS: { id: PrimitiveTab; label: string; desc: string }[] = [
  { id: 'element', label: 'Element', desc: 'The tag proxy creates real DOM nodes' },
  { id: 'trait', label: 'Trait', desc: 'Behaviors applied to elements' },
  { id: 'state', label: 'State', desc: 'Reactive containers with push-based updates' },
];

function getPrimitiveCode(tab: PrimitiveTab) {
  if (tab === 'element') return PRIMITIVE_ELEMENT_CODE;
  if (tab === 'trait') return PRIMITIVE_TRAIT_CODE;
  return PRIMITIVE_STATE_CODE;
}

const PrimitivesSection = SectionContainer(
  'primitives',
  SectionTitle('The Three Primitives'),
  SectionSubtitle(
    'Everything in OEM is built from Elements, Traits, and State. No components, no hooks, no lifecycle.',
  ),

  // Tab bar
  tag.div(
    trait.style('display', 'inline-flex'),
    trait.style('gap', '4px'),
    trait.style('marginBottom', space_padding_md.$val),
    trait.style('padding', '3px'),
    trait.style('backgroundColor', surface_bg_tertiary.$val),
    trait.style('borderRadius', radius_size_md.$val),
    onMount((el) => fadeInUp(el, 100)),

    ...PRIMITIVE_TABS.map((tab) =>
      tag.button(
        trait.text(tab.label),
        trait.style('padding', '6px 16px'),
        trait.style('border', 'none'),
        trait.style('borderRadius', radius_size_sm.$val),
        trait.style('fontSize', type_size_xs.$val),
        trait.style('fontWeight', type_weight_medium.$val),
        trait.style('cursor', 'pointer'),
        trait.style('transition', transition_fast.$val),
        trait.style('fontFamily', FONT_MONO),
        // Active state
        trait.style(
          'backgroundColor',
          surface_bg_secondary.$val,
          primitiveTab.$test(tab.id),
        ),
        trait.style('color', text_fg_primary.$val, primitiveTab.$test(tab.id)),
        trait.style(
          'boxShadow',
          '0 1px 3px rgba(0,0,0,0.1)',
          primitiveTab.$test(tab.id),
        ),
        // Inactive state
        trait.style(
          'backgroundColor',
          'transparent',
          primitiveTab.$test((v) => v !== tab.id),
        ),
        trait.style('color', text_fg_muted.$val, primitiveTab.$test((v) => v !== tab.id)),
        trait.style('boxShadow', 'none', primitiveTab.$test((v) => v !== tab.id)),
        trait.event('click', $dispatch(setPrimitiveTab(tab.id))),
        trait.aria('role', 'tab'),
        trait.aria(
          'aria-selected',
          () => (primitiveTab.val() === tab.id ? 'true' : 'false'),
          primitiveTab,
        ),
      ),
    ),
  ),

  // Tab description
  tag.p(
    trait.style('fontSize', type_size_xs.$val),
    trait.style('color', text_fg_muted.$val),
    trait.style('margin', '0'),
    trait.style('marginBottom', space_padding_sm.$val),
    trait.style('fontStyle', 'italic'),
    trait.innerHTML(
      () => {
        const tab = PRIMITIVE_TABS.find((t) => t.id === primitiveTab.val());
        return [tag.span(trait.text(tab?.desc || ''))];
      },
      primitiveTab,
    ),
  ),

  // Tab content — reactive code block
  tag.div(
    trait.innerHTML(
      () => [CodeBlock(getPrimitiveCode(primitiveTab.val()))],
      primitiveTab,
    ),
  ),
);

// ═══════════════════════════════════════════════
// EXAMPLES SECTION (ACCORDION)
// ═══════════════════════════════════════════════

const ExamplesSection = SectionContainer(
  'examples',
  SectionTitle('Examples'),
  SectionSubtitle('Real patterns. Click to expand the code.'),

  tag.div(
    trait.style('display', 'flex'),
    trait.style('flexDirection', 'column'),
    trait.style('gap', space_gap_sm.$val),

    ...EXAMPLES.map((ex, i) =>
      tag.div(
        trait.style('borderRadius', radius_size_md.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style('overflow', 'hidden'),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_accent.val()),
        trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
        onMount((el) => fadeInUp(el, i * 80)),

        // Accordion header
        tag.div(
          trait.style('display', 'flex'),
          trait.style('alignItems', 'center'),
          trait.style('justifyContent', 'space-between'),
          trait.style('padding', `${space_padding_sm.val()} ${space_padding_md.val()}`),
          trait.style('cursor', 'pointer'),
          trait.style('userSelect', 'none'),
          trait.event('click', $dispatch(toggleExample(i))),
          trait.aria('role', 'button'),
          trait.aria(
            'aria-expanded',
            () => (expandedExample.val() === i ? 'true' : 'false'),
            expandedExample,
          ),

          tag.div(
            trait.style('display', 'flex'),
            trait.style('alignItems', 'baseline'),
            trait.style('gap', space_gap_sm.$val),
            tag.span(
              trait.text(ex.title),
              trait.style('fontWeight', type_weight_semibold.$val),
              trait.style('color', text_fg_primary.$val),
              trait.style('fontSize', type_size_sm.$val),
            ),
            tag.span(
              trait.text(ex.description),
              trait.style('color', text_fg_muted.$val),
              trait.style('fontSize', type_size_xs.$val),
            ),
          ),

          // Chevron
          tag.div(
            trait.style('transition', 'transform 0.2s ease'),
            trait.style(
              'transform',
              'rotate(0deg)',
              expandedExample.$test((v) => v !== i),
            ),
            trait.style('transform', 'rotate(180deg)', expandedExample.$test(i)),
            trait.style('color', text_fg_muted.$val),
            trait.style('display', 'flex'),
            ChevronDownIcon({ size: '16' }),
          ),
        ),

        // Accordion body
        tag.div(
          trait.style('overflow', 'hidden'),
          trait.style('transition', 'max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1)'),
          trait.style(
            'maxHeight',
            '0px',
            expandedExample.$test((v) => v !== i),
          ),
          trait.style('maxHeight', '800px', expandedExample.$test(i)),

          tag.div(
            trait.style('padding', `0 ${space_padding_sm.val()} ${space_padding_sm.val()}`),
            CodeBlock(ex.code, ex.language),
          ),
        ),
      ),
    ),
  ),
);

// ═══════════════════════════════════════════════
// TRAITS SECTION (COMPACT CARDS)
// ═══════════════════════════════════════════════

const TraitsSection = SectionContainer(
  'traits',
  SectionTitle('Built-in Traits'),
  SectionSubtitle(
    `${TRAIT_DOCS.length} reusable behaviors that give elements their abilities.`,
  ),

  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_sm.$val),

    ...TRAIT_DOCS.map((t, i) =>
      tag.div(
        trait.style('padding', space_padding_sm.$val),
        trait.style('paddingLeft', space_padding_md.$val),
        trait.style('borderRadius', radius_size_sm.$val),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('transition', transition_fast.$val),
        trait.style(
          'borderLeft',
          () => `3px solid ${accent_neon_cyan.val()}`,
          accent_neon_cyan,
        ),
        trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_cyan.val()),
        trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
        onMount((el) => fadeInUp(el, i * 40)),

        tag.div(
          trait.style('display', 'flex'),
          trait.style('alignItems', 'baseline'),
          trait.style('gap', space_gap_sm.$val),
          trait.style('marginBottom', '2px'),
          tag.span(
            trait.text(t.name),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('fontWeight', type_weight_semibold.$val),
            trait.style('color', accent_neon_cyan.$val),
            trait.style('fontFamily', FONT_MONO),
          ),
          tag.span(
            trait.text(t.signature),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', '9px'),
            trait.style('color', text_fg_muted.$val),
          ),
        ),
        tag.p(
          trait.text(t.description),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.4'),
          trait.style('margin', '0'),
        ),
      ),
    ),
  ),
);

// ═══════════════════════════════════════════════
// STATES SECTION (COMPACT CARDS)
// ═══════════════════════════════════════════════

const StatesSection = SectionContainer(
  'states',
  SectionTitle('State Management'),
  SectionSubtitle(
    `${STATE_DOCS.length} reactive primitives. No prop drilling, no context, no stores.`,
  ),

  // State cards
  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', space_gap_sm.$val),
    trait.style('marginBottom', space_padding_lg.$val),

    ...STATE_DOCS.map((s, i) =>
      tag.div(
        trait.style('padding', space_padding_sm.$val),
        trait.style('paddingLeft', space_padding_md.$val),
        trait.style('borderRadius', radius_size_sm.$val),
        trait.style('backgroundColor', surface_bg_secondary.$val),
        trait.style(
          'border',
          () => `1px solid ${border_color_primary.val()}`,
          border_color_primary,
        ),
        trait.style('transition', transition_fast.$val),
        trait.style(
          'borderLeft',
          () => `3px solid ${accent_neon_purple.val()}`,
          accent_neon_purple,
        ),
        trait.styleOnEvent('mouseenter', 'borderColor', () => border_color_accent.val()),
        trait.styleOnEvent('mouseleave', 'borderColor', () => border_color_primary.val()),
        onMount((el) => fadeInUp(el, i * 40)),

        tag.div(
          trait.style('display', 'flex'),
          trait.style('alignItems', 'baseline'),
          trait.style('gap', space_gap_sm.$val),
          trait.style('marginBottom', '2px'),
          tag.span(
            trait.text(s.name),
            trait.style('fontSize', type_size_xs.$val),
            trait.style('fontWeight', type_weight_semibold.$val),
            trait.style('color', accent_neon_purple.$val),
            trait.style('fontFamily', FONT_MONO),
          ),
          tag.span(
            trait.text(s.signature),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', '9px'),
            trait.style('color', text_fg_muted.$val),
          ),
        ),
        tag.p(
          trait.text(s.description),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_secondary.$val),
          trait.style('lineHeight', '1.4'),
          trait.style('margin', '0'),
        ),
      ),
    ),
  ),

  // $ Convention callout (compact)
  tag.div(
    trait.style('padding', space_padding_md.$val),
    trait.style('borderRadius', radius_size_md.$val),
    trait.style('backgroundColor', surface_bg_secondary.$val),
    trait.style('border', () => `1px solid ${border_color_cyan.val()}`, border_color_cyan),
    trait.style('backgroundImage', gradient_card.$val),
    onMount((el) => fadeInUp(el, 400)),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_sm.$val),
      trait.style('marginBottom', space_padding_sm.$val),
      tag.h4(
        trait.text('The $ Convention'),
        trait.style('margin', '0'),
        trait.style('fontSize', type_size_base.$val),
        trait.style('fontWeight', type_weight_semibold.$val),
        trait.style('color', text_fg_primary.$val),
      ),
    ),
    tag.p(
      trait.text(
        'Every State method has a $-prefixed twin that returns a closure instead of executing immediately. $val is both a getter and subscribable. $set/$reduce are thunks for event wiring. $test creates reactive conditions.',
      ),
      trait.style('fontSize', type_size_xs.$val),
      trait.style('color', text_fg_secondary.$val),
      trait.style('lineHeight', '1.5'),
      trait.style('margin', '0'),
      trait.style('marginBottom', space_padding_sm.$val),
    ),
    CodeBlock(`const count = State(0);

// Direct vs deferred execution
count.set(5);                              // executes immediately
count.$set(5);                             // returns () => count.set(5)

// Wire to events — no wrapping lambdas needed
trait.event('click', count.$reduce(prev => prev + 1));

// $val — getter AND subscribable
trait.text(count.$val);                    // reactive text binding

// $test — reactive condition
trait.style('color', '#555555', count.$test(v => v > 0));`),
  ),
);

// ═══════════════════════════════════════════════
// THEMING SECTION (COMPACT)
// ═══════════════════════════════════════════════

const ThemingSection = SectionContainer(
  'theming',
  SectionTitle('Token-Driven Theming'),
  SectionSubtitle(
    'Every visual value is a reactive token. Theme changes propagate instantly.',
  ),

  // Architecture diagram
  tag.div(
    trait.style('marginBottom', space_padding_md.$val),
    onMount((el) => fadeInUp(el, 100)),
    CodeBlock(`// Architecture
// useThemeState('light')   ← single source of truth
//       │
//       ├─▸ useTokenState('#c7c7c7', '#222', theme)  ← light/dark pair
//       └─▸ ...hundreds of tokens
//
// Tokens are State objects — traits subscribe via $val

const theme = useThemeState('light');
const bg = useTokenState('#c7c7c7', '#222222', theme);
trait.style('backgroundColor', bg.$val);  // reactive, zero flicker`),
  ),

  // Token naming + examples
  tag.div(
    trait.style('padding', space_padding_md.$val),
    trait.style('borderRadius', radius_size_md.$val),
    trait.style('backgroundColor', surface_bg_secondary.$val),
    trait.style(
      'border',
      () => `1px solid ${border_color_primary.val()}`,
      border_color_primary,
    ),
    trait.style('backgroundImage', gradient_card.$val),
    onMount((el) => fadeInUp(el, 200)),

    tag.div(
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', space_gap_sm.$val),
      trait.style('marginBottom', space_padding_sm.$val),
      tag.span(
        trait.text('Naming: '),
        trait.style('fontSize', type_size_xs.$val),
        trait.style('color', text_fg_muted.$val),
      ),
      tag.span(
        trait.text('<category>_<property>_<variant>'),
        trait.style('fontFamily', FONT_MONO),
        trait.style('fontSize', type_size_xs.$val),
        trait.style('color', accent_neon_cyan.$val),
      ),
    ),

    tag.div(
      trait.style('display', 'grid'),
      trait.style('gridTemplateColumns', 'repeat(2, 1fr)'),
      trait.style('gridTemplateColumns', 'repeat(3, 1fr)', isDesktop.$test(true)),
      trait.style('gap', space_gap_sm.$val),
      ...[
        { token: 'surface_bg_primary', desc: 'Page background' },
        { token: 'text_fg_secondary', desc: 'Labels & descriptions' },
        { token: 'border_color_accent', desc: 'Focus ring' },
        { token: 'space_padding_lg', desc: '24px padding' },
        { token: 'type_weight_bold', desc: '700 weight' },
        { token: 'transition_fast', desc: '150ms ease' },
      ].map((item) =>
        tag.div(
          trait.style('padding', space_padding_xs.$val),
          trait.style('borderRadius', radius_size_sm.$val),
          trait.style('backgroundColor', surface_bg_code.$val),
          tag.div(
            trait.text(item.token),
            trait.style('fontFamily', FONT_MONO),
            trait.style('fontSize', '9px'),
            trait.style('color', '#c7c7c7'),
            trait.style('marginBottom', '1px'),
          ),
          tag.div(
            trait.text(item.desc),
            trait.style('fontSize', '9px'),
            trait.style('color', '#888888'),
          ),
        ),
      ),
    ),
  ),

  // Live theme note
  tag.p(
    trait.text(
      'Toggle the theme in the nav bar — every color on this page is a reactive token.',
    ),
    trait.style('fontSize', type_size_xs.$val),
    trait.style('color', text_fg_muted.$val),
    trait.style('fontStyle', 'italic'),
    trait.style('marginTop', space_padding_md.$val),
    trait.style('marginBottom', '0'),
  ),
);

// ═══════════════════════════════════════════════
// ARCHITECTURE SECTION (COMPACT)
// ═══════════════════════════════════════════════

const ArchitectureSection = SectionContainer(
  'architecture',
  SectionTitle('File Architecture'),
  SectionSubtitle('One file per concern. Strict separation. LLM-friendly.'),

  // File grid
  tag.div(
    trait.style('display', 'grid'),
    trait.style('gridTemplateColumns', '1fr'),
    trait.style('gridTemplateColumns', 'repeat(2, 1fr)', isDesktop.$test(true)),
    trait.style('gap', '4px'),
    trait.style('marginBottom', space_padding_md.$val),

    ...ARCH_FILES.map((file, i) =>
      tag.div(
        trait.style('display', 'flex'),
        trait.style('alignItems', 'center'),
        trait.style('gap', space_gap_sm.$val),
        trait.style(
          'padding',
          `${space_padding_xs.val()} ${space_padding_sm.val()}`,
        ),
        trait.style('borderRadius', radius_size_sm.$val),
        trait.style('transition', transition_fast.$val),
        trait.styleOnEvent('mouseenter', 'backgroundColor', () =>
          surface_bg_tertiary.val(),
        ),
        trait.styleOnEvent('mouseleave', 'backgroundColor', () => 'transparent'),
        onMount((el) => fadeInUp(el, i * 30)),

        tag.span(
          trait.text(file.name),
          trait.style('fontFamily', FONT_MONO),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_primary.$val),
          trait.style('fontWeight', type_weight_bold.$val),
          trait.style('minWidth', '100px'),
        ),
        tag.span(
          trait.text(file.purpose),
          trait.style('fontSize', type_size_xs.$val),
          trait.style('color', text_fg_secondary.$val),
        ),
      ),
    ),
  ),

  // Dependency diagram
  tag.div(onMount((el) => fadeInUp(el, 400)), CodeBlock(ARCH_DIAGRAM_CODE)),
);

// ═══════════════════════════════════════════════
// FOOTER (MINIMAL)
// ═══════════════════════════════════════════════

const Footer = tag.footer(
  trait.style(
    'borderTop',
    () => `1px solid ${border_color_primary.val()}`,
    border_color_primary,
  ),
  trait.style('padding', space_padding_lg.$val),
  trait.style('textAlign', 'center'),

  tag.div(
    trait.style('maxWidth', '1100px'),
    trait.style('margin', '0 auto'),
    trait.style('display', 'flex'),
    trait.style('justifyContent', 'center'),
    trait.style('alignItems', 'center'),
    trait.style('gap', space_gap_lg.$val),

    tag.a(
      trait.attr('href', 'https://github.com/linttrapmedia/oem'),
      trait.attr('target', '_blank'),
      trait.attr('rel', 'noopener'),
      trait.style('color', text_fg_secondary.$val),
      trait.style('textDecoration', 'none'),
      trait.style('display', 'flex'),
      trait.style('alignItems', 'center'),
      trait.style('gap', '4px'),
      trait.style('fontSize', type_size_xs.$val),
      trait.style('transition', transition_fast.$val),
      trait.styleOnEvent('mouseenter', 'color', () => accent_neon_pink.val()),
      trait.styleOnEvent('mouseleave', 'color', () => text_fg_secondary.val()),
      GitHubIcon({ size: '14' }),
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
      trait.style('gap', '4px'),
      trait.style('fontSize', type_size_xs.$val),
      trait.style('transition', transition_fast.$val),
      trait.styleOnEvent('mouseenter', 'color', () => accent_neon_pink.val()),
      trait.styleOnEvent('mouseleave', 'color', () => text_fg_secondary.val()),
      NpmIcon({ size: '14' }),
      tag.span(trait.text('npm')),
    ),

    tag.span(
      trait.text('Built with OEM'),
      trait.style('fontSize', type_size_xs.$val),
      trait.style('color', text_fg_muted.$val),
    ),
  ),
);

// ═══════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════

export const app = tag.div(
  trait.style('position', 'relative'),
  trait.style('minHeight', '100vh'),

  // Background gradient
  tag.div(
    trait.style('position', 'fixed'),
    trait.style('inset', '0'),
    trait.style('backgroundImage', gradient_hero.$val),
    trait.style('pointerEvents', 'none'),
    trait.style('zIndex', '0'),
  ),

  // Main content
  tag.div(
    trait.style('position', 'relative'),
    trait.style('zIndex', '1'),

    NavBar,
    MobileNavBackdrop,
    MobileNav,

    // Spacer for fixed nav
    tag.div(trait.style('height', '48px')),

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

  // Overlays
  Toast,
  Dialog,
);
