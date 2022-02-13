import React, { useContext, useEffect } from 'react';
import MenuContext from '../../context/menu/menuContext';

import MenuItem from './MenuItem';


const Menu = () => {
    const menuContext = useContext(MenuContext);

    const { types, getAllRecipeTypes } = menuContext;

    useEffect(() => {
        getAllRecipeTypes()
        // eslint-disabled-next-line
    }, []);

    return (
        <ul className="navbar-nav h-100 d-flex flex-column justify-content-around py-5">
            {types.map(type => (
                <MenuItem key={type._id} type={type} className='nav-item mt-4 list'></MenuItem>
            ))}
        </ul>   
    )
}

export default Menu;
