
import { useContext, useState, useEffect } from 'react';
import DataContext from '../Context/DataContext';
import { Link } from 'react-router-dom';

const Nav=() =>
{
        const { search, setSearch }=useContext( DataContext );
        return (
                <nav className="Navbar">
                        <form onSubmit={ e => e.preventDefault() }>
                                <input
                                        type="text"
                                        value={ search }
                                        placeholder="Task/Time"
                                        onChange={ ( e ) => setSearch( e.target.value ) }
                                        className='searchInput'
                                />
                        </form>
                        <ul className="links">
                                <li><Link to="/">Home </Link></li>
                                <li><Link to="about">About </Link></li>
                                <li><Link to="post">Post Blog </Link></li>
                        </ul>
                </nav>
        )
}

export default Nav