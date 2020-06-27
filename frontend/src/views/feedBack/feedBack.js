import React, { Fragment } from 'react'
import Axios from "axios";
import Select from 'react-select';
import moment from "moment"
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    Modal,
    ModalHeader, ModalBody, ModalFooter,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Alert,
    Row,
} from 'reactstrap';
import { Map } from 'core-js';




class feedBack extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            Description: null,
            mark: 2
        }
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangemark = this.onChangemark.bind(this);
        this.addfeedback = this.addfeedback.bind(this);
        this.back = this.back.bind(this)
        //    this.onChangecategorie = this.onChangecategorie.bind(this);

    }
    onChangeDescription(e) {
        this.setState({ Description: e.target.value });

    }
    onChangemark(e) {
        this.setState({ mark: e.target.value });

    }
    back() {
        this.props.history.push({
            pathname: '/all_training',

        });
    }
    addfeedback() {
        console.log(this.props.user._id)
        const feedbackObject = {
            Description: this.state.Description,
            mark: this.state.mark,
            idSession: this.props.match.params.id,
            feedBackOf: this.props.user._id,
            Last_name: this.props.user.Last_name,
            First_name: this.props.user.First_name
        };
        Axios.post("http://localhost:4000/feedback", feedbackObject).then((res) =>
            this.props.history.push("/all_training")
        );
    }

    render() {
        const { Description } = this.state
        const { mark } = this.state

        return (
            <div>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col xs="1"><svg onClick={this.back} class="bi bi-arrow-left" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                                <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                            </Col>
                            <strong>FeedBack</strong>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Label htmlFor="Description">Write your feedback on the session</Label>
                        <Input style={{ marginTop: '15px' }} type="textarea" value={Description} onChange={this.onChangeDescription} name="textarea-input" id="Description" rows="3"
                            placeholder="Content..." />
                        <Row>
                            <Col xs="5">
                            </Col>
                            <Label style={{ marginTop: '30px' }} htmlFor="Description">Give your mark</Label>

                        </Row>
                        <Row>
                            <Col xs="4">
                            </Col>
                            <Box style={{ marginTop: '10px', marginLeft: "91px" }} component="fieldset" mb={3} borderColor="transparent">
                                <Rating
                                    name="customized-empty"
                                    precision={1}
                                    value={mark}
                                    onChange={this.onChangemark}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                />
                            </Box>
                        </Row>

                        <Row>
                            <Col xs="4">
                            </Col>
                            <Button onClick={this.addfeedback} style={{ marginLeft: "94px" }}> add feedback</Button>
                        </Row>
                    </CardBody>
                </Card>

            </div >
        )
    }

}
const mapStateToProps = state => ({
    user: state.user.user,
})
export default connect(mapStateToProps)(feedBack)