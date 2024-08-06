import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdAttachEmail } from "react-icons/md";
import axios from "axios"
import toast from "react-hot-toast";
import otpandemails from "../helpers/otpandemails";

const VerifyCode = () => {
  const [otp, setotp] = useState(new Array(4).fill(""));
  const [combineotp, setcombineotp] = useState();
  const useref = useRef([]);
  const navigate = useNavigate();
  const [second, setsecond] = useState(59);
  const [minute, setminut] = useState(1);

  useEffect(() => {
    if (useref.current[0]) {
      useref.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const setenterval = setInterval(() => {
      setsecond((prevSecond) => {
        if (prevSecond > 0) {
          return prevSecond - 1;
        } else {
          if (minute > 0) {
            setminut((prevMinute) => prevMinute - 1);
            return 59;
          } else {
            clearInterval(setenterval);
            return 0;
          }
        }
      });
    }, 1000);

    return () => {
      clearInterval(setenterval);
    };
  }, [minute]);

  const handleOnChange = async (index, e) => {
    const value = e.target.value;

    if (value && index < 3) {
      useref.current[index + 1].focus();
    }
    if (!value && index > 0) {
      useref.current[index - 1].focus();
    }

    if (isNaN(value)) return;
    const newotp = [...otp];
    newotp[index] = value.substring(value.length - 1);
    setotp(newotp);
    setcombineotp(newotp.join(""));
  };

  const submithandler = async () => {
    try {
      console.log(combineotp);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/verifyotp`,
        { otp: combineotp },
        {
          withCredentials: true,
        }
      );
      console.log("response is", response);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/newpassword");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const clickhandler = async () => {
    const result = await otpandemails();
    console.log("result is there", result);
    setsecond(59);
    setminut(1);
  };

  return (
    <section className=" bg-slate-100 w-full p-4 min-h-screen flex items-center -mt-10">
      <div className="bg-white p-5 w-full max-w-sm mx-auto relative flex flex-col gap-6 rounded-md">
        <Link to="/" className="flex items-center ">
          <IoIosArrowBack className="text-2xl" />
          <p className="mx-auto text-2xl font-semibold">Verify Your Email</p>
        </Link>

        <div className="h-44 w-44 rounded-full bg-red-200 flex items-center justify-center mx-auto">
          <MdAttachEmail className="text-8xl text-red-600" />
        </div>

        <div className="w-full">
          <p className="mx-auto">
            Please Enter The 4 Digits Code Sent To
            <p>Email</p>
          </p>
        </div>

        <div className="flex gap-2 mx-auto ">
          {otp.map((value, index) => {
            return (
              <div key={index} className=" relative mt-2">
                <input
                  ref={(input) => (useref.current[index] = input)}
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  value={value}
                  onChange={(e) => handleOnChange(index, e)}
                  required
                  className="placeholder-transparent h-10 w-10 border-2 text-center border-gray-300 focus:border-red-500 text-gray-900 focus:outline-none focus:borer-rose-600"
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-row gap-2 mx-auto">
          <p
            onClick={clickhandler}
            className="mx-auto  hover:cursor-pointer hover:underline text-red-600"
          >
            Resend Code
          </p>
          <p
            className={
              minute === 0 && second < 10 ? "text-red-600" : "text-gray-700"
            }
          >
            <span>{minute < 10 ? `0${minute}` : minute}</span>:
            <span>{second < 10 ? `0${second}` : second}</span>
          </p>
        </div>

        <div className="mx-auto">
          <button
            onClick={submithandler}
            className="bg-red-500 hover:bg-red-700 text-white px-16 py-2 w-fit rounded-md hover:scale-110 transition-all  block mt-6"
          >
            Verify
          </button>
        </div>
      </div>
    </section>
  );
};

export default VerifyCode;
