import React from 'react'

const NewPost=( { handleSubmit, postTitle, postBody, setPostTitle, setPostBody } ) =>
{
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
                                                  value={ postTitle }
                                                  onChange={ ( e ) => setPostBody( e.target.value ) } />

                                        <button type='submit'>Submit</button>
                              </form>
                    </main>
          )
}

export default NewPost;