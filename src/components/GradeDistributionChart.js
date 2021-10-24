import { ResponsiveBar } from '@nivo/bar';
import { useDataStoreItem } from './../hooks';

function GradeDistributionChart() {
    
    const { useData: data } = useDataStoreItem('reports/grade_summary');
    
    return (
        <div style={{ height: '400px' }}>
            <ResponsiveBar
                data={ data || [] }
                keys={ ['count'] }
                indexBy="name"
                margin={ { 
                    top: 50, 
                    right: 0, 
                    bottom: 50, 
                    left: 48 
                } }
                padding={ 0.3 }
                axisBottom={ {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'name',
                    legendPosition: 'middle',
                    legendOffset: 32
                } }
                axisLeft={ {
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendPosition: 'middle',
                    legendOffset: -40
                } }
            />
        </div>
    );
}

export default GradeDistributionChart;