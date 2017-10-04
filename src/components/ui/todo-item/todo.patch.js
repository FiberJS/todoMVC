import marked from 'marked';

const todoPatch = (view) => {
    return {
        title : (title) => {
            view.$.label.innerHTML = marked(title).replace(/<p>|<\/p>/g,'');
            view.$.editor.value = title;
        },
        state : (state, todo) => {
            view.className = state;
            view.$.toggle.checked = todo.completed;
        }
    };
};
export default todoPatch;
