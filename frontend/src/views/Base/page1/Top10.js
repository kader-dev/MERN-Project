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

export default class Top10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: [],
      n: 1,
    };
    //this.Delete = this.Delete.bind(this);
  }
  componentWillMount() {
    Axios.get("http://localhost:3000/api/skills/top10")
      .then((Response) => {
        this.setState({
          skills: Response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className="animated fadeIn">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Top 10 skills</h2>
          </div>

          <Table responsive>
            <thead>
              <tr>
                <th></th>
                <th>Skill</th>
                <th>Number of occurence</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {this.state.skills.map(({ name, nbr, source, _id }) => (
                <tr>
                  <td>{this.state.n++}</td>
                  <td>{name}</td>
                  <td>{nbr}</td>
                  <td>{source}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
