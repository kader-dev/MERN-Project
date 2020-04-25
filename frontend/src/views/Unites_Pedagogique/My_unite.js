import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMyUnite } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'


class MyUnite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    static propTypes = {
        getMyUnite: PropTypes.func.isRequired,
        unite: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.props.getMyUnite()
    }

    render() {
        const { unite } = this.props.unite

        return (
            <Fragment>

                <div className="animated fadeIn">
                    {unite.map((up =>
                        <tr>
                            <td>{up.name}</td>
                            <td>{up.description}</td>
                            {up.list_Teachers.map((p =>
                                <ul>
                                    <li><h3>{p.teacher}</h3></li>
                                </ul>
                            ))}
                        </tr>
                    ))
                    }
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    unite: state.unite,
    users: state.user,
    user: state.user.user,
})

export default connect(mapStateToProps, { getMyUnite })(MyUnite)            