import React, { Component } from 'react';

import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';




class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
    }


    render() {

        const { user } = this.props.user
        return (
            <Form>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>picture</Label>
                    <Col sm={10}>
                        <img src={user.picture} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Email</Label>
                    <Col sm={10}>
                        <Input disabled type="email" name="email" id="exampleEmail"
                            placeholder="with a placeholder" value={user.email} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="examplePassword" sm={2}>First_name</Label>
                    <Col sm={10}>
                        <Input disabled type="text" name="password" id="examplePassword"
                            placeholder="password placeholder" value={user.First_name} />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="examplePassword" sm={2}>Last_name</Label>
                    <Col sm={10}>
                        <Input disabled type="text" name="password" id="examplePassword"
                            placeholder="password placeholder" value={user.Last_name} />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="examplePassword" sm={2}>roles</Label>
                    <Col sm={10}>
                        <Input disabled type="text" name="password" id="examplePassword"
                            placeholder="password placeholder" value={user.roles} />
                    </Col>
                </FormGroup>

            </Form>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
})




export default connect(mapStateToProps, null)(Profile);
