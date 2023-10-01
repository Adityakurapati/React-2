// React ROuter Doesnt fetch Data From The Server , WE Are Just Routing Components So The Response Will Be Fetched  Very Faster 

// The Componets That We Want Appear On Every Page 
import Layout from './components/Layout';
// The Main Content Area Components 
import Home from './components/Home';
import About from './components/About';
import PostPage from './components/PostPage';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
//  404 Missing Page 
import MissingPost from './components/MissingPost';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import { useAxiosFetch } from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

function App ()
{
        {/* Swiching Between Routes  */ }
        // Problem Is It Works Like A Water Fall As It Match / from /post also So Its Rendering / component That  Is Home(/ matches All Other Path)

        {/* RRv6 Is More Smarter It Knows That Which Path Is More Exact
       */}

        const setPosts=useStoreActions( actions => actions.setPosts );
        const { data, fetchError, isLoading }=useAxiosFetch( "localhost:3500/posts" );
        useEffect( async () =>
        {
                // axios = auto into JsonObject + Catch The Error When Its Not In The 200 Http response 🚫 if(!res.ok)
                setPosts( data );
        }, [ data, setPosts ] )


        return (
                <Routes>
                        <Route path='/' element={
                                <Layout /> }>

                                <Route index element={ <Home fetchError={ fetchError }
                                        isLoading={ isLoading } /> } />
                                <Route path='post'>
                                        <Route index element={ <NewPost /> } />
                                        <Route path=':id' element={ <PostPage /> } />
                                        <Route path='edit/:id' element={ <EditPost /> } />
                                </Route>
                        </Route>
                        <Route path="/about" element={ <About /> } />
                        <Route path="*" element={ <MissingPost /> } />
                        {/* <Route path="*" component={ MissingPost } /> */ }
                </Routes>

        );
}

export default App;
