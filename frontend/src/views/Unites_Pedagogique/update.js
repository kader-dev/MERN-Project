import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { updateUnite } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    Button, Alert,
    FormGroup, Input, Label, Form
} from 'reactstrap'
import axios from "axios";
import { Redirect } from 'react-router-dom'

class update extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            name: '',
            manager: '',
            msg: ''
        };
    }
    static propTypes = {
        updateUnite: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getAllUsers()
        axios.get(`http://localhost:4000/unite_pedagogique/${this.props.match.params.id}`)
            .then(res => {
                this.setState({ name: res.data.name })
                this.setState({ description: res.data.description })
                this.setState({ manager: res.data.manager })
            }
            )
    }

    onChange = (e) => {
        this.setState({ msg: null })
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidUpdate(prevProps) {
        const { error, update } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'UPDATE_UNITE_FAIL') {
                this.setState({ msg: error.message })
            } else {
                this.setState({ msg: null })
            }
        }
        if (!this.state.redirectTo) {
            if (update) {
                this.root()
            }
        }
    }
    root = () => {
        this.setState({
            redirectTo: true
        })
    }
    onUpdate = (id) => {
        this.props.history.push(`/All_Unites/${id}`)
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to="/All_Unites" />
        }
        const { users } = this.props.users
        return (
            <Fragment>
                <span>{this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}</span>
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
                                name="manager"
                                id="manager"
                            >

                                <option placeholder="enter manager">enter manager</option>
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
            </Fragment>
        )
    }
}



const mapStateToProps = state => ({
    users: state.user,
    update: state.unite.update,
    error: state.error
})


export default connect(mapStateToProps, { getAllUsers, updateUnite })(update) 