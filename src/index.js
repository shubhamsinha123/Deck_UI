// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import {IntlProvider} from 'react-intl';
import reportWebVitals from './reportWebVitals.js';
import English from './lang/string_en-US.json';
import French from './lang/string_fr_CA.json';
let lang;
const locales = navigator?.language;
if (locales === 'en-US') {
  lang = English;
} else {
  lang = French;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IntlProvider locale={locales} messages={lang}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
