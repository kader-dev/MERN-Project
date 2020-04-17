import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getDepartments } from '../../redux/department/departmentActions'

import {
    Container,
    Button, ListGroup,
    ListGroupItem
} from 'reactstrap'

import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group'

class Department extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        getDepartments: PropTypes.func.isRequired,
        departments: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getDepartments()
    }


    onDeleteClick = id => {
        this.props.deleteItem(id)
    }
    render() {
        const { departments } = this.props.departments
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {departments.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={200} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ?
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}>
                                            &times;
                                    </Button>
                                        : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}



const mapStateToProps = state => ({
    departments: state.department,
})


export default connect(mapStateToProps, { getDepartments })(Department) 
