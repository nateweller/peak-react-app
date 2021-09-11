import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

function Select(props) {

    const {
        name,
        options,
        label
    } = props;

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <Field
                id={name}
                name={name}
                as="select"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                children={[ 
                    <option value="" key={ -1 }></option>, 
                    ...options.map((option, loopIndex) => (
                        <option value={ option.value } key={ loopIndex }>
                            { option.label }
                        </option>
                    )) 
                ]}
            />
            <ErrorMessage name={name} component="div" className="mt-2 text-sm text-red-600" id={`${name}-error`} />
        </div>
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
};

export default Select;