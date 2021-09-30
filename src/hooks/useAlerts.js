import { useState } from 'react';
import Alert from '../components/Alert';

function useAlerts() {
    const [alerts, setAlerts] = useState([]);

    return {
        add: (alert) => {
            setAlerts([ ...alerts, alert ]);
        },
        clear: () => {
            setAlerts([]);
        },
        replace: (alert) => {
            setAlerts([ alert ]);
        },
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
                                setAlerts(
                                    ...alerts.slice(0, loopIndex),
                                    ...alerts.slice(loopIndex + 1)
                                );
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