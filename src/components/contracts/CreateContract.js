import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContract } from '../../store/actions/contractActions';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'moment/locale/fr';



class CreateContract extends Component {
  
    state = {
        title: '',
        content: '',
        creationDate: '',
        validity: '',
        endDate: '',
        firstNotif: '',
        secondNotif: '',
        colorStatus: ''

    }

    handleChange = (e) => {
      
        this.setState({
          [e.target.id] : e.target.value,
          creationDate : Date()
          });
    }

    setColor = (date, firstRemind, secondRemind) => {
      if (moment().isSameOrAfter(date))
        return 'black'
      if (moment().isBefore(firstRemind))
        return 'green'
      if (moment().isBetween(firstRemind, secondRemind))
        return 'orange'
      if (moment().isSameOrAfter(secondRemind))
        return 'red'

    }

    handleDate = (date) => {
      
      const saveDate = moment(date);
      const firstRemind = moment(date).subtract(6, 'months');
      const secondRemind = moment(date).subtract(3, 'months');

  
      this.setState({
        endDate: date, 
        validity : saveDate.format('L'),
        firstNotif: firstRemind.format('L'),
        secondNotif: secondRemind.format('L'),
        colorStatus : this.setColor(saveDate, firstRemind, secondRemind)
       });
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
      <div className = "container form_style">
      <h5 className = "myDiv  center white-text darken-4 z-depth-4">Enregistrement d'un contrat</h5>
      <div className="">
        <form onSubmit = {this.handleSubmit} className = "white">
            
            <br/>
            <div className = "input-field grey-text z-depth-0 center">
            <i class="material-icons prefix">layers</i>
                <label htmlFor = "title">Nom du contract</label>
                <input required type="text" id = "title" onChange = {this.handleChange}/>
            </div>
            <div className = "input-field grey-text z-depth-0 center">
            <i class="material-icons prefix">event_note</i>
                <label htmlFor = "content">Descriptif du contrat</label>
                <textarea required className = "materialize-textarea" id = "content" onChange = {this.handleChange}></textarea>
            </div>
            <div >
              <br/>
              
              <div>
                <span className = "input-field">Date de fin de validité : 
                  <DatePicker className = "calendar" required id = "validity" onChange = {this.handleDate}
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
