import React, { Component } from 'react';
import {
  Button, Card, CardBody, CardFooter, Col, Container,
  Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert
} from 'reactstrap';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { register } from '../../../redux/user/userActions'
import { Redirect, Link } from 'react-router-dom'


class Register extends Component {
  constructor() {
    super()
    this.state = {
      First_name: '',
      Last_name: '',
      email: '',
      password: '',
      re_password: '',
      msg: '',
      redirectTo: false
    }

  }


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.message })
      } else {
        this.setState({ msg: null })
      }
    }
    if (!this.state.redirectTo) {
      if (isAuthenticated) {
        this.root()
      }
    }
  }
  root = () => {
    this.setState({
      redirectTo: true
    })
  }

  responseGoogle = (response) => {
    console.log(response);
  }

  onChange = (e) => {
    this.setState({ msg: null })
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    if (this.state.password !== this.state.re_password) {
      this.setState({ msg: "please repeat your password" })
    }
    else {
      const { First_name, Last_name, email, password } = this.state
      const user = { First_name, Last_name, email, password }
      this.props.register(user)
    }
  }

  render() {

    if (this.state.redirectTo) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                  <Form onSubmit={this.onSubmit} >
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="First_name" id="First_name" name="First_name" onChange={this.onChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Last_name" id="Last_name" name="Last_name" onChange={this.onChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="email" id="email" name="email" onChange={this.onChange} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" id="password" name="password" onChange={this.onChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" id="re_password" name="re_password" onChange={this.onChange} />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button><hr></hr>
                  </Form>
                  <Button color="red" block><Link to='/'>I already have  Account</Link></Button>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register })(Register)
