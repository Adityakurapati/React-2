import React, { useContext } from 'react'

import { useContext, useState, useEffect } from 'react';
import DataContext from '../Context/DataContext';
const NewPost=() =>
{
        const { handleSubmit, postTitle, postBody, setPostTitle, setPostBody }=useContext( DataContext );

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