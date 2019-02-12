import authReducer from './authreducer';
import contractReducer from './contractReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    contract: contractReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer;