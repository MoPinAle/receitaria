import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuItem = ({ type }) => {
    return (
        <li className='nav-item mt-4'>
            <Link to={`/${type.name}`} className="text-decoration-none">{type.name}</Link>
        </li>
    )
}

MenuItem.propTypes = {
    type: PropTypes.object.isRequired
}

export default MenuItem;
