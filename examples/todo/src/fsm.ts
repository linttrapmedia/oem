import { TodoType, newTodo, todoState } from './state';

type FSMprops = ['TODO:INPUT', string] | ['TODO:ADD'] | ['TODO:TOGGLE', TodoType];
type FSMstate = 'READY' | 'ERROR';
let fsmState: FSMstate = 'READY';

export function fsm(...props: FSMprops) {
  const [action, payload] = props;
  switch (fsmState) {
    case 'READY':
      switch (action) {
        case 'TODO:INPUT':
          const inputValue = payload as string;
          newTodo.set(inputValue);
          break;
        case 'TODO:ADD':
          if (newTodo.get() === '') return;
          const updateState = todoState.get();
          updateState.push({ title: newTodo.get(), completed: false });
          todoState.set(updateState);
          newTodo.set('');
          break;
        case 'TODO:TOGGLE':
          const todo = payload as TodoType;
          const toggleState = todoState.get();
          const index = toggleState.findIndex((t) => t.title === todo.title);
          toggleState[index].completed = !toggleState[index].completed;
          todoState.set(toggleState);
          break;
      }
      break;
    case 'ERROR':
      break;
  }
}
