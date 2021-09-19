import { useState, useEffect } from 'react';

function useLoadingMonitor(requirements) {

    const [requirementsLoaded, setRequirementsLoaded] = useState(false);
    const [isWorking, setIsWorking] = useState(false);

    useEffect(() => {

        // check if any requirements are not met => still loading
        if (requirementsLoaded) {
            requirements.forEach(requirement => {
                if (requirement === undefined && requirementsLoaded) {
                    setRequirementsLoaded(false);
                    return;
                }
            });
        }
        
        // all requirements met => done loading
        setRequirementsLoaded(true);

    }, [requirements, requirementsLoaded]);

    return {
        isWorking,
        requirementsLoaded,
        isLoading: ! requirementsLoaded || isWorking,
        setIsWorking: (working) => setIsWorking(working)
    };
}

export default useLoadingMonitor;