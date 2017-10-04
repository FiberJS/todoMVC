import Fiber from 'fiber';
import NameSpace from 'namespace';
import Events from 'events';

const ENTER = 13;

class NewTodoComponent extends Fiber.UIComponent {

    listen() {
        this.ui(this.view).listen(
            'keypress', event => this.onKeyPress(event),
        );
    }

    onKeyPress(event) {
        const code = event.charCode || event.keyCode;
        if(code == ENTER && this.view.value.length) {
            this.on(NameSpace.Todo).triggerSync(
                new Events.Todo.Add(this.view.value)
            );
            this.view.value = "";
        }
    }
}

export default NewTodoComponent;
