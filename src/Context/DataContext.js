import { createContext } from 'react';

// BuiltIn Hooks
// import { Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import api from '../api/posts';
import { useNavigate } from 'react-router-dom';

//Custom Hooks
// import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';

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
const DataContext=createContext( {} );

export const DataProvider=( { children } ) =>
{


        const { data, fetchError, isLoading }=useAxiosFetch( "localhost:3500/posts" );

        // PostPage , Post 
        const [ posts, setPosts ]=useState( lists );
        const [ search, setSearch ]=useState( '' );
        const [ searchResults, setSearchResults ]=useState( [] );

        // NewPost 
        // const [ postTitle, setPostTitle ]=useState( '' );
        // const [ postBody, setPostBody ]=useState( '' );

        // EditPost 
        // const [ editTitle, setEditTitle ]=useState( '' );
        // const [ editBody, setEditBody ]=useState( '' );

        // const history=useHistory();
        const navigate=useNavigate();


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
        // const handleSubmit=async ( e ) =>
        // {
        //         e.preventDefault();
        //         const id=posts? posts[ posts.length-1 ].id+1:1;
        //         const date=format( new Date( "MMMM dd, yyyy pp" ) );
        //         const newPost={ id: id, title: postTitle, date: date, body: postBody };
        //         try
        //         {
        //                 const response=api.post( '/posts', newPost );
        //                 const allPosts=[ ...posts, response.data ];
        //                 setPosts( allPosts );
        //                 setPostTitle( '' );
        //                 setPostBody( '' );
        //                 // history.push( '/' );
        //                 navigate( '/' );
        //         }
        //         catch ( err )
        //         {
        //                 console.log( err.message );
        //         }

        // }



        // Pass All Values to Provider Instead of Drillling Them Down As Props 
        return <DataContext value={ {
                search, setSearch,
                searchResults, data, fetchError, isLoading,
                posts
        } }>
                { children }
        </DataContext>
}
export default DataContext;