// React ROuter Doesnt fetch Data From The Server , WE Are Just Routing Components So The Response Will Be Fetched  Very Faster 

// The Componets That We Want Appear On Every Page 
import Layout from './components/Layout';
// The Main Content Area Components 
import Home from './components/Home';
import About from './components/About';
import PostPage from './components/PostPage';
import NewPost from './components/NewPost';

//  404 Missing Page 
import MissingPost from './components/MissingPost';

// BuiltIn Hooks
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
// import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import EditPost from './components/EditPost';

//Custom Hooks
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';

const { data, fetchError, isLoading }=useAxiosFetch();

function App ()
{

        const lists=[
                {
                        id: 1,
                        title: "Aditys's Blog ",
                        date: new Date(),
                        body: `The Date object is a powerful tool for handling dates and times in JavaScript. However, it's worth noting that it lacks some advanced features found in libraries like moment.js, so for more complex date and time manipulation, you might consider using such libraries or built-in JavaScript functions`
                },
                {
                        id: 2,
                        title: "Pawan's Blog ",
                        date: new Date(),
                        body: `The Date object is a powerful tool for handling dates and times in JavaScript. However, it's worth noting that it lacks some advanced features found in libraries like moment.js, so for more complex date and time manipulation, you might consider using such libraries or built-in JavaScript functions`
                },
                {
                        id: 3,
                        title: "Blog 1",
                        date: new Date( '2023-09-18T12:00:00' ),
                        body: `The Date object is a powerful tool for handling dates and times in JavaScript. However, it's worth noting that it lacks some advanced features found in libraries like moment.js, so for more complex date and time manipulation, you might consider using such libraries or built-in JavaScript functions`
                },

        ]
        // PostPage , Post 
        const [ posts, setPosts ]=useState( lists );
        const [ search, setSearch ]=useState( '' );
        const [ searchResults, setSearchResults ]=useState( [] );

        // NewPost 
        const [ postTitle, setPostTitle ]=useState( '' );
        const [ postBody, setPostBody ]=useState( '' );

        // EditPost 
        const [ editTitle, setEditTitle ]=useState( '' );
        const [ editBody, setEditBody ]=useState( '' );

        // const history=useHistory();
        const navigate=useNavigate();
        const { width }=useWindowSize();


        // useEffect
        // #1 Runs At load
        useEffect( async () =>
        {
                // axios = auto into JsonObject + Catch The Error When Its Not In The 200 Http response 🚫 if(!res.ok)
                setPosts( data );
        }, [] )
        useEffect( () =>
        {
                const filteredPosts=posts.filter( post =>
                (
                        ( post.body.toLowerCase() ).includes( search.toLowerCase() )
                        ||
                        ( post.title.toLowerCase() ).includes( search.toLowerCase() )
                ) )

                setSearchResults( filteredPosts.reverse() );
        }, [ posts, search ] )
        // Operations
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


                }
        }

        const handleEdit=async ( id ) =>
        {
                const date=format( new Date( "MMMM dd, yyyy pp" ) );
                const updatedPost={ id: id, title: editTitle, date: date, body: editBody };
                try
                {
                        const response=api.put( `/posts/${ id }`, updatedPost );
                        setPost( posts.map( post => post.id===id? { ...response.data }:{ ...post } ) );
                        setEditTitle( '' );
                        setEditBody( '' );
                        navigate( '/' );
                } catch ( err )
                {
                        console.log( err.message );
                }

        }

        {/* Swiching Between Routes  */ }
        // Problem Is It Works Like A Water Fall As It Match / from /post also So Its Rendering / component That  Is Home(/ matches All Other Path)

        {/* RRv6 Is More Smarter It Knows That Which Path Is More Exact
       */}
        return (
                <Routes>

                        <Route path='/' element={
                                <Layout search={ search } setSearch={ setSearch } width={ width } /> }>

                                <Route index element={ <Home
                                        posts={ searchResults }
                                        data={ data }
                                        fetchError={ fetchError }
                                        isLoading={ isLoading } /> } />
                                <Route path='post'>
                                        <Route index element={ <NewPost
                                                postTitle={ postTitle }
                                                postBody={ postBody }
                                                setPostTitle={ setPostTitle }
                                                setPostBody={ setPostBody }
                                                handleSubmit={ handleSubmit }
                                        /> } />
                                        <Route path=':id' element={ <PostPage posts={ posts }
                                                handleDelete={ handleDelete } /> } />
                                        <Route path='edit/:id' element={ <EditPost
                                                posts={ posts }
                                                handleEdit={ handleEdit }
                                                editTitle={ editTitle }
                                                editBody={ editBody }
                                                setEditTitle={ setEditTitle }
                                                setEditBody={ setEditBody }
                                        /> } />
                                </Route>
                        </Route>
                        <Route path="/about" element={ <About /> } />
                        <Route path="*" element={ <MissingPost /> } />
                        {/* <Route path="*" component={ MissingPost } /> */ }
                </Routes>
        );
}

export default App;
