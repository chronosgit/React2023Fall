import Task from "../Task/Task";

function Tasks(props) {
    return (
        <div className="tasks">
            {props.tasks.length === 0 && <p className="tasksError">No tasks have been yet added...</p>}
            {props.tasks.map((task, index) => {
                return <Task key={index} task={task} updateTask={props.updateTask} deleteTask={props.deleteTask} />
            })}
        </div>
    );
}

export default Tasks;