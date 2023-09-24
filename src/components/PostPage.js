import React from 'react'
import { useParams, Link } from 'react-router-dom';
const PostPage=( { posts, handleDelete } ) =>
{
          // Extract The Id From The URL Parameters 

          const { id }=useParams();

          // toString() Because The id in Url Is String And post.id is Numeric
          const post=posts.find( post => ( post.id ).toString()===id );
          return (
                    <main className="postPage">
                              <article className='post'>
                                        { post&&
                                                  <>
                                                            <h1 className="postTitle">{ post.title }</h1>
                                                            <p className="postDate">{ post.date }</p>
                                                            <p className="postBody">{ post.body }</p>
                                                            <button onClick={ () => handleDelete( post.id ) }>
                                                                      Delete
                                                            </button>
                                                  </> }
                                        { !post&&<>
                                                  <h2>Post Not Found</h2>
                                                  <h3>Well ,Thats's Disappointing </h3>
                                                  <p>
                                                            <Link to='/' >Visit Our Home Page </Link>
                                                  </p>
                                        </> }
                              </article>
                    </main>
          )
}

export default PostPage