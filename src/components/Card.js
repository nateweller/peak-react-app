import PropTypes from 'prop-types';

function Card(props) {

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
            <div className="px-4 py-3">
                { children }
            </div>
        </div>
    );
}

Card.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func
};

export default Card;