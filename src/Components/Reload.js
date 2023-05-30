import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { refreshCount } from '../store/redux'

export default function Reload(props) {
    const dispatch = useDispatch()

    const [edit, setEdit] = useState(false)

    const [userTitle, setUserTitle] = useState()

    const [bulletHeadMakeEdit, setBulletHeadMakeEdit] = useState()
    const [bulletHeadTypeEdit, setBulletHeadTypeEdit] = useState()
    const [bulletWeightEdit, setBulletWeightEdit] = useState()

    const [powderMakeEdit, setPowderMakeEdit] = useState()
    const [powderTypeEdit, setPowderTypeEdit] = useState()
    const [powderWeightEdit, setPowderWeightEdit] = useState()

    const [casingMakeEdit, setCasingMakeEdit] = useState()
    const [primerMakeEdit, setPrimerMakeEdit] = useState()



  


    //^ Handles the delete function of CRUD operations.
    const handleDelete = async (id, token) => {

        const response = await fetch("http://localhost:8001/api/reload", {
            method: "DELETE",
            body: JSON.stringify({ id: id }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json()
        dispatch(refreshCount())

        console.log(data)

    }


   
    //^ Handles the Edit function of CRUD operations.
    const saveEdit = async (id, token) => {
        setEdit(false)
        console.log(bulletHeadMakeEdit, id)

        const response = await fetch(`http://localhost:8001/api/reload/${id}`, {
            method: "PUT",
            body: JSON.stringify(
                { 
                    user_title: userTitle,
                    
                    bullet_head_make: bulletHeadMakeEdit,
                    bullet_head_type: bulletHeadTypeEdit,
                    bullet_weight: bulletWeightEdit,
                    
                    powder_make: powderMakeEdit,
                    powder_type: powderTypeEdit,
                    powder_weight: powderWeightEdit,
                
                    casing_make: casingMakeEdit,
                    primer_make: primerMakeEdit
                }
             ),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const data = await response.json()

        console.log(data)
        dispatch(refreshCount())
        
    }
    
    const handleEdit = () => {
        setEdit(true) //^ sets the state of edit to true to chanhes the headings to inputs
    }

    const cancelEdit = () => {
        setEdit(false) //^ changes inputs back to headings
    }

 

  return (
    <div id="Reload-Component">

       
        <div className="rc-title-container">
            <div className="email-container">
            <h2>{props.user_email}</h2>
            </div>

           {edit ? <input className="user-title-input" onChange={(e) => setUserTitle(e.target.value)} placeholder={props.user_title} type="text" /> : <h2>{props.user_title}</h2>}
            <h3>9mm</h3>
        </div>

        <div className="reload-container">
            <h3>Bullet Head</h3>

            <p>Bullet Make: </p>{edit ? <input placeholder={props.bullet_head_make} type="text" onChange={(e) => setBulletHeadMakeEdit(e.target.value)} /> : <h4><strong></strong> {props.bullet_head_make}</h4>}
            <p>Bullet Type: </p>{edit? <input placeholder={props.bullet_head_type} type="text" onChange={(e) => setBulletHeadTypeEdit(e.target.value)}  /> : <h4>{props.bullet_head_type}</h4>}
            <p>Bullet Weight: </p>{edit? <input placeholder={props.bullet_weight} type="text" onChange={(e) => setBulletWeightEdit(e.target.value)}  /> : <h4>{props.bullet_weight}</h4>}
        </div>

        <div className="reload-container">
            <h3>Powder</h3>

            <p>Powder Make: </p>{edit ? <input placeholder={props.powder_make} type="text" onChange={(e) => setPowderMakeEdit(e.target.value)} /> : <h4>{props.powder_make}</h4>}
            <p>Powder Type: </p>{edit ? <input placeholder={props.powder_type} type="text" onChange={(e) => setPowderTypeEdit(e.target.value)} /> : <h4>{props.powder_type}</h4>}
            <p>Powder Weight: </p>{edit ? <input placeholder={props.powder_weight} type="text" onChange={(e) => setPowderWeightEdit(e.target.value)} /> : <h4>{props.powder_weight}</h4>}
        </div>

        <div className="reload-container">
            <h3>Casing</h3>
            <p>Casing: </p>{edit ? <input placeholder={props.casing_make} type="text" onChange={(e) => setCasingMakeEdit(e.target.value)} /> : <h4>{props.casing_make}</h4>}
        </div>
        
        <div className="reload-container">
            <h3>Primer</h3>
            <p>Primer: </p>{edit ? <input placeholder={props.primer_make} type="text" onChange={(e) => setPrimerMakeEdit(e.target.value)} /> : <h4>{props.primer_make}</h4>}

        </div>

        <div className="button-container">
            {edit ? <button onClick={() => saveEdit(props._id, props.token)}>Save Edit</button> : <button onClick={() => handleEdit(props._id)}>Edit</button>}
            {edit ? <button className="cancel-button" onClick={cancelEdit}>Cancel</button> : <button onClick={() => handleDelete(props._id, props.token)}>Delete</button>}        </div>
     
    </div>
  )
}
