import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { initializeBreak, stringToMS, msToString, getMillisecondsSinceMonday }  from './helperFunctions/helperFunctions.js';

import './App.css';

import Hobbies from './components/Hobbies/Hobbies.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hobbies: []
    }
    this.updateDatabase = this.updateDatabase.bind(this);
  }

  updateDatabase () {
    for (let i=0 ; i < this.state.hobbies.length ; i++) {
      let hobby = this.state.hobbies[i];
      axios.put(`http://localhost:4088/api/hobbies/${hobby._id}`, hobby)
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

    window.addEventListener('beforeunload', this.updateDatabase);
  }

  componentWillUnmount () {
    clearInterval(this.timerID);
    this.updateDatabase();
    window.removeEventListener('beforeunload', this.updateDatabase);
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
    let roundMSSinceMonday = getMillisecondsSinceMonday() - (getMillisecondsSinceMonday() % 1000);

    for (let i=0 ; i < this.state.hobbies.length ; i++) {
      let hobby = this.state.hobbies[i];
      let stateCopy = Object.assign({}, this.state)
      if (hobby.isActive){
        stateCopy.hobbies[i].progress = msToString( stringToMS(hobby.progress) + 1000 );
        stateCopy.hobbies[i].weeklyProgress = msToString( stringToMS(hobby.weeklyProgress) + 1000 );
      }

      //Reset hobby.progress if msSinceMonday % hobby.resetEvery === hobby.resetAt.
      //(resetEvery must be a day or a week).
      if ( roundMSSinceMonday % stringToMS(hobby.resetEvery) === stringToMS(hobby.resetAt)  ) {
        stateCopy.hobbies[i].progress = msToString(0);
      }

      //if it is the start of the week, reset weeklyProgress
      if (roundMSSinceMonday === 0) stateCopy.hobbies[i].weeklyProgress = "00:00:00";

      //update this.state
      this.setState(stateCopy);
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
