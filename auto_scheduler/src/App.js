import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Hobbies from './components/Hobbies/Hobbies.js';

const stringToMS = (string) => {
  let timeParts = string.split(":");
  return((+timeParts[0] * (1000 * 60 * 60)) + (+timeParts[1] * 1000 * 60) + (+timeParts[2] * 1000));
}

const msToString = (duration) => {
  let seconds = parseInt((duration / 1000) % 60);
  let minutes = parseInt((duration / (1000 * 60)) % 60);
  let hours = parseInt((duration / (1000 * 60 * 60)));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

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
        this.setState(this.initializeBreak());
      })
      .catch(err => {console.log(err)});
  }

  initializeBreak () {
    const findTargetTime = () => {
      let totalHobbyTime = 0;
      for (let i=0 ; i < this.state.hobbies.length ; i++) {
        let msPerWeek = 0;
        let obj = this.state.hobbies[i];
        if (obj.name === "Break") continue;
        if (obj.onDays.length === 1) {
          if (obj.onDays[0] === 0) msPerWeek = stringToMS(obj.targetTime);
          else msPerWeek = stringToMS(obj.targetTime) * 7;
        }
        else {
          let numberOfDays = obj.onDays.reduce((accumulator, currentValue) => accumulator + currentValue);
          msPerWeek = stringToMS(obj.targetTime) * numberOfDays;
        }
        totalHobbyTime += msPerWeek;
      }
      return (604800000 - totalHobbyTime);
    }
    let targetTime = findTargetTime();
    targetTime = msToString(targetTime);

    let stateCopy = Object.assign({}, this.state)
    let index = stateCopy.hobbies.findIndex(hobby => {
      return hobby.name === "Break";
    })

    stateCopy.hobbies[index].targetTime = targetTime;
    console.log(stateCopy.hobbies[index]);

    return stateCopy;
  }

  toggleHobbyIsActive = (hobby_id) => {
    let index = this.state.hobbies.findIndex(obj => {
      return obj._id === hobby_id;
    })
    let stateCopy = Object.assign({}, this.state)
    stateCopy.hobbies[index].isActive = !stateCopy.hobbies[index].isActive;
    this.setState(stateCopy);
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
