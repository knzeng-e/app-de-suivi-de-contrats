export const createContract = (contract) => {
    return (
        (dispatch, getState, { getFirebase, getFirestore }) => {
            //make async call to database
            const firestore = getFirestore();

            firestore.collection('contracts').add({
                ...contract,
                authorFistName: 'Verlaine',
                authorLastName: 'Massounga',
                authorNickName: 'Papel',
                authorId: 12345,
                createdAt: new Date()

            }).then(() => {
                dispatch({ type: 'CREATE_CONTRACT', contract: contract});
            }).catch((err) => {
                dispatch({ type: 'CREATE_CONTRACT_ERROR', err});
            })
        }
    );
}