import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import App from './App';
import DataProvider from './redux/store';

ReactDOM.render(
    <DataProvider>
    <App />
    </DataProvider>,
  document.getElementById('root')
);
