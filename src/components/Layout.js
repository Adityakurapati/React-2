import React from 'react'
// Static Components
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import 'Outlet' from 'react-router-dom'
const Layout=() =>
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