import React, { Component } from "react";
import axios from 'axios';

class add extends Component {
  constructor(props) {
    super(props);

    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeTrainerName = this.onChangeTrainerName.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
    this.onChangeH1 = this.onChangeH1.bind(this);
    this.onChangeH2 = this.onChangeH2.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      Name: '',
      TrainerName: '',
      Start: '',
      End: ''
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

  onChangeSubject(e) {
    this.setState({
        Subject: e.target.value
    });
}

onChangeTrainerName(e) {
    this.setState({
        TrainerName: e.target.value
    });
}

onChangeStart(e) {
    this.setState({
        Start: e.target.value
    });
}

onChangeEnd(e) {
    this.setState({
        End: e.target.value
    });
}

onChangeH1(e) {
  this.setState({
      h1: e.target.value
  });
}

onChangeH2(e) {
  this.setState({
      h2: e.target.value
  });
}

onSubmit(e) {
    e.preventDefault();

    const newTodo = {
        Subject: this.state.Subject,
        TrainerName: this.state.TrainerName,
        Start: this.state.Start + " " + this.state.h1,
        End: this.state.End + " " + this.state.h2
    }

    axios.post('http://localhost:4000/train/add', newTodo)
        .then(res => console.log(res.data));

    this.setState({
        Subject: '',
        TrainerName: '',
        Start: '',
        End: '',
        h1: '',
        h2: ''
    })
}

  render() {
    return <div className="animated fadeIn">
      <div style={{marginTop: 20}}>
                <h3>Add a Training Session</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group" class="col-md-7">
                        <label>Subject: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Subject}
                                onChange={this.onChangeSubject}
                                required/>
                    </div>
                    <div className="form-group" class="col-md-7">
                        <label>TrainerName: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.TrainerName}
                                onChange={this.onChangeTrainerName}
                                required/>
                    </div>
                    <div className="form-group" class="col-md-12">
                        <label>Start: </label>
                        <br></br>
                        <label>Day: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.Start}
                                onChange={this.onChangeStart}
                                class="col-md-4"
                                required/>
                        <label>Time: </label>
                        <input  type="time"
                                min="09:00" 
                                max="20:00" 
                                className="form-control"
                                value={this.state.h1}
                                onChange={this.onChangeH1}
                                class="col-md-2"
                                required/>
                    </div>
                    <div className="form-group" class="col-md-12">
                        <label>End: </label>
                        <br></br>
                        <label>Day: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.End}
                                onChange={this.onChangeEnd}
                                class="col-md-4"
                                required/>
                        <label>Time: </label>
                        <input  type="time"
                                min="10:00" 
                                max="22:00" 
                                className="form-control"
                                value={this.state.h2}
                                onChange={this.onChangeH2}
                                class="col-md-2"
                                required/>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
    </div>;
  }
}

export default add;
