import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const handleSignup = async () => {
        setError(null) //^ When the user logins in for the first time their should not be an error and after a failed attempt it will remove the previous error message.

        try {
            const response = await fetch("https://l3-t16-server.vercel.app/api/user/signup", {
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
            console.log(data)

            //^ If their is an error loggin the user it will be set to Error state and then displayed on the screen.
            if(data.error){
                setError(data.error)
            }

            //^ If no errors are encounted when loggin in the jwt will be added to local storage.
            else {
                localStorage.setItem('goose-reloaded-user', JSON.stringify(data))
                window.location.assign("/") //^ Sends the user to the home page if their signup is successful.
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
                    <h1>Sign Up</h1>
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
                    <button onClick={handleSignup}>Sign Up</button>
                </div>

                {error && <div className="error-container">
                    <div>
                         <h4>{error}</h4>
                    </div>
                </div>}
            </div>

            <div className="text-container">
                {/* This link will allow the user to go to the Login page */}
                <p>Already a member, <Link to="/auth/Login"> Login.</Link></p>
            </div>

        </div>
    )
}
