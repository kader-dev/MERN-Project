import React, { Fragment } from 'react'
import Unites from './Unites'
import MyUnite from './My_Unite'
import My_All_Unites from './My_All_Unites'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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
                    <My_All_Unites {...this.props} />
                    :
                    <Fragment>
                        {role === 'up_manager' ?
                            <MyUnite {...this.props} />
                            :
                            <Unites {...this.props} />
                        }
                    </Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.user,
})

export default connect(mapStateToProps)(All_Unites)