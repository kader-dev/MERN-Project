import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getAllUsers } from '../../redux/user/userActions'
import {
  Table, Button, Row, Col, CardBody, Card, CardHeader
} from 'reactstrap'
import store from '../../redux/store'
import { loadUser } from '../../redux/user/userActions'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      role: null
    }
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getAllUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.getAllUsers()
    this.setState({ role: this.props.user.role })
  }


  onDeleteClick = id => {
    console.log(this.state.role)
  }
  render() {
    const { users } = this.props.users
    const { roles } = this.props.user
    return (
      <Fragment>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Button hidden={!roles.includes('center_manager')} color="primary" onClick={this.onDeleteClick} className="mr-1">Add User</Button>
              </CardHeader>
              <CardBody>
                <Table Condensed responsive >
                  <thead>
                    <tr>

                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Roles</th>

                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user =>
                      <tr>
                        <td>{user.First_name}</td>
                        <td>{user.Last_name}</td>
                        <td >{user.email}</td>
                        <td>
                          {user.roles.map((r => <span>{r}<br></br></span>
                          ))}
                        </td>
                      </tr>
                    ))}
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
  users: state.user,
  user: state.user.user,
})


export default connect(mapStateToProps, { getAllUsers })(Users) 
