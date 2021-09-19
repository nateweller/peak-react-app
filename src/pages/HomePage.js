import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { API } from '../api';
import Table from '../components/Table';
import AppLayout from '../layouts/AppLayout';
import LoadingIcon from '../components/LoadingIcon';
import Button from '../components/Button';

function HomePage() {

    const [climbsData, setClimbsData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (climbsData === undefined && ! isLoading) {
            setIsLoading(true);
            API.get('climbs')
                .then(response => setClimbsData(response.data))
                .catch(err => {
                    console.error(err);
                    setClimbsData([]);
                })
                .finally(() => setIsLoading(false));
        }
    }, [climbsData, isLoading]);

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-white">
                    Explore Climbs
                </h1>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                { Capacitor.isNativePlatform() &&
                    <Button 
                        use={ Link }
                        to="/scan"
                        className="inline-flex items-center" 
                    >
                        Scan QR
                    </Button>
                }
            </div>
        </div>
    );

    const renderClimbsTable = () => {
        if (! climbsData) {
            return <LoadingIcon isLarge={ true } />;
        }

        return (
            <Table 
                data={climbsData.reduce((data, climbData) => {
                    data.push([
                        {
                            label: 'Climb',
                            value: (
                                <Link 
                                    to={`/climbs/${climbData.id}`} 
                                    className="list-group-item list-group-item-action text-sm" 
                                >
                                    { climbData.name }
                                </Link>
                            )
                        },
                        {
                            label: 'Discipline',
                            value: <span className="text-sm">{ climbData.discipline }</span>
                        },
                        {
                            label: 'Grade',
                            value: <span className="text-sm">{ climbData.grade }</span>
                        },
                        {
                            label: 'Sends',
                            value: <span className="text-sm">{ climbData.send_count }</span>
                        },
                        {
                            label: '',
                            value: (
                                <div className="text-right text-sm font-medium">
                                    <Button use={ Link } to={ `/climbs/${climbData.id}` }>
                                        View
                                    </Button>
                                </div>
                            )
                        }
                    ]);
                    return data;
                }, [])}
            />
        )
    };

    return (
        <AppLayout header={ pageHeader } isBorderless={ true }>
            { renderClimbsTable() }
        </AppLayout>
    );
}

export default HomePage;