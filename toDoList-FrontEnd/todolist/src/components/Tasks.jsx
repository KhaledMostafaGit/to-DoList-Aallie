import React, { useState, useEffect } from "react";
import { getTasks, deleteTask, updateTask,createTask } from "../api/TaskAPI";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTaskName, setupdatedTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    const newTask = { name: newTaskName ,is_Completed: false };
    const createdTask = await createTask(newTask);
    setTasks([...tasks, createdTask]);
    setNewTaskName("");
  }
  const handleStatusChange = async (task,status) => {
    setTaskStatus(status);
    const updatedTasks = tasks.map(curtask => curtask.id === task.id ? { ...curtask, is_Completed: status } : curtask );
    setTasks(updatedTasks);
    await updateTask(task.id, {name:task.name,is_completed:status});
    setTaskStatus(false);
  }

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setupdatedTaskName(task.name);
    setTaskStatus(task.is_Completed);
  };

  const handleUpdate = async (taskId) => {
    await updateTask(taskId, {name:updatedTaskName,is_completed:taskStatus});
    setTasks(tasks.map(task => task.id === taskId ? { ...task, name: updatedTaskName } : task));
    setEditingTaskId(null);
    setupdatedTaskName("");
    setTaskStatus(false);
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <div className="addTask list-group-item d-flex flex-column justify-content-center mb-3 ">
            <input className="addTaskInputField form-control mb-2" onChange={(e)=>{setNewTaskName(e.target.value)}} type="text" placeholder="Add Task" />
            <button className="addTaskBtn btn btn-primary" onClick={()=>{handleAddTask()}}>Add Task</button>
        </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li className="list-group-item  d-flex flex-row justify-content-between" key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input className="taskTextField my-auto" type="text" value={updatedTaskName} onChange={(e) => setupdatedTaskName(e.target.value)}
                />
                <div className="taskButtons">
                <button className="confirmEditBtn btn btn-success mx-1" onClick={() => handleUpdate(task.id)}>Confirm</button>
                <button className="cancelEditBtn btn btn-danger mx-1" onClick={() => setEditingTaskId(null)}>Cancel</button>
                <input type="checkbox" className="isCompletedCheckBox btn-check" id={task.id} onChange={(e)=>{handleStatusChange(task,e.target.checked)}} autoComplete="off" defaultChecked={task.is_Completed}/> 
                 <label className="btn btn-outline-success" htmlFor={task.id}>Done</label> 
                </div>
              </>
            ) : (
              <>
                <span className="taskTextField my-auto"  onClick={() => handleEditClick(task)}>{task.name}</span>
                <div className="taskButtons">
                <button className="editBtn btn btn-secondary me-1" onClick={() => handleEditClick(task)}>Edit</button>
                <button className="deleteBtn btn btn-danger me-1" onClick={() => handleDelete(task.id)}>delete</button>
                 <input type="checkbox" className="isCompletedCheckBox btn-check" id={task.id} onChange={(e)=>{handleStatusChange(task,e.target.checked)}} autoComplete="off" defaultChecked={task.is_Completed}/> 
                 <label className="btn btn-outline-success" htmlFor={task.id}>Done</label> 
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;