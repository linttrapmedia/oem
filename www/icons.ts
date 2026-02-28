// icons.ts
import { Template, useAttributeTrait, useStyleTrait } from '../src/registry';

type IconProps = {
  size?: string;
  color?: string;
};

// Private SVG template
const [svg, svgTrait] = Template({
  attr: useAttributeTrait,
  style: useStyleTrait,
});

// --- Cube icon ---
export function CubeIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(
      svgTrait.attr(
        'd',
        'M21 16.5v-9l-9-5.25L3 7.5v9l9 5.25 9-5.25zM3 7.5l9 5.25M12 22.5V12.75M21 7.5l-9 5.25',
      ),
    ),
  );
}

// --- Triangle icon ---
export function TriangleIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(svgTrait.attr('d', 'M12 3L2 21h20L12 3z')),
  );
}

// --- Bolt icon ---
export function BoltIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(svgTrait.attr('d', 'M13 2L3 14h9l-1 8 10-12h-9l1-8z')),
  );
}

// --- Brain icon ---
export function BrainIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(
      svgTrait.attr(
        'd',
        'M12 2a7 7 0 00-5.2 2.3A5 5 0 003 9c0 1.7.8 3.2 2 4.2V20a1 1 0 001 1h4v-3h4v3h4a1 1 0 001-1v-6.8A5 5 0 0021 9a5 5 0 00-3.8-4.7A7 7 0 0012 2z',
      ),
    ),
    svg.path(svgTrait.attr('d', 'M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0')),
  );
}

// --- Palette icon ---
export function PaletteIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(
      svgTrait.attr(
        'd',
        'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.8-1.7 1.7-1.7H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9.6-10-9.6z',
      ),
    ),
    svg.circle(
      svgTrait.attr('cx', '6.5'),
      svgTrait.attr('cy', '11.5'),
      svgTrait.attr('r', '1.5'),
      svgTrait.attr('fill', color),
    ),
    svg.circle(
      svgTrait.attr('cx', '10'),
      svgTrait.attr('cy', '7.5'),
      svgTrait.attr('r', '1.5'),
      svgTrait.attr('fill', color),
    ),
    svg.circle(
      svgTrait.attr('cx', '14'),
      svgTrait.attr('cy', '7.5'),
      svgTrait.attr('r', '1.5'),
      svgTrait.attr('fill', color),
    ),
    svg.circle(
      svgTrait.attr('cx', '17.5'),
      svgTrait.attr('cy', '11.5'),
      svgTrait.attr('r', '1.5'),
      svgTrait.attr('fill', color),
    ),
  );
}

// --- Sparkle icon ---
export function SparkleIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(svgTrait.attr('d', 'M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z')),
  );
}

// --- Menu (hamburger) icon ---
export function MenuIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '2'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(svgTrait.attr('d', 'M3 6h18M3 12h18M3 18h18')),
  );
}

// --- Close (X) icon ---
export function CloseIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '2'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(svgTrait.attr('d', 'M18 6L6 18M6 6l12 12')),
  );
}

// --- Sun icon ---
export function SunIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.circle(svgTrait.attr('cx', '12'), svgTrait.attr('cy', '12'), svgTrait.attr('r', '5')),
    svg.path(
      svgTrait.attr(
        'd',
        'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
      ),
    ),
  );
}

// --- Moon icon ---
export function MoonIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(svgTrait.attr('d', 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z')),
  );
}

// --- Arrow right icon ---
export function ArrowRightIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '2'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(svgTrait.attr('d', 'M5 12h14M12 5l7 7-7 7')),
  );
}

// --- Copy icon ---
export function CopyIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', 'none'),
    svgTrait.attr('stroke', color),
    svgTrait.attr('stroke-width', '1.5'),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.rect(
      svgTrait.attr('x', '9'),
      svgTrait.attr('y', '9'),
      svgTrait.attr('width', '13'),
      svgTrait.attr('height', '13'),
      svgTrait.attr('rx', '2'),
    ),
    svg.path(svgTrait.attr('d', 'M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1')),
  );
}

// --- GitHub icon ---
export function GitHubIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', color),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(
      svgTrait.attr(
        'd',
        'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
      ),
    ),
  );
}

// --- npm icon ---
export function NpmIcon({ size = '24', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    svgTrait.attr('viewBox', '0 0 24 24'),
    svgTrait.attr('fill', color),
    svgTrait.style('width', size + 'px'),
    svgTrait.style('height', size + 'px'),
    svg.path(
      svgTrait.attr(
        'd',
        'M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z',
      ),
    ),
  );
}

// Icon map for dynamic lookup
export const ICON_MAP: Record<string, (props?: IconProps) => SVGElement> = {
  cube: CubeIcon,
  triangle: TriangleIcon,
  bolt: BoltIcon,
  brain: BrainIcon,
  palette: PaletteIcon,
  sparkle: SparkleIcon,
};
