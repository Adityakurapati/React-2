import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useContext } from 'react';
import DataContext from '../Context/DataContext';
import { useNavigate } from "react-router-dom";
import api from '../api/posts';
const EditPost=async () =>
{
        const { posts, setPosts }=useContext( DataContext );
        const navigate=useNavigate();
        const { id }=useParams();
        const post=posts.find( post => ( post.id ).toString()===id );


        const [ editTitle, setEditTitle ]=useState( '' );
        const [ editBody, setEditBody ]=useState( '' );

        const handleEdit=async ( id ) =>
        {
                const date=format( new Date( "MMMM dd, yyyy pp" ) );
                const updatedPost={ id: id, title: editTitle, date: date, body: editBody };
                try
                {
                        const response=api.put( `/posts/${ id }`, updatedPost );
                        setPosts( posts.map( post => post.id===id? { ...response.data }:{ ...post } ) );
                        setEditTitle( '' );
                        setEditBody( '' );
                        navigate( '/' );
                } catch ( err )
                {
                        console.log( err.message );
                }

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
                                        <form onSubmit={ handleEdit } className="newPostForm">
                                                <input type="text"
                                                        placeholder="Post title"
                                                        value={ editTitle }
                                                        onChange={ ( e ) => setEditTitle( e.target.value ) }
                                                />
                                                <textarea type="text"
                                                        placeholder="Post Body"
                                                        value={ editBody }
                                                        onChange={ ( e ) => setEditBody( e.target.value ) } />

                                                <button type='submit'>Submit</button>
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