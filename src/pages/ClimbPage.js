import { useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import SendForm from '../forms/SendForm';
import Dialog from '../components/Dialog';
import InfoList from '../components/InfoList';
import Button from '../components/Button';
import { useDataStore, useDataStoreItem } from '../hooks';

function ClimbPage(props) {

    const climbId = props.match.params.climbId;
    
    const dataStore = useDataStore();
    const { dataSynced: climbData } = useDataStoreItem(`climbs/${climbId}`, { useCache: true, syncCache: true });

    const [showSendForm, setShowSendForm] = useState(false);

    const getClimbInfo = () => {
        if (climbData === undefined) return undefined;
        if (! climbData || climbData.length) return [];

        return [
            {
                label: 'Name',
                value: climbData.name
            },
            {
                label: 'Discipline',
                value: climbData.discipline
            },
            {
                label: 'Grade',
                value: climbData.grade
            },
            {
                label: 'Total Sends',
                value: climbData.send_count
            }
        ];
    }

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    { climbData?.name }
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button 
                    className="inline-flex items-center"
                    onClick={ () => setShowSendForm(true) }    
                >
                    Send It
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <AppLayout header={ pageHeader } isBorderless={ true }>
                <InfoList info={ getClimbInfo() } />
            </AppLayout>

            <Dialog isOpen={ showSendForm } setIsOpen={ setShowSendForm }>
                <h2 className="text-2xl font-bold mb-8">Log Your Send</h2>
                <SendForm 
                    sendId="new" 
                    climbId={ climbId }
                    afterSubmit={ () => {
                        setShowSendForm(false);
                        dataStore.get(`climbs/${climbId}`);
                    } }
                />
            </Dialog>
        </>
    );
}

export default ClimbPage;