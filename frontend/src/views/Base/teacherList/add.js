import React, { Component } from "react";
import axios from 'axios';

class add extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeAdress = this.onChangeAdress.bind(this);
    this.onChangeSkills = this.onChangeSkills.bind(this);
    this.onChangelevel = this.onChangelevel.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      Name: '',
      Lastname: '',
      Adress: '',
      Skills: '',
      level: '',
      image: ''
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

  onChangeName(e) {
    this.setState({
        Name: e.target.value
    });
}

onChangeLastname(e) {
    this.setState({
        Lastname: e.target.value
    });
}

onChangeAdress(e) {
    this.setState({
        Adress: e.target.value
    });
}

onChangeSkills(e) {
    this.setState({
        Skills: e.target.value
    });
}

onChangelevel(e) {
    this.setState({
        level: e.target.value
    });
}

onFileChange(e) {
    this.setState({ 
        image: "src/uploads/"+e.target.value
    });
    const x = e.target.value
    console.log(x.substring(0, 1))
}

onSubmit(e) {
    e.preventDefault();

    console.log(`Form submitted:`);
    console.log(`Name: ${this.state.Name}`);
    console.log(`Lastname: ${this.state.Lastname}`);
    console.log(`Adress: ${this.state.Adress}`);
    console.log(`Skills: ${this.state.Skills}`);
    console.log(`Skills: ${this.state.level}`);
    console.log(`image: ${this.state.image}`);

    const newTodo = {
        Name: this.state.Name,
        Lastname: this.state.Lastname,
        Adress: this.state.Adress,
        Skills: this.state.Skills,
        level: this.state.level,
        image: this.state.image
    }

    axios.post('http://localhost:4000/todos/add', newTodo)
        .then(res => console.log(res.data));

    this.setState({
        Name: '',
        Lastname: '',
        Adress: '',
        Skills: '',
        level: '',
        image: ''
    })
}

  render() {
    return <div className="animated fadeIn">
      <div style={{marginTop: 20}}>
                <h3>Add New Teacher</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label><b>Name: </b></label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Name}
                                onChange={this.onChangeName}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label><b>Lastname: </b></label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Lastname}
                                onChange={this.onChangeLastname}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label><b>Address: </b></label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Adress}
                                onChange={this.onChangeAdress}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label><b>Skills: </b></label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Skills}
                                onChange={this.onChangeSkills}
                                required
                                />
                    </div>
                    <div className="form-group">
                        <label><b>Level: </b></label>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked="checked"
                                    onChange={this.onChangelevel}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityExpert"
                                    value="Expert"
                                    checked={this.state.level==='Expert'}
                                    onChange={this.onChangelevel}
                                    />
                            <label className="form-check-label">Expert</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label><b>Certificate: </b></label>
                        <br></br>
                        <input  type="file"
                                onChange={this.onFileChange} 
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Teacher" className="btn btn-primary" />
                    </div>
                </form>
            </div>
    </div>;
  }
}

export default add;
