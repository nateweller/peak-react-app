function Card(props) {

    const { 
        children, 
        className: customClassName, 
        onClick 
    } = props;

    let className = 'bg-white overflow-hidden shadow rounded-lg';
    if (onClick) {
        className += ' cursor-pointer transform hover:scale-105 transition-all';
    }
    className += ` ${customClassName}`;

    return (
        <div className={ className } onClick={onClick}>
            <div className="px-4 py-3">
                { children }
            </div>
        </div>
    );
}

export default Card;