import { Counter } from './Counter';
import { container } from './oem';
import { Todo } from './Todo';

const app = DIV.column(50).innerHtml(Counter, Todo);
container(app, 'body');
