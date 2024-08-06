import React, { useState } from 'react'
import ROLE from '../common/Common'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ChangeUserRole=({onClose,callFunc,id})=>{
    const user=useSelector((store)=>store.userdetails.user)
    
    console.log("user from change role",user)
    const [userRole,setUserRole] = useState(user.role);

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)
    }

    const updateUserRole = async() =>{
        try {
            const responseData=await axios.post(`${process.env.REACT_APP_API_URL}/updateRole`,{id,userRole},{
                withCredentials:true
             })
           
            if(responseData.data.success){
                callFunc();
                onClose(true)
                toast.success("Role change successfuly")
            }


        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto' onClick={onClose}>
                <IoMdClose/>
            </button>

            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

             <p>Name : {user.name}</p>   
             <p>Email : {user.email}</p> 

            <div className='flex items-center justify-between my-4'>
                <p>Role :</p>  
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>
            <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateUserRole}>Change Role</button>
       </div>
    </div>
  )
}

export default ChangeUserRole