import * as todoController from '../controllers/todo.controller';
import Router from 'express';
import auth from '../middlewares/auth.middleware';

const Todorouter = Router();

Todorouter.get('/', auth, todoController.getAllTodos);
Todorouter.get('/:userId', auth, todoController.getTodoByUserId);
Todorouter.get('/:todoName', auth, todoController.getTodoByTodoName);
Todorouter.post('/create', auth, todoController.createTodo);
Todorouter.put('/:id', auth, todoController.updateTodo);
Todorouter.delete('/:id', auth, todoController.deleteTodo);

export default Todorouter;