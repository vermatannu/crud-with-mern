import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import "./edit.css"

const Edit = ()=>{

    const users = {
        fname: "", 
        lname: "",
        email: "",
    }

    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(users);

    const inputChangeHandler = (e)=>{
        const {name, value} = e.target;
        setUser({...user, [name]:value});
    }

    useEffect(()=>{
        axios.put(`http://localhost:8080/users/${id}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[id])

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/users/${id}`, user)
        .then((response)=>{
            toast.success(response.data.message, {position: "top"})
            navigate("/")
        })
        .catch(error => console.log(error))

    }

    return(
        <div className='adduser'>
            <Link to={"/"}>Back</Link>
            <h3>Edit User</h3>
            <form className='addUserForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor='fname'>First Name</label>
                    <input type='text' value={user.fname} onChange={inputChangeHandler} id='fname' name='fname' placeholder='First Name'></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor='lname'>Last Name</label>
                    <input type='text' value={user.lname} onChange={inputChangeHandler} id='lname' name='lname' placeholder='Last Name'></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor='email'>Email</label>
                    <input type='email' onChange={inputChangeHandler} id='email' name='email'></input>
                </div>
                <div className="inputGroup">
                    <button type="submit">Update User</button>
                </div>
            </form>
        </div>
    )
}

export default Edit