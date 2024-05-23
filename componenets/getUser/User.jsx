import React from "react";
import { Link } from "react-router-dom";
import "./User.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";


/*------------Fetch data-----------------*/
const User = ()=>{
    const [users, setUsers] = useState([]);
    const[reload, setReload] = useState(null)
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get("http://localhost:8080/users")
            setUsers(response.data.allUsers || []);
            toast.success(response.data.msg,{position:"top-right"})
        }
        fetchData();
    },[])


    /*------------------Delete User-------------- */
    const deleteUser = async(userId)=>{
        await axios.delete(`http://localhost:8080/delete/${userId}`)
        .then((response)=>{
            setUsers((prevUser)=>prevUser.filter((user)=>user._id))
            toast.success(response.data.msg,{position:"top-right"})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    /*------------------HTML Page-----------------*/
    return(
        <div className="userTable">
            <Link to={"/add"} className="addButton">Add User</Link>
            <table border={1} cellPadding={10} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>S-no.</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                      users.map((user, index)=>(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td className="actionButtons">
                                <button onClick={()=>deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/edit/`+ user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                      ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default User