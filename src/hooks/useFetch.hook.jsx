import React, { useState } from 'react'

const useFetch = ( baseUrl = "" ) => {
    
    const [fetchState, setFetchState] = useState({
        data: null,
        loading: false,
        error: null,
    });

    const handlePost = async (data = {}, endpoint = "") => {
        setFetchState({
            data: null,
            loading: true,
            error: null,
        });
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
                setFetchState({
                    data: null,
                    loading: false,
                    error: result,
                });
                return;                
            }

            setFetchState({
                data: result,
                loading: false,
                error: null,
            });

        } catch (error) {
            setFetchState({
                data: null,
                loading: false,
                error: error,
            });
        }
    }
    
    return {
        fetchState,
        handlePost,
    }

}

export default useFetch