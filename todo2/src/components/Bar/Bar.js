import { useState } from "react";

import { Input, Button } from "antd";

const { TextArea } = Input;

function Bar(props) {
    const [task, setTask] = useState({
        name: "",
        task: ""
    });

    const centeringStyle = props.center ? {margin: "0 auto"} : {};

    function onBarChange(e) {
        setTask(previous => {
            return {
                ...previous,
                [e.target.name]: e.target.value
            }
        });
    }

    function clearInputs() {
        setTask(previous => {
            return {
                name: "",
                task: ""
            }
        });
    }

    function addTask() {
        props.addTask({
            id: Math.floor(Math.random() * 100000), // dummy random id
            name: task.name,
            task: task.task
        });
        
        clearInputs();
    }

    function updateTask() {
        props.updateTask({
            name: task.name,
            task: task.task
        });

        clearInputs();
    }

    return (
        <div className="bar" style={centeringStyle}>
            <div className="barInput">
                <Input placeholder="Name" name="name" value={task.name} maxLength={30} onChange={onBarChange} style={{flex: 1}} />
                {task.name.length > 0 && <p className="textCount">{task.name.length} / 30</p>}
            </div>

            <div className="barInput">
                <TextArea rows={3} placeholder="Task" name="task" value={task.task} onChange={onBarChange} maxLength={300} autoSize style={{flex: 1}} />
                {task.task.length > 0 && <p className="textCount">{task.task.length} / 300</p>}
            </div>

            {   (props.addingBar) ?
                (
                    (task.name.length > 0 && task.task.length > 0) ? 
                    <Button type="primary" onClick={addTask}>Submit</Button> : 
                    <Button type="primary" disabled style={{color: "white"}}>Write name and task</Button>
                ) :
                (
                    (task.name.length > 0 && task.task.length > 0) ? 
                    <Button type="primary" onClick={updateTask}>Update</Button> : 
                    <Button type="primary" disabled style={{color: "white"}}>Write name and task</Button>
                )
            }
        </div>
    );
}

export default Bar;