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
        secondNotif: '',
        colorStatus: 'green'

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
      <div className="card col s12">
        <form onSubmit = {this.handleSubmit} className = "card-content grey lighten-4 white z-depth-4">
            <h5 className = "card-title grey darken-3 white-text center-align z-depth-2">Création d'un contrat</h5>
            <br/>
            <div className = "input-field grey-text z-depth-0 center">
                <label htmlFor = "title">Nom du contract</label>
                <input required type="text" id = "title" onChange = {this.handleChange}/>
            </div>
            <div className = "input-field grey-text z-depth-0 center">
                <label htmlFor = "content">Descriptif du contrat</label>
                <textarea required className = "materialize-textarea" id = "content" onChange = {this.handleChange}></textarea>
            </div>
            <div >
              <br/>
              
              <div>
                <span className = "input-field">Date de fin de validité : 
                  <DatePicker required id = "validity" onChange = {this.handleDate}
                      value = {this.state.endDate} minDate = {new Date()}/></span>
                      <button className = "btn red lighten-1 z-depth-0 right">Créer le contrat</button>
                      </div>
                
            </div>
        </form>
        </div>
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
