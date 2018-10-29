import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { initializeBreak, stringToMS, msToString }  from './helperFunctions/helperFunctions.js';

import './App.css';

import Hobbies from './components/Hobbies/Hobbies.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hobbies: []
    }
  }

  componentDidMount () {
    axios.get('http://localhost:4088/api/hobbies')
      .then(hobbies => {
        this.setState({hobbies: hobbies.data});
        this.setState(initializeBreak(this.state));
      })
      .catch(err => {console.log(err)});

    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  toggleHobbyIsActive = (hobby_id) => {
    let index = this.state.hobbies.findIndex(obj => {
      return obj._id === hobby_id;
    })
    let stateCopy = Object.assign({}, this.state)
    stateCopy.hobbies[index].isActive = !stateCopy.hobbies[index].isActive;
    let allHobbiesInactive = true;
    for (let i=0 ; i < stateCopy.hobbies.length ; i++) {
      if (stateCopy.hobbies[i].isActive === true && 
          stateCopy.hobbies[i].name !== "Break" &&
          stringToMS(stateCopy.hobbies[i].progress) / stringToMS(stateCopy.hobbies[i].targetTime) < 1
        ){
        allHobbiesInactive = false;
        break;
      }
    }
    let breakIndex = this.state.hobbies.findIndex(obj => {
      return obj.name === "Break";
    })
    stateCopy.hobbies[breakIndex].isActive = allHobbiesInactive;

    this.setState(stateCopy);
  }

  tick() {
    for (let i=0 ; i < this.state.hobbies.length ; i++) {
      let hobby = this.state.hobbies[i];
      if (hobby.isActive){
        let stateCopy = Object.assign({}, this.state)
        stateCopy.hobbies[i].progress = msToString( stringToMS(hobby.progress) + 1000 );
        this.setState(stateCopy);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          
          <Route path='/hobbies' render={ (props) => {
            return (<Hobbies {...props} hobbies={this.state.hobbies} toggleHobbyIsActive={this.toggleHobbyIsActive} />)
          }}/>

        </div>
      </div>
    );
  }
}

export default App;
