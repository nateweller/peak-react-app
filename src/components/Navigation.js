import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li>
                    <Link to="/admin/" className="navigation__item">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/admin/organization" className="navigation__item">
                        Organization
                    </Link>
                </li>
                <li>
                    <Link to="/admin/locations" className="navigation__item">
                        Locations
                    </Link>
                </li>
                <li>
                    <Link to="/admin/climbs" className="navigation__item">
                        Climbs
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;