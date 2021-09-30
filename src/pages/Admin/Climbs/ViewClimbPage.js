import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    { climbData?.name }
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Button use={ Link } to={ `/admin/climbs/${climbId}/edit` } className="inline-flex items-center">
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