import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions'; 

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
      this.props.signUp(this.state)
    }

    render() {
      
      const { auth, authError } = this.props;

      if (auth.uid) return <Redirect to = '/' />
     return (
      <div className = "container">
       <div className = "myDiv center white-text darken-4 z-depth-4">S'ENREGISTRER </div>
        <form onSubmit = {this.handleSubmit} className = "white">


        
          
          <div className = "input-field">
          <i class="material-icons prefix">contacts</i>
              <label htmlFor = "Prénom">Nom</label>
              <input type="text" id="lastName" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field">
          <i class="material-icons prefix">assignment_ind</i>
              <label htmlFor = "Nom">Prénom</label>
              <input type="text" id="firstName" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field">
          <i class="material-icons prefix">email</i>
              <label htmlFor = "email">Email</label>
              <input type="email" id = "email" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field">
          <i class="material-icons prefix">locks</i>
              <label htmlFor = "password">Mot de passe</label>
              <input type="password" id="password" onChange = {this.handleChange}/>
          </div>

          <div className = "input-field center">
              <button className = "btn red lighten-1 z-depth-0">Valider</button>
              <div className = "red-text center">
                { authError ? <p>{ authError }</p> : null }
              </div>
          </div>
      

        </form>
     </div>
     )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp : (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);