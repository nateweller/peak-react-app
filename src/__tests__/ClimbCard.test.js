import React from 'react';
import ReactDOM from 'react-dom';
import ClimbCard from '../components/ClimbCard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClimbCard />, div);
});

