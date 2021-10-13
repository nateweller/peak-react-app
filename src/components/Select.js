import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

function Select(props) {

    const {
        name,
        options = [],
        label = null,
        onChange = null,
        darkMode = false
    } = props;

    const passProps = {};
    if (onChange) passProps.onChange = onChange;

    return (
        <div>

            { label && (
                <label 
                    htmlFor={ name } 
                    className={ 
                        `block text-sm font-medium mb-1
                        ${darkMode ? 'text-gray-400' : 'text-gray-700'}`
                    }
                >
                    {label}
                </label>
            ) }

            <Field
                id={ name }
                name={ name }
                as="select"
                className={
                    `block w-full pl-3 pr-10 py-2 text-base sm:text-sm rounded-md 
                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                    ${darkMode ? 'border-indigo-500 text-gray-100 bg-gray-800' : 'border-gray-300'}`
                }
                children={
                    options.map((option, loopIndex) => (
                        <option value={ option.value } key={ loopIndex }>
                            { option.label }
                        </option>
                    )) 
                }
                {...passProps}
            />

            <ErrorMessage 
                name={ name } 
                component="div" 
                className="mt-2 text-sm text-red-600" 
                id={`${name}-error`} 
            />

        </div>
    );
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    darkMode: PropTypes.bool
};

export default Select;