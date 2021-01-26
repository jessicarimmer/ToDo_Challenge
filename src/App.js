import './App.css';
import { render } from '@testing-library/react';
import React from 'react'


class App extends React.Component {
  state={
    toDos: [],
    inputText: "",
  }

  handleChange=(event) => {
    this.setState({inputText: event.target.value})
  }

  handleSubmit=(event) => {
    event.preventDefault();
    if (this.state.inputText != "") {
      this.setState({
        toDos: [...this.state.toDos,this.state.inputText],
        inputText: "",
      });
    }
  };
  
  handleMouseClick = (number, index) =>{
    this.setState({
      toDos : this.state.toDos.map((toDo, index2)=>{
        if (index2 === index) {
          return `${toDo}`
        } else {return toDo}
      }),
    
    })
    {document.getElementById(`${index}`).style.textDecoration = "line-through";}
  }
  handleShowDelete = (index) =>{
      document.getElementById(`${(index + 1)*100}`).style.display = "flex";
    }
  
  handleNotShowDelete = (index) =>{
    document.getElementById(`${(index + 1)*100}`).style.display = "none";
  }

  handleDelete = (index) => {
    this.setState({
      toDos : this.state.toDos.filter((toDo, index2)=>{ 
        if(index2 !== index) {return toDo} 
      }), 
    })
  }

  render() {
    return (
      <div className="container">
        <h1>To Do App</h1>
        <form onSubmit={this.handleSubmit}> 
        <button onClick={this.handleSubmit} id="btn-add-task">Add Task</button>
        <input type="text" value={this.state.inputText} onChange={this.handleChange}/>
        <ul>
        {this.state.toDos.map((number, index) => {
          return(
            <div className="to-dos" id={number}
            onMouseEnter={() =>{this.handleShowDelete(index)}} 
            onMouseLeave={() =>{this.handleNotShowDelete(index)}}  >
              <li onClick={()=>{this.handleMouseClick(number, index)}} 
                  id={index}>{number}</li>
                  <button onClick={()=>{this.handleDelete(index)}} 
                  id={(index + 1)*100} className="btn-delete"
                  style={{display:"none"}}>Delete</button>
            </div>
          )
        })}

        </ul>

        </form> 
      </div> 
    )
  }
}

export default App;