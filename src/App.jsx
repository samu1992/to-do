import React, { useState } from 'react';
//import Swal from 'sweetalert2';
import './App.css';
import { AiFillDelete } from "react-icons/ai";


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskClasses, setTaskClasses] = useState({});
  const [taskVisibility, setTaskVisibility] = useState({});

  const addTask = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.taskInput.value;
    const newId = tasks.length + 1;
    const newTask = { id: newId, text: inputValue };
    setTasks([...tasks, newTask]);
    setTaskClasses({ ...taskClasses, [newId]: 'li_on' });
    setTaskVisibility({ ...taskVisibility, [newId]: false }); // Agregar visibilidad inicial como false
    event.target.elements.taskInput.value = '';
    /*     Swal.fire({
          title: 'Success!',
          text: `Task (${newTask.text}) added!`,
          icon: 'success',
          confirmButtonText: 'Cool'
        }); */
  };

  const handleTaskClick = (taskId) => {
    const updatedClasses = { ...taskClasses };
    if (updatedClasses[taskId] === 'li_on') {
      updatedClasses[taskId] = 'li_off';
    } else {
      updatedClasses[taskId] = 'li_on';
    }
    setTaskClasses(updatedClasses);
  };

  const handleCheckClick = (taskId) => {
    const updatedVisibility = { ...taskVisibility };
    updatedVisibility[taskId] = !updatedVisibility[taskId]; // Invertir el estado de visibilidad
    setTaskVisibility(updatedVisibility);
  };
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    const updatedClasses = { ...taskClasses };
    delete updatedClasses[taskId];
    setTaskClasses(updatedClasses);
    const updatedVisibility = { ...taskVisibility };
    delete updatedVisibility[taskId];
    setTaskVisibility(updatedVisibility);
  };
  

  return (
    <main className='container_app'>
      <h1>ToDo List</h1>
      <div className='container_to-do'>
        <section className='form'>
          <form onSubmit={addTask}>
            <input type='text' name='taskInput' placeholder='Add a new task' required />
            <button type='submit'>+</button>
          </form>
        </section>
        <section className='list'>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={taskClasses[task.id]}
                onClick={() => handleTaskClick(task.id)}
              >
                - {task.text}{' '}
                <div className='check'>
                  <AiFillDelete
                    onClick={() => deleteTask(task.id)}
                    className='delete'
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default App;