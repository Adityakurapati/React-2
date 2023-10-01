import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from 'easy-peasy';
const NewPost=() =>
{
        const navigate=useNavigate();
        // const { posts, setPosts }=useContext( DataContext );

        //States 
        const posts=useStoreState( state => state.postTitle );
        const postTitle=useStoreState( state => state.postTitle );
        const postBody=useStoreState( state => state.postBody );

        //Actions 
        const setPostTitle=useStoreActions( action => action.setPostTitle );
        const setPostBody=useStoreActions( action => action.setPostBody );
        const savePost=useStoreActions( action => action.savePost );
        const handleSubmit=async ( e ) =>
        {
                e.preventDefault();
                const id=posts? posts[ posts.length-1 ].id+1:1;
                const date=format( new Date( "MMMM dd, yyyy pp" ) );
                const newPost={ id: id, title: postTitle, date: date, body: postBody };
                savePost( newPost );

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