import { useState } from "react";
import { Button } from "antd";

import Bar from "../Bar/Bar";

function Task(props) {
    const [isEditable, setIsEditable] = useState(false);

    function toggleEditing() {
        setIsEditable(previous => {
            return !previous;
        });
    }

    function updateTask(updatedTaskBody) {
        toggleEditing();

        props.updateTask(updatedTaskBody, props.task.id);
    }

    function deleteTask() {
        props.deleteTask(props.task.id);
    }

    return (
        <div className="task">
            <h2 className="taskTitle">{props.task.name}</h2>
            <p className="taskContent">{props.task.task}</p>
            <p className="taskContent" style={{color: "red"}}>{props.task.deadline}</p>
            <div className="btns">
                <Button size="small" style={{border: "none", backgroundColor: "green", color: "white"}} onClick={toggleEditing}>Edit</Button>
                <Button type="primary" size="small" danger onClick={deleteTask}>Delete</Button>
            </div>
            {isEditable && <Bar updateTask={updateTask} /> }
        </div>
    );
}

export default Task;