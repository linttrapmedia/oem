import { State, Template } from '@/oem';
import { useEventTrait } from '@/traits/Event';
import { useInnerHTMLTrait } from '@/traits/InnerHTML';
import { useStyleTrait } from '@/traits/Style';
import { useTextContentTrait } from '@/traits/TextContent';

// Create template with traits
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
);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('counter-app')!;
  root.appendChild(app);
});
