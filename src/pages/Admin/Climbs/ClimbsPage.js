import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsLoading, setScreenTitle } from '../../../redux-store';
import { API } from '../../../api';
import LoadingIcon from '../../../components/LoadingIcon';
import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';

import Table from '../../../components/Table';
import Alert from '../../../components/Alert';

function ClimbsPage() {

    const dispatch = useDispatch();

    const [alert, setAlert] = useState(null);

    const [climbs, setClimbs] = useState(null);

    const loadClimbs = useCallback(() => {
        dispatch(setIsLoading(true));
        API.get('climbs')
            .then(response => {
                setClimbs(response.data);
            })
            .catch(error => {
                setAlert({
                    message: `Could not load climbs due to the following error: ${error.message}.`,
                    type: 'danger'
                });
            })
            .finally(() => {
                dispatch(setIsLoading(false));
            });
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(setScreenTitle('Climbs'));
        loadClimbs();
        return () => {};
    }, [dispatch, loadClimbs]);

    const climbsList = () => {
        if (!climbs) {
            return <LoadingIcon isLarge={true} />
        }

        if (!climbs.length) {
            return (
                <div className="text-center my-10">
                    <EmojiHappyIcon className="mx-auto h-12 w-12 text-gray-400 stroke-1" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No climbs set... yet!
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Get started by setting a new climb.
                    </p>
                    <div className="mt-6">
                        <Button use={Link} to="/admin/climbs/new" className="inline-flex items-center">
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            Set a Climb
                        </Button>
                    </div>
                </div>
            );
        }
        
        return (
            <Table 
                data={climbs.reduce((data, climb) => {
                    data.push([
                        {
                            label: 'Climb',
                            value: (
                                <Link 
                                    to={`/admin/climbs/${climb.id}`} 
                                    className="list-group-item list-group-item-action text-sm" 
                                >
                                    { climb.name }
                                </Link>
                            )
                        },
                        {
                            label: 'Grade',
                            value: <span className="text-sm">{ climb.grade }</span>
                        }
                    ]);
                    return data;
                }, [])}
            />
            // <div className="list-group">
            //     {climbs.map((climb, key) => {
            //         return (
            //             <Link 
            //                 to={`/climbs/${climb.id}`} 
            //                 className="list-group-item list-group-item-action" 
            //                 key={key}
            //             >
            //                 {climb.name}
            //             </Link>
            //         );
            //     })}
            //     {!climbs.length && (<div className="list-group-item text-center">No Results.</div>)}
            // </div>
        );
    };

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    Climbs
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button use={ Link } to="/admin/climbs/new" className="inline-flex items-center">
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    New Climb
                </Button>
            </div>
        </div>
    );

    return (
        <AdminLayout header={pageHeader}>
            {alert && (
                <Alert type={ alert.type } className="mb-3">
                    {alert.message}
                </Alert>
            )}

            { climbsList() }
        </AdminLayout>
    );

}

export default ClimbsPage;