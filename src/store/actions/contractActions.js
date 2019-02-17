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