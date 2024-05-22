import {
  TODO_ADD_ACTION,
  TODO_DELETE_ACTION,
  TODO_INPUT_ACTION,
  TODO_TOGGLE_ACTION,
  todo_add,
  todo_delete,
  todo_input,
  todo_toggle,
} from './actions';

type FSMstate = 'READY' | 'ERROR';
let fsmState: FSMstate = 'READY';

export function fsm(...actions: TODO_INPUT_ACTION | TODO_ADD_ACTION | TODO_DELETE_ACTION | TODO_TOGGLE_ACTION) {
  const [action, payload] = actions;
  switch (fsmState) {
    case 'READY':
      switch (action) {
        case 'TODO:INPUT':
          todo_input(payload);
          break;
        case 'TODO:ADD':
          todo_add();
          break;
        case 'TODO:DELETE':
          todo_delete(payload);
          break;
        case 'TODO:TOGGLE':
          todo_toggle(payload);
          break;
      }
      break;
    case 'ERROR':
      break;
  }
}
