import Fiber from 'fiber';
import NameSpace from 'namespace';
import TodoComponent from 'components/data/todo';
import TodoListComponent from 'components/ui/todo-list';
import NewTodoComponent from 'components/ui/new-todo';
import TodoToolbarComponent from 'components/ui/todo-toolbar';

// Debugger
// Fiber.Debugger.showEvents = true;
// Fiber.Debugger.showView = true;
// Fiber.Debugger.init();

Fiber.app(() => {
    // data components
    TodoComponent.attachTo(NameSpace.Todo);

    // ui components
    NewTodoComponent.attachTo('#new-todo');
    TodoListComponent.attachTo('#todo-list');
    TodoToolbarComponent.attachTo('#footer');
});

// for debugging
window.Fiber = Fiber;
