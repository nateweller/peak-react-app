import React from 'react';
import ReactDOM from 'react-dom';
import { Card, CardBody, CardHeader } from '../components/Card';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Card>
        <CardHeader>
            <h1>Hello, World!</h1>
        </CardHeader>     
        <CardBody>
            <p>Hello, World!</p>
        </CardBody>
    </Card>
  ), div);
});

