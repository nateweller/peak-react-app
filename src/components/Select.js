import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

function Select(props) {

    const {
        className: customClassName = '',
        darkMode = false,
        label,
        name,
        onChange,
        options = [],
        use: Use = Field
    } = props;

    const passProps = {};
    if (onChange) passProps.onChange = onChange;

    const fieldProps = {};
    if (Use.name === "Field") {
        fieldProps.as = "select";
    }

    return (
        <div className={ customClassName }>

            { label && (
                <label 
                    htmlFor={ name } 
                    className={ 
                        `block text-sm font-medium mb-1
                        ${ darkMode ? 'text-gray-400' : 'text-gray-700' }`
                    }
                >
                    { label }
                </label>
            ) }

            <Use
                id={ name }
                name={ name }
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
                { ...passProps }
                { ...fieldProps }
            />

            { Use.name === "Field" && (
                <ErrorMessage 
                    name={ name } 
                    component="div" 
                    className="mt-2 text-sm text-red-600" 
                    id={ `${name}-error` }
                />
            ) }

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