import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import "./add.css"
import { useForm } from "react-hook-form"

const Add = ()=>{

    const {register, handleSubmit, formState:{errors} } = useForm({
        defaultValues:{
            fname:"",
            lname:"",
            email:"",
            password:"",
        }
    });
    const onSubmit = async(data) =>{
        console.log(data);
        await axios.post("http://localhost:8080/create", data)
        .then((response)=>{
            toast.success(response.data.message, {position: "top"})
            navigate("/")
        })
        .catch(error => console.log(error))
    };

    const users = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        gender:"",
        role:"",
    }

    const[user, setUser] = useState(users);
    const navigate = useNavigate();

    // const inputHandler = (e)=>{
    //     const{name, value} = e.target;
    //     setUser({...user, [name]:value})
    // }

    const submitForm = async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/create", user)
        .then((response)=>{
            toast.success(response.data.message, {position: "top"})
            navigate("/")
        })
        .catch(error => console.log(error))
    }


    return(
        <div className='adduser'>
            <Link to={"/"}>Back</Link>
            <h3>Add New User</h3>
            <form className='addUserForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="inputGroup">
                    <label htmlFor='fname'>First Name</label>
                    <input type='text' placeholder='First Name' {...register("fname",{required: {value:true, message: "First Name is required"}})}></input>
                </div>
                {errors.fname && <p>{errors.fname.message}</p>}
                <div className="inputGroup">                    
                    <label htmlFor='lname'>Last Name</label>
                    <input type='text' placeholder='Last Name' {...register("lname",{required:{value:true, message: "Last Name is required"}})}></input>
                </div>
                {errors.lname && <p>{errors.lname.message}</p>}
                <div className="inputGroup">
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Your Email' {...register ("email",{required:{value:true, message: "Email is required"}})}></input>
                </div>
                {errors.email && <p>{errors.email.message}</p>}
                <div className="inputGroup">
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Enter your passowrd' {...register("password",{required:{vlaue:true, message: "Password is required"}})}></input>
                </div>
                {errors.password && <p>{errors.password.message}</p>}
                <div className='inputGroup'>
                    <label>Gender</label>
                    <div>
                        <input type='radio' value='male' {...register('gender')} /> Male
                        <input type='radio' value='female' {...register('gender')} /> Female
                    </div>
                </div>
                <div className='inputGroup'>
                    <label>Role</label>
                    <select {...register('role')}>
                        <option value=''>Select Role</option>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <button type="submit">Add User</button>
                </div>
            </form>
        </div>
    )
}

export default Add