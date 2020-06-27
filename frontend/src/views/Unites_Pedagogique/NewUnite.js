import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { addUnite } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    Alert,
    Col, Button,
    FormGroup, Input, Label, Form
} from 'reactstrap'
import { Redirect } from 'react-router-dom'

class NewUnite extends Component {

    constructor() {
        super();
        this.state = {
            redirectTo: false,
            description: '',
            name: '',
            manager: '',
            msg: ''
        };
    }
    static propTypes = {
        addUnite: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired,
        error: PropTypes.object.isRequired,
        succes: PropTypes.bool,
    }

    componentDidMount() {
        this.props.getAllUsers()
    }
    componentDidUpdate(prevProps) {
        const { error, succes } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'ADD_UNITE_FAIL') {
                this.setState({ msg: error.message })
            } else {
                this.setState({ msg: null })
            }
        }
        if (!this.state.redirectTo) {
            if (succes) {
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
        const unite = {
            name: this.state.name,
            description: this.state.description,
            manager: this.state.manager,
        }
        this.props.addUnite(unite)
    }

    render() {
        const { users } = this.props.users

        if (this.state.redirectTo) {
            return <Redirect to="/All_Unites" />
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
                                <option placeholder="enter manager">enter manager</option>
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
    succes: state.unite.succes,
    error: state.error
})


export default connect(mapStateToProps, { getAllUsers, addUnite })(NewUnite) 