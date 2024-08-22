import { useState } from 'react'
import './App.css'

function App() {

  type Task = {
    id: number,
    text: string,
    isDone: boolean
  };

  // State to store the current task
  const [newTask, setNewTask] = useState<string>('');

  // State to store the to-do list
  const [toDoList, setToDoList] = useState<Task[]>([
    { id: 1234, text: "Buy TV", isDone: false }
  ]);

  // To add a new task to the to-do list
  function addTask() {
    // Check if the input value is empty
    if (newTask.length === 0) return;

    const newTaskObject: Task = {
      id: Date.now(),           // A unique ID for the task, generated using the current timestamp
      text: newTask,            // The task description entered by the user
      isDone: false,       // The task is initially not completed
    };

    setToDoList([...toDoList, newTaskObject]);
    setNewTask(''); // Clear the input value after adding the task to to-do list
  };

  // To mark a task as done/undone
  function completeTask(id: number) {
    setToDoList(toDoList => {
      return toDoList.map(task => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });
    });
  }

  // To delete a task from the to-do list
  function deleteTask(id: number) {
    setToDoList(toDoList => {
      return toDoList.filter(task => task.id !== id);
    });
  }

  // To clear all completed tasks from the to-do list
  function clearCompletedTasks() {
    setToDoList(toDoList => {
      return toDoList.filter(task => !task.isDone)
    })
  }

  // Calculate the number of tasks left to do
  const remainingTasks = toDoList.filter(task => !task.isDone).length;

  return (
    <section className='container'>
      <section>
        <h2>Add Task here</h2>
        <section className='add-task'>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button className='add-btn' onClick={addTask}>Add Task</button>
        </section>
      </section>
      <section className='list-container'>
        <h2>Tasks list</h2>
        <section className='task-management'>
          <button
            className='clear-btn'
            title="Filter out completed tasks and see what's left."
            onClick={clearCompletedTasks}>
            Show Remaining Tasks
          </button>
          <p>The number of remaining tasks is: {remainingTasks}</p>
        </section>
        <ul>
          {toDoList.map((task) => (
            <li key={task.id}>
              <span className={task.isDone ? 'done' : ''}>{task.text}</span>
              <button className='done-btn' onClick={() => completeTask(task.id)}>
                {task.isDone ? 'Undo' : 'Done'}
              </button>
              <button className='delete-btn' onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App


