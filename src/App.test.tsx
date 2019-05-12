import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import gradeSettingsStore from './stores/grade-settings.store';
import gpaStore from './stores/gpa.store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = (
    <Provider gpaStore={gpaStore} gradeSettingsStore={gradeSettingsStore}>
      <App />
    </Provider>
  );

  ReactDOM.render(root, div);
  ReactDOM.unmountComponentAtNode(div);
});
