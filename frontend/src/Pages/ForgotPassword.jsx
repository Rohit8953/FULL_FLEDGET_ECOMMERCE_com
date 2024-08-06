import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdAttachEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import getotp from "../helpers/getotp";
import otpandemails from "../helpers/otpandemails";

const ForgotPassword = () => {
  const [data, setdata] = useState({ email: "" });
  const navigate = useNavigate();

  const clickhandler = async () => {
    const result = await getotp(data);
    await otpandemails();
    navigate("/verifycode");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata(() => {
      return {
        [name]: value,
      };
    });
  };

  console.log("email is here", data);

  return (
    <section className=" bg-slate-100 w-full px-4 min-h-screen flex items-center -mt-10">
      <div className="bg-white p-5 w-full max-w-sm mx-auto relative flex flex-col gap-8 rounded-md">
        <Link to="/login" className="flex items-center">
          <IoIosArrowBack className="text-2xl" />
          <p className="mx-auto text-2xl font-semibold">Forgot password</p>
        </Link>

        <div className="h-44 w-44 rounded-full bg-red-200 flex items-center justify-center mx-auto">
          <MdAttachEmail className="text-8xl text-red-600" />
        </div>

        <div className="w-full ">
          <p className="mx-auto">
            Please Enter Your Email Address to Recieve a Verification Code
          </p>
        </div>

        <div className="grid">
          <div className=" relative mt-2">
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

        <div className="mx-auto">
          <button
            onClick={clickhandler}
            className="bg-red-500 hover:bg-red-700 text-white px-16 py-2 w-fit rounded-md hover:scale-110 transition-all  block mt-6"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
