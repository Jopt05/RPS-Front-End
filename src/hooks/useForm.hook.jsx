import React, { useState } from 'react'

const useForm = (initialState = {}) => {
    const [form, setForm] = useState(initialState);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    
    return {
        form,
        handleChange,
    };
}

export default useForm