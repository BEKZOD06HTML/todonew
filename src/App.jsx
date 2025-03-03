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
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdateTodo = () => {
    if (number.trim() && email.trim() && firstName.trim() && lastName.trim()) {
      if (editingId) {
        dispatch(updateTodo({ id: editingId, newText: { number, email, firstName, lastName } }));
        setEditingId(null);
      } else {
        dispatch(addTodo({ id: Date.now(), number, email, firstName, lastName }));
      }
      setNumber('');
      setEmail('');
      setFirstName('');
      setLastName('');
    }
  };

  const handleEditTodo = (todo) => {
    setEditingId(todo.id);
    setFirstName(todo.firstName);
    setLastName(todo.lastName);
    setNumber(todo.number);
    setEmail(todo.email);
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
          type="number"
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

        <button onClick={handleAddOrUpdateTodo}>{editingId ? "Saqlash" : "Qo'shish"}</button>
      </div>

      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div>
              <img src="./assets/icon/icon.png" alt="" />
              <p><strong>Ism:</strong> {todo.firstName}</p>
              <p><strong>Familiya:</strong> {todo.lastName}</p>
              <p><strong>Raqam:</strong> {todo.number}</p>
              <p><strong>Email:</strong> {todo.email}</p>
            </div>
            <div>
              <button onClick={() => handleEditTodo(todo)}>Yangilash</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>O'chirish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
