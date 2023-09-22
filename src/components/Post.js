import React from 'react'
import { Link } from 'react-router-dom';

const Post=( { post } ) =>
{
          return (
                    <article className='post'>
                              <Link to={ `/post/${ post.id }` }>
                                        <h2>{ post.title }</h2>
                                        <p>{ post[ "date" ] }</p>
                                        {/* Both Of These Are Linked To Particular Post Address  */ }
                              </Link>
                              <p className="postBody">
                                        { ( post.body ).length<=25?
                                                  post.body:`${ post.body.slice( 25 ) }...` }
                              </p>
                    </article>
          )
}

export default Post