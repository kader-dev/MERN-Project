import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getDepartments, addDepartment } from '../../redux/department/departmentActions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    Alert, Row,
    CardBody,
    Col, CardHeader, Button,
    Modal, ModalBody, ModalHeader,
    FormGroup, Input, Label, Form, Table
} from 'reactstrap'

import { Redirect, Link } from 'react-router-dom'

class NewDepartment extends Component {

    constructor() {
        super();
        this.state = {
            redirectTo: false,
            description: '',
            name: '',
            manager: '',
            msg: '',
        };
    }
    static propTypes = {
        addDepartment: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        add: PropTypes.bool,
    }

    componentDidMount() {
        this.props.getAllUsers()
    }
    componentDidUpdate(prevProps) {
        const { error, add } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'ADD_DEPARTMENT_FAIL') {
                this.setState({ msg: error.message })
            } else {
                this.setState({ msg: null })
                console.log(add)
            }
        }
        if (!this.state.redirectTo) {
            if (add) {
                this.root()
            }
        }
    }

    root = () => {
        this.setState({
            redirectTo: true
        })
    }
    onChange = (e) => {
        this.setState({ msg: null })
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const department = {
            name: this.state.name,
            description: this.state.description,
            manager: this.state.manager,
        }
        this.props.addDepartment(department)
        //this.props.history.push('/All_Departments')
    }

    render() {
        const { users } = this.props.users

        if (this.state.redirectTo) {
            return <Redirect to="/All_Departments" />
        }

        return (
            <Fragment>
                <span>{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}</span>
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
            </Fragment>
        )
    }
}



const mapStateToProps = state => ({
    users: state.user,
    add: state.department.add,
    error: state.error
})


export default connect(mapStateToProps, { getAllUsers, addDepartment })(NewDepartment) 