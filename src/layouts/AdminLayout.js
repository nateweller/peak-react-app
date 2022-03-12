import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { useAuth } from './../hooks';
import Avatar from '../components/Avatar';
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

function MobileUserMenu() {
	const location = useLocation();

	const { user } = useAuth();

	const menuItems = user
		? [
				{
					name: 'Sign out',
					url: '/logout',
				},
		  ]
		: [
				{
					name: 'Sign In',
					url: '/login',
				},
		  ];

	return (
		<div className="border-t border-gray-700 pt-4 pb-3">
			{user && (
				<div className="mb-3 flex items-center px-5">
					<div className="flex-shrink-0">
						<Avatar className="h-10 w-10 rounded-full" />
					</div>
					<div className="ml-3">
						<div className="text-base font-medium leading-none text-white">{user?.name}</div>
						<div className="text-sm font-medium leading-none text-gray-400">{user?.email}</div>
					</div>
				</div>
			)}
			<div className="space-y-1 px-2">
				{menuItems.map((menuItem, loopIndex) => {
					const className =
						menuItem.url === location.pathname
							? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium';

					return (
						<Link to={menuItem.url} className={className} key={loopIndex}>
							{menuItem.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
}

function AdminLayout(props) {
	const { header = null, children = null, isBorderless = false } = props;

	const location = useLocation();

	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{
			name: 'Dashboard',
			url: '/admin',
		},
		{
			name: 'Climbs',
			url: '/admin/climbs',
		},
		{
			name: 'Settings',
			url: '/admin/settings/organization',
		},
		{
			name: (
				<>
					Home <FiArrowUpRight className="-mt-1 inline text-sm" />
				</>
			),
			url: '/',
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

	const renderMobileMenuItem = (menuItem, key) => {
		const className =
			menuItem.url === location.pathname
				? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
				: 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium';

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
								<div className="-mr-2 flex md:hidden">
									{/* <!-- Mobile menu button --> */}
									<button
										type="button"
										className="focus:outline-none inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										aria-controls="mobile-menu"
										aria-expanded={isOpen}
										onClick={() => setIsOpen(!isOpen)}
									>
										<span className="sr-only">Open main menu</span>
										<svg
											className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
										<svg
											className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* <!-- Mobile menu, show/hide based on menu state. --> */}
					<div
						className={`${isOpen ? 'block' : 'hidden'} border-b border-gray-700 md:hidden`}
						id="mobile-menu"
					>
						<div className="space-y-1 px-2 py-3 sm:px-3">
							{menuItems.map((menuItem, loopIndex) => renderMobileMenuItem(menuItem, loopIndex))}
						</div>
						<MobileUserMenu />
					</div>
				</nav>
				<header className="py-10">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{header}</div>
				</header>
			</div>

			<main className="-mt-32">
				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					<div className={`rounded-lg bg-white ${!isBorderless ? 'px-5 py-6 shadow sm:px-6' : ''}`}>
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}

export default AdminLayout;
