import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Hobbies from './components/Hobbies/Hobbies.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hobbies: [],
      activeHobbies: []
    }
  }

  componentDidMount () {
    axios.get('http://localhost:4088/api/hobbies')
      .then(hobbies => {this.setState({hobbies: hobbies})})
      .catch(err => {console.log(err)})
  }

  render() {
    return (
      <div className="App">
        <div className='hobbies'>
          
          <Route path='/hobbies' render={ (props) => {
            return (<Hobbies {...props} activeHobbies={this.state.activeHobbies} hobbies={this.state.hobbies} />)
          }}/>

        </div>
      </div>
    );
  }
}

export default App;
