import React, { Component } from "react";
import Axios from "axios";
import Select from "react-select";
import {
  Breadcrumb,
  BreadcrumbItem,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Input,
  FormGroup,
  FormText,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
} from "reactstrap";
import "./load.css";
import Spinner from "./spinner.gif";
import PaginationComp from "./PaginationComp";
import ModalComp from "./ModalComp";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Top10 from "./Top10";
function searchingfor(term) {
  return function (x) {
    return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}
class page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      term: "",
      skillsPerPage: 10,
      currentPage: 1,
      loading: false,
      open: false,
      open2: false,
      openTop: false,
      priority: "",
      name: "",
      source: "",
      selectedValue: 0,
      id: "",
      idToDel: "",
      maxPriority: [],
    };

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.Delete = this.Delete.bind(this);
    // this.paginate = this.paginate.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onOpenModal2 = this.onOpenModal2.bind(this);
  }

  toggle() {
    //this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    // this.setState((prevState) => {
    //   return { fadeIn: !prevState };
    // });
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.skills,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.skills,
    });
  }

  componentWillMount() {
    Axios.get("http://localhost:3000/api/skills")
      .then((Response) => {
        this.setState({
          skills: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    Axios.get("http://localhost:3000/api/skills/max")
      .then((Response) => {
        this.setState({
          maxPriority: Response.data,
        });
        console.log(this.state.maxPriority);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  Delete = (id) => {
    Axios.delete("http://localhost:3000/api/skills/" + id).then((Response) => {
      console.log(Response.data);
    });
    this.setState({
      skills: this.state.skills.filter((el) => el._id !== id),
    });
  };
  searchHandler(event) {
    this.setState({
      term: event.target.value,
      skillsPerPage: this.state.skills.length,
    });
  }
  jobiclick = () => {
    this.setState({ loading: true });
    Axios.get("http://localhost:3000/api/jobi").then((Response) => {
      this.setState({
        loading: Response.data,
      });
    });
    setTimeout(() => {
      Axios.get("http://localhost:3000/api/skills")
        .then((Response) => {
          this.setState({
            skills: Response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("upp");
      this.setState({ loading: false });
    }, 130000);
  };
  onOpenModal = () => {
    this.setState({ open: true });
    console.log("opened");
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  onOpenModal2 = (e) => {
    this.setState({ open2: true, id: e.currentTarget.id });
    console.log("opened");
  };

  onCloseModal2 = () => {
    this.setState({ open2: false });
  };
  onOpenModalTop = (e) => {
    this.setState({ openTop: true });
    console.log("opened");
  };

  onCloseModalTop = () => {
    this.setState({ openTop: false });
  };
  onSubmit(e) {
    e.preventDefault();

    const skillsObject = {
      name: this.state.name,
      priority: this.state.priority,
      source: "My app",
    };
    Axios.post("http://localhost:3000/api/skills", skillsObject).then((res) =>
      console.log("done!!" + res.data)
    );

    this.setState({ name: "", priority: "" });
    Axios.get("http://localhost:3000/api/skills")
      .then((Response) => {
        this.setState({
          skills: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangePriority(e) {
    this.setState({ priority: e.target.value });
  }

  onSubmit2(e) {
    e.preventDefault();
    const obj = {
      priority: this.state.selectedValue,
    };
    console.log("id:" + this.state.id);
    Axios.post(
      "http://localhost:3000/api/skills/update/" + this.state.id,
      obj
    ).then((res) => console.log(res.data));
    this.Delete(this.state.idToDel);
    //this.props.history.push("/");
  }
  handleChange = (e) => {
    console.log(e.value);
    this.setState({ selectedValue: e.value });
    if (e.value == 2) {
      Axios.get("http://localhost:3000/api/skills/az")
        .then((Response) => {
          this.setState({
            skills: Response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (e.value == 1) {
      Axios.get("http://localhost:3000/api/skills/za")
        .then((Response) => {
          this.setState({
            skills: Response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (e.value == 3) {
      Axios.get("http://localhost:3000/api/skills/priorityUp")
        .then((Response) => {
          this.setState({
            skills: Response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (e.value == 4) {
      Axios.get("http://localhost:3000/api/skills/priorityDown")
        .then((Response) => {
          this.setState({
            skills: Response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  render() {
    let {
      term,
      skills,
      currentPage,
      skillsPerPage,
      open,
      open2,
      name,
      priority,
      selectedValue,
      openTop,
      loading,
    } = this.state;
    const indexOfLastSkill = currentPage * skillsPerPage;
    const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
    const currentSkills = skills.slice(indexOfFirstSkill, indexOfLastSkill);
    const Paginate = (pageNumber) =>
      this.setState({
        currentPage: pageNumber,
      });

    const selectArray = skills.map((opt) => ({
      label: opt.name + ": " + opt.nbr,
      value: opt.nbr,
      a: opt._id,
    }));
    let btn;
    if (loading) {
      btn = (
        <div className="fp-container">
          <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
      );
    }

    const filterArray = [
      { label: "a -> z", value: "1" },
      { label: "z -> a", value: "2" },
      { label: "priority high to low", value: "3" },
      { label: "priority low to high", value: "4" },
    ];
    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col xs="16" lg="8">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Skills list
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Skill</th>
                        <th>Priority</th>
                        <th>Source</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSkills
                        .filter(searchingfor(term))
                        .map(({ name, nbr, source, _id }) => (
                          <tr key={_id}>
                            <td>{name}</td>
                            <td>{nbr}</td>
                            <td>{source}</td>
                            <td>
                              <button
                                className="btn-pill btn btn-danger"
                                onClick={() => {
                                  this.Delete(_id);
                                }}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                              <button
                                id={_id}
                                className="btn-pill btn btn-info"
                                onClick={this.onOpenModal2}
                              >
                                <i className="fa fa-recycle"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <PaginationComp
                    skillsPerPage={skillsPerPage}
                    totalSkills={skills.length}
                    Paginate={Paginate}
                  />
                </CardBody>
              </Card>
            </Col>
            <Modal
              open={open2}
              center="true"
              onClose={() => this.onCloseModal2()}
            >
              <br />
              <h2>Merge two skills with each other</h2>
              <br />
              <form onSubmit={this.onSubmit2}>
                <Row>
                  <Col xs="6">
                    <FormGroup>
                      <Select
                        options={selectArray}
                        onChange={(opt) =>
                          this.setState({
                            selectedValue: opt.value,
                            idToDel: opt.a,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <Button type="submit">Submit</Button>
                  </Col>
                </Row>
              </form>
            </Modal>
            <Col xs="12" md="4">
              <Card>
                <CardBody>
                  <Row className="align-items-center mt-3">
                    <Col col="4" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      {!loading && (
                        <Button color="success" onClick={this.jobiclick}>
                          Jobi.tn
                        </Button>
                      )}
                      {loading && (
                        <Button color="success" disabled>
                          scrapping...
                        </Button>
                      )}
                    </Col>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Button
                        block
                        color="link"
                        className="btn-square"
                        disabled
                      ></Button>
                    </Col>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Button
                        block
                        color="link"
                        className="btn-square"
                        disabled
                      ></Button>
                    </Col>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Button
                        block
                        color="link"
                        className="btn-square"
                        disabled
                      ></Button>
                    </Col>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Button
                        block
                        color="link"
                        className="btn-square"
                        disabled
                      ></Button>
                    </Col>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Button onClick={this.onOpenModal} color="default">
                        <i className="fa fa-plus"></i>
                      </Button>
                      <Modal
                        open={open}
                        center="true"
                        onClose={() => this.onCloseModal()}
                      >
                        <h2>Add a new skill</h2>
                        <form onSubmit={this.onSubmit}>
                          <Row>
                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="name">Skill name</Label>
                                <Input
                                  type="text"
                                  id="name"
                                  value={name}
                                  placeholder="Enter skill"
                                  onChange={this.onChangeName}
                                  required
                                />
                              </FormGroup>
                            </Col>

                            <Col xs="6">
                              <FormGroup>
                                <Label htmlFor="ccnumber">Priority</Label>
                                <Input
                                  type="text"
                                  id="ccnumber"
                                  value={priority}
                                  placeholder="Enter priority"
                                  onChange={this.onChangePriority}
                                  required
                                />
                                <Label htmlFor="ccnumber">
                                  Current max priority:
                                  {this.state.maxPriority.map(
                                    ({ nbr, name }) => (
                                      <b> {nbr}</b>
                                    )
                                  )}
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs="4">
                              <Button type="submit">Submit</Button>
                            </Col>
                          </Row>
                        </form>
                      </Modal>
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-3">
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Input
                        type="text"
                        placeholder="Search..."
                        onChange={this.searchHandler}
                        value={term}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-3">
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Select
                        placeholder={"Filter..."}
                        options={filterArray}
                        onChange={this.handleChange}
                        isSearchable={false}
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-3">
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                      <Button onClick={this.onOpenModalTop} color="info">
                        Top 10 skills
                      </Button>
                      <Modal
                        open={openTop}
                        center="true"
                        onClose={() => this.onCloseModalTop()}
                      >
                        <Top10 />
                      </Modal>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        {btn}
      </div>
    );
  }
}
export default page1;
