import React, { Fragment } from 'react'
import Unites from './Unites'
import My_Unite from './My_Unite'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUnitesDepartment, deleteUnite } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import { getAllUsers } from '../../redux/user/userActions'
import {
    Card, Row,
    Col, Button,
    Table, CardHeader, CardBody
} from 'reactstrap'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class All_Unites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    static propTypes = {   
        user: PropTypes.object.isRequired,   
    }

    render() {
        const { role } = this.props.user
        return (
            <div>
                {role === 'department_manager' ?
                    <My_Unite {...this.props} />
                    :
                    <Unites />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
})

export default connect(mapStateToProps)(All_Unites)