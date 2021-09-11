import { CheckCircleIcon } from '@heroicons/react/solid';

function Alert(props) {

    const { type, children, className: customClassName } = props;

    let className = `rounded-md bg-green-50 p-4`;

    switch (type) {
        case 'success':
            className += 'bg-green-50 text-green-800';
            break;
        case 'danger':
            className += '';
            break;
        case 'info':
        default: 
            className += '';
            break;
    }

    className += ` ${customClassName}`;

    return (
        <div className={ className }>
            <div className="flex">
                <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <div className="text-sm text-green-800 font-medium">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Alert;