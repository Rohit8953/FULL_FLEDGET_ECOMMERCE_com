import React, { useState } from 'react'
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const CreateNewPassword = () => {
  
  const [showConfirmPassword,setShowConfirmPassword]=useState(true)
  const [shownewPassword,setShownewPassword]=useState(true)
  const [data,setdata]=useState({newpassword:'',confirmPassword:''})
  
  const navigate=useNavigate()

  const handleOnChange=(e)=>{

    const {name,value}=e.target;
     setdata((prev)=>{
      return {
        ...prev,
        [name]:value
      }
     })
  }

  const submithandler=async()=>{
    try {
      console.log("data",data);
      const response=await axios.post(`${process.env.REACT_APP_API_URL}/updatePassword`,data,{withCredentials:true})
      console.log("response is",response);
      if (response.data.success){
          toast.success(response.data.message);
          navigate('/login')
      }
    }catch(error){
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <section className=' bg-slate-100 p-4 w-full min-h-screen flex items-center -mt-10'>
      <div className='bg-white p-5 w-full max-w-sm mx-auto relative  flex flex-col gap-6 rounded-md'>
        <div className='flex items-center '>
            <p className='mx-auto text-2xl font-semibold'>Forgot password</p>
        </div>

        <div className='h-44 w-44 rounded-full bg-red-200 flex items-center justify-center mx-auto'>
            <RiLockPasswordFill className='text-8xl text-red-600'/>
        </div>

        <div className='w-full '> 
          <p className='mx-auto'>Your New Password, Must Be Different From Previously Used Password</p>
        </div>

        <div>
              <div className="relative flex mt-2">
                    <input
                      type={shownewPassword ? "text" : "password"}
                      placeholder="New Password"
                      value={data.newpassword}
                      id="newpassword"
                      name="newpassword"
                      onChange={handleOnChange}
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    />
                    <label
                      for="confirmPassword"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      New Password
                    </label>
                    <div
                      className="cursor-pointer text-xl  absolute right-0 top-3"
                      onClick={() => setShownewPassword((preve) => !preve)}
                    >
                      <span>
                        {shownewPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
              </div>

              <div className="relative flex mt-4">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={data.confirmPassword}
                      id="confirmPassword"
                      name="confirmPassword"
                      onChange={handleOnChange}
                      required
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    />
                    <label
                      for="confirmPassword"
                      class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Conform Password
                    </label>
                    <div
                      className="cursor-pointer text-xl  absolute right-0 top-3"
                      onClick={() => setShowConfirmPassword((preve) => !preve)}
                    >
                      <span>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
              </div>
          </div>

        <div className='mx-auto'>
            <button onClick={submithandler} className='bg-red-500 hover:bg-red-700 text-white px-16 py-2 w-fit rounded-md hover:scale-110 transition-all  block mt-6'>Save</button>
        </div>

      </div>
  </section>
  )
}

export default CreateNewPassword