import { useState } from 'react';

import Header from './components/Header/Header';
import Bar from './components/Bar/Bar';
import Footer from './components/Footer/Footer';
import Tasks from './components/Tasks/Tasks';

import './App.css';


function App() {
	const [tasks, setTasks] = useState([]);

	function addTask(newTask) {
		setTasks(previous => {
			return [...previous, newTask]
		});
	}

	function updateTask(newTaskBody, taskId) {
		setTasks(previous => {
			return previous.map(task => {
				if(task.id === taskId) {
					return {
						id: taskId,
						name: newTaskBody.name,
						task: newTaskBody.task,
						deadline: newTaskBody.deadline
					};
				} else {
					return task;
				}
			});
		})
	}

	function deleteTask(taskId) {
		setTasks(previous => {
			return previous.filter(task => {
				if(task.id !== taskId) {
					return true;
				} else {
					return false;
				}
			});
		});
	}

	return (
		<div className="App">
			<Header />
			<Bar addTask={addTask} addingBar center />
			<Tasks tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
			<Footer />
		</div>
	);
}

export default App;