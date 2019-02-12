import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
    state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id] : e.target.value
        }
        );
    }

    handleSubmit = (e) => {
      e.preventDefault();
        console.log(this.state);
    }

    render() {
     return (
      <div className = "container">
        <form onSubmit = {this.handleSubmit} className = "white">


        <h5 className = "grey-text text-darken-3">S'enregistrer</h5>
          
          <div className = "input-field">
              <label htmlFor = "Prénom">Nom</label>
              <input type="text" id="lastName" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field">
              <label htmlFor = "Nom">Prénom</label>
              <input type="text" id="firstName" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field">
              <label htmlFor = "email">Email</label>
              <input type="email" id = "email" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field">
              <label htmlFor = "password">Mot de passe</label>
              <input type="password" id="password" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field">
              <button className = "btn red lighten-1 z-depth-0">Valider</button>
          </div>
      

        </form>
     </div>
     )
  }
}

export default SignUp;