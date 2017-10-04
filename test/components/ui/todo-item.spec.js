import TodoItemComponent from 'components/ui/todo-item';
import Todo from 'domain/todo';
import NameSpace from 'namespace';
import Events from 'events';

describe('TodoItemComponent', () => {

    it("should listen for Events.Todo.Updated and update the view", () => {
        const titleBefore = 'before Events.Todo.Updated';
        const titleAfter = 'after Events.Todo.Updated';
        const todo = aTodo(titleBefore);
        const component = new TodoItemComponent(todo);

        const view = component.render();

        expect(view.$.editor.value).be.equal(titleBefore);

        todo.title = titleAfter;
        expect(view.$.editor.value).be.equal(titleBefore);

        const UpdateEvent = Events.Todo.Updated(todo.id);
        component.on(NameSpace.Todo).triggerSync(new UpdateEvent(todo));

        expect(view.$.editor.value).be.equal(titleAfter);
    });

    it("should set to edit mode when double clicking the label", () => {
        const component = new TodoItemComponent(aTodo());

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
