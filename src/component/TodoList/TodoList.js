import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { getTodos, addTodo, removeTodo, patchTodo } from "../../apis/TodoApis";

import "./TodoList.css";

class TodoList extends React.Component {
  state = {
    todos: [],
    inputText: "",
  };

  handleInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputText.trim() === "") {
      return;
    } else {
      const newTodo = {
        title: this.state.inputText,
        completed: false,
        edit:false
      };

      addTodo(newTodo).then((todo) => {
        this.setState({
          todos: [todo, ...this.state.todos],
          inputText: "",
        });
      });
    }
  };

  handleDelete = (id) => {
    removeTodo(id).then(() => {
      this.setState({
        todos: this.state.todos.filter((todo) => id !== todo.id),
      });
    });
  };

  handleCompleted = (id) =>{
    patchTodo(id, {"completed": "true"})
    .then((data)=>{
      console.log(data)
      this.setState({
        todos: this.state.todos.map((todo)=>id==todo.id?data:todo)
      })
    })
  }

  handlePending = (id) =>{
    patchTodo(id, {"completed": false})
    .then((data)=>{
      console.log(data)
      this.setState({
        todos: this.state.todos.map((todo)=>id==todo.id?data:todo)
      })
    })
  }

  handleEdit = (id) =>{
    patchTodo(id, {"edit": true})
    .then((data)=>{
      console.log(data)
      this.setState({
        todos: this.state.todos.map((todo)=>id==todo.id?data:todo)
      })
    })
  }

  handleConfirm = (id, value)=>{
    patchTodo(id, {"edit": false, "title":value})
    .then((data)=>{
      console.log(data)
      this.setState({
        todos: this.state.todos.map((todo)=>id==todo.id?data:todo)
      })
    })
  }

  render() {
    return (
      <section className="todolist">
        <header className="todolist__header">
          <h4>Todo List</h4>
        </header>
        <form className="todolist__form">
          <input
            type="text"
            className="todolist__input"
            onChange={this.handleInputChange}
            value={this.state.inputText}
          />
          <button className="btn btn--primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
        <ul className="todolist__pending">
          <p>Pending Tasks</p>
          {this.state.todos.map((todo) => {
            return !todo.completed?<TodoItem key={todo.id} todo={todo} 
            onDelete={this.handleDelete} 
            onClick={this.handleCompleted}
            onEdit={this.handleEdit}
            onConfirm={this.handleConfirm}
            edit = {todo.edit}
             />:""
          })}
        </ul>
        <ul className="todolist__completed">
          <p>Completed Tasks</p>
          {this.state.todos.map((todo) => {
            return todo.completed? <TodoItem key={todo.id} todo={todo} 
            onDelete={this.handleDelete} 
            onClick={this.handlePending} 
            onEdit={this.handleEdit}
            onConfirm={this.handleConfirm}
            edit = {todo.edit}
            />:""
          })}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    getTodos().then((data) => {
      console.log(data);
      this.setState({
        todos: data.sort((a,b)=>b.id-a.id),
      });
    });
  }
}

export default TodoList;
