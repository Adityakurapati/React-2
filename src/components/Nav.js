import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Link } from 'react-router-dom';

const Nav=() =>
{
        // const { search, setSearch }=useContext( DataContext );
        const posts=useStoreState( state => state.posts );
        const search=useStoreState( state => state.search );
        const setSearch=useStoreActions( action => action.setSearch );
        const setSearchResults=useStoreActions( action => action.posts );

        useEffect( () =>
        {
                const filteredPosts=posts.filter( post =>
                (
                        ( post.body.toLowerCase() ).includes( search.toLowerCase() )
                        ||
                        ( post.title.toLowerCase() ).includes( search.toLowerCase() )
                ) )

                setSearchResults( filteredPosts.reverse() );
        }, [ posts, search, setSearchResults ] )
        return (
                <nav className="Navbar">
                        <form onSubmit={ e => e.preventDefault() }>
                                <input
                                        type="text"
                                        value={ search }
                                        placeholder="Task/Time"
                                        onChange={ ( e ) => setSearch( e.target.value ) }
                                        className='searchInput'
                                />
                        </form>
                        <ul className="links">
                                <li><Link to="/">Home </Link></li>
                                <li><Link to="about">About </Link></li>
                                <li><Link to="post">Post Blog </Link></li>
                        </ul>
                </nav>
        )
}

export default Nav