import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Menu from '../menu/Menu';

const Navbar = ({ title, icon }) => {
    return (
        <Fragment>
            <aside id='navbarAside' className='fixed-top d-flex flex-column justify-content-between text-center myNavbar'>
                <ul className="navbar-nav">
                    <li className='text-center mt-4'>
                        <Link to='/' className='text-decoration-none logo'>
                            <i className={icon}></i><br/><span className='titleIcon'>{title}</span>
                            <p className='sloganTitle'>by MoPinAle</p>
                         </Link>
                    </li>
                </ul>
                    <Menu />
                <ul className='navbar-nav'>
                    <li className="nav-item text-center">
                        <Link to='/about' className='nav-link'>About this Project</Link>
                    </li>
                    {/* <li className="nav-item text-center">
                        <Link to='/contact' className="nav-link">Contact</Link>
                    </li> */}
                </ul>
            </aside>
        </Fragment>
    );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Receitaria',
    icon: 'fad fa-hat-chef fa-6x'
}

export default Navbar;
