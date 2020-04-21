import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Scheduler from './Scheduler';


const Todo = props => (
  <tr>
      <td>{props.todo.Start}</td>
      <td>{props.todo.End}</td>
      <td>{props.todo.Subject}</td>
      <td>{props.todo._id}</td>
  </tr>
)

const Data = props => (
  { start_date : props.todo.Start,
    end_date: props.todo.End,
    text: props.todo.Subject }
)

 const data = [
   { start_date:'2020-04-20 10:30	', end_date:'2020-04-20 11:30', text:'jee' },
   { start_date:'2020-04-22 10:00', end_date:'2020-04-22 18:00', text:'Event 2' }
 ];

class train extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      todos: [],
    };
    console.log("////////////////////")
    console.log(this.dataList)
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  componentDidMount() {
    axios.get('http://localhost:4000/train/')
        .then(response => {
            this.setState({todos: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
}

componentDidUpdate() {
    axios.get('http://localhost:4000/train/')
    .then(response => {
        this.setState({todos: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })   
}

dataList() {
  return this.state.todos.map(function(currentTodo, i) {
      return <Data todo={currentTodo} key={i} />;
  });
}

  render() {
    return <div className="animated fadeIn">
        <link href="http://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" type="text/css" />
      <h2 style={{ color: "blue" }}>Training Scheduler</h2>
      <Link to={"/train/add"}>Add a Training Session</Link>
      <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>TrainerName</th>
                            <th>Start</th>
                            <th>End</th>                           
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.todos.map(( listValue, index ) => {
          return (
            <tr key={index}>
              <td>{listValue.Subject}</td>
              <td>{listValue.TrainerName}</td>
              <td>{listValue.Start}</td>
              <td>{listValue.End}</td>
            </tr>
          );
        })}
                    </tbody>
                </table>
                <div className='scheduler-container'>
                    <Scheduler events={ data }/>
                </div>
    </div>;
  }
}

export default train;
