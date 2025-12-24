import React, { useState } from 'react'

const useFetch = ( baseUrl = "" ) => {
    
    const [fetchState, setFetchState] = useState({
        data: null,
        loading: false,
        error: null,
    });

    const handlePost = async (data = {}, endpoint = "") => {
        setFetchState(s => ({ ...s, loading: true }));
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if( !response.ok ) {
                setFetchState(s => ({ ...s, loading: false, error: result }));
                return;                
            }

            setFetchState(s => ({ ...s, loading: false, data: result }));

        } catch (error) {
            setFetchState(s => ({ ...s, loading: false, error: error }));
        }
    }
    
    return {
        fetchState,
        handlePost,
    }

}

export default useFetch