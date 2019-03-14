import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContract } from '../../store/actions/contractActions';
import { Redirect } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import moment from 'moment';
import 'moment/locale/fr'

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
      
      console.log('DATE!!!! ===> ', moment.locale())
      const saveDate = moment(date);
      const firstRemind = moment(date).subtract(6, 'months');
      const secondRemind = moment(date).subtract(3, 'months');

      console.log('FIRST REMIND ==> ', firstRemind.format('L'));
      console.log('SECOND_REMIND  ==> ', secondRemind.format('L'))
      //const color = this.setColor(saveDate);
      //const second = secondRemind.getDate() - 90;
      //const first = firstRemind.getDate() - 180;
      //firstRemind.setDate(first);
      //secondRemind.setDate(second);
      this.setState({
        endDate: date, 
        validity : saveDate.format('L'),
        firstNotif: firstRemind.format('L'),
        secondNotif: secondRemind.format('L'),
        colorStatus : this.setColor(saveDate, firstRemind, secondRemind)
       });

       console.log ('Dans 3 mois ==> ', secondRemind);
       console.log('Dans 6 mois ==> ', firstRemind);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.createContract(this.state);
      this.props.history.push('/');
    }

    
  render() {
    console.log('LOCAL STATE ==> ', this.state)
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to = '/signin' />;
    return (
      <div className = "container">
      <div className="card col s12">
        <form onSubmit = {this.handleSubmit} className = "card-content grey lighten-4 white z-depth-4">
            <h5 className = "card-title grey darken-3 white-text center-align z-depth-2">Enregistrement d'un contrat</h5>
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
