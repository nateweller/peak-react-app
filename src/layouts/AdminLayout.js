import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

function UserMenu() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const displayClassName = isOpen ? '' : 'hidden';
  
  const menuItems = [
    {
      name: 'Sign out',
      url: '/logout'
    }
  ];

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="ml-3 relative">
        <div>
          <button 
            type="button" 
            className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" 
            id="user-menu-button" 
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src="https://img.olympicchannel.com/images/image/private/t_1-1_600/f_auto/v1538355600/primary/slewmn5tkzrgg1gwo4lw" alt="" />
          </button>
        </div>

        <div 
          className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${displayClassName}`}
          role="menu" 
          aria-orientation="vertical" 
          aria-labelledby="user-menu-button" 
          tabIndex="-1"
        >
          {menuItems.map((menuItem, loopIndex) => {
            const className = menuItem.url === location.pathname
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

  const menuItems = [
    {
      name: 'Sign out',
      url: '/signout'
    }
  ];

  return (
    <div className="pt-4 pb-3 border-t border-gray-700">
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src="https://img.olympicchannel.com/images/image/private/t_1-1_600/f_auto/v1538355600/primary/slewmn5tkzrgg1gwo4lw" alt="" />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium leading-none text-white">
            Madame Honda
          </div>
          <div className="text-sm font-medium leading-none text-gray-400">
            515@example.com
          </div>
        </div>
        <button type="button" className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">
            View notifications
          </span>
        </button>
      </div>
      <div className="mt-3 px-2 space-y-1">
        {menuItems.map((menuItem, loopIndex) => {
          const className = menuItem.url === location.pathname
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

  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      url: '/admin'
    },
    {
      name: 'Climbs',
      url: '/admin/climbs'
    }
  ];

  const renderMenuItem = (menuItem, key) => {
    const className = menuItem.url === location.pathname
      ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

    return (
      <Link to={menuItem.url} className={className} key={key}>
        {menuItem.name}
      </Link>
    );
  };

  const renderMobileMenuItem = (menuItem, key) => {
    const className = menuItem.url === location.pathname
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
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div>
              <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to="/">
                      <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
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
                    className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" 
                    aria-controls="mobile-menu" 
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg className={`${(isOpen ? 'hidden' : 'block')} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg className={`${(isOpen ? 'block' : 'hidden')} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Mobile menu, show/hide based on menu state. --> */}
          <div className={`${(isOpen ? 'block' : 'hidden')} border-b border-gray-700 md:hidden`} id="mobile-menu">
            <div className="px-2 py-3 space-y-1 sm:px-3">
              {menuItems.map((menuItem, loopIndex) => renderMobileMenuItem(menuItem, loopIndex))}
            </div>
            <MobileUserMenu />
          </div>
        </nav>
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {props.header}
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {props.children}
          </div>
        </div>
      </main>
    </div>

  );
}

export default AdminLayout;