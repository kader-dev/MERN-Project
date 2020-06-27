import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getUnites } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import { getAllUsers } from '../../redux/user/userActions'
import { getDepartments } from '../../redux/department/departmentActions'
import { Badge, Card, CardBody, CardFooter, CardHeader, Col, Row, Collapse, Fade } from 'reactstrap';



class Unites extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    static propTypes = {
        getUnites: PropTypes.func.isRequired,
        unites: PropTypes.object.isRequired,
        getAllUsers: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        depunites: PropTypes.object.isRequired,
        getDepartments: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getDepartments()
        this.props.getUnites()
        this.props.getAllUsers()
    }
    onUpdate = (name) => {
        this.props.history.push(`/All_Unites/details/${name}`)
    }
    render() {
        const { departments } = this.props.departments
        const { unites } = this.props.unites

        return (
            <Fragment>

                <div className="animated fadeIn">
                    <Row>
                        {unites.map((u =>
                            <Col xs="12" sm="6" md="4">
                                <Card className="border-primary">

                                    <CardHeader>
                                        {departments.filter(d => d._id === u._id).map((d =>
                                            <h1>{d.name}</h1>
                                        ))
                                        }
                                    </CardHeader>
                                    <CardBody>
                                        {u.uni.map((p =>
                                            <ul>          
                                                <li><h3 onClick={this.onUpdate.bind(this, p)}>{p}</h3></li>
                                            </ul>
                                        ))}
                                    </CardBody>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    departments: state.department,
    unites: state.unite,
    users: state.user,
    user: state.user.user,
})


export default connect(mapStateToProps, { getUnites, getDepartments, getAllUsers })(Unites)            