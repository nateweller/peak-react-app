import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAuth } from './../hooks';
import Avatar from '../components/Avatar';
import MobileNavigation from '../components/MobileNavigation';
import { FiArrowUpRight } from 'react-icons/fi';

function UserMenu() {
	const location = useLocation();

	const { user } = useAuth();

	const [isOpen, setIsOpen] = useState(false);

	const displayClassName = isOpen ? '' : 'hidden';

	const menuItems = [
		{
			name: 'Sign out',
			url: '/logout',
		},
	];

	return (
		<OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
			<div className="relative ml-3">
				<div>
					{user ? (
						<button
							type="button"
							className="focus:outline-none flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
							id="user-menu-button"
							aria-expanded={isOpen}
							aria-haspopup="true"
							onClick={() => setIsOpen(!isOpen)}
						>
							<span className="sr-only">Open user menu</span>
							<Avatar className="h-8 w-8 rounded-full" />
						</button>
					) : (
						<Link
							to="/login"
							className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
						>
							Sign In
						</Link>
					)}
				</div>

				<div
					className={`focus:outline-none absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 ${displayClassName}`}
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="user-menu-button"
					tabIndex="-1"
				>
					{menuItems.map((menuItem, loopIndex) => {
						const className =
							menuItem.url === location.pathname
								? 'bg-gray-100 block px-4 py-2 text-sm text-gray-700'
								: 'block px-4 py-2 text-sm text-gray-700';

						return (
							<Link to={menuItem.url} className={className} key={loopIndex}>
								{menuItem.name}
							</Link>
						);
					})}
				</div>
			</div>
		</OutsideClickHandler>
	);
}

function AppLayout(props) {
	const location = useLocation();

	const menuItems = [
		{
			name: 'Explore',
			url: '/',
		},
		{
			name: 'Log Book',
			url: '/log',
		},
		{
			name: (
				<>
					Set <FiArrowUpRight className="-mt-1 inline text-sm" />
				</>
			),
			url: '/admin',
		},
	];

	const renderMenuItem = (menuItem, key) => {
		const className =
			menuItem.url === location.pathname
				? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
				: 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

		return (
			<Link to={menuItem.url} className={className} key={key}>
				{menuItem.name}
			</Link>
		);
	};

	return (
		<div>
			<div className="bg-gray-800 pb-32">
				<nav className="bg-gray-800">
					<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
						<div>
							<div className="flex h-16 items-center justify-between px-4 sm:px-0">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<Link to="/">
											<img
												className="h-8 w-8"
												src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
												alt="Workflow"
											/>
										</Link>
									</div>
									<div className="hidden md:block">
										<div className="ml-10 flex items-baseline space-x-4">
											{menuItems.map((menuItem, loopIndex) => renderMenuItem(menuItem, loopIndex))}
										</div>
									</div>
								</div>
								<div className="hidden md:block">
									<div className="ml-4 flex items-center md:ml-6">
										<UserMenu />
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<header className="py-10">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{props.header}</div>
				</header>
			</div>

			<main className="-mt-32">
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div
						className={`${
							!props.isBorderless ? 'rounded-lg bg-white px-5 py-6 shadow sm:px-6' : ''
						}`}
					>
						{props.children}
					</div>
				</div>
			</main>

			<MobileNavigation />
		</div>
	);
}

export default AppLayout;
