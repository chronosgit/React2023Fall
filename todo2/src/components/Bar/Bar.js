import { useState } from "react";
import { Input, Button, DatePicker } from 'antd';

const { TextArea } = Input;

function Bar(props) {
    const [task, setTask] = useState({
        name: "",
        task: "",
        deadline: ""
    });
    const centeringStyle = props.center ? {margin: "0 auto"} : {};

    function onInputChange(e) {
        setTask(previous => {
            return {
                ...previous,
                [e.target.name]: e.target.value
            }
        });
    }
    function onDeadlineChange(e) {
        const date = new Date(e.$D, e.$M, e.$y);
        setTask(previous => {
            return {
                ...previous,
                // deadline: date WHAT SHOULD I DO?????????
            }
        });
    }
    function clearInputs() {
        setTask(
            {
                name: "",
                task: "",
                deadline: ""
            }
        );
    }
    function addTask() {
        props.addTask({
            id: Math.floor(Math.random() * 100000), // dummy random id
            name: task.name,
            task: task.task,
            deadline: task.deadline
        });
        
        clearInputs();
    }
    function updateTask() {
        props.updateTask({
            name: task.name,
            task: task.task,
            deadline: task.deadline
        });

        clearInputs();
    }

    return (
        <div className="bar" style={centeringStyle}>
            <div className="barInput">
                <Input placeholder="Name" name="name" value={task.name} maxLength={30} onChange={onInputChange} style={{flex: 1}} />
                {task.name.length > 0 && <p className="textCount">{task.name.length} / 30</p>}
            </div>

            <div className="barInput">
                <TextArea rows={3} placeholder="Task" name="task" value={task.task} onChange={onInputChange} maxLength={300} autoSize style={{flex: 1}} />
                {task.task.length > 0 && <p className="textCount">{task.task.length} / 300</p>}
            </div>

            <div className="barInput">
                <DatePicker name="deadline" value={task.deadline} onChange={onDeadlineChange} />
                Deadline
            </div>

            {
                (task.name.length > 0 && task.task.length > 0) ? 
                <Button type="primary" onClick={props.addingBar ? addTask : updateTask}>{(props.addingBar ? "Submit" : "Update")}</Button> : 
                <Button type="primary" disabled style={{color: "white"}}>Write name and task</Button>
            }
        </div>
    );
}

export default Bar;