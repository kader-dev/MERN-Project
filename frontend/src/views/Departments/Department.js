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
    FormGroup, Input, Label, Form
} from 'reactstrap'



class Department extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            primary: false,
            description: '',
            name: '',
            manager: ''
        };
    }
    static propTypes = {
        getDepartments: PropTypes.func.isRequired,
        departments: PropTypes.object.isRequired,
        addDepartment: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getDepartments()
        this.props.getAllUsers()
    }

    onDeleteClick = id => {
        this.props.deleteItem(id)
    }

    togglePrimary = () => {
        this.setState({
            primary: !this.state.primary,
        });
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
        console.log(department)
        this.props.addDepartment(department)
        this.togglePrimary()
    }

    render() {
        const { departments } = this.props.departments
        const { users } = this.props.users
        return (
            <Fragment>
                <Button color="primary" onClick={this.togglePrimary} className="mr-1">Add Department</Button>
                <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
                    className={'modal-primary ' + this.props.className} >
                    <ModalHeader toggle={this.togglePrimary}>New Department</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="item"
                                    placeholder="enter name"
                                    onChange={this.onChange}
                                />
                                <Label for="item">Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    placeholder="enter description"
                                    onChange={this.onChange}
                                />
                                <FormGroup>
                                    <Label htmlFor="ccmonth">Manager</Label>
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
                                </FormGroup>
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    ADD Department
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <hr />
                <Row>
                    {departments.map((dep =>
                        <Col xs="12" sm="6" md="4">
                            <Card className="border-primary">
                                <CardHeader>
                                    <strong> {dep.name}</strong>
                                </CardHeader>
                                <CardBody>
                                    {dep.description}
                                    <br></br>
                                    {users.filter(u => u._id === dep.manager).map((u =>
                                        <h1> {u.First_name}</h1>
                                    ))
                                    }
                                </CardBody>
                            </Card>
                        </Col>))
                    }
                </Row>
            </Fragment>



        )
    }
}



const mapStateToProps = state => ({
    departments: state.department,
    users: state.user,
})


export default connect(mapStateToProps, { getDepartments, getAllUsers, addDepartment })(Department) 
