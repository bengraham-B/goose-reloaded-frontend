import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// const { Link }= require("react-router-dom")

// const React = require("react")
// const { useEffect, useState} = require("react")

export default function Home() {
	//^ This state is used to set the total number of reloads the user has
	const [allReloads, setAllReloads] = useState([])
	const [admin, setAdmin] = useState() //^ Stores the user's admin status

	useEffect(() => {

		//^ This functions gets the amount of reloads the user
		const getUserReloadsAmount = async (token) => {
			const response = await fetch('http://localhost:8001/api/reload', {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				}
			})
			const data = await response.json()
			setAllReloads(data.length) //^ Setting the length of the reloads array from the DB to state, by counting the length of the array where the response is stored
		}
		const userJWT = JSON.parse(localStorage.getItem('goose-reloaded-user'))

		if(localStorage.getItem('goose-reloaded-user')){
			const userToken = userJWT.token
			getUserReloadsAmount(userToken)

			const object = JSON.parse(localStorage.getItem("goose-reloaded-user"))
			setAdmin(object.admin) //^ Saves the user's admin status to state.
		}

		
	},[])
  return (
    <div id="HomePage">

		
		<div className="header">Home</div>

		<dvi className="comp-container">
			<div className="wrapper">

				<div className="container">
					<h3>Total Reloads</h3>
					{allReloads}
				</div>

				<div className="container handgun">
					<h3>Handgun</h3>
					<button>
						<Link to="/gun/gun">Add Reload</Link>
					</button>
				</div>

				{/* 
					If the user is an admin, they can access this page where they can 
					edit user's permissions.
				 */}
				{admin ?
					<div className="container handgun">
						<h3>User</h3>
						<button>
							<Link to="/user">Users</Link>
						</button>
					</div>
				:
					<></>
					// If the user is not an admin, their home page will recieve an empty fragment.
				}
				
			</div>
		</dvi>
    </div>
  )
}
