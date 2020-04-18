import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getDepartments, addDepartment } from '../../redux/department/departmentActions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    Card, Row,
    CardBody,
    Col, CardHeader, Button,
    Modal, ModalBody, ModalHeader,
    FormGroup, Input, Label, Form, Table
} from 'reactstrap'



class NewDepartment extends Component {

    constructor() {
        super();
        this.state = {
            modal: false,
            description: '',
            name: '',
            manager: ''
        };
    }
    static propTypes = {
        addDepartment: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getAllUsers()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const department = {
            name: this.state.name,
            description: this.state.description,
            manager: this.state.manager,
        }
        this.props.addDepartment(department)
        this.props.history.push('/Department')
    }

    render() {
        const { users } = this.props.users
        return (
            <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Label for="Name" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="name"
                            id="item"
                            placeholder="enter name"
                            onChange={this.onChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Description" sm={2}>Description</Label>
                    <Col sm={10}>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="enter description"
                            onChange={this.onChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="Manager" sm={2}>Manager</Label>
                    <Col sm={10}>
                        <Input onChange={this.onChange}
                            type="select"
                            name="manager"
                            id="manager"
                        >
                            {users.map((u =>
                                <option>
                                    {u.email}
                                </option>))}
                        </Input>
                    </Col>
                </FormGroup>
                <Button
                    color="success"
                    style={{ marginTop: '2rem' }}
                    block >
                    Create
             </Button>
            </Form>

        )
    }
}



const mapStateToProps = state => ({
    users: state.user,
})


export default connect(mapStateToProps, { getAllUsers, addDepartment })(NewDepartment) 