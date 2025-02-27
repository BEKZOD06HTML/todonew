import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from './slices/todosSlice';
import { useState } from 'react';
import './App.css';

const App = () => {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleAddTodo = () => {
    if (number.trim() && email.trim() && firstName.trim() && lastName.trim()) {
      dispatch(addTodo({ id: Date.now(), number, email, firstName, lastName }));
      setNumber('');
      setEmail('');
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div className="app-container">
      <div className="todo-form">
      <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="Ism kiriting"
        />
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Familiya kiriting"
        />
        <input
          type="nombers"
          value={number}
          onChange={e => setNumber(e.target.value)}
          placeholder="Raqam kiriting"
        />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email kiriting"
        />
      
        <button onClick={handleAddTodo}>Qo'shish</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div>
              <p><strong>Ism:</strong> {todo.firstName}</p>
              <p><strong>Familiya:</strong> {todo.lastName}</p>
              <p><strong>Raqam:</strong> {todo.number}</p>
              <p><strong>Email:</strong> {todo.email}</p>
            </div>
            <div>
              <button onClick={() => dispatch(updateTodo({ id: todo.id, newText: 'Yangilangan' }))}>Update</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;