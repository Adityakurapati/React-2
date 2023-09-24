import React from 'react'
import Post from './Post';
const Feed=( { posts } ) =>
{
        return (
                <section className="posts">
                        { posts.map( post =>
                        {
                                <p>{ post }</p>
                        } )
                        }
                </section>
        )
}
export default Feed