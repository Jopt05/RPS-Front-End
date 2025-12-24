import React, { useState } from 'react'

const useFetch = ( baseUrl = "" ) => {
    
    const [fetchState, setFetchState] = useState({
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
                return null;                
            }
            setFetchState(s => ({ ...s, loading: false }));
            return result;

        } catch (error) {
            setFetchState(s => ({ ...s, loading: false, error: error }));
            return null;
        }
    }

    const handlePut = async (data = {}, endpoint = "", headers = {}) => {
        setFetchState(s => ({ ...s, loading: true }));
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if( !response.ok ) {
                setFetchState(s => ({ ...s, loading: false, error: result }));
                return null;                
            }
            setFetchState(s => ({ ...s, loading: false }));
            return result;

        } catch (error) {
            setFetchState(s => ({ ...s, loading: false, error: error }));
            return null;
        }
    }
    
    return {
        fetchState,
        handlePost,
        handlePut,
    }

}

export default useFetch