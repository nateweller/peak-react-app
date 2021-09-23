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
        render: () => {
            return (
                alerts.map((alert, loopIndex) => (
                    <Alert
                        type={ alert.type }
                        key={ loopIndex }
                        className={ loopIndex !== alerts.length - 1 ? 'mb-4' : '' }
                    >
                        { alert.message }
                    </Alert>
                ))
            );
        }
    }
}

export default useAlerts;