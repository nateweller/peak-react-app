import { useHistory } from 'react-router';
import Card from './Card';

function ClimbCard(props) {

    const { data, className } = props;

    const history = useHistory();

    return (
        <Card className={className} onClick={() => history.push(`/climbs/${data.id}`)}>
            <h2 className="font-semibold text-lg mb-2">
                {data.name}
            </h2>
            <div className="flex space-x-8 text-sm">

                {Boolean(data.grade) && (
                    <div>
                        {data.grade.name}
                    </div>
                )}

                {Boolean(data.color) && (
                    <div>
                        <div className="flex items-center">
                            <div className="h-3 w-3 mr-2 rounded-full bg-gray-300" style={{ backgroundColor: data?.color?.color }} />
                            <span>
                                { data?.color?.name }
                            </span>
                        </div>
                    </div>
                )}

                {Boolean(data.discipline) && (
                    <div>
                        {data.discipline}
                    </div>
                )}
            </div>
        </Card>
    );
}

export default ClimbCard;