import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUnites } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import { getAllUsers } from '../../redux/user/userActions'
import store from '../../redux/store'
import { loadUser } from '../../redux/user/userActions'
class My_Unite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            role: null
        }
    }
    static propTypes = {
        getUnites: PropTypes.func.isRequired,
        unites: PropTypes.object.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getUnites()
        this.props.getAllUsers()
        store.dispatch(loadUser())
        this.setState({ role: this.props.user.role })
    }

    render() {
        return (
            <div>

                <div>my unites</div>

            </div>

        )
    }


}





const mapStateToProps = state => ({
    unites: state.unite,
    users: state.user,
    user: state.user.user,
})


export default connect(mapStateToProps, { getUnites, getAllUsers })(My_Unite)                