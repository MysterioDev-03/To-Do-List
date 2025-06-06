import React, { useState } from 'react';
import noTasksImage from './assets/notasksimage.png';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);

  const handleSubmit = (e) => {
  e.preventDefault();
  if (inputText.trim() === '') return;

  setTasks(prevTasks => {
    const hasChecked = prevTasks.some(task => task.checked);

    if (hasChecked) {
      return prevTasks.map(task =>
        task.checked ? { ...task, text: inputText } : task
      );
    } else {
      setCount(prevCount => prevCount + 1);
      return [...prevTasks, { id: count, text: inputText, checked: false }];
    }
  });

  setInputText('');
};


  const handleCheck = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleDelete = () => {
    setTasks(prev => prev.filter(task => !task.checked));
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">To-Do List</h1>
        <button className="delete-btn" onClick={handleDelete}>Delete Selected</button>
      </header>

      <main className="task-list">
        {tasks.length === 0 ? (
          <img className="no-tasks" src={noTasksImage} alt="No tasks available" />
        ) : (
          tasks.map(({ id, text, checked }) => (
            <div
              className={`task-item ${checked ? 'checked' : ''}`}
              key={id}
              onClick={() => handleCheck(id)}
            >
              <input
                type="checkbox"
                id={`task-${id}`}
                checked={checked}
                readOnly
              />
              <label  htmlFor={`task-${id}`}>{text}</label>
            </div>
          ))
        )}
      </main>

      <form className="input-form" onSubmit={handleSubmit}>
        <div className="inner">
          <input
            className="task-input"
            type="text"
            placeholder="Type here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="add-btn" type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default App;
