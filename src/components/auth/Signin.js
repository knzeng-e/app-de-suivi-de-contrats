import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    state = {
      email: '',
      password: ''

    }

    handleChange = (e) => {
        this.setState({
          [e.target.id] : e.target.value
        }
        );
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.signIn(this.state);
    }
  render() {
    const { authError, auth } = this.props;

    if (auth.uid) return <Redirect to = '/' />
    return (
      <div className = "container form_style">
      <div className = "myDiv center white-text darken-4 z-depth-4">S'IDENTIFIER </div>
        <form onSubmit = {this.handleSubmit} className = "white">
            <div className = "input-field">
            <i class="material-icons prefix">mail_outline</i>
                <label htmlFor = "email">Email</label>
                <input type="email" id="email" onChange = {this.handleChange}/>
            </div>

            <div className = "input-field">
            <i class="material-icons prefix">lock_outline</i>
                <label htmlFor = "password">Mot de passe</label>
                <input type="password" id="password" onChange = {this.handleChange}/>
            </div>
            <div className = "input-field center">
                <button className = "btn red lighten-1 z-depth-0">Connexion</button>
                <div className = "red-text center">
                  { authError ? <p>{authError}</p> : null }
                </div>
            </div>
        </form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
