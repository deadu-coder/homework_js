(function () { // лишаем доступа из браузера к глобальным 
    const todoList = document.getElementById('todo-list');
    const userSelect = document.getElementById('user-todo');
    const form = document.querySelector('form');
    let users = [];
    let todos = [];

    document.addEventListener('DOMContentLoaded', init);
    form.addEventListener('submit', handleSubmit)

    //Получение имени пользователя
    function getUserName(userId) {
        const user = users.find(u => u.id === userId);
        return user.name;
    }
    //Печать на странице данных
    function printList({ id, userId, title, completed }) {

        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = id;
        li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(userId)}</b></span>`;

        const status = document.createElement('input');
        status.type = 'checkbox';
        status.checked = completed;
        status.addEventListener('change', handleTodoChange);

        const close = document.createElement('span');
        close.innerHTML = '&times;';
        close.className = 'close';
        close.addEventListener('click', handleTodoClose);

        li.prepend(status);
        li.append(close);
        todoList.prepend(li);
    }

    function createUserOp(user) {
        const op = document.createElement('option');
        op.value = user.id;
        op.innerText = user.name;
        userSelect.append(op);
    }
    function removeTodo(todoId) {
        todos = todos.filter(todo => todo.id !== todoId);
        const todo = todoList.querySelector(`[data-id="${todoId}"]`);
        todo.querySelector('input').removeEventListener('change', handleTodoChange);
        todo.querySelector('.close').removeEventListener('click', handleTodoClose);

        todo.remove();
    }
    //Для отладки
    function errorAlert(error) {
        alert(error.message);
    }
    //Иницилизация
    function init() {

        Promise.all([getTodoList(), getUsers()]).then(values => {

            [todos, users] = values;
            todos.forEach((todo) => printList(todo));
            users.forEach((user) => createUserOp(user));

        })
    }
    //Обработчик отправка данных
    function handleSubmit(event) {
        event.preventDefault();

        createTodo({
            userId: Number(form.user.value),
            title: form.todo.value,
            completed: false,
        })
    }
    //Обработчик измененить чекбокс
    function handleTodoChange() {
        const todoId = this.parentElement.dataset.id;
        const completed = this.checked;
        toggleTodoComplete(todoId, completed);
    }
    //Обработчик закрытия задачи
    function handleTodoClose() {
        const todoId = this.parentElement.dataset.id;
        deleteTodo(todoId);
    }
    // Получение данных о задачах
    async function getTodoList() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            return data;
        } catch (error) {
            errorAlert(error);
        }

    }
    //Получение данных о пользователях
    async function getUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            return data;
        } catch (error) {
            errorAlert(error);
        }

    }
    //Создание новой задачи
    async function createTodo(todo) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const newTodo = await response.json();
            printList(newTodo);
        } catch (error) {
            errorAlert(error);
        }

    }
    //Изменить статус задачи
    async function toggleTodoComplete(todoId, completed) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: 'PATCH',
                body: JSON.stringify({ completed }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                //Error
                throw new Error('falied on server');
            }
        } catch (error) {
            errorAlert(error);
        }

    }
    //Удаление задачи
    async function deleteTodo(todoId) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                //Remove todo
                removeTodo(todoId);
            } else {
                throw new Error('falied on server');
            }
        } catch (error) {
            errorAlert(error);
        }

    }
}())


