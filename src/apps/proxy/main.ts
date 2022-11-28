import { Counter } from './Counter';
import { APP } from './oem';
import { Todo } from './Todo';

APP(DIV.column(50).append(Counter, Todo), 'body');
