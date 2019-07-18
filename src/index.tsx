import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'mobx-react';
import gpaStore from './stores/gpa.store';
import gradeSettingsStore from './stores/grade-settings.store';

const root = (
  <Provider gpaStore={gpaStore} gradeSettingsStore={gradeSettingsStore}>
    <App />
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));

serviceWorker.register();
