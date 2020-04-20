import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getDepartments, addDepartment, deleteDepartment } from '../../redux/department/departmentActions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    Card, Row,
    CardBody,
    Col, CardHeader, Button,
    Modal, ModalBody, ModalHeader,
    FormGroup, Input, Label, Form, Table
} from 'reactstrap'



class All_Departments extends Component {

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
        deleteDepartment: PropTypes.func.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        users: PropTypes.object.isRequired,
        add: PropTypes.bool,
    }

    componentDidMount() {
        this.props.getDepartments()
        this.props.getAllUsers()
    }

    onDelete = id => {
        this.props.deleteDepartment(id)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onUpdate = (id) => {
        this.props.history.push(`/All_Departments/${id}`)
    }
    New = () => {
        this.props.history.push('/All_Departments/New')
    }

    render() {
        const { departments } = this.props.departments
        const { users } = this.props.users
        return (
            <Fragment>
                <Button color="primary" onClick={this.New} className="mr-1">Add Department</Button>
                <hr />
                <Row>
                    <Col>
                        <Card body outline color="warning">
                            <Table Simple    >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Manager</th>
                                        <th>Operattion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {departments.map((dep =>
                                        <tr>
                                            <td>{dep.name}</td>
                                            <td>{dep.description}</td>
                                            {users.filter(u => u._id === dep.manager).map((u =>
                                                <td> {u.email}</td>
                                            ))
                                            }
                                            <td>
                                                <Button onClick={this.onUpdate.bind(this, dep._id)} color="success">
                                                    UPDATE
                                               </Button>
                                                {"  "}
                                                <Button onClick={this.onDelete.bind(this, dep._id)} color="danger">
                                                    DELETE
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                    }

                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Fragment >
        )
    }
}



const mapStateToProps = state => ({
    departments: state.department,
    users: state.user,
    add: state.department.add,
})


export default connect(mapStateToProps, { getDepartments, getAllUsers, addDepartment, deleteDepartment })(All_Departments) 