// Entities
export type TodoType = {
  title: string;
  completed: boolean;
};

export type ActionTypes =
  | {
      type: 'ADD';
    }
  | {
      type: 'DELETE';
      todo: TodoType;
    }
  | {
      type: 'TOGGLE';
      todo: TodoType;
    };
