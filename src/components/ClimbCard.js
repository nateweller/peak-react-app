import { useHistory } from 'react-router';
import invert from 'invert-color';
import { BiStar } from 'react-icons/bi';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { Card, CardBody, CardHeader } from './Card';
import { hexToRgb, getContrastTextColor } from '../utils';

function ClimbCard(props) {

    const { data, className } = props;

    const history = useHistory();

    return (
        <Card className={className} onClick={() => history.push(`/climbs/${data.id}`)}>
            <CardHeader>
                <h2 className="text-lg flex space-x-2 items-center">
                    { Boolean(data.color) && (
                        <div 
                            className="h-6 px-2 rounded-lg text-sm bg-gray-300 flex items-center" 
                            style={ { 
                                backgroundColor: data?.color?.color, 
                                // color: invert(data?.color?.color, true),
                                color: getContrastTextColor(hexToRgb(data?.color?.color)),
                                minWidth: '1.5rem'
                            } }
                        >
                            <span className="font-semibold">
                                { data?.grade?.name }
                            </span>
                        </div>
                    ) }
                    
                    <span>
                        { data.name }
                    </span>
                </h2>
            </CardHeader>
            <CardBody>
                <div className="flex text-xs text-gray-600">
                    <span className="flex-1">
                        <IoPeopleCircleOutline className="inline-block mr-2 text-lg -mt-0.5" />
                        {data?.send_count || 0} Sends Logged
                    </span>
                    <span className="flex-1">
                        <BiStar className="inline-block mr-2 text-lg -mt-0.5" />
                        {data?.average_rating} / 5 Stars
                    </span>
                </div>
            </CardBody>
        </Card>
    );
}

export default ClimbCard;