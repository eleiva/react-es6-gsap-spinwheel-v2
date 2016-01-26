import './favicon.ico';
import './index.html';
import 'babel-core/polyfill';
import './scss/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Wheel from './components/Wheel/Wheel';

ReactDOM.render(
  <Wheel config={window.jswheel}/>,
  document.getElementById('jswheel')
);
