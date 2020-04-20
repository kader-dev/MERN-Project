import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { updateDepartment } from '../../redux/department/departmentActions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    Card, Row,
    CardBody,
    Col, CardHeader, Button,
    Modal, ModalBody, ModalHeader,
    FormGroup, Input, Label, Form, Table
} from 'reactstrap'
import axios from "axios";

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            name: '',
            manager: ''
        };
    }
    static propTypes = {
        updateDepartment: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getAllUsers()
        axios.get(`http://localhost:4000/department/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ name: res.data[0].name })
                this.setState({ description: res.data[0].description })
                this.setState({ manager: res.data[0].manager })
            }
            ).then(res => console.log(this.state.name, this.state.description, this.state.manager))
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const department = {
            id: this.props.match.params.id,
            name: this.state.name,
            description: this.state.description,
            manager: this.state.manager,
        }
        this.props.updateDepartment(department)
        this.props.history.push('/All_Departments')
    }

    render() {
        const { users } = this.props.users
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <Label for="item">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="item"
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <Label for="item">Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={this.state.description}
                        onChange={this.onChange}
                    />
                    <FormGroup>
                        <Label htmlFor="ccmonth">Manager</Label>
                        <Input onChange={this.onChange}
                            type="select"
                            id="manager"
                        >

                            {users.map((u =>
                                <option>
                                    {u.email}
                                </option>))}
                        </Input>
                    </FormGroup>
                    <Button
                        color="dark"
                        style={{ marginTop: '2rem' }}
                        block
                    >
                        Save
                                </Button>
                </FormGroup>
            </Form>

        )
    }
}



const mapStateToProps = state => ({
    users: state.user,
})


export default connect(mapStateToProps, { getAllUsers, updateDepartment })(Details) 