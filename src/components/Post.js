import { Link } from 'react-router-dom';

const Post=( { post } ) =>
{
        return (
                <div className='post'>
                        <Link to={ `post/${ post.id }` }>
                                {/* Both Of These Are Linked To Particular Post Address  */ }
                                <h2>{ post.title }</h2>
                                <p>{ post.date }</p>
                        </Link>
                        <p className="postBody">
                                { ( post.body ).length<=25?
                                        post.body:`${ post.body.slice( 25 ) }...` }
                        </p>
                </div>
        )
}

export default Post;