import React from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
const Header=( { title } ) =>
{
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