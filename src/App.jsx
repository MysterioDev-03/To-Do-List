import React, { useState } from 'react';
import noTasksImage from './assets/notasksimage.png';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    setTasks(prevTasks => {
      const newTask = { id: count, text: inputText, checked: false };
      setCount(prevCount => prevCount + 1);
      return [...prevTasks, newTask];
    });
    setInputText('');
  };

  const handleCheck = (id) => {
    if (isEditing !== null) return;
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    ));
  };

  const handleEdit = (id, text) => {
    setIsEditing(id);
    setEditText(text);
  };

  const handleEditSubmit = (id) => {
    if (editText.trim() === '') return;
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, text: editText } : task
    ));
    setIsEditing(null);
    setEditText('');
  };

  const handleDelete = () => {
    const selectedCount = tasks.filter(task => task.checked).length;
    if (selectedCount === 0) {
      alert("No tasks selected to delete.");
      return;
    }
    setShowModal(true);
  };

  const confirmDelete = () => {
    setTasks(prev => prev.filter(task => !task.checked));
    setShowModal(false);
  };

  const cancelDelete = () => setShowModal(false);

  const incompleteTasks = tasks.filter(task => !task.checked);
  const completedTasks = tasks.filter(task => task.checked);

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
          <>
            {completedTasks.length > 0 && (
              <div className="completed-section">
                <div
                  className="completed-header"
                  onClick={() => setShowCompleted(prev => !prev)}
                >
                  <strong>Completed ({completedTasks.length})</strong>
                  <span>{showCompleted ? '▼' : '▶'}</span>
                </div>
                {showCompleted && completedTasks.map(({ id, text, checked }) => (
                  <div className="task-item checked" key={id}>
                    <input
                      type="checkbox"
                      id={`task-${id}`}
                      checked={checked}
                      onChange={() => handleCheck(id)}
                    />
                    <label htmlFor={`task-${id}`}>{text}</label>
                  </div>
                ))}
              </div>
            )}
            {incompleteTasks.map(({ id, text, checked }) => (
              <div className={`task-item ${checked ? 'checked' : ''}`} key={id}>
                <input
                  type="checkbox"
                  id={`task-${id}`}
                  checked={checked}
                  onChange={() => handleCheck(id)}
                />
                {isEditing === id ? (
                  <input
                    type="text"
                    className="edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => handleEditSubmit(id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit(id)}
                    autoFocus
                  />
                ) : (
                  <>
                    <label htmlFor={`task-${id}`}>{text}</label>
                    <button className="edit-btn" onClick={() => handleEdit(id, text)}>✏️</button>
                  </>
                )}
              </div>
            ))}


          </>
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>This will permanently delete {tasks.filter(task => task.checked).length} task{tasks.filter(task => task.checked).length > 1 ? 's' : ''}. Are you sure?</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete}>OK</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
