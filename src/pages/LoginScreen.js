import React, { useContext, useEffect, useState } from 'react'
import '../styles/login.css'
import { Link, NavLink, Redirect } from 'react-router-dom'
import { UserContext } from '../App'

const LoginScreen = ({ history }) => {

    const { UserInfo, setUserInfo } = useContext( UserContext )

    const [Form, setForm] = useState({})
    const [Error, setError] = useState({
        msg: '',
        hasError: false,
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if( !Form.User || !Form.Password ) {
            setUserInfo({ ...UserInfo, msg: 'You cannot leave fields empty' });
            return;
        }

        const userData = await fetch('https://rpsbackendjopt.herokuapp.com/api/login', {
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
            user: userData?.usuario
        }) 

        history.replace('/game');

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
                    <input 
                        name="Password" 
                        type="password"
                        className="MainBody__Container-Form-Input"
                        onChange={ handleChange }
                    />
                    <p className={ `MainBody__Container-Form-Message${ Error.hasError ? '-Error' : '' }` }>
                        { Error?.msg }
                    </p>
                    <button className="MainBody__Container-Form-Button">
                        Login
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