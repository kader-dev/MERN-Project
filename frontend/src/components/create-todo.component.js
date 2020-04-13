import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Lastname: '',
            Adress: '',
            Skills: '',
            image: ''
        }
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
        console.log(`image: ${this.state.image}`);

        const newTodo = {
            Name: this.state.Name,
            Lastname: this.state.Lastname,
            Adress: this.state.Adress,
            Skills: this.state.Skills,
            image: this.state.image
        }

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            Name: '',
            Lastname: '',
            Adress: '',
            Skills: '',
            image: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Add New Teacher</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Lastname: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Lastname}
                                onChange={this.onChangeLastname}
                                />
                    </div>
                    <div className="form-group">
                        <label>Address: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Adress}
                                onChange={this.onChangeAdress}
                                />
                    </div>
                    <div className="form-group">
                        <label>Skills: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.Skills}
                                onChange={this.onChangeSkills}
                                />
                    </div>
                    <div className="form-group">
                        <label>Certificate: </label>
                        <br></br>
                        <input  type="file"
                                onChange={this.onFileChange} 
                                />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Teaher" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}