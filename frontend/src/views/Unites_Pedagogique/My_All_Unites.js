import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUnitesDepartment, deleteUnite } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import { getAllUsers } from '../../redux/user/userActions'
import store from '../../redux/store'
import { loadUser } from '../../redux/user/userActions'
import {
    Card, Row,
    Col, Button,
    Table, Alert, CardHeader, CardBody
} from 'reactstrap'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class My_Unite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    static propTypes = {
        unites: PropTypes.object.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        users: PropTypes.object.isRequired,
        deleteUnite: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getUnitesDepartment()
        this.props.getAllUsers()
    }
    onDelete = id => {
        this.props.deleteUnite(id)
    }
    onUpdate = (id) => {
        this.props.history.push(`/All_Unites/update/${id}`)
    }
    New = () => {
        this.props.history.push('/All_Unites/New')
    }

    render() {
        const { unites } = this.props.unites
        const { users } = this.props.users
        return (
            <Fragment>
                <ToastContainer autoClose={2500} />
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Button color="primary" onClick={this.New} className="mr-1">Add Unite</Button>
                            </CardHeader>
                            <CardBody>
                                <Table Condensed responsive >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Manager</th>
                                            <th>Operattion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {unites.map((up =>
                                            <tr>
                                                <td>{up.name}</td>
                                                <td>{up.description}</td>
                                                {users.filter(u => u._id === up.manager).map((u =>
                                                    <td> {u.email}</td>
                                                ))
                                                }
                                                <td>
                                                    <Button onClick={this.onUpdate.bind(this, up._id)} color="success">
                                                        UPDATE
                                               </Button>
                                                    {"  "}
                                                    <Button onClick={this.onDelete.bind(this, up._id)} color="danger">
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
    unites: state.unite,
    users: state.user,
    user: state.user.user,
})


export default connect(mapStateToProps, { getUnitesDepartment, getAllUsers, deleteUnite })(My_Unite)             