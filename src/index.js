import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import * as moment from 'moment';

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBgAIMoXv-URoXAARq0JzD7AAOIrZhSMtU",
  authDomain: "portalfox-68431.firebaseapp.com",
  databaseURL: "https://portalfox-68431.firebaseio.com",
  projectId: "portalfox-68431",
  storageBucket: "portalfox-68431.appspot.com",
  messagingSenderId: "363106845702",
  appId: "1:363106845702:web:b0134d4dcc4b19f03def87",
  measurementId: "G-WZ7YR66RSV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore();
firebase.storage();

// Redux store config
const store = createStore(rootReducer,
  compose(applyMiddleware(thunk), composeWithDevTools())
);

// Moment config
moment.locale('es');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
