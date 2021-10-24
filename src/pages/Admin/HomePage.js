import AdminLayout from '../../layouts/AdminLayout';
import GradeDistributionChart from '../../components/GradeDistributionChart';
import RecentFeedbackWidget from '../../components/RecentFeedbackWidget';

function HomePage() {
    
    const pageHeader = (
        <h1 className="text-3xl font-bold text-white">
            Dashboard
        </h1>
    );

    return (
        <AdminLayout header={pageHeader}>
            <GradeDistributionChart />
            <RecentFeedbackWidget />
        </AdminLayout>
    );
}

export default HomePage;