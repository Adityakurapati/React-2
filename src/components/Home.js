import React from 'react'
import Feed from './Feed';
const Home=( { posts, data, isLoading, fetchError } ) =>
{
        return (
                <main className="home">
                        { isLoading&&<p>Loading Post ....</p> }
                        { fetchError&&<p>{ fetchError }</p> }
                        { !isLoading&&!fetchError&&
                                posts.length? <Feed posts={ posts } />:<p>No Posts Found </p>
                        }
                </main>
        )
}

export default Home