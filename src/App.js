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

        // const history=useHistory();
        const navigate=useNavigate();
        // useEffect
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
        const handleSubmit=( e ) =>
        {
                e.preventDefault();
                const id=posts? posts[ posts.length-1 ].id+1:1;
                const date=format( new Date( "MMMM dd, yyyy pp" ) );
                const newPost={ id: id, title: postTitle, date: date, body: postBody };
                const allPosts=[ ...posts, newPost ];
                setPosts( allPosts );
                setPostTitle( '' );
                setPostBody( '' );
                // history.push( '/' );
                navigate( '/' );

        }
        const handleDelete=( id ) =>
        {
                const listItems=posts.filter( post => post.id!==id );
                setPosts( listItems );
                // history.push( '/' ); // Just Route Back To The Home Page 
                navigate( '/' ); // Just Route Back To The Home Page 
        }
        {/* Swiching Between Routes  */ }
        // Problem Is It Works Like A Water Fall As It Match / from /post also So Its Rendering / component That  Is Home(/ matches All Other Path)

        {/* RRv6 Is More Smarter It Knows That Which Path Is More Exact
       */}
        return (
                <Routes>

                        <Route path='/' element={
                                <Layout search={ search } setSearch={ setSearch } /> }>

                                <Route index element={ <Home posts={ searchResults } /> } />
                                <Route path='post'>
                                        <Route index element={ <NewPost
                                                postTitle={ postTitle }
                                                postBody={ postBody }
                                                setPostTitle={ setPostTitle }
                                                setPostBody={ setPostBody }
                                                handleSubmit={ handleSubmit }
                                        /> } />
                                        <Route path=':id' element={ <PostPage post={ posts }
                                                handleDelete={ handleDelete } /> } />
                                </Route>
                        </Route>
                        <Route path="/about" element={ <About /> } />
                        <Route path="*" element={ <MissingPost /> } />
                        {/* <Route path="*" component={ MissingPost } /> */ }
                </Routes>
        );
}

export default App;
