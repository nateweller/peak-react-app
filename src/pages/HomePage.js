import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { Formik } from 'formik';
import { useDataStoreItem, useAlerts } from '../hooks';
import Select from '../components/Select';
import Table from '../components/Table';
import AppLayout from '../layouts/AppLayout';
import LoadingIcon from '../components/LoadingIcon';
import Button from '../components/Button';
import ClimbCard from '../components/ClimbCard';

function HomePage() {

    const alerts = useAlerts();
    
    const history = useHistory();

    const [dataStoreItemKey, setDataStoreItemKey] = useState('climbs');

    const { useData: data, error, isLoading } = useDataStoreItem(dataStoreItemKey, { useCache: true, alwaysFetch: true });

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

    const filters = (
        <Formik initialValues={ { sort: 'date' } } onSubmit={() => {}}>
            { ({setFieldValue}) => (
                <Select 
                    name="sort"
                    label="Sort By"
                    onChange={(e) => {
                        console.log('changed', e.target.value);
                        setDataStoreItemKey(`climbs?sort=${e.target.value}`);
                        setFieldValue('sort', e.target.value);
                    } }
                    options={ [
                        {
                            label: 'Date Added',
                            value: 'date'
                        },
                        {
                            label: 'Grade',
                            value: 'grade'
                        }
                    ] }
                />
            )}
        </Formik>
    );

    const renderClimbCards = () => {
        if (data === undefined && isLoading) {
            return <LoadingIcon isLarge={ true } />;
        }

        if (! data || ! data.length) {
            return null;
        }

        return (
            <div className="md:hidden flex-col space-y-4">
                { data.map(climbData => <ClimbCard key={climbData.id} data={climbData} />) }
            </div>
        );
    };

    const renderClimbsTable = () => {
        if (data === undefined && isLoading) {
            return <LoadingIcon isLarge={ true } />;
        }

        return (
            <Table 
                className="hidden md:block"
                data={Boolean(data?.length) && data.reduce((data, climbData) => {
                    data.push({
                        onClick: () => history.push(`/climbs/${climbData.id}`),
                        columns: [
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
                                label: 'Grade',
                                value: <span className="text-sm">{ climbData?.grade?.name || 'N/A' }</span>
                            },
                            {
                                label: 'Color',
                                value: (
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 mr-2 rounded-full bg-gray-200" style={{ backgroundColor: climbData?.color?.color }} />
                                        <span className="text-sm">{ climbData?.color?.name }</span>
                                    </div>
                                )
                            },
                            {
                                label: 'Discipline',
                                value: <span className="text-sm">{ climbData.discipline }</span>
                            },
                            {
                                label: 'Sends',
                                value: <span className="text-sm">{ climbData.send_count }</span>
                            }
                        ]
                    });
                    return data;
                }, [])}
                onRowClick={(rowItem) => history.push(`/climbs/${rowItem.id}`)}
            />
        )
    };

    return (
        <AppLayout header={ pageHeader } isBorderless={ true }>
            { alerts.render() }
            { filters }
            { renderClimbCards() }
            { renderClimbsTable() }
        </AppLayout>
    );
}

export default HomePage;