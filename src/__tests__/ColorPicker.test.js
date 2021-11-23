import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form } from 'formik';
import ColorPicker from '../components/ColorPicker';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Formik>
        <Form>
            <ColorPicker />
        </Form>
    </Formik>
  ), div);
});

