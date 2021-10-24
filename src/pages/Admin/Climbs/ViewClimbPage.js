import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { useDataStoreItem } from './../../../hooks';
import AdminLayout from '../../../layouts/AdminLayout';
import Button from '../../../components/Button';
import InfoList from './../../../components/InfoList';
import { Card } from './../../../components/Card';

function ViewClimb(props) {

    const climbId = props.match.params.climbId;

    const climbURL = `${process.env.REACT_APP_URL}/climbs/${climbId}`;

    const { useData: climb } = useDataStoreItem(`climbs/${climbId}`);

    const pageHeader = (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                    { climb?.name }
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
        <AdminLayout header={pageHeader} isBorderless={ true }>
            <Card>
                <InfoList
                    isLoading={ climb === undefined }
                    info={[
                        {
                            label: 'Name',
                            value: climb?.name || ''
                        },
                        {
                            label: 'Discipline',
                            value: climb?.discipline || ''
                        },
                        {
                            label: 'Grade',
                            value: climb?.grade?.name || ''
                        },
                        {
                            label: 'Color',
                            value: climb?.color?.name || ''
                        },
                        {
                            label: 'Community Grade',
                            value: 
                                climb?.community_grade
                                    ? <>
                                        { climb?.community_grade?.name } 
                                        {' '}
                                        <span className="text-xs text-gray-400">
                                            ({ climb?.community_grade?.vote_count } votes)
                                        </span>
                                    </>
                                    : 'No Votes'
                        },
                        {
                            label: 'Total Sends',
                            value: climb?.send_count !== undefined ? climb.send_count : ''
                        },
                        {
                            label: 'QR Code',
                            value: (
                                <div data-qr={climbURL}>
                                    <QRCode value={climbURL} />
                                </div>
                            )
                        }
                    ]}
                />
            </Card>
        </AdminLayout>
    );
}

export default ViewClimb;