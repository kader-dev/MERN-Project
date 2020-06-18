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
  render() {
   
    return <div className="animated fadeIn">
      <h2 style={{ color: "red" }}>Top 10 Skill Matrix</h2>
      <div class="card-body">
        <div class="table-responsive">
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
            {this.state.todos.map(( listValue, key ) => {
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
