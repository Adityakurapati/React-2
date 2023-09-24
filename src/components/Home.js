import React from 'react'
import Feed from './Feed';
const Home=( { posts } ) =>
{
          return (
                    <main className="home">
                              { posts.length? <Feed posts={ posts } />:<p> NO Posts Yet </p> }
                    </main>
          )
}

export default Home