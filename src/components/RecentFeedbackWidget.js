import { useDataStoreItem } from './../hooks';
import { Card, CardHeader } from './../components/Card';
import LoadingIcon from './../components/LoadingIcon';
import InfoList from './../components/InfoList';

function RecentFeedbackWidget() {

    const { useData: feedbackList } = useDataStoreItem('sends?has_feedback=1');

    const renderFeedback = () => {
        if (feedbackList === undefined) return <LoadingIcon />;
        
        if (! feedbackList || ! feedbackList.length) {
            return (
                <p className="text-center p-8">No results.</p>
            );
        }

        return feedbackList.map((feedback, loopIndex) => (
            <InfoList 
                key={ loopIndex }
                info={ [
                    { label: 'Climb', value: feedback?.climb?.name },
                    { label: 'Rating', value: feedback?.rating ? `${feedback.rating}/5` : '' },
                    { label: 'Grade', value: feedback?.grade?.name },
                    { label: 'Feedback', value: feedback?.feedback }
                ] }
            />
        ));
    };

    return (
        <Card>
            <CardHeader>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Recent Feedback
                </h3>
            </CardHeader>
            { renderFeedback() }
        </Card>
    );
}

export default RecentFeedbackWidget;