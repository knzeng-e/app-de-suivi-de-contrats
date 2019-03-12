import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteContract } from '../../store/actions/contractActions';
import { compose } from 'redux';
import { firestore } from 'firebase';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

function ContractDetails(props) {
console.log('params : ', props.match.params)
  //const id = props.match.params.id;
  const { contract, auth, deleteContract, id } = props;
  //const current_time = moment(contract.createdAt.toDate()).calendar();

  if (contract) {

    if  (!auth.uid) return <Redirect to = '/signin' />
    return (

      <div className="row container">
      <div className="col s12">
        <div className="card darken-1">
          <div className="card-content  darken-4 z-depth-4">
          <span className = "card-title grey darken-3 white-text center-align z-depth-2">{contract.title}</span>
          <br/>
          <blockquote>{contract.content}</blockquote>
          </div>
          <div className = "card-action grey lighten-4 grey-text z-depth-4 center">
            <div>Fin de validité : {contract.validity}</div>
            
          <span>
           <button className = "btn left" href="#"><i className="material-icons">mode_edit</i></button>
           <button className = "btn right red lighten-1" onClick={() => deleteContract(id)}><i className="material-icons">delete</i></button>
          </span>



            <div>Enregistré par {contract.authorFistName} {contract.authorLastName}</div>
            <div>{moment(contract.createdAt.toDate()).calendar()}</div>
            
          </div>
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
    auth: state.firebase.auth,
    id: id

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContract : (id) => dispatch(deleteContract(id))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'contracts' }
  ])
)(ContractDetails);
