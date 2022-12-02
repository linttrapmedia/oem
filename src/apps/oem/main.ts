import OEM from '@oem';
import { CounterExample } from './CounterExample';
import { LocationExample } from './LocationExample';
import { TodoExample } from './TodoExample';

OEM(
  DIV.column(30).append(
    H2.innerText('Examples'),
    H3.innerText('Todo'),
    TodoExample,
    H3.innerText('Counter'),
    CounterExample,
    H2.innerText('State'),
    H3.innerText('Location'),
    LocationExample,
    H3.innerText('Array'),
    H3.innerText('Map'),
    H3.innerText('Number'),
    H3.innerText('Object'),
    H3.innerText('Set'),
    H3.innerText('String'),
  ),
);
