import React, { Component } from "react";
import axios from 'axios';

class page1 extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);

    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      todos: [],
      todoss: [],
      aa:[],
      search:'',
      filter:'',
    };
    
    this.teachersSkills=[];

  }



  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => {
      return { fadeIn: !prevState };
    });
  }
dataLoaded=false;
  componentDidMount() {
   
    var allSkills={};
        axios.get('http://localhost:4000/skill/')
        .then(response => {
            this.setState({todoss: response.data});
            this.state.todoss.map(( item, index )=>{
              allSkills[item.Name.toLowerCase()]="-";
            })
            console.log(allSkills);
        })
        .catch(function (error) {
            console.log(error);
        })

        axios.get('http://localhost:4000/todos/')
        .then(response => {
            this.setState({todos: response.data});
            
            this.state.todos.map(( item, index )=>{
              let teachSkills=JSON.parse(JSON.stringify(allSkills));
             
              item.Skills.map((ii, key)  => {

              teachSkills[ii.SkillName.toLowerCase()]=ii.Level;
            })
            this.teachersSkills.push(teachSkills);
           

        })
        console.log(this.teachersSkills);
          this.dataLoaded=true;
      })
        .catch(function (error) {
            console.log(error);
        })

}

componentDidUpdate() {
    axios.get('http://localhost:4000/todos/')
    .then(response => {
        this.setState({todos: response.data});
        
    })
    .catch(function (error) {
        console.log(error);
    })   
}

updateSearch(event){
  this.setState({search: event.target.value.substr(0,20)})
}
updateFilter(event){
  this.setState({filter: event.target.value.substr(0,20)})
}
  render() {

    const filterArray = [
      { label: "Informatique", value: "Informatique" },
      { label: "Telecommunication", value: "Telecommunication" },
      { label: "Electromecanique", value: "Electromecanique" },
      { label: "Genie Civil", value: "Genie Civil" },
    ];

    let filtered = this.state.todos.filter(
      (todoss) => {
        return todoss.Name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 
               &&
               todoss.Adress.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1;
      }
    );
   
    return <div className="animated fadeIn">
      <h2 style={{ color: "red" }}>Top Skill Matrix</h2>
      <div class="col " float="left">
          <input  type="text"
                  placeholder="Search by Teacher's name ..."
                  float= "right"
                  className="form-control"
                  value={this.state.search}
                  onChange={this.updateSearch.bind(this)}
                  />
          </div>
      <div class="card-body">
        <div class="table-responsive">
         
          <div display= "inline-block">
          <div className="form-group" class="column" display="flex">
                        <label><b>Filter By Department:</b>&nbsp;&nbsp;</label>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="4"
                                    value="i"
                                    onChange={this.updateFilter.bind(this)}
                                    />
                            <label className="form-check-label">All Departments</label>
                        </div>
                        <br></br>
                        <labele>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </labele>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="1"
                                    value="Informatique"
                                    onChange={this.updateFilter.bind(this)}
                                    />
                            <label className="form-check-label">Informatique</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="2"
                                    value="Telecommunication"
                                    onChange={this.updateFilter.bind(this)}
                                    />
                            <label className="form-check-label">Telecommunication</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="3"
                                    value="Electromecanique"
                                    onChange={this.updateFilter.bind(this)}
                                    />
                            <label className="form-check-label">Electromecanique</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="4"
                                    value="Genie Civil"
                                    onChange={this.updateFilter.bind(this)}
                                    />
                            <label className="form-check-label">Genie Civil</label>
                        </div>
                    
                    </div>
                  </div>

          <br></br>
          <table class="table">
            <thead>
            <tr>
              <th>Teachers / Skills</th>

              {this.state.todoss.map(( listValue, index ) => {
                return (
                  <th key={index} >{listValue.Name}</th>
                  );
                })}
            </tr>
            </thead>
            <tbody>
            {filtered.map(( listValue, key ) => {
            return (
              <tr key={key} >
                
                <td>{listValue.Name}&nbsp;{listValue.Lastname}</td>
              {this.dataLoaded?(
              
                Object.entries(this.teachersSkills[key]).map(( item, keyy ) => {
                              return (
                                <td>{item[1]}</td>
         
                                );
                       
                 })):"false"}

                
            </tr>
            )
          })}

            </tbody>
          </table>
        </div>
      </div>
    </div>;
  }
}

export default page1;
