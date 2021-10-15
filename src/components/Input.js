import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

function Input(props) {

    const { 
        as,
        autoComplete,
        className = '',
        description, 
        label, 
        name,
        onChange,
        onKeyPress,
        placeholder, 
        required = false, 
        rows,
        type, 
        use: Use = Field,
        value
    } = props;

    let conditionalProps = {};
    if (value || value === '') conditionalProps.value = value;
    if (onChange) conditionalProps.onChange = onChange;

    return (
        <div>
            { Boolean(label) && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            ) }
            <div>
                <Use
                    aria-describedby={ `${name}-description` }
                    as={as}
                    autoComplete={ autoComplete }
                    className={
                        `shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
                        block w-full sm:text-sm border-gray-300 rounded-md 
                        ${className ? className : ''}`
                    }
                    id={ name }
                    name={ name }
                    onKeyPress={onKeyPress}
                    placeholder={ placeholder || '' }
                    required={required}
                    rows={rows}
                    type={ type }
                    {...conditionalProps}
                />
            </div>
            <p className="mt-2 text-sm text-gray-500" id={ `${name}-description` }>
                {description}
            </p>
            <ErrorMessage 
                component="div" 
                className="mt-2 text-sm text-red-600" 
                name={ name } 
                id={ `${name}-error` }
            />
        </div>
    );
}

Input.propTypes = {
    as: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    autoComplete: PropTypes.string,
    className: PropTypes.string,
    description: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    rows: PropTypes.number,
    type: PropTypes.string,
    use: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Input;