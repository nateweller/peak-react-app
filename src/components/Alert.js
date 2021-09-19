import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

function Alert(props) {

    const { 
        type, 
        children, 
        className: customClassName 
    } = props;

    const getClassName = () => {
        let className = `rounded-md p-4`;
        console.log(type);

        switch (type) {
            case 'success':
                className += ' bg-green-50 text-green-800';
                break;
            case 'danger':
                className += ' bg-red-50 text-red-800';
                break;
            case 'info':
            default: 
                className += ' bg-indigo-50 text-indigo-800';
                break;
        }

        className += ` ${customClassName}`;

        return className;
    };

    const renderIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />;
            case 'danger':
                return <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />;
            case 'info':
            default:
                return null;
        }
    };

    return (
        <div className={ getClassName() }>
            <div className="flex">
                <div className="flex-shrink-0">
                    { renderIcon() }
                </div>
                <div className="ml-3">
                    <div className="text-sm font-medium">
                        { children }
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Alert;