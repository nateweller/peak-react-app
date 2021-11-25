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
import { disciplines } from '../enums';

function HomePage() {

    const { add: addAlert, render: renderAlerts } = useAlerts();
    
    const history = useHistory();

    const [filters, setFilters] = useState({
        sort: 'date_desc',
        discipline: ''
    });
    
    const dataStoreItemKey = Object.keys(filters).reduce((carry, filterKey, loopIndex) => {
        if (filters[filterKey] !== null) {
            carry += `${filterKey}=${filters[filterKey]}`;
            if (loopIndex < Object.keys(filters).length - 1) {
                carry += '&';
            }
        }
        return carry;
    }, `climbs?`);

    const { useData: data, error, isLoading } = useDataStoreItem(dataStoreItemKey, { useCache: true, alwaysFetch: true });

    useEffect(() => {
        if (error) {
            addAlert({
                type: 'danger',
                message: error?.message || 'Error'
            });
        }
    }, [error, addAlert]);

    const getDaysOld = (date1, date2) => {
        const difference = date1.getTime() - date2.getTime();
        return Math.ceil(difference / (1000 * 3600 * 24)) * -1;
    };

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-white">
                    Explore Climbs
                </h1>
            </div>
        </div>
    );

    const Filters = () => (
        <div className="flex flex-wrap w-full md:justify-end">
            <Formik 
                initialValues={ filters } 
                onSubmit={ () => {} } 
            >
                { () => (
                    <>
                        <Select 
                            name="discipline"
                            darkMode={ true }
                            onChange={ (e) => {
                                setFilters({ ...filters, discipline: e.target.value });
                            } }
                            options={ [
                                { value: '', label: 'All Types' },
                                ...Object.keys(disciplines).map(disciplineKey => ({
                                    label: disciplines[disciplineKey],
                                    value: disciplineKey
                                })) 
                            ] }
                            className="flex-1 mb-4 md:flex-none"
                        />
                        <Select 
                            name="sort"
                            darkMode={true}
                            onChange={(e) => {
                                setFilters({ ...filters, sort: e.target.value });
                            } }
                            options={ [
                                {
                                    label: 'Most Recent',
                                    value: 'date_desc'
                                },
                                {
                                    label: 'Oldest',
                                    value: 'date_asc'
                                },
                                {
                                    label: 'Easiest',
                                    value: 'grade_asc'
                                },
                                {
                                    label: 'Most Difficult',
                                    value: 'grade_desc'
                                }
                            ] }
                            className="flex-1 mb-4 ml-4 md:flex-none"
                        />
                    </>
                )}
            </Formik>
            { Capacitor.isNativePlatform() && 
                <Button 
                    use={ Link }
                    to="/scan"
                    className="inline-flex items-center w-full mb-4 md:w-auto md:ml-4" 
                >
                    Scan QR
                </Button>
            }
        </div>
    );

    const renderClimbCards = () => {
        if (data === undefined && isLoading) {
            return (
                <div className="md:hidden">
                    <LoadingIcon isLarge={ true } />
                </div>
            );
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
        return (
            <Table 
                className="hidden md:block"
                isLoading={ data === undefined && isLoading }
                data={ (() => {
                    if (data === undefined) return data;
                    if (! data) return null;

                    return data.reduce((data, climbData) => {
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
                                    value: <span className="text-sm">{ disciplines[climbData.discipline] }</span>
                                },
                                {
                                    label: 'Sends',
                                    value: <span className="text-sm">{ climbData.send_count }</span>
                                },
                                {
                                    label: 'Days Old',
                                    value: <span className="text-sm">{ getDaysOld(new Date(climbData.created_at), new Date()) }</span>
                                }
                            ]
                        });
                        return data;
                    }, []);
                })() }
                onRowClick={(rowItem) => history.push(`/climbs/${rowItem.id}`)}
                emptyContent={(
                    <p className="py-24 text-center">No Results</p>
                )}
            />
        )
    };

    return (
        <AppLayout header={ pageHeader } isBorderless={ true }>
            { renderAlerts("mb-4") }
            <Filters />
            { renderClimbCards() }
            { renderClimbsTable() }
        </AppLayout>
    );
}

export default HomePage;