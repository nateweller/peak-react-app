import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../components/Dialog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Dialog />, div);
});

