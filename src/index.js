import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/firestore' 
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { store } from './store';


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(config);
firebase.firestore() 
  
const rrfProps = {
  firebase,
  config: {}, // no rrf config for now
  dispatch: store.dispatch,
  createFirestoreInstance 
}


ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
        </ReactReduxFirebaseProvider>
    </Provider>,

  document.getElementById('root')
);

