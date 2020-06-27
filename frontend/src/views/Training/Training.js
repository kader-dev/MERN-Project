import React, { Fragment } from 'react'
import Axios from "axios";
import Select from 'react-select';
import moment from "moment"

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
const required = value => value ? undefined : 'Required'

const options = [
    { value: 'web', label: 'web' },
    { value: 'mobile', label: 'mobile' },
    { value: 'dataScience', label: 'dataScience' },
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


class Training extends React.Component {

    constructor(props) {

        super(props)
        this.state = {
            Skill: '',
            NumberOfPlaces: 1,
            Priority: '',
            dateOfSession: "",
            category: null,
            selectedCategorie: null,
            type: null,
            TrainerName: null,
            trainerLinkedin: null,
            Description: null,
            confirmed: null,
            createdBy: null,
            role: null,
            modal: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSkill = this.onChangeSkill.bind(this);
        this.onChangeNumberOfPlaces = this.onChangeNumberOfPlaces.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangedateOfSession = this.onChangedateOfSession.bind(this);
        this.onChangetrainerLinkedin = this.onChangetrainerLinkedin.bind(this);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTrainerName = this.onChangeTrainerName.bind(this);
        this.ChangeModal = this.ChangeModal.bind(this);
        this.deleteTraining = this.deleteTraining.bind(this);
        this.back = this.back.bind(this)

        //    this.onChangecategorie = this.onChangecategorie.bind(this);


    }
    onChangeSkill(e) {
        this.setState({ Skill: e.target.value });
    }
    onChangeNumberOfPlaces(e) {
        this.setState({ NumberOfPlaces: e.target.value });
    }
    onChangetrainerLinkedin(e) {
        this.setState({ trainerLinkedin: e.target.value });

    }
    onChangeTrainerName(e) {
        this.setState({ TrainerName: e.target.value });

    }
    onChangeDescription(e) {
        this.setState({ Description: e.target.value });

    }
    onChangePriority(e) {
        this.setState({ Priority: e.target.value });
        console.log(this.state.categories)
    }
    onChangedateOfSession(e) {
        this.setState({ dateOfSession: e.target.value });
    }
    /*   onChangecategorie(e) {
          this.setState({ category: e.value });
  
          if (e.value != "null") {
              if (e.value == "web") {
                  console.log("hi")
              }
              if (e.value == "mobile") {
  
              }
              if (e.value == "dataScience") {
  
              }
          }
      } */
    handleSkillChange = Skill => {
        this.setState({ Skill });

    };
    handleCategoryPriority = Priority => {
        this.setState({ Priority });

    };

    async  componentDidMount() {
        moment.locale("fr")

        if (this.props.match.params.id) {
            this.setState({ type: "edit" });

            await Axios.get("http://localhost:4000/training/one_Session", {
                params: {
                    id: this.props.match.params.id,

                }
            }).then((Response) => {
                this.setState({ TrainerName: Response.data.TrainerName });
                this.setState({ category: { label: Response.data.category, value: Response.data.category } });
                this.setState({ Skill: { label: Response.data.Skill, value: Response.data.Skill } });
                this.setState({ Description: Response.data.Description });
                this.setState({ Priority: { label: Response.data.priority, value: Response.data.priority } });
                this.setState({ trainerLinkedin: Response.data.trainerLinkedin });
                this.setState({ dateOfSession: moment(Response.data.dateOfSession).format("YYYY-MM-DD") });
                this.setState({ NumberOfPlaces: Response.data.NumberOfPlaces });
                this.setState({ confirmed: Response.data.confirmed });
                this.setState({ createdBy: Response.data.createdBy });
                /*      this.setState({ role: JSON.parse(this.props.user).roles[0] });
                     this.setState({ crea: Response.data.TrainerName }); */


            });
        } else {
            this.setState({ type: "new" });

        }


    }

    handleCategoryChange = category => {
        this.setState({ category });
        this.setState({ Skill: null });

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
    ChangeModal() {
        this.setState({ modal: !this.state.modal });
    }
    deleteTraining() {
        console.log(this.props)
        Axios.delete("http://localhost:4000/training", {
            params: {
                id: this.props.match.params.id,

            }
        }).then((Response) => {
            console.log("item Deleted")
            this.props.history.push("/all_training")

        });
    }
    back() {
        this.props.history.push({
            pathname: '/all_training',

        });
    }
    onSubmit(e) {
        if (this.state.type == "new") {
            e.preventDefault();
            console.log(e.target, "vv")
            console.log(e.target[7], "kklklkl")
            console.log(this.state.Skill)
            const skillsObject = {
                category: this.state.category.value,
                Skill: this.state.Skill.value,
                priority: this.state.Priority.value,
                dateOfSession: moment(e.target[2].value).format("YYYY-MM-DD"),
                NumberOfPlaces: e.target[3].value,
                Description: e.target[7].value,
                TrainerName: e.target[4].value,
                trainerLinkedin: e.target[5].value,
                createdBy: this.props.user._id
            };
            Axios.post("http://localhost:4000/training", skillsObject).then((res) =>
                this.props.history.push("/all_training")
            );
        } else {
            e.preventDefault();
            console.log(e.target, "vv")
            console.log(e.target[8], "kklklkl")
            console.log(this.state.Skill)
            console.log(this.state.onChangeNumberOfPlaces)
            const skillsObject = {
                id: this.props.match.params.id,
                category: this.state.category.value,
                Skill: this.state.Skill.value,
                priority: this.state.Priority.value,
                dateOfSession: moment(e.target[3].value).format("YYYY-MM-DD"),
                NumberOfPlaces: e.target[4].value,
                Description: e.target[8].value,
                TrainerName: e.target[5].value,
                trainerLinkedin: e.target[6].value,
                confirmed: this.state.confirmed

            };
            Axios.put("http://localhost:4000/training", skillsObject).then((res) =>
                this.props.history.push("/all_training")
            );
        }
    }

    render() {

        const { category } = this.state;
        const { selectedCategorie } = this.state;
        const { Skill } = this.state;
        const { Priority } = this.state
        const { type } = this.state
        const { createdBy } = this.state
        const { modal } = this.state
        return (

            <form onSubmit={this.onSubmit}>


                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col xs="1"><svg onClick={this.back} class="bi bi-arrow-left" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                                        <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                    </Col>
                                    <strong>Propose a Training session</strong>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="11">
                                    </Col>

                                    {type == "edit" && (this.props.user._id == createdBy || this.props.user.roles[0] == "up_manager") ? < Button onClick={this.ChangeModal} color="danger"><svg class="bi bi-trash" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg></Button> : null}
                                    <Col xs="1">
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="skill">Category</Label>

                                            <Select required
                                                value={category}
                                                options={options}
                                                onChange={this.handleCategoryChange}

                                            />
                                        </FormGroup>


                                    </Col>
                                    <Col xs="6">

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
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup >
                                            <Label htmlFor="dateOfSession">Date Input </Label>
                                            <Input type="date" id="dateOfSession" min={date} value={this.state.dateOfSession} onChange={this.onChangedateOfSession} required name="dateOfSession" placeholder="date" />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">

                                        <FormGroup>
                                            <Label htmlFor="nPlaces">Number of places</Label>
                                            <Input type="number" value={this.state.NumberOfPlaces} min="1"
                                                onChange={this.onChangeNumberOfPlaces} id="nPlaces" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="Trainee name">Trainee name</Label>
                                            <Input value={this.state.TrainerName} onChange={this.onChangeTrainerName}
                                                id="Traineename" required />
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label htmlFor="LinkedIN profile">Linkedin profile</Label>
                                            <Input value={this.state.trainerLinkedin} onChange={this.onChangetrainerLinkedin}
                                                id="Linkedin profile" required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="category">Priority</Label>
                                            <Select required
                                                value={Priority}
                                                options={PriorityTable}
                                                onChange={this.handleCategoryPriority}
                                                validate={required}

                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                        <FormGroup>
                                            <Label htmlFor="Description">Description</Label>
                                            <Input type="textarea" required value={this.state.Description} onChange={this.onChangeDescription} name="textarea-input" id="Description" rows="3"
                                                placeholder="Content..." />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs="4">
                                        {type == "new" ? < Button type="submit">Add</Button> : null}
                                        {type == "edit" && (this.props.user._id == createdBy || this.props.user.roles[0] == "up_manager") ? < Button type="submit">edit</Button> : null}

                                    </Col>
                                </Row>
                                <Modal isOpen={modal} toggle={modal} >
                                    <ModalHeader toggle={this.ChangeModal}>Delete a training session</ModalHeader>
                                    <ModalBody>
                                        Are you sure that you wanna delete this training session
        </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onClick={this.deleteTraining}>Delete</Button>{' '}
                                        <Button color="secondary" onClick={this.ChangeModal}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </form>
        )
    }

}
const mapStateToProps = state => ({
    user: state.user.user,
})
export default connect(mapStateToProps)(Training)