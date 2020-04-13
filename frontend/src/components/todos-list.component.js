import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td>{props.todo.Name}</td>
        <td>{props.todo.Lastname}</td>
        <td>{props.todo.Adress}</td>
        <td>{props.todo.Skills}</td>
        <td>{props.todo.image}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
             {/* | 
            <Link to={"/"+props.todo._id}> Delete</Link> */}
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    delete(id){
        axios.delete('http://localhost:4000/todos/delete/'+id)
            .then(res => console.log(res.data));
        this.setState({
            todos: this.state.todos.filter(el => el._id !== id)
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
        return (
            <div>
                <br></br>
                <center><h2 style={{ color: "blue" }}>Teachers List</h2></center>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>Adress</th>
                            <th>Skills</th>
                            <th>Certificate</th>
                            <th>Actions</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}