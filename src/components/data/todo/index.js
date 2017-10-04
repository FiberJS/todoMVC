import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import Todo from 'domain/todo';

const TODOS_KEY = 'TodoMVC-todos';

class TodoComponent extends Fiber.DataComponent {

    init() {
        this.todos = new Map();
        this._id = 0;
    }

    listen() {
        this.on(NameSpace.Todo).listen(
            Events.Todo.Add, event => this.add(event.title),
            Events.Todo.Update, event => this.update(event.todo),
            Events.Todo.Remove, event => this.remove(event.todo),
            Events.TodoList.Request, event => this.prepareList(event)
        );
    }

    add(title) {
        const item = new Todo({
            title : title,
            id    : ++this._id
        });

        this.todos.set(item.id, item);

        this.on(NameSpace.Todo).triggerSync(new Events.Todo.Added(item));
        this.on(NameSpace.Todo).triggerSync(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    update(todo) {
        const item = new Todo(todo);
        this.todos.set(item.id, item);
        const UpdateEvent = Events.Todo.Updated(item.id);
        this.on(NameSpace.Todo).triggerSync(new UpdateEvent(item));
        this.on(NameSpace.Todo).triggerSync(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    remove(todo) {
        const item = new Todo(todo);
        this.todos.delete(todo.id);
        this.on(NameSpace.Todo).triggerSync(new Events.Todo.Removed(item));
        this.on(NameSpace.Todo).triggerSync(new Events.TodoList.ActiveCount(this.activeCount()));
    }

    prepareList(requestEvent) {
        const list = [];

        for(let [k, todo] of this.todos.entries()) {
            if(!requestEvent.state || todo.state == requestEvent.state) {
                list.push(new Todo(todo));
            }
        }

        this.on(NameSpace.Todo).triggerSync(new Events.TodoList.Ready(list));
    }

    activeCount() {
        let activeCount = 0;
        for(let [k, todo] of this.todos.entries()) {
            if(todo.state == Todo.Active) {
                ++activeCount;
            }
        }
        return activeCount;
    }
}

export default TodoComponent;
