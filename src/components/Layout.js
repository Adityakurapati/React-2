import React from 'react'
// Static 
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'
const Layout=( { search, setSearch } ) =>
{
        return (
                <>
                        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"></link>
                        <Header title={ "Samaurai Blogs" } />
                        <Nav />
                        <Outlet />
                        <Footer />
                </>
        )
}

export default Layout