import Fiber from 'fiber';
import { Optional } from 'fiber/domain';

const TodoList = Fiber.defineEventType({
    todos: Array
});

const TodoListRequest = Fiber.defineEventType({
    state: Optional(String)
});

const ActiveCount = Fiber.defineEventType({
    activeCount: Number
});

TodoList.Filter = Fiber.defineEvent(TodoListRequest, 'TodoList:Filter');
TodoList.Request = Fiber.defineEvent(TodoListRequest, 'TodoList:Request');
TodoList.Ready = Fiber.defineEvent(TodoList, 'TodoList:Ready');
TodoList.ActiveCount = Fiber.defineEvent(ActiveCount, 'TodoList:ActiveCount');

export default TodoList;
