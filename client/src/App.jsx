import { useState, useEffect } from 'react';
import './global.css'; 

const API_BASE_URL = 'http://localhost:3000/';

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos(); 

    console.log(todos);
  }, []);

  const getTodos = async () => {
    try {
      const response = await fetch(API_BASE_URL + "todos");
      if (response.ok) {
        const todosData = await response.json();
        setTodos(todosData);
      } else {
        console.log('HTTP-Error: ' + response.status);
      }
    } catch (error) {
      console.error('Unable to fetch todos', error);
    }
  }

  const completeTodo = async id => {
    try {
        const response = await fetch(API_BASE_URL + 'todos/complete/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedTodo = await response.json();

        setTodos(todos => todos.map(todo => {
            if (todo._id === updatedTodo._id) {
                return updatedTodo;
            }
            return todo;
        }));

    } catch (error) {
        console.error("A problem occurred when completing the todo:", error);
    }
}

const deleteTodo = async (event, id) => {
  event.stopPropagation(); 
  try {
      const response = await fetch(API_BASE_URL + 'todos/delete/' + id, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the state of todos after successful deletion
      setTodos(todos => todos.filter(todo => todo._id !== id));

  } catch (error) {
      console.error("A problem occurred when deleting the todo:", error);
  }
}

const addTodo = async () => {
  const todoData = { text: newTodo };
  if (!newTodo.trim()) { // if newTodo is empty or just whitespace
    return; // exit the function
  }

  try {
    const response = await fetch(API_BASE_URL + 'todos/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todoData)

    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newTodoItem = await response.json();

    setTodos([...todos, newTodoItem]); // Add the new todo to the current list of todos
    setNewTodo(""); // Clear the input field
    setPopupActive(false);

  } catch (error) {
    console.error("A problem occurred when adding the todo:", error);
  }
}





  return (
    <>
      <div className="App">
        <h1>Listy</h1>
        <h4>Your List </h4>
        <div className="todos">
        <div>
        {todos.map((todo) => (
  <div className={"todo" + (todo.completed ? " is-complete": "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
    <div className="checkbox"></div>
    <div className="text">{todo.text}</div>
    <div className="delete-todo" onClick={(event) => deleteTodo(event, todo._id)}>X</div>
  </div>
))}

    </div>
         
        </div>
        <div className="addPopup" onClick={() => setPopupActive(true)}>
          +
        </div>
        {popupActive ? (
          <div className="popup"><div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
          <div className="content">
            <h3> Add Task</h3>
            <input value ={newTodo} type="text" className='add-todo-input' onChange={(event) => setNewTodo(event.target.value)} />
          </div>
          <button className='button' onClick={addTodo}>Add Todo</button>




          </div>
        ): ''}
      </div>
    </>
  )
}
export default App
