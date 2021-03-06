import { ResponsiveBar } from '@nivo/bar';
import { useDataStoreItem } from './../hooks';

function GradeDistributionChart(props) {

    const { 
        filters = {} 
    } = props;
    
    const { useData: data = [] } = useDataStoreItem(`reports/grade_summary`);

    // filter data
    const filteredData = data.filter(data => {
        for (const filterKey of Object.keys(filters)) {
            if (data[filterKey] === undefined) return false;
            if (data[filterKey] !== filters[filterKey]) return false;
        }
        return true;
    });

    // find largest data 
    let largestValue = 0;
    if (data && data.length) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].count > largestValue) {
                largestValue = data[i].count;
            }
        }
    }
    
    return (
        <div style={{ height: '400px' }}>
            <ResponsiveBar
                data={ filteredData }
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
                    legend: 'Grade',
                    legendPosition: 'middle',
                    legendOffset: 32
                } }
                axisLeft={ {
                    tickValues: [...Array(largestValue + 1).keys()], 
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Current Amount Set',
                    legendPosition: 'middle',
                    legendOffset: -40
                } }
                colors={['#EF4444', '#F59E0B', '#FCD34D', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899']}
                colorBy="indexValue"
            />
        </div>
    );
}

export default GradeDistributionChart;