import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import { API } from '../../../api';

function ViewClimb(props) {

    const climbId = props.match.params.climbId;

    const climbURL = `${process.env.REACT_APP_URL}/climbs/${climbId}`;

    const [climbData, setClimbData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (! climbData && ! isLoading) {
            setIsLoading(true);
            API.get(`climbs/${climbId}`)
                .then(response => setClimbData(response.data))
                .catch(err => console.error(err))
                .finally(() => setIsLoading(false));
        }
    }, [climbData, climbId, isLoading]);

    if (! climbData) return null;

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    { climbData?.name || 'Unnamed Climb' }
                </h2>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                    <div className="mt-2 flex items-center text-sm text-gray-300">
                        {/* <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" aria-hidden="true" /> */}
                        { climbData?.discipline }
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-300">
                        {/* <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" aria-hidden="true" /> */}
                        { climbData?.grade || 'Ungraded' }
                    </div>
                </div>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button className="inline-flex items-center">
                    Edit
                </Button>
            </div>
        </div>
    );

    return (
        <AdminLayout header={pageHeader}>
            <div data-qr={climbURL}>
                <QRCode value={climbURL} />
            </div>
        </AdminLayout>
    );
}

export default ViewClimb;