import React, { Component } from "react";
import axios from 'axios';

class page1 extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      todos: [],
      todoss: [],
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

  componentDidMount() {
    axios.get('http://localhost:4000/todos/')
        .then(response => {
            this.setState({todos: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
        axios.get('http://localhost:4000/skill/')
        .then(response => {
            this.setState({todoss: response.data});
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

  render() {
    return <div className="animated fadeIn">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th>Teachers / Skills</th>

              {this.state.todoss.map(( listValue, index ) => {
                return (
                  <th key={index} >{listValue.Name}</th>
                  );
                })}
            </tr>
            </thead>
            <tbody>
              
            {this.state.todos.map(( listValue, index ) => {
            return (
              <tr key={index} >
                
                <td>{listValue.Name}&nbsp;{listValue.Lastname}</td>
                <td>{listValue.SkillName}</td>
                <td>{listValue.Start}</td>
                <td>{listValue.End}</td>
              </tr>
            );
          })}

            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }
}

export default page1;
