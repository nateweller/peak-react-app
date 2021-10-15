import { useState } from 'react';
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    InformationCircleIcon, 
    XIcon 
} from '@heroicons/react/solid';

function Alert(props) {

    const { 
        afterDismissed = () => {},
        children = null, 
        className: customClassName,
        isDismissable = false,
        type = 'info'
    } = props;

    const [isDismissed, setIsDismissed] = useState(false);

    const getClassName = () => {
        let className = 'rounded-md p-4';

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

        if (customClassName) {
            className += ` ${customClassName}`;
        }

        if (isDismissed) {
            className += ' hidden';
        }

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
                return <InformationCircleIcon className="h5 w-5 text-indigo-400" aria-hidden="true" />;
        }
    };

    const renderCloseIcon = () => {
        let colorClassName;
        switch (type) {
            case 'success':
                colorClassName = 'text-green-400';
                break;
            case 'danger':
                colorClassName = 'text-red-400';
                break;
            case 'info':
            default:
                colorClassName = '';
        }
        return <XIcon className={ `h-4 w-4 ${colorClassName}` } />;
    };

    return (
        <div className={ getClassName() }>
            <div className="flex">
                <div className="flex-shrink-0">
                    { renderIcon() }
                </div>
                <div className="flex-1 ml-3">
                    <div className="text-sm font-medium">
                        { children }
                    </div>
                </div>
                { isDismissable && 
                    <div 
                        className="flex-shrink-0 flex items-center cursor-pointer"
                        onClick={ () => {
                            setIsDismissed(true);
                            afterDismissed(); 
                        } }
                    >
                        { renderCloseIcon() }
                    </div>
                }
            </div>
        </div>
    );

}

export default Alert;