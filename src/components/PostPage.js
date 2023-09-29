import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { UilEdit, UilTrashAlt } from '@iconscout/react-unicons'
import { useContext } from 'react';
import DataContext from '../Context/DataContext';

import { useNavigate } from "react-router-dom";
import api from '../api/posts';
const PostPage=() =>
{
        // Extract The Id From The URL Parameters 
        const { posts, setPosts }=useContext( DataContext );
        const { id }=useParams();

        const navigate=useNavigate();

        // Operations

        const handleDelete=async ( id ) =>
        {
                try
                {
                        // WE Didn't Get Response 
                        await api.delete( `/posts/${ id }` );
                        const listItems=posts.filter( post => post.id!==id );
                        setPosts( listItems );
                        // history.push( '/' ); // Just Route Back To The Home Page 
                        navigate( '/' ); // Just Route Back To The Home Page 
                } catch ( err )
                {
                        alert( "Unable To Delete " )
                }
        }

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