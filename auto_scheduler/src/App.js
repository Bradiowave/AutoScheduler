import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

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
      .then(hobbies => {this.setState({hobbies: hobbies.data})})
      .catch(err => {console.log(err)})
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
