import React from 'react'
import Feed from './Feed';
import { useContext, useState, useEffect } from 'react';
import DataContext from '../Context/DataContext';
const Home=( { post, data, fetchError, isLoading } ) =>
{
        return (
                <main className="home">
                        { isLoading&&<p>Loading Post ....</p> }
                        { fetchError&&<p>{ fetchError }</p> }
                        { !isLoading&&!fetchError&&
                                posts.length? <Feed posts={ searchResults } />:<p>No Posts Found </p>
                        }
                </main>
        )
}

export default Home