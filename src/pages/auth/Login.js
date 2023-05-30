import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    //^ Function which will handle the login logic
    const handleLogin = async () => {
        setError(null) //^ When the user logins in for the first time their should not be an error and after a failed attempt it will remove the previous error message.

        try {
            const response = await fetch("https://l3-t16-server.vercel.app/api/user/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "Application/json"
                }
            })

            const data = await response.json()

            //^ If their is an error loggin the user it will be set to Error state and then displayed on the screen.
            if(data.error){
                setError(data.error)
            }

            //^ If no errors are encounted when loggin in the jwt will be added to local storage.
            else {
                localStorage.setItem('goose-reloaded-user', JSON.stringify(data))
                window.location.assign("/")
            }
        }

        catch(error){
            setError("Caanot connect to server")
        }
    }

    return (
        <div id="Login-Signup-form">

            <div className="form-container">

                <div className="title-container">
                    <h1>Login</h1>
                </div>

                <div className="input-container">
                    <div className="email-wrapper">
                        <h2>Email</h2>
                        <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="password-wrapper">
                        <h2>Password</h2>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="button-container">
                    <button onClick={handleLogin}>Login</button>
                </div>

                {error && <div className="error-container">
                    <div>
                         <h4>{error}</h4>
                    </div>
                </div>}
            </div>

            <div className="text-container">
                {/* This link will allow the user to go to the Signup page  */}
                 <p>Not yet a member yet, <Link to="/auth/Signup"> Signup.</Link></p>
            </div>

        </div>
    )
}
