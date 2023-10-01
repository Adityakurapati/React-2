import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";

import { useStoreState, useStoreActions } from 'easy-peasy';
const EditPost=async () =>
{
        // const { posts, setPosts }=useContext( DataContext );
        const navigate=useNavigate();
        const { id }=useParams();

        //States 
        const posts=useStoreState( state => state.postTitle );
        const editTitle=useStoreState( state => state.editTitle );
        const editBody=useStoreState( state => state.editBody );
        const getPostById=useStoreState( state => state.getPostById );

        //Actions 
        const setEditTitle=useStoreActions( action => action.setEditTitle );
        const setEditBody=useStoreActions( action => action.setEditBody );
        const setPosts=useStoreActions( action => action.setPosts );
        const editPost=useStoreActions( action => action.editPost );

        // const post=posts.find( post => ( post.id ).toString()===id );
        const post=getPostById( id )

        const handleEdit=async ( id ) =>
        {
                const date=format( new Date( "MMMM dd, yyyy pp" ) );
                const updatedPost={ id: id, title: editTitle, date: date, body: editBody };

                editPost( updatedPost );
                navigate( `/posts/${ id }` );
        }
        useEffect( async () =>
        {
                setEditBody( post.title )
                setEditTitle( post.body )
        }, [ post, setEditTitle, setEditBody ] )
        return (
                <main className='newPost'>
                        { editTitle&&
                                <>
                                        <center><h2>New Post</h2></center>
                                        <form onSubmit={ e => e.preventDefault() } className="newPostForm">
                                                <input type="text"
                                                        placeholder="Post title"
                                                        value={ editTitle }
                                                        onChange={ ( e ) => setEditTitle( e.target.value ) }
                                                />
                                                <textarea type="text"
                                                        placeholder="Post Body"
                                                        value={ editBody }
                                                        onChange={ ( e ) => setEditBody( e.target.value ) } />

                                                <button type='button' onClick={handleEdit(post.id)}>Submit</button>
                                        </form>
                                </>
                        }
                        { !editTitle&&<>
                                <h2>Post Not Found</h2>
                                <h3>Well ,Thats's Disappointing </h3>
                                <p>
                                        <Link to='/' >Visit Our Home Page </Link>
                                </p>
                        </> }
                </main>
        );
}
export default EditPost;