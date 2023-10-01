import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";

import { useStoreState, useStoreActions } from 'easy-peasy';
const PostPage=() =>
{
        // Extract The Id From The URL Parameters 
        // const { posts, setPosts }=useContext( DataContext );
        // const posts=useStoreState( state => state.posts );
        // const setPosts=useStoreActions( action => action.posts );
        const { id }=useParams();
        const deletePost=useStoreActions( action => action.deletePost );
        const getPostById=useStoreState( state => state.getPostById );
        const post=getPostById( id )

        const navigate=useNavigate();

        // Operations

        const handleDelete=async ( id ) =>
        {
                deletePost( id );
                navigate( '/' );
        }

        return (
                <main className="postPage">
                        <article className='post'>
                                { post&&
                                        <>
                                                <h1 className="postTitle">{ post.title }</h1>
                                                <p className="postDate">{ post.date }</p>
                                                <p className="postBody">{ post.body }</p>
                                                <div className='btnOper'>
                                                        <Link to={ `/post/edit/${ id }` }>
                                                                <UilEdit />
                                                        </Link>
                                                        <button onClick={ () => handleDelete( post.id ) }>
                                                                <UilTrashAlt />
                                                        </button>

                                                </div>
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