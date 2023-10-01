import React from 'react'
import { useStoreState } from 'easy-peasy';
const Footer=() =>
{
        const date=new Date();
        const count=useStoreState( state => state.postCount );
        return (
                // <footer><b>Copyright &copy { date.getFullYear() }</b></footer>
                <footer>{ count } Blog Posts </footer>
        )
}

export default Footer