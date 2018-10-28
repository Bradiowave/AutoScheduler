import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Hobbies from './components/Hobbies/Hobbies.js';

const stringToMS = (string) => {
  let timeParts = string.split(":");
  return((+timeParts[0] * (1000 * 60 * 60)) + (+timeParts[1] * 1000 * 60) + (+timeParts[2] * 1000));
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      hobbies: [],
      break: {},
    }
  }

  componentDidMount () {
    axios.get('http://localhost:4088/api/hobbies')
      .then(hobbies => {
        this.setState({hobbies: hobbies.data});
        this.setState({break: this.initializeBreak()});
      })
      .catch(err => {console.log(err)});
  }

  initializeBreak () {
    const name = "Break";
    const color = "#ffff00";
    let progress = '00:00:00';

    const findTargetTime = () => {
      let totalHobbyTime = 0;
      for (let i=0 ; i < this.state.hobbies.length ; i++) {
        let msPerWeek = 0;
        let obj = this.state.hobbies[i];
        if (obj.onDays.length === 1) {
          if (obj.onDays[0] === 0) msPerWeek = stringToMS(obj.targetTime);
          else msPerWeek = stringToMS(obj.targetTime) * 7;
        }
        else {
          let numberOfDays = obj.onDays.reduce((accumulator, currentValue) => accumulator + currentValue);
          console.log(numberOfDays);
          msPerWeek = stringToMS(obj.targetTime) * numberOfDays;
        }
        console.log("msPerWeek", msPerWeek);
        totalHobbyTime += msPerWeek;
      }
      console.log(totalHobbyTime);
      return (604800000 - totalHobbyTime);
    }
    let targetTime = findTargetTime();

    return {name, color, progress, targetTime};

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
