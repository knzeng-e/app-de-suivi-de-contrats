import { Redirect } from 'react-router-dom';
import React from 'react';

export const createContract = (contract) => {
    return (
        (dispatch, getState, { getFirebase, getFirestore }) => {
            //make async call to database
            const firestore = getFirestore();
            const profile = getState().firebase.profile;
            const authorId = getState().firebase.auth.uid;

            firestore.collection('contracts').add({
                ...contract,
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorId: authorId,
                createdAt: new Date()

            }).then(() => {
                dispatch({ type: 'CREATE_CONTRACT', contract: contract});
            }).catch((err) => {
                dispatch({ type: 'CREATE_CONTRACT_ERROR', err});
            })
        }
    );
}


export const backHome = (props) => {
    props.history.push('/');
    console.log('PROPS ====> ', props)
}
export const deleteContract = (id, props) => {
    //console.log(contract)
    const del = window.confirm('Voulez-vous supprimer le contract \"' + id + '\" ?');
    
    return (

            (dispatch, getState, { getFirebase, getFirestore }) => {
            //make async call to database
            const firestore = getFirestore();
            if (del){
                firestore.collection('contracts').doc(id).delete().then(() => {
    console.log("CONTRAT SUPPRIME");
    backHome(props);
    //Redirection vers la home à gérer avec push
          
                })
            }
          /* firestore.collection('contracts').doc(contract.id).delete().then(() => {
                dispatch({ type: 'DELETE_CONTRACT', contract: contract});
            }).catch((err) => {
                dispatch({ type: 'DELETE_CONTRACT_ERROR', err});
            })//*/
        }
    );
}
