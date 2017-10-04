import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';
import TodoItemComponent from 'components/ui/todo-item';

class TodoListComponent extends Fiber.UIComponent {
    listen() {
        this.on(NameSpace.Todo).listen(
            Events.Todo.Added, event => this.addTodo(event.todo),
            Events.Todo.Removed, event => this.removeTodo(event.todo),
            Events.TodoList.Ready, event => this.showTodoList(event.todos),
        );
    }

    addTodo(todo) {
        const todoComponent = new TodoItemComponent(todo);
        const newItem = document.createElement('li');
        newItem.id = `todo-${todo.id}`;
        newItem.appendChild(todoComponent.render());
        this.view.appendChild(newItem);
    }

    removeTodo(todo) {
        this.view.querySelector(`#todo-${todo.id}`).remove();
    }

    clearTodos() {
        this.view.innerHTML = "";
    }

    showTodoList(todos) {
        this.clearTodos();
        for(let todo of todos) {
            this.addTodo(todo);
        }
    }
}

export default TodoListComponent;
