import React, { Fragment } from 'react'
import Axios from "axios";
import Select from 'react-select';
import moment from "moment"
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { CSVLink, CSVDownload } from "react-csv";

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




class feedBacks extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            average: 0,
            totalNumber: null,
            data: [],
            headers: null,
            tabletocsv: [],
            headers: null,

        }
        this.back = this.back.bind(this)


        //    this.onChangecategorie = this.onChangecategorie.bind(this);

    }
    back() {
        this.props.history.push({
            pathname: '/all_training',

        });
    }
    async componentDidMount() {
        await Axios.get("http://localhost:4000/feedback/oneSessionFeedBacks/", {
            params: {
                id: this.props.match.params.id,
            }
        }).then(async (Responses) => {
            console.log(Responses.data)
            if (Responses.data.length > 0) {
                this.setState({ totalNumber: 0 });
                this.setState({ data: Responses.data });

                Responses.data.forEach(element => {
                    this.setState({ average: this.state.average + element.mark });
                    this.setState({ totalNumber: this.state.totalNumber + 1 });
                    console.log(this.state.average)
                    let item = {
                        First_name: element.First_name,
                        Last_name: element.Last_name,
                        mark: element.mark,

                    }
                    this.setState({
                        tabletocsv: this.state.tabletocsv.concat([item])
                    })
                });

            }
            var num = this.state.average / this.state.totalNumber
            var roundedString = num.toFixed(1);
            var rounded = Number(roundedString);
            console.log(this.state.average)

            this.setState({ average: rounded });
            console.log(this.state.average)
            let headerse = [{ label: "First_name", key: "First_name" },
            { label: "Last_name", key: "Last_name" },
            { label: "mark", key: "mark" }]
            this.setState({
                headers: headerse
            })
        });
    }


    render() {
        const { average } = this.state;
        const { headers } = this.state
        const { tabletocsv } = this.state
        const { totalNumber } = this.state;
        const { data } = this.state;

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
                            <strong >FeedBack overview</strong>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {totalNumber > 0 ? <Row>
                            <Col xs="4">
                                <strong style={{ marginTop: '30px' }}> Number of feed Backs : {totalNumber}</strong>
                            </Col>
                            <Col xs="1">
                            </Col>

                            <Col xs="4">
                                <strong style={{ marginLeft: "11px" }}  > Average mark : </strong>

                                <Box style={{ marginTop: '10px' }} component="fieldset" mb={3} borderColor="transparent">
                                    <Rating
                                        name="customized-empty"
                                        precision={0.1}
                                        value={average}
                                        onChange={this.onChangemark}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                    />
                                </Box>
                            </Col>

                            <Col xs="3">

                                <Button>             {<CSVLink data={tabletocsv} uFEFF={false} headers={headers} separator={";"}>download list of participants in csv</CSVLink>}</Button>

                            </Col>
                        </Row>

                            : <div><Col xs="4">
                            </Col>
                                <Col>
                                    <strong style={{ marginTop: '30px' }}> There no feedbacks yet</strong>
                                </Col>
                            </div>
                        }
                    </CardBody>

                </Card>
                {


                    data.map(({ First_name, Last_name, mark, Description }) => (

                        <Card>
                            <CardHeader>
                                <strong >FeedBack of {First_name}{" "}{Last_name}  </strong>
                            </CardHeader>
                            <CardBody>

                                <strong>{Description}</strong>
                                <Row>
                                    <Col xs="5">
                                    </Col>

                                    <Col xs="4" style={{ marginTop: "20px" }}>
                                        <strong style={{ marginLeft: "39px", marginTop: '50px' }}  >  mark : </strong>

                                        <Box style={{ marginTop: '10px' }} component="fieldset" mb={3} borderColor="transparent">
                                            <Rating
                                                name="customized-empty"
                                                precision={0.1}
                                                value={mark}
                                                onChange={this.onChangemark}
                                                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                            />
                                        </Box>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))
                }
            </div >
        )
    }

}
const mapStateToProps = state => ({
    user: state.user.user,
})
export default connect(mapStateToProps)(feedBacks)