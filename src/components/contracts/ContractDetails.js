import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { firestore } from 'firebase';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

function ContractDetails(props) {
console.log('Firestore : ', firestore)
  //const id = props.match.params.id;
  const { contract, auth } = props;
  //const current_time = moment(contract.createdAt.toDate()).calendar();
  
  if (contract) {

    if  (!auth.uid) return <Redirect to = '/signin' />
    return (
    <div className = "container section contract-details">
      <div className = "card-content">
        <span className = "card-title">{contract.title}</span>
        <p>{contract.content}</p>
        <div className = "card-action grey lighten-4 grey-text">
        <div>Enregistré par {contract.authorFistName} {contract.authorLastName}</div>
        <div>{moment(contract.createdAt.toDate()).calendar()}</div>
        </div>
      </div>
    </div>
    )
  } else {
    return (
      <div className = "container center">
        <p>Chargement du contrat...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const contracts = state.firestore.data.contracts;
  const contract = contracts ? contracts[id] : null

  return {
    contract : contract,
    auth: state.firebase.auth

  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'contracts' }
  ])
)(ContractDetails);
 