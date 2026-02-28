// icons.ts
import { Template, useAttributeTrait, useStyleTrait } from '../../src/registry';

type IconProps = {
  size?: string;
  color?: string;
};

const [svg, s] = Template({
  attr: useAttributeTrait,
  style: useStyleTrait,
});

// --- Plus icon ---
export function PlusIcon({ size = '20', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    s.attr('viewBox', '0 0 24 24'),
    s.attr('fill', 'none'),
    s.attr('stroke', color),
    s.attr('stroke-width', '2.5'),
    s.attr('stroke-linecap', 'round'),
    s.style('width', size + 'px'),
    s.style('height', size + 'px'),
    svg.path(s.attr('d', 'M12 5v14M5 12h14')),
  );
}

// --- Check icon ---
export function CheckIcon({ size = '16', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    s.attr('viewBox', '0 0 24 24'),
    s.attr('fill', 'none'),
    s.attr('stroke', color),
    s.attr('stroke-width', '3'),
    s.attr('stroke-linecap', 'round'),
    s.attr('stroke-linejoin', 'round'),
    s.style('width', size + 'px'),
    s.style('height', size + 'px'),
    svg.path(s.attr('d', 'M20 6L9 17l-5-5')),
  );
}

// --- Trash icon ---
export function TrashIcon({ size = '16', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    s.attr('viewBox', '0 0 24 24'),
    s.attr('fill', 'none'),
    s.attr('stroke', color),
    s.attr('stroke-width', '2'),
    s.attr('stroke-linecap', 'round'),
    s.attr('stroke-linejoin', 'round'),
    s.style('width', size + 'px'),
    s.style('height', size + 'px'),
    svg.path(s.attr('d', 'M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2')),
    svg.path(s.attr('d', 'M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6')),
    svg.path(s.attr('d', 'M10 11v6M14 11v6')),
  );
}

// --- Edit (pencil) icon ---
export function EditIcon({ size = '14', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    s.attr('viewBox', '0 0 24 24'),
    s.attr('fill', 'none'),
    s.attr('stroke', color),
    s.attr('stroke-width', '2'),
    s.attr('stroke-linecap', 'round'),
    s.attr('stroke-linejoin', 'round'),
    s.style('width', size + 'px'),
    s.style('height', size + 'px'),
    svg.path(s.attr('d', 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7')),
    svg.path(s.attr('d', 'M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z')),
  );
}

// --- Sun icon ---
export function SunIcon({ size = '18', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    s.attr('viewBox', '0 0 24 24'),
    s.attr('fill', 'none'),
    s.attr('stroke', color),
    s.attr('stroke-width', '2'),
    s.attr('stroke-linecap', 'round'),
    s.style('width', size + 'px'),
    s.style('height', size + 'px'),
    svg.circle(s.attr('cx', '12'), s.attr('cy', '12'), s.attr('r', '5')),
    svg.path(
      s.attr(
        'd',
        'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
      ),
    ),
  );
}

// --- Moon icon ---
export function MoonIcon({ size = '18', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    s.attr('viewBox', '0 0 24 24'),
    s.attr('fill', 'none'),
    s.attr('stroke', color),
    s.attr('stroke-width', '2'),
    s.attr('stroke-linecap', 'round'),
    s.attr('stroke-linejoin', 'round'),
    s.style('width', size + 'px'),
    s.style('height', size + 'px'),
    svg.path(s.attr('d', 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z')),
  );
}

// --- Sparkle icon (for empty state) ---
export function SparkleIcon({ size = '48', color = 'currentColor' }: IconProps = {}) {
  return svg.svg(
    s.attr('viewBox', '0 0 24 24'),
    s.attr('fill', 'none'),
    s.attr('stroke', color),
    s.attr('stroke-width', '1.5'),
    s.attr('stroke-linecap', 'round'),
    s.attr('stroke-linejoin', 'round'),
    s.style('width', size + 'px'),
    s.style('height', size + 'px'),
    svg.path(s.attr('d', 'M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z')),
  );
}
