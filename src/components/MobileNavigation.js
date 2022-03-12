import { Link } from 'react-router-dom';

function MobileNavigation() {
	const menuItems = [
		{
			name: 'Climbs',
			url: '/',
		},
		{
			name: 'Log Book',
			url: '/log',
		},
		{
			name: 'Set',
			url: '/admin',
		},
		{
			name: 'Profile',
			url: '/profile',
		},
	];

	return (
		<nav className="fixed bottom-0 flex w-full space-x-2 border-t border-gray-100 bg-white px-4 py-2 md:hidden">
			{menuItems.map((menuItem, loopIndex) => (
				<Link
					to={menuItem.url}
					className="block flex-1 rounded-md py-2 text-center text-sm text-gray-800 hover:bg-gray-50 hover:text-indigo-500"
					key={loopIndex}
				>
					{menuItem.name}
				</Link>
			))}
		</nav>
	);
}

export default MobileNavigation;
