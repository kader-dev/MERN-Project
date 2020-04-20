import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Card, CardBody, CardGroup, Col, Container,
  Form, Alert, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} from 'reactstrap';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { login } from '../../../redux/user/userActions'
import { Redirect } from 'react-router-dom'
class Login extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      msg: '',
      redirectTo: false
    }
  }


  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
  }



  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
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

  onChange = (e) => {
    this.setState({ msg: null })
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const user = { email, password }
    this.props.login(user)
  }

  render() {

    if (this.state.redirectTo) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="email" id="email" name="email" onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" id="password" name="password" onChange={this.onChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
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
export default connect(mapStateToProps, { login })(Login);
