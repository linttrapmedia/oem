import State from './State';
import Tag from './Tag';
import Trait from './Trait';
const { row, inner_text, on_click } = Trait;
const { div, button } = Tag;

function CounterExample() {
  const count = State.Number(1);
  return div(row(30))(
    button(on_click(count.dec, 1))('-'),
    div(inner_text(count.val))(),
    button(on_click(count.inc, 1))('+'),
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const counter = CounterExample();
  document.body.appendChild(counter);
});
