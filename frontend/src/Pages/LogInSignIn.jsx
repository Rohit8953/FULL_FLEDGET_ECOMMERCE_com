import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUser } from "../Redux/useSlice";
import uploadImage from "../helpers/uploadImageOnc";
import { FaRegCircleUser } from "react-icons/fa6";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa6";

const LogInSignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginhai, setloginhai] = useState(false);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {

    const { name, value } = e.target;
    console.log("value is ", value);
    if (value) {
      setData((preve) => {
        return {
          ...preve,
          [name]: value,
        };
      });
    }
  };
  
  const submithandler = async (e) => {
    e.preventDefault();
    if (loginhai) {
      //signIn code
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/signup`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setloginhai(false);
      } catch (error) {
        console.log("Error during signUp-->", error);
        toast.error(error?.response?.data?.message);
      }
    } else {
      //login Code
     
      try {
        const res = await axios.post("https://full-fledget-ecommerce-com.vercel.app/login",data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          console.log("responsen data", res.data.user);
          dispatch(getUser(res.data.user));
          setloginhai(true);
          navigate("/");
        }
      } catch (error) {
          console.log("Error found during the Login", error);
          toast.error(error?.response?.data?.message);
      }
    }
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    console.log("file uploaded on cloudinary--->", uploadImageCloudinary.url);
    const URLS = uploadImageCloudinary.url;
    setData((prev) => ({
      ...prev,
      profilePic: URLS,
    }));
  };

  return (
    <section
      style={{ scrollbarColor: "#ff6347", scrollbarWidth: "1px" }}
      id="signup"
      className=" bg-slate-100 w-full min-h-screen flex items-center -mt-10"
    >
      <div className="mx-auto container  z-0 relative">
        <div className="bg-white p-5 w-full max-w-sm mx-auto relative sm:rounded-3xl ">
          <div class="absolute inset-0 -z-10  bg-gradient-to-r from-red-400 to-red-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="w-20 h-20 mx-auto relative border-[3px] border-red-500 overflow-hidden rounded-full">
            {data?.profilePic ? (
              <div className="w-fit h-fit  rounded-full">
                <img
                  src={data?.profilePic}
                  className="w-full h-full rounded-full"
                  alt={data?.name}
                />
              </div>
            ) : (
              <FaRegCircleUser className="w-full h-full text-red-600" />
            )}

            {!data?.profilePic && (
              <form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadFile}
                  />
                </label>
              </form>
            )}
          </div>

          <form  className="pt-6 flex flex-col gap-2">
            {loginhai && (
              <div className="grid">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  />
                  <label
                    for="email"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                </div>
              </div>
            )}
            <div className="grid  ">
              <div className=" relative  mt-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                />
                <label
                  for="email"
                  class="absolute left-0 -top-3.5 text-gray-600  text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>
            </div>

            <div className="">
              <div className="relative flex mt-2">
                <input
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                />
                <label
                  for="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
                <div
                  className="cursor-pointer text-xl my-auto  absolute right-0 top-3"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword?<FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            {loginhai && (
              <div>
                <div className="relative flex mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="enter confirm password"
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
            )}

            <div className="flex flex-row justify-between items-center">
              <button onClick={submithandler} className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 w-fit rounded-md hover:scale-110 transition-all  block mt-6">
                 {loginhai?(<p>SignUp</p>):(<p>Login</p>)}
              </button>
              <div>
                {
                  !loginhai&&(
                        <Link to='/forgotPassword' className="mt-5 text-red-500 hover:underline transition-all delay-200">Forgot your password</Link>
                  )
                }
              </div>

            </div>


            {/* <div className="w-full mt-5">
              {!loginhai && (
                <div className="flex flex-row justify-between h-full w-full">
                    <div class="w-full flex justify-start">
                    <button class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <FcGoogle className="text-2xl mr-2"/>
                        <span>Google</span>
                    </button>
                    </div>

                    <div class="w-full flex justify-end">
                    <button class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        <FaGithub className="2xl mr-2"/>
                        <span>Github</span>
                    </button>
                    </div>
                </div>
              )}
            </div> */}

          </form>


          <p className="my-5">
            {loginhai ? (
              <p>Already have account?</p>
            ) : (
              <p>Don't have account ?</p>
            )}{" "}
            <div
              onClick={() => setloginhai(!loginhai)}
              className=" cursor-pointer text-black-600 hover:text-red-700 hover:underline"
            >
              {!loginhai ? <p>SignUp</p> : <p>Login</p>}
            </div>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LogInSignIn;
