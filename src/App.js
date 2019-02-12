import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ContractDetails from './components/contracts/ContractDetails';
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/SignUp';
import CreateContract from './components/contracts/CreateContract';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path= '/' component = {Dashboard} />
            <Route path = '/contract/:id' component = {ContractDetails} />
            <Route path = '/signin' component = {SignIn} />
            <Route path = '/signup' component = {SignUp} />
            <Route path = '/create' component = {CreateContract} />
          </Switch>
        </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
