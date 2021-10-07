import { XIcon } from '@heroicons/react/outline';
import OutsideClickHandler from 'react-outside-click-handler';

function Dialog(props) {

    const { isOpen, setIsOpen, children } = props;

    return (
        <div className={ `${ isOpen ? 'fixed' : 'hidden' } z-10 inset-0 overflow-y-auto` } aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen p-4 text-center bg-gray-900 bg-opacity-75 sm:block sm:p-0">
                <OutsideClickHandler onOutsideClick={ () => setIsOpen(false) } >
                    <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg sm:p-6">
                        <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                            <button 
                                type="button" 
                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={ () => setIsOpen(false) }
                            >
                                <span className="sr-only">Close</span>
                                <XIcon className="h-6 w-6" />

                            </button>
                        </div>
                        { children }
                    </div>
                </OutsideClickHandler>
            </div>
        </div>
    );
}

export default Dialog;