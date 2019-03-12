import React, { Component } from 'react';
import Notifications from './Notifications';
import ContractList from './../contracts/ContractList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    render()
    {
        //console.log(this.props);
        const { contracts, auth } = this.props;
        
        if (!auth.uid) return <Redirect to = '/signin' />
        return(
            <div className = " dashboard container">
                <div className= "row">
                    <div className = "col s12 m6">
                        <ContractList contracts = { contracts }/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return ({
        contracts: state.firestore.ordered.contracts,
        auth: state.firebase.auth
    })

}

export default compose( 
    connect (mapStateToProps),
    firestoreConnect([
        {collection : 'contracts'}
    ]),
) (Dashboard)