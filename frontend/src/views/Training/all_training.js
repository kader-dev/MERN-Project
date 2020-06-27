import React, { Fragment } from 'react'
import Axios from "axios";
import moment from "moment"
import Select from 'react-select';
import { CSVLink, CSVDownload } from "react-csv";

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
    Table,
    PaginationItem,
    PaginationLink,
    Pagination,
    Row,
    Alert,
} from 'reactstrap';
import { Redirect } from 'react-router';
const options = [
    { value: 'web', label: 'web' },
    { value: 'mobile', label: 'mobile' },
    { value: 'dataScience', label: 'dataScience' },
];
const datas = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
const web = [
    { value: 'react', label: 'react' },
    { value: 'angular', label: 'angular' },
    { value: 'vue', label: 'vue' },
];
const mobile = [
    { value: 'flutter', label: 'flutter' },
    { value: 'ios', label: 'ios' },
    { value: 'android', label: 'android' },
];
const dataScience = [
    { value: 'data vizualiton', label: 'data vizualiton' },
    { value: 'python', label: 'python' },
    { value: 'data mining', label: 'data mining' },
];
const PriorityTable = [
    { value: 'low', label: 'low' },
    { value: 'average', label: 'average' },
    { value: 'high', label: 'high' },
];
const date = moment(new Date()).format("YYYY-MM-DD")

class all_training extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            role: null,
            Skill: { value: "ee" },
            category: { value: null },
            selectedCategorie: null,
            Priority: { value: null },
            tabletocsv: [],
            headers: null,
            confirmSnackbar: false,
            participationSnackbar: false,

        }
        this.filter = this.filter.bind(this);
        this.resetFilter = this.resetFilter.bind(this)

    }
    handleSkillChange = Skill => {
        this.setState({ Skill });

    };
    handleCategoryPriority = Priority => {
        this.setState({ Priority });

    };
    handleCategoryChange = category => {
        this.setState({ category });
        this.setState({ Skill: { value: null } });

        if (category.value == "web") {
            this.setState({ selectedCategorie: web });

        }
        if (category.value == "mobile") {
            this.setState({ selectedCategorie: mobile });

        }
        if (category.value == "dataScience") {
            this.setState({ selectedCategorie: dataScience });

        }
    };
    async componentDidMount() {
        moment.locale("fr")
        var userId = JSON.parse(localStorage.getItem('user'))
        await this.setState({
            tabletocsv: []
        })
        await this.setState({
            role: userId.roles[0],
        });

        Axios.get("http://localhost:4000/training")
            .then(async (Response) => {
                for (const element of Response.data) {

                    if (element.list_of_participant != undefined) {
                        element.remainingPlaces = element.NumberOfPlaces - element.list_of_participant.length
                    } else {
                        element.remainingPlaces = element.NumberOfPlaces
                    }

                    await Axios.get("http://localhost:4000/training/check_if_participated/", {
                        params: {
                            id: element._id,
                            iduser: userId._id
                        }
                    }).then((Responses) => {
                        console.log(Responses.data, "eejjj")
                        if (Responses.data != null) {
                            element.canParticipat = true
                            console.log("1")

                        } else {
                            element.canParticipat = false
                            console.log("2")

                        }

                    })
                        .catch((error) => {
                            console.log(error);
                        });
                    await Axios.get("http://localhost:4000/feedback/Check_feed_back/", {
                        params: {
                            sessionId: element._id,
                            iduser: userId._id
                        }
                    }).then((Responses) => {
                        console.log(Responses.data, "vvhnhn")
                        if (Responses.data != null) {
                            element.canFeedBack = true
                        } else {
                            element.canFeedBack = false
                            console.log("2")

                        }

                    })
                        .catch((error) => {
                            console.log(error);
                        });

                }
                this.setState({
                    data: Response.data,
                });
                console.log(Response.data, "jj")

                let headerse = [{ label: "Category", key: "Category" },
                { label: "Skill", key: "Skill" },
                { label: "Date of session", key: "DateOfSession" },
                { label: "NumberOfPlaces", key: "NumberOfPlaces" },
                { label: "Remaining Places", key: "remainingPlaces" },
                { label: "Priority", key: "Prirority" },
                { label: "Status", key: "Status" },
                { label: "Trainee name ", key: "TraineeName" },
                { label: "TrainerLinkedin", key: "trainerLinkedin" }]
                this.setState({
                    headers: headerse
                })
                for (const element of Response.data) {

                    let stat = null;
                    element.confirmed ? stat = "Confirmed" : stat = "not Confirmed"
                    let item = {
                        Category: element.category,
                        Skill: element.Skill,
                        DateOfSession: element.dateOfSession,
                        NumberOfPlaces: element.NumberOfPlaces,
                        remainingPlaces: element.remainingPlaces,
                        Prirority: element.priority,
                        Status: stat,
                        TraineeName: element.TrainerName,
                        trainerLinkedin: element.trainerLinkedin,
                    }
                    this.setState({
                        tabletocsv: this.state.tabletocsv.concat([item])
                    })
                }

            })

            .catch((error) => {
                console.log(error);
            });





    }

    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({ redirect: true });
    }

    participate(id, e) {

        e.stopPropagation(); var userId = JSON.parse(localStorage.getItem('user'))
        const object = {
            id: id,
            iduser: userId._id

        };
        Axios.put("http://localhost:4000/training/add_participant", object).then((Response) => {
            console.log(Response.data);
            this.componentDidMount()
            this.setState({ participationSnackbar: true })
            window.setTimeout(() => {
                this.setState({ participationSnackbar: false })
            }, 2000)
        });
    }
    async confirm(id, e) {
        e.stopPropagation()
        var userId = JSON.parse(localStorage.getItem('user'))
        const object = {
            id: id,
            iduser: userId._id

        };
        await Axios.put("http://localhost:4000/training/confirm", object).then((Response) => {
            console.log(Response.data);
            this.componentDidMount()
            this.setState({ confirmSnackbar: true })
            window.setTimeout(() => {
                this.setState({ confirmSnackbar: false })
            }, 2000)
        });
    }
    redirectForEdit(id) {
        this.props.history.push({
            pathname: '/training/' + id,

        });

    }
    feedback(id, e) {
        e.stopPropagation()
        this.props.history.push({
            pathname: '/feedback/' + id,

        });

    }
    feedbacks(id, e) {
        e.stopPropagation()
        this.props.history.push({
            pathname: '/feedbacks/' + id,

        });

    }
    redirectForEdit(id) {
        this.props.history.push({
            pathname: '/training/' + id,

        });

    }
    async resetFilter() {
        this.setState({ Skill: { value: null } });
        this.setState({ category: { value: null } });
        this.setState({ Priority: { value: null } });
        this.componentDidMount()
    }
    async filter() {
        console.log("hihi")
        await this.setState({
            tabletocsv: []
        })
        var userId = JSON.parse(localStorage.getItem('user'))
        await this.setState({
            role: userId.roles[0],
        });
        Axios.get("http://localhost:4000/training/filterTraining", {
            params: {
                category: this.state.category.value,
                skill: this.state.Skill.value,
                Priority: this.state.Priority.value
            }
        })
            .then(async (Response) => {
                for (const element of Response.data) {
                    element.dateOfSession = moment(element.dateOfSession).format("DD/MM/YY")

                    if (element.list_of_participant != undefined) {
                        element.remainingPlaces = element.NumberOfPlaces - element.list_of_participant.length
                    } else {
                        element.remainingPlaces = element.NumberOfPlaces
                    }

                    await Axios.get("http://localhost:4000/training/check_if_participated/", {
                        params: {
                            id: element._id,
                            iduser: userId._id
                        }
                    }).then((Responses) => {
                        console.log(Responses.data, "eejjj")
                        if (Responses.data != null) {
                            element.canParticipat = true
                            console.log("1")

                        } else {
                            element.canParticipat = false
                            console.log("2")

                        }

                    })
                        .catch((error) => {
                            console.log(error);
                        });
                    await Axios.get("http://localhost:4000/feedback/Check_feed_back/", {
                        params: {
                            sessionId: element._id,
                            iduser: userId._id
                        }
                    }).then((Responses) => {
                        console.log(Responses.data, "vvhnhn")
                        if (Responses.data != null) {
                            element.canFeedBack = true
                        } else {
                            element.canFeedBack = false
                            console.log("2")

                        }

                    })
                        .catch((error) => {
                            console.log(error);
                        });

                }
                this.setState({
                    data: Response.data,
                });
                console.log(Response.data, "jj")

                let headerse = [{ label: "Category", key: "Category" },
                { label: "Skill", key: "Skill" },
                { label: "Date of session", key: "DateOfSession" },
                { label: "NumberOfPlaces", key: "NumberOfPlaces" },
                { label: "Remaining Places", key: "remainingPlaces" },
                { label: "Priority", key: "Prirority" },
                { label: "Status", key: "Status" },
                { label: "Trainee name ", key: "TraineeName" },
                { label: "TrainerLinkedin", key: "trainerLinkedin" }]
                this.setState({
                    headers: headerse
                })
                Response.data.forEach(element => {
                    let stat = null;
                    element.confirmed ? stat = "Confirmed" : stat = "not Confirmed"
                    let item = {
                        Category: element.category,
                        Skill: element.Skill,
                        DateOfSession: element.dateOfSession,
                        NumberOfPlaces: element.NumberOfPlaces,
                        remainingPlaces: element.remainingPlaces,
                        Prirority: element.priority,
                        Status: stat,
                        TraineeName: element.TrainerName,
                        trainerLinkedin: element.trainerLinkedin,
                    }
                    this.setState({
                        tabletocsv: this.state.tabletocsv.concat([item])
                    })
                });

            })

            .catch((error) => {
                console.log(error);
            });

    }
    render() {

        const { category } = this.state;
        const { selectedCategorie } = this.state;
        const { Skill } = this.state;
        const { Priority } = this.state
        const { headers } = this.state
        const { tabletocsv } = this.state
        const { confirmSnackbar } = this.state
        const { participationSnackbar } = this.state
        if (this.state.redirect) {
            return <Redirect push to="/training" />;
        }
        const {
            data
        } = this.state;

        return (
            <div className="animated fadeIn">


                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="6">
                                        <i className="fa fa-align-justify"></i>  All training sessions
                                    </Col>
                                    <Col md="4">
                                    </Col>

                                    <Col md="2">

                                        <button color="accent" onClick={this.handleOnClick}>add new training session</button>

                                    </Col>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                Search by :
                                <Row>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="skill">Category</Label>

                                            <Select required
                                                value={category}
                                                options={options}
                                                onChange={this.handleCategoryChange}

                                            />
                                        </FormGroup>


                                    </Col>
                                    <Col xs="3">

                                        <FormGroup>


                                            <FormGroup>
                                                <Label htmlFor="skill">Skill</Label>

                                                <Select required
                                                    value={Skill}
                                                    options={selectedCategorie}
                                                    onChange={this.handleSkillChange}

                                                />
                                                {/* 
                                            <Label htmlFor="category">Category</Label>
                                            <Input type="select" value={this.state.categorie} onChange={this.onChangecategorie} name="Category" id="Category" placeholder="Choose a Category">
                                                <option value="null"></option>
                                                <option value="web">web</option>
                                                <option value="mobile">mobile</option>
                                                <option value="dataScience">dataScience</option>
                                            </Input> */}
                                            </FormGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="3">
                                        <FormGroup>
                                            <Label htmlFor="category">Category</Label>
                                            <Select required
                                                value={Priority}
                                                options={PriorityTable}
                                                onChange={this.handleCategoryPriority}

                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="1">
                                    </Col>
                                    <Col xs="1">
                                        <Button style={{ marginTop: '30px', width: '100%' }} onClick={this.filter}>Search</Button>
                                    </Col>

                                    <Col xs="1">
                                        <Button style={{ marginTop: '30px', width: '100%' }} onClick={this.resetFilter}>reset</Button>
                                    </Col>
                                </Row>
                                <Table hover bordered striped responsive size="sm">
                                    <thead>
                                        <tr>
                                            <th>category</th>
                                            <th>Skill</th>
                                            <th>date of session </th>
                                            <th>number of places</th>
                                            <th>places that still available</th>
                                            <th>priority</th>
                                            <th>status</th>
                                            {this.state.role != "up_manager" ? this.state.role != "up_manager" ? <th>participate</th> : <th>confirm</th> : null}
                                            {this.state.role != "up_manager" ? <th>feedback</th> : <th>confirm</th>}
                                            {this.state.role == "up_manager" ? <th>feedback</th> : null}

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {

                                            data.map(({ Skill, NumberOfPlaces, _id, priority, dateOfSession, confirmed, canParticipat, remainingPlaces, category, createdBy, canFeedBack }) => (

                                                <tr key={_id} onClick={() => this.redirectForEdit(_id)}>
                                                    <td><strong>{category}</strong></td>
                                                    <td><strong>{Skill}</strong></td>
                                                    <td><strong>{moment(dateOfSession).format("DD/MM/YY")}</strong></td>
                                                    <td><strong>{NumberOfPlaces}</strong></td>
                                                    <td><strong>{remainingPlaces}</strong></td>
                                                    <td><strong>{priority}</strong></td>
                                                    {confirmed ? <td><strong>                      <Badge color="success">Confirmed</Badge>
                                                    </strong></td> : <td><strong>  <Badge color="secondary">Not confirmed</Badge>
                                                    </strong></td>}
                                                    {

                                                        canParticipat == true && confirmed == true && this.state.role != "up_manager" ? <td><strong>Already participated</strong></td> : null
                                                    }
                                                    {

                                                        confirmed == false && this.state.role != "up_manager" ? <td><strong>Event still not confirmed to participate</strong></td> : null
                                                    }
                                                    {

                                                        canParticipat == false && confirmed == true && this.state.role != "up_manager" && remainingPlaces > 0 && moment(date).isSameOrAfter(moment(dateOfSession).format("YYYY-MM-DD")) ? <th><Button onClick={e => {
                                                            this.participate(_id, e);
                                                        }}>participate</Button></th> : null
                                                    }
                                                    {

                                                        canParticipat == false && confirmed == true && this.state.role != "up_manager" && moment(date).isBefore(moment(dateOfSession).format("YYYY-MM-DD")) ? <td><strong>date Has passed </strong></td> : null
                                                    }
                                                    {

                                                        canParticipat == false && confirmed == true && this.state.role != "up_manager" && remainingPlaces == 0 && moment(date).isSameOrAfter(moment(dateOfSession).format("YYYY-MM-DD")) ? <td><strong>training is full</strong></td> : null
                                                    }
                                                    {

                                                        this.state.role == "up_manager" && confirmed == false ? <th><Button onClick={e => {
                                                            this.confirm(_id, e);
                                                        }}>confirm</Button></th> : null
                                                    }
                                                    {

                                                        this.state.role == "up_manager" && confirmed == true ? <td><strong>confirmed session</strong></td> : null
                                                    }
                                                    {

                                                        this.state.role != "up_manager" && confirmed == true && canParticipat == true && moment(date).isBefore(moment(dateOfSession).format("YYYY-MM-DD")) && canFeedBack == false ? < th > <Button onClick={e => {
                                                            this.feedback(_id, e);
                                                        }}>Give FeedBack</Button></th> : null
                                                    }
                                                    {

                                                        this.state.role != "up_manager" && confirmed == true && canParticipat == true && moment(date).isSameOrAfter(moment(dateOfSession).format("YYYY-MM-DD")) && canFeedBack == true ? <td><strong>feedback given</strong></td> : null
                                                    }
                                                    {

                                                        this.state.role != "up_manager" && canParticipat == false ? <td><strong>you have to join to be able to give your feedback</strong></td> : null
                                                    }
                                                    {

                                                        this.state.role != "up_manager" && canParticipat == true && moment(date).isSameOrAfter(moment(dateOfSession).format("YYYY-MM-DD")) ? <td><strong>you can give your feedback after the session is done</strong></td> : null
                                                    }
                                                    {

                                                        this.state.role == "up_manager" && moment(date).isBefore(moment(dateOfSession).format("YYYY-MM-DD")) ? <td><strong>you can see  feedbacks after the session is done</strong></td> : null
                                                    }
                                                    {

                                                        this.state.role == "up_manager" && moment(date).isSameOrAfter(moment(dateOfSession).format("YYYY-MM-DD")) ? < th > <Button onClick={e => {
                                                            this.feedbacks(_id, e);
                                                        }}>visit FeedBacks</Button></th> : null
                                                    }
                                                </tr>

                                            ))}
                                    </tbody>
                                </Table>
                                <Button>             {<CSVLink data={tabletocsv} uFEFF={false} headers={headers} separator={";"}>download in csv</CSVLink>
                                }</Button>
                                <nav>
                                    <Alert color="primary" isOpen={confirmSnackbar} >
                                        Confirmation succes
      </Alert>
                                    <Alert color="primary" isOpen={participationSnackbar} >
                                        Participation succeed      </Alert>
                                </nav>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div >
        )
    }

}
const mapStateToProps = state => ({
    user: state.user.user,
})
export default connect(mapStateToProps)(all_training)