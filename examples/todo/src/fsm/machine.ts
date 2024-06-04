import * as actions from './actions';

type FSMstate = 'READY' | 'ERROR';
let fsmState: FSMstate = 'READY';

export function fsm(
  ...evt: actions.TODO_INPUT_ACTION | actions.TODO_ADD_ACTION | actions.TODO_DELETE_ACTION | actions.TODO_TOGGLE_ACTION
) {
  const [action, payload] = evt;
  switch (fsmState) {
    case 'READY':
      switch (action) {
        case 'TODO:INPUT':
          actions.todo_input(payload);
          break;
        case 'TODO:ADD':
          actions.todo_add();
          break;
        case 'TODO:DELETE':
          actions.todo_delete(payload);
          break;
        case 'TODO:TOGGLE':
          actions.todo_toggle(payload);
          break;
      }
      break;
    case 'ERROR':
      break;
  }
}
