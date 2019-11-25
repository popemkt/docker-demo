//Note
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DynamodbService from "./dynamoService.js";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []  
    };
  }
  async componentDidMount(){
    let tasks = await DynamodbService.GetAllTasks();
    if(tasks.Count > 0){
      this.setState({
        tasks: tasks.Items
      })
    }
  }
  async AddTaskAction() {
    let tasks = this.state.tasks;
    let taskName = prompt("Input Task:");
    if (!taskName) {
      return;
    }
    let current_datetime = new Date();
    let task = {
      id: current_datetime.getTime().toString(),
      name: taskName,
      isdone: false,
      createdate:  current_datetime.getFullYear() +
      "/" +
      (current_datetime.getMonth() + 1) +
      "/" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds(),

    };
    await DynamodbService.SaveTasks(task);
    this.setState({
      tasks: tasks.concat(task)
    });
  }
  async CheckAction(id) {
    var tasks = this.state.tasks;
    var index = tasks.findIndex(task => task.id === id);
    var task = tasks[index];
    task.isDone = !task.isDone;
    await DynamodbService.SaveTasks(task);
    this.setState({
      tasks: tasks
    });
  }
  async EditAction(id) {
    var tasks = this.state.tasks;
    var index = tasks.findIndex(task => task.id === id);
    var task = tasks[index];
    var taskName = prompt("Edit Task:", task.name);
    if (taskName) {
      task.name = taskName;
      await DynamodbService.SaveTasks(task);
    }
    this.setState({
      tasks: tasks
    });
  }
  async DeleteAction(id) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure?")) {
      var tasks = this.state.tasks;
      var index = tasks.findIndex(task => task.id === id);
      await DynamodbService.DeleteTasks(id);
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
    }
  }
  render() {
    var tasks = this.state.tasks;
    tasks = tasks.map(task => (
      <Task
        key={task.id}
        task={task}
        onCheck={() => this.CheckAction(task.id)}
        onEdit={() => this.EditAction(task.id)}
        onDelete={() => this.DeleteAction(task.id)}
      />
    ));
    return (
      <div className="note">
        <div className="title">{this.props.title}</div>
        <div className="task-list">{tasks}</div>
        <div className="js-action-group">
          <ActionButton onClick={() => this.AddTaskAction()} />
        </div>
      </div>
    );
  }
}
class Task extends React.Component {
  render() {
    let task = this.props.task;
    var isTaskDone = task.isDone ? "done" : "";
    return (
      <label className="task">
        <input
          type="checkbox"
          onChange={() => this.props.onCheck()}
          defaultChecked={task.isDone}
        />
        <span className={isTaskDone}>{task.name}</span>
        <a href="#edit" onClick={() => this.props.onEdit()}>
          Edit
        </a>{" "}
        |{" "}
        <a href="#remove" onClick={() => this.props.onDelete()}>
          Delete
        </a>
      </label>
    );
  }
}
class ActionButton extends React.Component {
  render() {
    return (
      <button
        className="js-action-addtask"
        onClick={() => this.props.onClick()}
      >
        Add Task
      </button>
    );
  }
}
var config = {
  title: "Todo list",
  maxItemPerPage: 6
};
//render
ReactDOM.render(<Note title={config.title} />, document.getElementById("root"));
