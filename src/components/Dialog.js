import { useRef } from 'react';
import PropTypes from 'prop-types';
import { XIcon } from '@heroicons/react/outline';
import OutsideClickHandler from 'react-outside-click-handler';
import { CSSTransition } from 'react-transition-group';

function Dialog(props) {

    const { 
        children = null,
        isOpen = false, 
        setIsOpen = () => {}, 
    } = props;

    const transitionNodeRef = useRef(null);

    return (
        <CSSTransition 
            in={ isOpen } 
            timeout={ 500 } 
            classNames="transition__dialog"
            nodeRef={ transitionNodeRef }
        >
            <div 
                className={ `fixed hidden z-10 inset-0 overflow-y-auto` } 
                aria-labelledby="modal-title" 
                role="dialog" 
                aria-modal="true"
                key="dialog"
                ref={ transitionNodeRef }
            >
                <div 
                    className={
                        `flex items-end justify-center min-h-screen p-4 text-center 
                        sm:block sm:p-0`
                    }
                >
                    <div className="transition__dialog__background bg-gray-900 bg-opacity-80 fixed top-0 right-0 bottom-0 left-0 overflow-y-scroll">
                        <div className="w-full">
                            <div 
                                className={
                                    `transition__dialog__content relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 
                                    b-4 text-left overflow-hidden shadow-xl transition-all w-full sm:my-8 
                                    sm:align-middle sm:max-w-lg sm:p-6`
                                }
                            >   
                                <OutsideClickHandler onOutsideClick={ () => setIsOpen(false) }>
                                    <div className="absolute top-0 right-0 pt-4 pr-4">
                                        <button 
                                            type="button" 
                                            className={ 
                                                `bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none
                                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`
                                            }
                                            onClick={ () => setIsOpen(false) }
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <XIcon className="h-6 w-6" />
                                        </button>
                                    </div>

                                    { children }

                                </OutsideClickHandler>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
}

Dialog.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func
};

export default Dialog;