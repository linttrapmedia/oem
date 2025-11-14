export type TodoType = {
  title: string;
  completed: boolean;
};

export type ActionTypes = ['ADD'] | ['DELETE', TodoType] | ['TOGGLE', TodoType];
