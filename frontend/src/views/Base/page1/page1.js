import React, { Component } from "react";

class page1 extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
    };
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    return <div className="animated fadeIn">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Subject/Username</th>
                <th>Morad</th>
                <th>Hamma</th>
                <th>Amal</th>
                <th>Hatem</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JEE</td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-warning">Medium</span></td>
              </tr>
              <tr>
                <td>.Net</td>
                <td><span class="badge badge-warning">Medium</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-warning">Medium</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
              </tr>
              <tr>
                <td>React</td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-success">Expert</span></td>
              </tr>
              <tr>
                <td>JEE</td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-warning">Medium</span></td>
              </tr>
              <tr>
                <td>.Net</td>
                <td><span class="badge badge-warning">Medium</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-warning">Medium</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
              </tr>
              <tr>
                <td>React</td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-success">Expert</span></td>
              </tr>
              <tr>
                <td>JEE</td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-warning">Medium</span></td>
              </tr>
              <tr>
                <td>.Net</td>
                <td><span class="badge badge-warning">Medium</span></td>
                <td><span class="badge badge-success">Expert</span></td>
                <td><span class="badge badge-warning">Medium</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
              </tr>
              <tr>
                <td>React</td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-secondary">Basic</span></td>
                <td><span class="badge badge-success">Expert</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }
}

export default page1;
