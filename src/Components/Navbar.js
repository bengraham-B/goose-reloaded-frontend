import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { authStatus, logoutRedux } from '../store/redux'

export default function Navbar() {
	const user = useSelector((state) => state.redux.userAuthStatus)


	const [userName, setUserName] = useState() //^ Used to get and display the user name next to the logout button
	const [admin, setAdmin] = useState() //^ Gets the user's admin status.
	const [userAuth, setUserAuth] = useState() //^ Stores the state reharding if the user is authenticated or not

	const dispatch = useDispatch()

	const handleLogout = () => {
		//~ Dispatching the REDUX functions when the user logs out
		dispatch(logoutRedux()) //~ Handles loggin out the user
		dispatch(authStatus()) //~ Updating the state in redux when the user logins or out. Set to false.
	}

	dispatch(authStatus()) //~ Updating the state in redux when the user logins or out. Set to true.


	

	useEffect(() => {

		if(localStorage.getItem("goose-reloaded-user")){
			const object = JSON.parse(localStorage.getItem("goose-reloaded-user"))
			setUserName(object.email)
			setUserAuth(true) //^ If user is not authenticated

			//^ checking if the user is an admin
			if(object.admin){
				setAdmin("Admin")
			} else {
				setAdmin("")
			}
			
		} else {
			setUserName("")
			setUserAuth(false) //^ If user is not authenticated
		}

	}, [])

	return (
		<div id="Navbar">

			{userAuth ? 
			//^ If the user os authenticated they will see the 'Home' link
			<div className="home-container">
				<Link to="/">
					<h2>Home</h2>
				</Link>
			</div>
			: 
			//^ If the user is not authenticated they will not see the 'Home' link
			<div className="home-container">
				
			</div>
			}

			<div className="title-container">
				<h1>GOOSE_RELOADED</h1>
				{/* If the user is an admin will display, it will display admin under the title. */}
				<h3>{admin}</h3>
			</div>

			<div className="auth-container">
				{user ? 
					<div className='button-conatiner'>
						<h3>{userName} </h3> 
						<button onClick={handleLogout}>Logout</button>
					</div> 
					:
					<div className='button-conatiner'>
						<button className='unauthed-user'>
							<Link to="/auth/login">Login</Link>
						</button>
						<button className='unauthed-user'>
							<Link to="/auth/signup">Signup</Link>
						</button>

					</div>

				}
				
			</div>
		</div>
	)
}
