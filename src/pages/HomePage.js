import { Link } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { useDataStoreItem, useAlerts } from '../hooks';
import Table from '../components/Table';
import AppLayout from '../layouts/AppLayout';
import LoadingIcon from '../components/LoadingIcon';
import Button from '../components/Button';
import { useEffect } from 'react';

function HomePage() {

    const alerts = useAlerts();
    const { data, error, isLoading } = useDataStoreItem('climbs', { useCache: true, alwaysFetch: true });

    useEffect(() => {
        if (error) {
            alerts.replace({
                type: 'danger',
                message: error?.message || 'Error'
            });
        }
    }, [error, alerts]);

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
        if (isLoading) {
            return <LoadingIcon isLarge={ true } />;
        }

        return (
            <Table 
                data={Boolean(data?.length) && data.reduce((data, climbData) => {
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
                            value: <span className="text-sm">{ climbData?.grade?.name }</span>
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
            { alerts.render() }
            { renderClimbsTable() }
        </AppLayout>
    );
}

export default HomePage;