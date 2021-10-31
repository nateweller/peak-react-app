import PropTypes from 'prop-types';
import { BiLoaderAlt } from 'react-icons/bi';

function Button(props) {

    const { 
        children = null, 
        className: customClassName = '', 
        disabled = false, 
        form,
        href, 
        isLoading = false,
        onClick,
        to,
        type = 'button', 
        use: Use = 'button'
    } = props;

    const className = `py-2 px-4 border border-transparent rounded-md shadow-sm 
                       md:text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 
                       disabled:opacity-50 disabled:bg-indigo-500 ${customClassName}`;

    return (
        <Use
            className={ className }
            disabled={ disabled }
            form={ form }
            href={ href }
            onClick={ onClick }
            to={ to }
            type={ type }
        >
            { children }
            { isLoading && (
                <span className="inline-block ml-2 animate-spin">
                    <BiLoaderAlt className="h-4 w-4 text-indigo-400" />
                </span>
            ) }
        </Use>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    form: PropTypes.string,
    href: PropTypes.string,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
    to: PropTypes.string,
    type: PropTypes.string
};

export default Button;