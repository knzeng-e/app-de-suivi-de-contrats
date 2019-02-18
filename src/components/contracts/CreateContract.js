import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContract } from '../../store/actions/contractActions';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-date-picker';

class CreateContract extends Component {
    state = {
        title: '',
        content: '',
        creationDate: '',
        validity: '',
        endDate: '',
        firstNotif: '',
        secondNotif: ''

    }

    handleChange = (e) => {
      
        this.setState({
          [e.target.id] : e.target.value,
          creationDate : Date.now()
          });
    }

    handleDate = (date) => {
      const saveDate = new Date(date);
      const firstRemind = new Date(date);
      const secondRemind = new Date(date);
      const second = secondRemind.getDate() - 90;
      const first = firstRemind.getDate() - 180;
      firstRemind.setDate(first);
      secondRemind.setDate(second);
      this.setState({
        endDate: saveDate, 
        validity : saveDate.toLocaleDateString(),
        firstNotif: firstRemind.toLocaleDateString(),
        secondNotif: secondRemind.toLocaleDateString()
       });

       console.log ('Dans 3 mois ==> ', secondRemind.toLocaleDateString());
       console.log('Dans 6 mois ==> ', firstRemind.toLocaleDateString());
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
                <input required type="text" id = "title" onChange = {this.handleChange}/>
            </div>

            <div className = "input-field">
                <label htmlFor = "content">Descriptif du contrat</label>
                <textarea required className = "materialize-textarea" id = "content" onChange = {this.handleChange}></textarea>
            </div>

            <div >
              <span>Date de fin de validité : </span>
                <DatePicker required id = "validity" onChange = {this.handleDate} 
                      value = {this.state.endDate} minDate = {new Date()}/>
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
