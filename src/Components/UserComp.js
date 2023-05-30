import React, {useState, useEffect} from 'react'

//~ Importing Redux
import { useDispatch, useSelector } from 'react-redux'
import { refreshCount } from '../store/redux'

export default function UserComp(props) {

    const refreshCountValue = useSelector((state) => state.redux.refreshCountValue) //~ Getting the refreshCountValue value from Redux State

    const dispatch = useDispatch()

    const [permissionsStatus, setPermissionsStatus] = useState() //^ Stores the permissions status of the user in state
    const [permissionsText, setPermissionsText] = useState() //^ Stores the permissions status of the user in state

    const [adminStatus, setAdminStatus] = useState() //^ Stores the admin status of the user in state
    const [adminText, setAdminText] = useState() //^ Stores the admin status of the user to state
    
    const [userEmail, setuserEmail] = useState() //^ Stores the email of the current user, which will be used to highlight their account.
    const [userEmailCheck, setuserEmailCheck] = useState() //^ If the email is true it will store true and will be used to highlight the user account in the list.

    const [count, setCount] = useState(0)



    //^ This functional will handle the request to make a user an admin
    const handleMakeAdmin = async (id, adminStatus) => {
        const response = await fetch(`https://l3-t16-server.vercel.app/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                admin: !adminStatus
            })
        })

        dispatch(refreshCount())
        setCount(count + 1)
        const data = await response.json()
        console.log(data)

        //^ State would not update after the first click of a button, so window.location.assign("/user")  is
        //^ used to create a hard refresh of the page.
        window.location.assign("/user") 
    }
    
    //^ This functional will handle the request to enable and disable a user's account
    const handleChangePermissions = async (id, permissionsStatus) => {
        const response = await fetch(`https://l3-t16-server.vercel.app/api/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                permissions: !permissionsStatus
            })
        })

        const data = await response.json()
        dispatch(refreshCount())
        setCount(count + 1)

        //^ State would not update after the first click of a button, so window.location.assign("/user")  is
        //^ used to create a hard refresh of the page.
        window.location.assign("/user") 
    }

    

    //^ If the user is an Admin, the word 'admin' will appear under email. 
    useEffect(() => {
        setAdminStatus(props.admin) //^ Sets the admin status of each user being displayed from props, which will be used when making and removing admins
        setPermissionsStatus(props.permissions) //^ Sets the permissions status of each user being displayed from props, which will be used when enabling and disabling account
        
        if(props.admin){
            setAdminText("Admin")
        } else {
            setAdminText("")
        }
        
        if(props.permissions){
            setPermissionsText("Enabled")
        } else {
            setPermissionsText("Disabled")
        }

        if(localStorage.getItem("goose-reloaded-user")){
			const object = JSON.parse(localStorage.getItem("goose-reloaded-user"))
			setuserEmail(object.email)
        }

        if(userEmail === props.email){
            setuserEmailCheck(true)
        } else {
            setuserEmailCheck(false)
        }

    }, [count, refreshCountValue, adminStatus, permissionsStatus]) //~ Using the refreshCountValue to update the UI every time a user presses a button.


  return (
    <div >

        {userEmailCheck ? 
         <div id="User-Comp-current-user">
        <div>
            <div className="user-info">
                <div className="title-container">
                    <h2>{props.email}</h2>
                    <h3>{adminText}</h3>
                    <h4>{permissionsText}</h4>
                </div>
            </div>

        </div>
        </div>

        :
        <div id="User-Comp">
            <div>
            <div className="user-info">
                <div className="title-container">
                    <h2>{props.email}</h2>
                    <h3>{adminText}</h3>
                     <h4>{permissionsText}</h4>
                </div>
            </div>

            <div className="button-container">

                {adminStatus ? <button onClick={() => handleMakeAdmin(props._id, props.admin)}>Remove Admin</button> : <button onClick={() => handleMakeAdmin(props._id, props.admin)}>Make Admin</button>}
                {permissionsStatus ? <button onClick={() => handleChangePermissions(props._id, props.permissions)}>Disable Account</button> : <button onClick={() => handleChangePermissions(props._id, props.permissions)}>Enable Account</button>}

            </div>
        </div>

    </div>



    
    }



        
        
    </div>
  )
}
