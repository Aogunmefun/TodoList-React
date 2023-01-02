import React from "react";

import "./TodoItem.css";

class TodoItem extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      value : this.props.todo.title
    }
    console.log("state", this.state)
  }

  handleChange = (e)=>{
    this.setState({value:e.target.value})
  }

  render() {
    const { id, title } = this.props.todo;
    const { onDelete } = this.props;

    
    

    

    return (
      <li className="todoitem" >
        <div className="title" >
          {this.props.edit?<input type="text" placeholder={this.state.value} value={this.state.value} onChange={this.handleChange} />:<div onClick={()=>{this.props.onClick(id)}}>{title}</div>}
        </div>
        <div className="buttons">
          {this.props.edit?
            <button className="btn btn--edit" onClick={() => this.props.onConfirm(id, this.state.value)}>
            Submit
          </button>
          :<button className="btn btn--edit" onClick={() => this.props.onEdit(id)}>
            Edit
          </button>}
          <button className="btn btn--delete" onClick={() => onDelete(id)}>
            delete
          </button>
        </div>
        
        
      </li>
    );
  }
}
// id, title, completed, delete button

export default TodoItem;
