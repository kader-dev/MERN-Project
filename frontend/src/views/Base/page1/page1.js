import React, { Component } from "react";
import Axios from "axios";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from "reactstrap";
import PaginationComp from "./PaginationComp";
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
    };

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.Delete = this.Delete.bind(this);
    // this.paginate = this.paginate.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
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
    }, 130000);
  };
  render() {
    const { term, skills, currentPage, skillsPerPage } = this.state;
    const indexOfLastSkill = currentPage * skillsPerPage;
    const indexOfFirstSkill = indexOfLastSkill - skillsPerPage;
    const currentSkills = skills.slice(indexOfFirstSkill, indexOfLastSkill);
    const Paginate = (pageNumber) =>
      this.setState({
        currentPage: pageNumber,
      });
    return (
      <div>
        <form>
          <input type="text" onChange={this.searchHandler} value={term} />
          <button onClick={this.jobiclick}>jobi</button>
        </form>
        <div className="animated fadeIn">
          <Row>
            <Col xs="18" lg="8">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i> Skills list
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Skill</th>
                        <th>Number of occurence</th>
                        <th>Source</th>
                        <th>Action</th>
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
                                <i className="fa fa-trash"></i> Delete
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
          </Row>
        </div>
      </div>
    );
  }
}
export default page1;
