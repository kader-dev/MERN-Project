import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


function dd(id) {
  axios.delete('http://localhost:4000/todos/delete/'+id)
      .then((res) => {
          console.log('Successfully deleted!');
      }).catch((error) => {
          console.log(error)
      });
}

const Todo = props => (
  <tr>
      <td>{props.todo.Name}</td>
      <td>{props.todo.Lastname}</td>
      <td>{props.todo.Adress}</td>

      <td>
        {props.todo.Skills.map((item, key) =>
          <div>
            <li>{item.SkillName}
            &nbsp;-&nbsp;
            <span>{item.Level}</span></li>
          </div>
        )}
      </td>

      <td>
          <Link to={"/teacher/edit/"+props.todo._id}>Edit</Link>
          <br></br>
          <a href="/" onClick={() => {dd(props.todo._id)}}>Delete</a>
          <br></br>
          <Link to={"/teacher/skill/"+props.todo._id}>Add Skill</Link>
          {/* <a href="#" onclick={() => {props.delete(props.todo._id)}}>del</a> */}
      </td>
  </tr>
)

class teacherList extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      todos: []
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  delete(id) {
    axios.delete('http://localhost:4000/todos/delete/'+id)
        .then((res) => {
            console.log('Successfully deleted!')
        }).catch((error) => {
            console.log(error)
        });
    this.setState({
      todos : this.state.todos.filter(el => el.id !== id)
    })
}

componentDidMount() {
  axios.get('http://localhost:4000/todos/')
      .then(response => {
        this.setState({todos: response.data});
      })
      .catch(function (error) {
        console.log(error);
      })
}

componentDidUpdate() {
    axios.get('http://localhost:4000/todos/')
    .then(response => {
        this.setState({todos: response.data});
    })
    .catch(function (error) {
        console.log(error);
    })   
}

todoList() {
    return this.state.todos.map(function(currentTodo, i) {
        return <Todo todo={currentTodo} key={i} />;
    });
}

  render() {
    return <div className="animated fadeIn">
      <h2 style={{ color: "blue" }}>Teachers List</h2>
      <Link to={"/teacher/add"}>Add New Teacher</Link>
      <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Department</th>
                            <th>Skills</th>                            
                            <th>Actions</th>                            
                        </tr>
                    </thead>
                    <tbody>
                      { this.todoList() }
                    </tbody>
                </table>
    </div>;
  }
}

export default teacherList;
