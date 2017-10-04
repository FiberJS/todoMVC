import TodoListComponent from 'components/ui/todo-list';
import Todo from 'domain/todo';
import NameSpace from 'namespace';
import Events from 'events';

// $() should be an easy test solution to return eventPools and elements

describe('TodoListComponent', () => {
    const view = document.createElement('ul');
    const component = TodoListComponent.attachTo(view);

    beforeEach(() => {
        component.clearTodos();
    });

    it("should add a new todo on Todo:Added", () => {
        expect(view.querySelectorAll('li todo').length).to.equal(0);

        for(let i = 1; i < 10; i++) {
            component.on(NameSpace.Todo).triggerSync(new Events.Todo.Added(aTodo()));
            expect(view.querySelectorAll('li todo').length).to.equal(i);
        }
    });

    it("should remove todo on Todo:Removed", () => {
        const firstTodo = aTodo('todo-1', Todo.Active, 1);
        component.on(NameSpace.Todo).triggerSync(
            new Events.Todo.Added(firstTodo)
        );
        component.on(NameSpace.Todo).triggerSync(
            new Events.Todo.Added(aTodo())
        );
        expect(view.querySelectorAll('li').length).to.equal(2);

        component.on(NameSpace.Todo).triggerSync(new Events.Todo.Removed(firstTodo));
        expect(view.querySelectorAll('li').length).to.equal(1);
    });

    it("should render the new list on TodoList:Ready event", () => {
        const todo = aTodo();
        component.on(NameSpace.Todo).triggerSync(new Events.Todo.Added(todo));

        expect(view.querySelectorAll('li todo').length).to.equal(1);

        const todos = [ aTodo(), aTodo(), aTodo() ];
        component.on(NameSpace.Todo).triggerSync(new Events.TodoList.Ready(todos));

        expect(view.querySelectorAll('li todo').length).to.equal(todos.length);
    });
});

let __id = 1;
function aTodo(title, state, id) {
    return new Todo({
        title : title || "todo",
        state : state || Todo.Active,
        id : id || ++__id,
    });
}
