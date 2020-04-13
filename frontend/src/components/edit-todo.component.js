import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Name: '',
            Lastname: '',
            Adress: '',
            Skills: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    Name: response.data.Name,
                    Lastname: response.data.Lastname,
                    Adress: response.data.Adress,
                    Skills: response.data.Skills
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            Name: this.state.Name,
            Lastname: this.state.Lastname,
            Adress: this.state.Adress,
            Skills: this.state.Skills
        };
        axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Teacher</h3>
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
                        <label>Adress: </label>
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
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                </form>
            </div>
        )
    }
}