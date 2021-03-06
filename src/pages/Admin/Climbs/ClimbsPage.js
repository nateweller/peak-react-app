import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingIcon from '../../../components/LoadingIcon';
import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/solid';

import { Table, TableBody, TableCell, TableHead, TableHeading, TableRow } from '../../../components/Table';
import { useDataStoreItem } from '../../../hooks';
import { disciplines } from '../../../enums';

function ClimbsPage() {

    const { useData: climbs, error } = useDataStoreItem('climbs');

    const [activeRowIndex, setActiveRowIndex] = useState(null);

    const climbsList = () => {

        if (climbs === undefined && error) {
            return (
                <div className="text-center py-24">
                    <EmojiSadIcon className="inline-block w-8 h-8 text-indigo-500 mb-2" />
                    <p className="text-xs text-gray-500">
                        Data could not be loaded: { error?.message || 'Unknown Error'}
                    </p>
                </div>
            );
        }

        if (climbs === undefined) {
            return <LoadingIcon isLarge={true} />;
        }

        if (! climbs.length) {
            return (
                <div className="text-center py-10">
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
            <>
                <Table>
                    <TableHead>
                        <TableHeading>
                            Climb
                        </TableHeading>
                        <TableHeading>
                            Discipline
                        </TableHeading>
                        <TableHeading>
                            Color
                        </TableHeading>
                        <TableHeading>
                            Grade
                        </TableHeading>
                        <TableHeading>
                            Sends
                        </TableHeading>
                        <TableHeading>
                            {/* Controls */}
                        </TableHeading>
                    </TableHead>
                    <TableBody>
                        {climbs.map((climb, loopIndex) => (
                            <TableRow 
                                onMouseOver={() => setActiveRowIndex(loopIndex)}
                                onMouseOut={() => setActiveRowIndex(null)}
                                className={`${activeRowIndex === loopIndex && 'bg-gray-50'}`}
                                key={ climb.id }
                            >
                                <TableCell>
                                    <Link 
                                        to={`/admin/climbs/${climb.id}`} 
                                        className="list-group-item list-group-item-action text-sm" 
                                    >
                                        { climb.name }
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        { disciplines[climb?.discipline] || 'N/A' }
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className="w-3 h-3 mr-2 rounded-full bg-gray-200" style={{ backgroundColor: climb?.color?.color }} />
                                        <span className="text-sm">{ climb?.color?.name }</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        { climb?.grade?.name }
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">
                                        { climb.send_count }
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className={`text-right text-sm font-medium ${activeRowIndex !== loopIndex && 'invisible'}`}>
                                        <Link to={ `/admin/climbs/${climb.id}` } className="link mr-4">
                                            View
                                        </Link>
                                        <Link to={ `/admin/climbs/${climb.id}/edit` } className="link">
                                            Edit
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
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
        <AdminLayout header={pageHeader} isBorderless={ true }>
            { climbsList() }
        </AdminLayout>
    );

}

export default ClimbsPage;