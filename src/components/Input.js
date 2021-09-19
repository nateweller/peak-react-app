import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

function Input(props) {

    const { 
        name, 
        label, 
        placeholder, 
        type, 
        description, 
        required, 
        autoComplete,
        rows,
        as,
    } = props;

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <Field
                    type={type}
                    name={name}
                    id={name}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder={placeholder || ''}
                    aria-describedby={`${name}-description`}
                    autoComplete={autoComplete}
                    required={required}
                    rows={rows}
                    as={as}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" id={`${name}-description`}>
                {description}
            </p>
            <ErrorMessage name={name} component="div" className="mt-2 text-sm text-red-600" id={`${name}-error`} />
        </div>
    );
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    description: PropTypes.string
};

export default Input;