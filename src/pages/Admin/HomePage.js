import { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Card, CardHeader, CardBody } from '../../components/Card';
import GradeDistributionChart from '../../components/GradeDistributionChart';
import RecentFeedbackWidget from '../../components/RecentFeedbackWidget';
import Select from '../../components/Select';

function HomePage() {

    const [gradeDistributionDiscipline, setGradeDistributionDiscipline] = useState('BOULDER');
    
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
                    <Select
                        use="select"
                        name="discipline"
                        options={ [
                            { label: 'Bouldering', value: 'BOULDER' },
                            { label: 'Top-Rope', value: 'TOP_ROPE' },
                            { label: 'Lead', value: 'LEAD' }
                        ] }
                        value={ gradeDistributionDiscipline }
                        onChange={ (event) => setGradeDistributionDiscipline(event.target.value) }
                    />
                </CardHeader>
                <CardBody>
                    <GradeDistributionChart filters={ { discipline: gradeDistributionDiscipline } } />
                </CardBody>
            </Card>
            <RecentFeedbackWidget />
        </AdminLayout>
    );
}

export default HomePage;