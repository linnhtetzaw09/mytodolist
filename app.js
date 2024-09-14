//UI

const getform = document.getElementById('form');
const gettextbox = document.getElementById('textbox');
const getul = document.querySelector('.list-group');

getform.addEventListener('submit', (e) => {
    // console.log('hi');
    addnew();
    e.preventDefault();
});

// Retrieve todos from localStorage on page load
const getlocaldbs = JSON.parse(localStorage.getItem('todos'));

// Filter out todos that are marked as done and display the rest
if (getlocaldbs) {
    getlocaldbs
        .filter(getlocaldb => !getlocaldb.done) // Only keep those that are not completed
        .forEach(getlocaldb => addnew(getlocaldb));
}

function addnew(todo) {
    let todotext = gettextbox.value;

    if (todo) {
        todotext = todo.text;
    }

    if (todotext) {
        const newli = document.createElement('li');

        // Add the 'completed' class if the todo is marked as done (in case it's added in future)
        if (todo && todo.done) {
            newli.classList.add('completed');
        }

        newli.appendChild(document.createTextNode(todotext));
        getul.appendChild(newli);
        gettextbox.value = '';
        gettextbox.focus();

        // Add event listeners for click and context menu
        newli.addEventListener('click', function () {
            newli.classList.toggle('completed');
            updatelocalstorage();
        });

        newli.addEventListener('contextmenu', function (e) {
            newli.remove();
            updatelocalstorage();
            e.preventDefault();
        });

        // Update localStorage after new item is added
        updatelocalstorage();
    }
}

function updatelocalstorage() {
    const getalllis = document.querySelectorAll('li');
    const todos = [];

    getalllis.forEach(getalllis => {
        todos.push({
            text: getalllis.textContent,
            done: getalllis.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}


