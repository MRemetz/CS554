import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './style.css';

ReactDOM.hydrate(<App />, document.getElementById('app'));