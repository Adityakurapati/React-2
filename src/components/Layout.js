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
                              <Header title={ "Samaurai Blogs" } />
                              <Nav search={ search } setSearch={ setSearch } />
                              <Outlet />
                              <Footer />
                    </>
          )
}

export default Layout