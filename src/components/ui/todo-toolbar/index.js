import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';

class TodoToolbarComponent extends Fiber.UIComponent {

    listen() {
        this.on(NameSpace.Todo).listen(
            Events.TodoList.ActiveCount, event => this.refreshCounter(event.activeCount),
        );
        this.ui('#filters').listen(
            'click', event => this.filterClick(event),
        );

        this.counter = this.view.querySelector('#todo-count strong');
    }

    filterClick(event) {
        event.preventDefault();
        let state = event.target.id.substring(7);
        state == 'all' && (state = null);
        this.on(NameSpace.Todo).triggerSync(
            new Events.TodoList.Request(state)
        );

        this.view.querySelector(`.selected`).className = '';
        event.target.className = 'selected';
    }

    refreshCounter(activeCount) {
        this.counter.textContent = activeCount;
    }
}

export default TodoToolbarComponent;
