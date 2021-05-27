import React, { useState } from 'react'
import '../styles/login.css'
import { Link, NavLink, Redirect } from 'react-router-dom'

const RegisterScreen = ({ history }) => {

    const [Form, setForm] = useState({})

    const [UserInfo, setUserInfo] = useState({
        msg: '',
        id: '',
        hasError: false,
    })

    const handleChange = (e) => {
        setForm({
            ...Form,
            [ e.target.name ] : e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if( !Form.User || !Form.Password ) {
            setUserInfo({ ...UserInfo, msg: 'You cannot leave fields empty' });
            return;
        }

        const userData = await fetch('https://rpsbackendjopt.herokuapp.com/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: Form.User,
                password: Form.Password,
                score: 0
            }),
        })
            .then( resp => resp.json() )
            // .then( data => setUserInfo({ ...UserInfo, msg: data.msg }) )
            // .catch( err => console.log(err) )

        if( userData.errors ) {
            setUserInfo({ 
                ...UserInfo,
                msg: userData.errors[0].msg
            });
            return;
        }

        setTimeout(() => {
            history.goBack();
        }, 1000);

    }

    return (
        <div className="MainBody">
            <div className="MainBody__Container">
                <form onSubmit={handleSubmit} className="MainBody__Container-Form">
                    <p className="MainBody__Container-Form-Title">
                        Register
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
                        type="password"
                        name="Password" 
                        className="MainBody__Container-Form-Input"
                        onChange={ handleChange }
                    />
                    <p className={ `MainBody__Container-Form-Message${ UserInfo.hasError ? '-Error' : '' }` }>
                        { UserInfo.msg }
                    </p>
                    <button className="MainBody__Container-Form-Button">
                        Register
                    </button>
                    <nav className="MainBody__LinksDiv">
                        <NavLink exact className="MainBody__LinksDiv-Link" to="/login">You have an account? Login here!</NavLink>
                    </nav>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen
