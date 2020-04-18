import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getAllUsers } from '../../redux/user/userActions'
import {
  Table
} from 'reactstrap'

class Users extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    getAllUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.getAllUsers()
  }


  onDeleteClick = id => {
    this.props.deleteItem(id)
  }
  render() {
    const { users } = this.props.users
    return (
      <Table Username >
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user =>
            <tr>
              <td>{user.First_name}</td>
              <td>{user.Last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}



const mapStateToProps = state => ({
  users: state.user,
})


export default connect(mapStateToProps, { getAllUsers })(Users) 
