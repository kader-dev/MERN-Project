import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { logout } from '../../redux/user/userActions'
import { Redirect } from 'react-router-dom'
import { selectuser } from '../../redux/user/userSelectors'
import { createStructuredSelector } from 'reselect';
class DefaultHeader extends Component {
  constructor() {
    super()
    this.state = {
      msg: '',
      redirectTo: false,
      is: true
    }
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }
  onSubmit = e => {
    this.props.logout()
    this.setState({
      redirectTo: true
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to="/" />
    }
    const { First_name, Last_name } = JSON.parse(localStorage.getItem('user'))
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
        </Nav>
        <strong>Welcome {Last_name}  {First_name}</strong>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong>
              </DropdownItem>
              <DropdownItem ><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem ><i className="fa fa-user"></i><Link to="/Profile">Profile</Link></DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.onSubmit}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}



export default connect(null, { logout })(DefaultHeader);
