import { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { XIcon } from '@heroicons/react/solid';

export default function Toast(props) {

    const { 
        children,
        color = 'indigo',
        duration
    } = props;

    const [isVisible, setIsVisible] = useState(true);

    const containerRef = useRef(null);
    const closeButtonDurationRef = useRef(null);

    let containerColorClassNames = 'bg-indigo-500 text-white';
    let closeButtonColorClassNames = 'border-indigo-600 hover:bg-indigo-600 hover:border-indigo-700';
    if (color === 'red') {
        containerColorClassNames = 'bg-red-500 text-white';
        closeButtonColorClassNames = 'border-red-600 hover:bg-red-600 hover:border-red-700';
    } else if (color === 'green') {
        containerColorClassNames = 'bg-green-500 text-white';
        closeButtonColorClassNames = 'border-green-600 hover:bg-green-600 hover:border-green-700';
    }

    useEffect(() => {
        if (duration) {
            setTimeout(() => {
                setIsVisible(false);
            }, duration);
        }
    }, [duration]);

    return (
        <div className="fixed bottom-0 right-0">
            <CSSTransition
                in={ isVisible }
                timeout={ 500 }
                classNames="transition__toast"
                nodeRef={ containerRef }
                appear
            >
                <div 
                    ref={ containerRef } 
                    className={ `transition__toast mr-4 mb-4 rounded-md flex overflow-hidden ${containerColorClassNames}` }
                >
                    <button 
                        className={`
                            relative p-4 border-r transition-all
                            ${closeButtonColorClassNames}
                        `}
                        onClick={ () => setIsVisible(false) }
                    >
                        <XIcon className="w-5 h-5 relative z-10" />
                        { Boolean(duration || true) && (
                            <CSSTransition
                                in={ Boolean(duration) }
                                timeout={ duration }
                                nodeRef={ closeButtonDurationRef }
                                classNames="transition__toast__duration"
                                appear
                            >
                                <div 
                                    ref={ closeButtonDurationRef }
                                    className="transition__toast__duration absolute top-0 left-0 h-full bg-green-600" 
                                    style={{ transition: `all ${duration}ms linear`}} 
                                />
                            </CSSTransition>
                        ) }
                    </button>
                    <div className="p-4">
                        { children }
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}