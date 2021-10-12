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
    const { useData: climbData } = useDataStoreItem(`climbs/${climbId}`, { useCache: true, alwaysFetch: true });
    const [showSendForm, setShowSendForm] = useState(false);

    const getClimbInfo = () => {
        return [
            {
                label: 'Name',
                value: climbData !== undefined ? (climbData?.name || 'Unnamed Climb') : ''
            },
            {
                label: 'Discipline',
                value: climbData !== undefined ? climbData?.discipline || 'Unknown' : ''
            },
            {
                label: 'Grade',
                value: climbData !== undefined ? (climbData?.grade?.name || 'Ungraded') : ''
            },
            {
                label: 'Community Grade',
                value: 
                    climbData?.community_grade
                        ? <>
                            {climbData?.community_grade?.name} 
                            {' '}
                            <span className="text-xs text-gray-400">
                                ({climbData?.community_grade?.vote_count} votes)
                            </span>
                          </>
                        : 'No Votes'
            },
            {
                label: 'Total Sends',
                value: climbData?.send_count !== undefined ? climbData.send_count : ''
            }
        ];
    }

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 
                    className={`${climbData === undefined ? 'opacity-0' : 'opacity-100'} text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate transition`}
                >
                    { climbData?.name || 'Unnamed Climb'}
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