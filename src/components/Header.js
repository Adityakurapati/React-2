import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

import { useContext, useState, useEffect } from 'react';
import DataContext from '../Context/DataContext';
const Header=( { title } ) =>
{

        const { width }=useContext( DataContext );
        return (
                <header>
                        <span>{ title }</span>
                        { width<768? <FaMobileAlt />
                                :width<992? <FaTableAlt />
                                        :<FaLaptop /> }
                </header>
        )
}

export default Header