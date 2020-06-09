import React, { Component } from "react";
import Axios from "axios";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";

class ListSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
    };
    //this.Delete = this.Delete.bind(this);
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

  render() {
    return (
      <div>
        <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="6">
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
                      {this.state.skills.map(({ name, nbr, source, _id }) => (
                        <tr>
                          <td>{name}</td>
                          <td>{nbr}</td>
                          <td>{source}</td>
                          <td>
                            <button
                              class="btn-pill btn btn-danger"
                              onClick={() => {
                                this.Delete(_id);
                              }}
                            >
                              <i class="fa fa-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default ListSkills;
