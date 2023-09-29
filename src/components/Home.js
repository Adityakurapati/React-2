import React from 'react'
import Feed from './Feed';
import { useContext, useState, useEffect } from 'react';
import DataContext from '../Context/DataContext';
const Home=() =>
{
        const { searchResults, data, fetchError, isLoading }=useContext( DataContext );
        return (
                <main className="home">
                        { isLoading&&<p>Loading Post ....</p> }
                        { fetchError&&<p>{ fetchError }</p> }
                        { !isLoading&&!fetchError&&
                                searchResults.length? <Feed posts={ searchResults } />:<p>No Posts Found </p>
                        }
                </main>
        )
}

export default Home