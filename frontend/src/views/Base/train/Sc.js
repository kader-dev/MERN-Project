import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Scheduler from './Scheduler';

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
  let resArray=new Array()

  this.state.todos.forEach(function(currentTodo, i) {
    let cc = { start_date:currentTodo.Start,
               end_date:currentTodo.End, 
               text:currentTodo.Subject + " by " + currentTodo.TrainerName
              }
    resArray.push(cc)
  });
  return resArray
}

  render() {
    return <div className="animated fadeIn">
        <link href="http://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" type="text/css" />
      <h2 style={{ color: "blue" }}>Training Scheduler</h2>
      <Link to={"/train"}>Back</Link>
      <script async defer crossorigin="anonymous" src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v7.0&appId=672957580209416&autoLogAppEvents=1"></script>
      <div class="fb-share-button" data-href="http://localhost:3000/#/train/details/" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2F%23%2Ftrain%2Fdetails%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Partager</a></div>
      <div class="fb-share-button" data-href="http://127.0.0.1:3000/#/train" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A3000%2F%23%2Ftrain&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Partager</a></div>

      <div className='scheduler-container'>
      <Scheduler events={this.dataList()}/>
      </div>
    </div>;
  }
}

export default train;
