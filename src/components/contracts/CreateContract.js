import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContract } from '../../store/actions/contractActions';
import { Redirect } from 'react-router-dom';
class CreateContract extends Component {
    state = {
        title: '',
        content: '',
        creationDate: '',
        duration: ''

    }

    handleChange = (e) => {
        this.setState({
          [e.target.id] : e.target.value,
          creationDate : Date.now()
        }
        );
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.createContract(this.state);
      this.props.history.push('/');
    }
  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to = '/signin' />;
    return (
      <div className = "container">
        <form onSubmit = {this.handleSubmit} className = "white">
            <h5 className = "grey-text text-darken-3">Création d'un contrat</h5>
            <div className = "input-field">
                <label htmlFor = "title">Nom du contract</label>
                <input type="text" id = "title" onChange = {this.handleChange}/>
            </div>

            <div className = "input-field">
                <label htmlFor = "content">Descriptif du contrat</label>
                <textarea className = "materialize-textarea" id = "content" onChange = {this.handleChange}></textarea>
            </div>
            <div className = "input-field">
                <button className = "btn red lighten-1 z-depth-0">Créer le contrat</button>
            </div>
        </form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispacthToProps = (dispatch) => {
  return ({
    createContract: (contract) => dispatch (createContract(contract))
  });

}

export default connect (mapStateToProps, mapDispacthToProps)(CreateContract);
