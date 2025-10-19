export type TodoType = {
  title: string;
  completed: boolean;
};

export type TODO_ADD_ACTION = ['TODO:ADD'];
export type TODO_DELETE_ACTION = ['TODO:DELETE', TodoType];
export type TODO_INPUT_ACTION = ['TODO:INPUT', string];
export type TODO_TOGGLE_ACTION = ['TODO:TOGGLE', TodoType];
export type ACTIONS = TODO_INPUT_ACTION | TODO_ADD_ACTION | TODO_DELETE_ACTION | TODO_TOGGLE_ACTION;
export type FSMstate = 'READY' | 'ERROR';
