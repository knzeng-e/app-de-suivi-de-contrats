const initState = {
    contracts: [
        {id: '1', title: 'Contrat forestier Nkok', content: 'Ceci est un contrat établit entre Nkok et Papel_society'},
        {id: '2', title: 'Contrat Pétrolier Perinco', content: 'Ceci est un contrat établit entre Perinco et Papel_society'},
        {id: '3', title: 'Contrat Maritime Bolloré', content: 'Ceci est un contract établit entre Bolloré et Papel_soicety'}
    ]
};

const contractReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CONTRACT':
            console.log('Created contract', action.contract);
            return state;

        case 'CREATE_CONTRACT_ERROR':
            console.log('create contract error: ', action.err);
            return state;

        case 'DELETE_CONTRACT':
            console.log('Contract deleted!', action.contract);
            return state;
            
        default: 
            return state;
    }
}

export default contractReducer;