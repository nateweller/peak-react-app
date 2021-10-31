import AdminLayout from '../../layouts/AdminLayout';
import { Card, CardHeader, CardBody } from '../../components/Card';
import GradeDistributionChart from '../../components/GradeDistributionChart';
import RecentFeedbackWidget from '../../components/RecentFeedbackWidget';

function HomePage() {
    
    const pageHeader = (
        <h1 className="text-3xl font-bold text-white">
            Dashboard
        </h1>
    );

    return (
        <AdminLayout header={pageHeader} isBorderless={ true }>
            <Card className="mb-8">
                <CardHeader>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Current Grade Distribution
                    </h3>
                </CardHeader>
                <CardBody>
                    <GradeDistributionChart />
                </CardBody>
            </Card>
            <RecentFeedbackWidget />
        </AdminLayout>
    );
}

export default HomePage;