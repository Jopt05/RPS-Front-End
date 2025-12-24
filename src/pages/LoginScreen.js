import React, { useContext, useEffect, useState } from 'react'
import '../styles/login.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import Loading from '../assets/Loading.svg';
import useFetch from '../hooks/useFetch.hook';
import useForm from '../hooks/useForm.hook';

const LoginScreen = () => {

    const { UserInfo, setUserInfo } = useContext( UserContext )
    const navigate = useNavigate();

    const { form, handleChange } = useForm({
        User: '',
        Password: '',
    });
    const { fetchState, handlePost } = useFetch(process.env.REACT_APP_API_URL);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if( !form.User || !form.Password ) {
            setUserInfo({ ...UserInfo, msg: 'You cannot leave fields empty' });
            return;
        }

        await handlePost({
            user: form.User,
            password: form.Password,
        }, '/api/login');

        if( fetchState.error ) {
            return;
        }

        setUserInfo(x => ({
            ...x,
            tokenId: fetchState.data?.tokenId,
            user: fetchState.data?.usuario,
            isLogged: true,
        }))

        navigate('/game', { replace: true });
    }

    useEffect(() => {
        document.getElementsByName('User')[0].focus();
    }, [])

    return (
        <div className="MainBody">
            <div className="MainBody__Container">
                <form onSubmit={ handleSubmit } className="MainBody__Container-Form">
                    <p className="MainBody__Container-Form-Title">
                        Login
                    </p>
                    <label className="MainBody__Container-Form-Label">
                        User:
                    </label>
                    <input 
                        name="User" 
                        className="MainBody__Container-Form-Input"
                        onChange={ handleChange }
                    />
                    <label className="MainBody__Container-Form-Label">
                        Password:
                    </label>
                    <div
                        className="InputContainer"
                    >
                        <input 
                            name="Password" 
                            type={ showPassword ? 'text' : 'password' }
                            onChange={ handleChange }
                        />
                        <i 
                            className='bx bx-eye'
                            onClick={ handleShowPassword }
                        ></i>
                    </div>
                    <p className={ `MainBody__Container-Form-Message${ fetchState.error ? '-Error' : '' }` }>
                        { fetchState.error?.msg }
                    </p>
                    <button className="MainBody__Container-Form-Button">
                        {
                            fetchState.loading
                                ? <img className="LoadingSvg" src={ Loading } alt="Loading" />
                                : 'Login'
                        }
                    </button>
                    <nav className="MainBody__LinksDiv">
                        <NavLink exact className="MainBody__LinksDiv-Link" to="/register">You don't have an account? Register here!</NavLink>
                    </nav>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen
