import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getAllUsers } from '../../redux/user/userActions'
import {
  Table, Button
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
    store.dispatch(loadUser())
    this.setState({ role: this.props.user.role })
  }


  onDeleteClick = id => {
    console.log(this.state.role)
  }
  render() {
    const { users } = this.props.users
    return (
      <Fragment>
        {this.state.role === 'center_manager' ?
          (<Button color="primary" onClick={this.onDeleteClick} className="mr-1">Add User</Button>)
          : <hr></hr>}
        <hr></hr>
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
      </Fragment>
    )
  }
}



const mapStateToProps = state => ({
  users: state.user,
  user: state.user.user,
})


export default connect(mapStateToProps, { getAllUsers })(Users) 
