import React, { useState, useEffect } from "react";
import "./App.css";
import "./custom.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const handleDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    setShowAlert(true);

    // Hide the alert after 2 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleEdit = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = newText;
    setTasks(updatedTasks);
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div className="App container mt-4">
      <h1 className="text-center mb-4">To-Do List</h1>
      {showAlert && (
        <div className="alert alert-success" role="alert">
          Task completed!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a task..."
            value={task}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
      {tasks.length === 0 ? (
        <p className="text-center text-muted">No tasks added yet.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.completed ? "completed" : ""
              }`}
            >
              <div className="task-info">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleComplete(index)}
                />
                <span
                  className="task-text ml-2"
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              </div>
              <div className="task-actions">
                <span
                  className="edit-btn"
                  onClick={() => {
                    const newText = prompt("Edit task:", task.text);
                    if (newText !== null) {
                      handleEdit(index, newText);
                    }
                  }}
                >
                  &#9998;
                </span>
                <span
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  &#10006;
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {tasks.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={handleClearAll}>
            Clear All Tasks
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
