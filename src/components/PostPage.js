import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons';

import { useContext } from 'react';
import DataContext from '../Context/DataContext';
const PostPage=() =>
{
        // Extract The Id From The URL Parameters 
        const { posts, handleDelete }=useContext( DataContext );
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