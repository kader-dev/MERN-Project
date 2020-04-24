import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getDepartments, addDepartment, deleteDepartment } from '../../redux/department/departmentActions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    CardBody, Card, CardHeader, Row,
    Col, Button,
    Table
} from 'reactstrap'
import store from '../../redux/store'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class All_Departments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            primary: false,
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
        user: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.getDepartments()
        this.props.getAllUsers()
        console.log(this.props)
    }
    
    onDelete = id => {
        this.props.deleteDepartment(id)
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
        const { role } = this.props.user
        return (
            <Fragment>
                <ToastContainer autoClose={2500} />

                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Button hidden={role !== 'center_manager'} color="primary" onClick={this.New} className="mr-1">Add Department</Button>
                            </CardHeader>
                            <CardBody>
                                <Table Condensed responsive >
                                    <thead>
                                        <tr>

                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Manager</th>
                                            <th hidden={role !== 'center_manager'}>Actions</th>
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
                                                <td hidden={role !== 'center_manager'}>
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
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    departments: state.department,
    users: state.user,
    add: state.department.add,
    user: state.user.user,
})


export default connect(mapStateToProps, { getDepartments, getAllUsers, addDepartment, deleteDepartment })(All_Departments) 