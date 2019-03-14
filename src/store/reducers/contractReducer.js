const initState = {
    contracts: []
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

        case 'MODIFY_CONTRACT':
            console.log('Contract modified!!', action.contract);
            return state;
            
        default: 
            return state;
    }
}

export default contractReducer;