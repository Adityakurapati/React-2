import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fa';
const EditPost=async (
        { posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody }
) =>
{
        const { id }=useParams();
        const post=posts.find( post => ( post.id ).toString()===id );
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