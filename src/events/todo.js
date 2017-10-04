import Fiber from 'fiber';
import Todo from 'domain/todo';

const TodoEvent = Fiber.defineEventType({
    todo: Todo
});

const AddTodo = Fiber.defineEventType({
    title: String
});


const TodoEvents = {};
TodoEvents.Add = Fiber.defineEvent(AddTodo, 'Todo:Add');
TodoEvents.Added = Fiber.defineEvent(TodoEvent, 'Todo:Added');

TodoEvents.Update = Fiber.defineEvent(TodoEvent, 'Todo:Update');
TodoEvents.Updated = (id) => Fiber.defineEvent(TodoEvent, `Todo:${id}:Updated`);

TodoEvents.Remove = Fiber.defineEvent(TodoEvent, 'Todo:Remove');
TodoEvents.Removed = Fiber.defineEvent(TodoEvent, 'Todo:Removed');


export default TodoEvents;
