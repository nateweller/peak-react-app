import AdminLayout from './AdminLayout';
import { NavLink } from 'react-router-dom';

function SettingsNavigation() {

    const navigation = [
        {
            url: '/admin/settings/organization',
            label: 'Organization'
        },
        {
            url: '/admin/settings/locations',
            label: 'Locations'
        },
        {
            url: '/admin/settings/grading',
            label: 'Grading System'
        },
        {
            url: '/admin/settings/colors',
            label: 'Climb Colours'
        }
    ];

    return (
        <nav className="space-y-1" aria-label="Sidebar">
            { navigation.map((item, loopIndex) => (
                <NavLink 
                    to={ item.url } 
                    className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    activeClassName="bg-gray-100 text-gray-900"
                    key={ loopIndex }
                    // aria-current={ isCurrent ? 'page' : undefined }
                >
                    <span className="truncate">
                        { item.label }
                    </span>
                </NavLink>
            )) }
        </nav>
    );
}

function AdminSettingsLayout(props) {

    const { children } = props;

    const pageHeader = (
        <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Settings
        </h2>
    );

    return (
        <AdminLayout header={ pageHeader }>
            <div className="flex flex-wrap">
                <div className="flex-auto mb-4 w-full md:w-1/5">
                    <h3 className="md:hidden text-lg leading-6 font-medium text-gray-900 mb-2">
                        Settings Menu
                    </h3>
                    <SettingsNavigation />
                </div>
                <div className="flex-auto w-full md:w-4/5 md:pl-6">
                    { children }
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminSettingsLayout;