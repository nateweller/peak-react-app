import PropTypes from 'prop-types';

export function Card(props) {

    const { 
        children = null, 
        className: customClassName = '',
        onClick 
    } = props;

    let className = 'bg-white overflow-hidden shadow rounded-lg';
    if (typeof onClick === 'function') {
        className += ' cursor-pointer transform hover:scale-105 transition-all';
    }
    className += ` ${customClassName}`;

    return (
        <div className={ className } onClick={ onClick }>
            { children }
        </div>
    );
}

Card.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

export function CardHeader(props) {

    const { children } = props;

    return (
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            { children }
        </div>
    );
}

export function CardBody(props) {

    const { children } = props;

    return (
        <div className="px-4 py-3">
            { children }
        </div>
    );
}