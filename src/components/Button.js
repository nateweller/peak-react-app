import PropTypes from 'prop-types';
import { BiLoaderAlt } from 'react-icons/bi';

function Button(props) {

    const { 
        className: customClassName, 
        type, 
        children, 
        disabled, 
        href, 
        form,
        use: Use,
        to,
        onClick,
        isLoading
    } = props;

    const className = `py-2 px-4 border border-transparent rounded-md shadow-sm 
                       text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 
                       disabled:opacity-50 disabled:bg-indigo-500 ${customClassName}`;

    return (
        <Use
            type={type || 'button'}
            className={className}
            disabled={disabled}
            form={form}
            href={href}
            to={to}
            onClick={onClick}
        >
            { children }
            { isLoading && 
                <span className="inline-block ml-2 animate-spin">
                    <BiLoaderAlt className="h-4 w-4 text-indigo-400" />
                </span>
            }
        </Use>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    isLoading: PropTypes.bool
};

Button.defaultProps = {
    use: 'button',
    isLoading: false
};

export default Button;