import React, { Component } from "react";
import axios from 'axios';

class edit extends Component {
  constructor(props) {
    super(props);

    this.onChangeSkill = this.onChangeSkill.bind(this);
    this.onChangelvl = this.onChangelvl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      SkillName: '',
      Level: ''
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

onChangeSkill(e) {
    this.setState({
      SkillName: e.target.value
    });
}

onChangelvl(e) {
  this.setState({
      Level: e.target.value
  });
}

onSubmit(e) {
    e.preventDefault();
    const obj = {
          SkillName: this.state.SkillName,
          Level: this.state.Level
    };
    const dataObj={
      Skills:obj
    };

    axios.post('http://localhost:4000/todos/update2/'+this.props.match.params.id, dataObj)
        .then(res => console.log(res.data));

    this.props.history.push('/teacher');
}

  render() {
    return <div className="animated fadeIn">
      <div>
                <h3>Add Skill</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Skill name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.SkillName}
                                onChange={this.onChangeSkill}
                                />
                    </div>
                    {/* <div className="form-group">
                        <label>Level: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Level}
                                onChange={this.onChangelvl}
                                />
                    </div> */}

                    <div className="form-group">
                        <label>Level:</label>
                        <br></br>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityBasic"
                                    value="Basic"
                                    onChange={this.onChangelvl}
                                    />
                            <label className="form-check-label">Basic</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    onChange={this.onChangelvl}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityExpert"
                                    value="Expert"
                                    onChange={this.onChangelvl}
                                    />
                            <label className="form-check-label">Expert</label>
                        </div>
                    </div>


                        <div className="form-group">
                            <input type="submit" value="Add Skill" className="btn btn-primary" />
                        </div>
                </form>
            </div>
    </div>;
  }
}

export default edit;
