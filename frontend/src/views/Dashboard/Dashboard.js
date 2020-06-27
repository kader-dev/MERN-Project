import React, { Component, lazy, Suspense } from 'react';
import axios from 'axios'
import { CardGroup, Col, Row } from 'reactstrap';
import Widget02 from '../Widgets/Widget02';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      DepartmentNum: 0,
      UpNum: 0,
      UserNum: 0,
      skills: 0
    };
  }
  componentDidMount() {
    axios.get('http://localhost:4000/statistics')
      .then(res => {
        this.setState({ DepartmentNum: res.data.DepartmentNum })
        this.setState({ UpNum: res.data.UpNum })
        this.setState({ UserNum: res.data.UserNum })
      })
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={this.state.DepartmentNum} mainText="Departments" icon="fa fa-cogs" color="primary" variant="2" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={this.state.UserNum} mainText="USERS" icon="fa fa-laptop" color="info" variant="2" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header={this.state.UpNum} mainText="Unites" icon="fa fa-cogs" color="primary" variant="2" />
          </Col>
          <Col xs="12" sm="6" lg="3">
            <Widget02 header="0" mainText="Skills" icon="fa fa-bell" color="danger" variant="2" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
