import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch=( dataUrl ) =>
{
        const [ data, setData ]=useState( [] );
        const [ fetchError, setFetchError ]=useState( null );
        const [ isLoading, setIsLoading ]=useState( null );
        useEffect( async () =>
        {
                const isMounted=true;
                const source=axios.CancelToken.source();
                const fetchData=( url ) =>
                {
                        setIsLoading( true );
                        try
                        {
                                const response=axios.get( dataUrl, {
                                        cancelToken: source.token
                                } );
                                if ( isMounted )
                                {
                                        setData( response.data );
                                        setFetchError( null );
                                }
                        } catch ( err )
                        {
                                if ( isMounted )
                                {
                                        setData( [] );
                                        setFetchError( err.message );
                                }

                        } finally
                        {
                                isMounted&&setTimeout( () => setIsLoading( false ), 2000 );
                        }
                }
                fetchData( dataUrl );
                return ( () =>
                {
                        isMounted=false;
                        source.cancel();
                } );
        }, [ dataUrl ] )
        return [ data, fetchError, isLoading ];
}