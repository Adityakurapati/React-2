import { createStore, action, thunk } from 'easy-peasy';
import api from "./api/posts";


// These States That WE Are Using In Our  Components And That We Are Pulling Into The Easy Peasy 
export default createStore( {
        posts: [],
        setPosts: action( ( state, payload ) =>
        {
                state.posts=payload
        } ),
        fetchError: '',
        setFetchError: action( ( state, payload ) =>
        {
                state.fetchError=payload
        } ),
        postTitle: '',
        setPostTitle: action( ( state, payload ) =>
        {
                state.postTitle=payload
        } ),
        postBody: '',
        setPostBody: action( ( state, payload ) =>
        {
                state.postBody=payload
        } ),
        editTitle: '',
        setEditBody: action( ( state, payload ) =>
        {
                state.editTitle=payload
        } ),
        editBody: '',
        setEditBody: action( ( state, payload ) =>
        {
                state.editBody=payload
        } ),
        search: '',
        setSearch: action( ( state, payload ) =>
        {
                state.search=payload
        } ),
        searchResults: [],
        setSearchResults: action( ( state, payload ) =>
        {
                state.searchResults=payload
        } ),
        postCount: computed( state => state.posts.length ),
        getPostById: computed( state =>
        {
                return ( id ) => state.posts.find( post => post.id.toString()===id )
        } ),
        // newPOst = payload and wer Get POst From Current State With help Of helpers 
        // Paste Try catch from handleSubmit
        // We Not Call Hooks(navigate) inside Store
        savePost: thunk( async ( actions, newPost, helpers ) =>
        {
                const { posts }=helpers.getState()
                try
                {
                        const res=await api.posts( '/posts', newPost );
                        actions.setPosts( [ ...posts, res.data ] )
                        actions.setPostTitle( '' )
                        actions.setPostBody( '' )
                        actions.setFetchError( null )
                } catch ( err )
                {
                        actions.setFetchError( err.message )
                        actions.setPosts( [] )
                }
        } ),
        deletePost: thunk( async ( actions, deletedPostId, helpers ) =>
        {
                const { posts }=helpers.getState();
                try
                {
                        await api.delete( `/posts/${ deletedPostId }` )
                        actions.setPosts( posts.filter( post => ( post.id.toString() )!=id ) );
                } catch ( err )
                {
                        actions.setFetchError( err );
                }
        } ),
        editPost: thunk( async ( actions, updatePost, helpers ) =>
        {
                const { posts }=helpers.getState();
                const { id }=updatedPost;
                try
                {
                        const res=await api.put( `/posts`, updatePost )
                        actions.setPosts( posts.map( post => post.id===updatedPost.id? res.data:post ) );
                        actions.setEditTitle( '' )
                        actions.setEditBody( '' )
                } catch ( err )
                {
                        actions.setFetchError( err );
                }
        } )
} )