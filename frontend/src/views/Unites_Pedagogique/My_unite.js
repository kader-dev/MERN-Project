import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getMyUnite } from '../../redux/unite_pedagogique/unite_pedagogique_Actions'
import {
    Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem,
    ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane
} from 'reactstrap';

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
            <div>
                {unite.map((up =>
                    <Fragment>
                        <div className="animated fadeIn">
                            <Row>
                                <Col sm="12" xl="6">
                                    <Card>
                                        <CardHeader>
                                            <i className="fa fa-align-justify"></i><strong>My Unite infos :</strong>
                                        </CardHeader>
                                        <CardBody>
                                            <ListGroup>
                                                <ListGroupItem className="justify-content-between">
                                                    <h6>Name :</h6><h2>{up.name}</h2>
                                                </ListGroupItem>
                                                <ListGroupItem className="justify-content-between">
                                                    <h6>Description :</h6><h2>{up.description}</h2>
                                                </ListGroupItem>
                                            </ListGroup>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col sm="12" xl="6">
                                    <Card>
                                        <CardHeader>
                                            <i className="fa fa-align-justify"></i><strong>List of Teachers</strong>

                                        </CardHeader>
                                        <CardBody>
                                            {up.list_Teachers.map((p =>
                                                <ListGroup>
                                                    <ListGroupItem className="justify-content-between">
                                                        <h3>{p.teacher}</h3>
                                                    </ListGroupItem>
                                                </ListGroup>
                                            ))}
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Fragment>
                ))
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    unite: state.unite,
    users: state.user,
    user: state.user.user,
})

export default connect(mapStateToProps, { getMyUnite })(MyUnite)            