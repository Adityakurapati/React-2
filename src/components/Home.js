import React from 'react'
import Feed from './Feed';

import { useStoreState } from 'easy-peasy';
const Home=( { fetchError, isLoading } ) =>
{
        // const { searchResults, data, fetchError, isLoading }=useContext( DataContext );
        const { searchResults }=useStoreState( state => state.searchResults );
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