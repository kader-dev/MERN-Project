import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUnites } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import { getAllUsers } from '../../redux/user/userActions'
import store from '../../redux/store'
import { loadUser } from '../../redux/user/userActions'
import My_Unite from './My_unite'
import {
    Card, Row,
    Col, Button,
    Table
} from 'reactstrap'
class All_Unites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            role: null,
            depunites: []
        }
    }
    static propTypes = {
        getUnites: PropTypes.func.isRequired,
        unites: PropTypes.object.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        depunites: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getUnites()
        this.props.getAllUsers()
        store.dispatch(loadUser())
        this.setState({ role: this.props.user.role })
        this.setState({ depunites: this.props.unites })
    }

    render() {
        return (
            <div>
                {this.state.role === 'department_manager' ?
                    <My_Unite />
                    :
                    <div>
                        {<p>
                            {this.state.depunites.map((u =>
                                <Fragment>
                                    <h1>{u._id}</h1>
                                    {u.uni.map((p => <h1>{p}</h1>))}
                                </Fragment>

                            ))
                            }
                        </p>

                        }

                    </div>
                }
            </div>

        )
    }


}





const mapStateToProps = state => ({
    unites: state.unite.unites,
    users: state.user,
    user: state.user.user,
})


export default connect(mapStateToProps, { getUnites, getAllUsers })(All_Unites)                