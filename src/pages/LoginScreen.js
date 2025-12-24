import React, { useContext, useEffect, useState } from 'react'
import '../styles/login.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import Loading from '../assets/Loading.svg';

const LoginScreen = () => {

    const { UserInfo, setUserInfo } = useContext( UserContext )
    const navigate = useNavigate();

    const [Form, setForm] = useState({})
    const [Error, setError] = useState({
        msg: '',
        hasError: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        setisLoading(true);
        
        if( !Form.User || !Form.Password ) {
            setUserInfo({ ...UserInfo, msg: 'You cannot leave fields empty' });
            return;
        }

        console.log(process.env.REACT_APP_API_URL)

        const userData = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: Form.User,
                password: Form.Password,
            }),
        })
        .then( resp => resp.json() )
        .catch( err => console.log( err ) );

        if( userData.msg ) {
            setError({
                ...Error,
                msg: userData.msg,
                hasError: true,
            })
            setisLoading(false);
            return;
        }

        setError({
            ...Error,
            msg: '',
            hasError: false,
        })
        
        setUserInfo({ 
            ...UserInfo, 
            tokenId: userData?.tokenId, 
            user: userData?.usuario,
            isLogged: true,
        }) 

        setisLoading(false);

        navigate('/game', { replace: true });

    }

    const handleChange = (e) => {
        setForm({
            ...Form,
            [ e.target.name ] : e.target.value
        })
    };

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
                    <p className={ `MainBody__Container-Form-Message${ Error.hasError ? '-Error' : '' }` }>
                        { Error?.msg }
                    </p>
                    <button className="MainBody__Container-Form-Button">
                        {
                            isLoading
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
