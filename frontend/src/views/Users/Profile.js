import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';






const Profile = () => {
    const { First_name, email, role, Last_name } = JSON.parse(localStorage.getItem('user'))
    return (
        <Form>
            <FormGroup row>
                <Label for="exampleEmail" sm={2}>Email</Label>
                <Col sm={10}>
                    <Input disabled type="email" name="email" id="exampleEmail" placeholder="with a placeholder" value={email} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="examplePassword" sm={2}>First_name</Label>
                <Col sm={10}>
                    <Input disabled type="text" name="password" id="examplePassword" placeholder="password placeholder" value={First_name} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="examplePassword" sm={2}>Last_name</Label>
                <Col sm={10}>
                    <Input disabled type="text" name="password" id="examplePassword" placeholder="password placeholder" value={Last_name} />
                </Col>
            </FormGroup>

            <FormGroup row>
                <Label for="examplePassword" sm={2}>role</Label>
                <Col sm={10}>
                    <Input disabled type="text" name="password" id="examplePassword" placeholder="password placeholder" value={role} />
                </Col>
            </FormGroup>

        </Form>
    )
}


export default Profile;
