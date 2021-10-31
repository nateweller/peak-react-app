import { useCallback, useReducer } from 'react';
import Alert from '../components/Alert';

function useAlerts() {

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return [...state, action.payload];
            case 'REPLACE':
                return [action.payload];
            case 'CLEAR':
                return [];
            default:
                throw new Error();
        }
    };

    const [alerts, dispatch] = useReducer(reducer, []);

    const add = useCallback((alert) => {
        dispatch({ type: 'ADD', payload: alert });
    }, []);

    console.log('useAlerts() re-renders');

    return {
        add,
        replace: (alert) => dispatch({ type: 'REPLACE', payload: alert }),
        clear: () => dispatch({ type: 'CLEAR' }),
        render: (wrapperClassName) => {
            if (! alerts || ! alerts.length) {
                return null;
            }
            
            return (
                <div className={ wrapperClassName }>
                    { alerts.map((alert, loopIndex) => (
                        <Alert
                            type={ alert.type }
                            key={ loopIndex }
                            className={ loopIndex !== alerts.length - 1 ? 'mb-4' : '' }
                            isDismissable={ alert.isDismissable || false }
                            afterDismissed={ () => {
                                dispatch({ 
                                    type: 'REPLACE', 
                                    payload: [
                                        ...alerts.slice(0, loopIndex),
                                        ...alerts.slice(loopIndex + 1)
                                    ]
                                });
                            } }
                        >
                            { alert.message }
                        </Alert>
                    )) }
                </div>
            );
        }
    }
}

export default useAlerts;