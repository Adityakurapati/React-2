import { useContext, useState, useEffect } from 'react';

import { format } from 'date-fns';
import DataContext from '../Context/DataContext';
import { useNavigate } from "react-router-dom";
import api from '../api/posts';
const NewPost=() =>
{
        const { posts, setPosts }=useContext( DataContext );

        const navigate=useNavigate();
        const [ postTitle, setPostTitle ]=useState( '' );
        const [ postBody, setPostBody ]=useState( '' );

        const handleSubmit=async ( e ) =>
        {
                e.preventDefault();
                const id=posts? posts[ posts.length-1 ].id+1:1;
                const date=format( new Date( "MMMM dd, yyyy pp" ) );
                const newPost={ id: id, title: postTitle, date: date, body: postBody };
                try
                {
                        const response=api.post( '/posts', newPost );
                        const allPosts=[ ...posts, response.data ];
                        setPosts( allPosts );
                        setPostTitle( '' );
                        setPostBody( '' );
                        // history.push( '/' );
                        navigate( '/' );
                }
                catch ( err )
                {
                        console.log( err.message );
                }

        }
        return (
                <main className='newPost'>
                        <center><h2>New Post</h2></center>
                        <form onSubmit={ handleSubmit } className="newPostForm">
                                <input type="text"
                                        placeholder="Post title"
                                        value={ postTitle }
                                        onChange={ ( e ) => setPostTitle( e.target.value ) }
                                />
                                <textarea type="text"
                                        placeholder="Post Body"
                                        value={ postBody }
                                        onChange={ ( e ) => setPostBody( e.target.value ) } />

                                <button type='submit'>Submit</button>
                        </form>
                </main>
        )
}

export default NewPost;