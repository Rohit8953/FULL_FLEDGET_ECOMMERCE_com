import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { getUser } from "../Redux/useSlice";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState();
  const [rotate, setrotate] = useState(true);

  const dispatch = useDispatch();
  const userdetails = useSelector((store) => store.userdetails.user);

  const countaddtocart = useSelector((state) => state.product.addtocatproduct);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };


  
  const logouthandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/logout`,{withCredentials:true}
      );
      if (response?.data?.success) {
        dispatch(getUser(null));
        toast.success("LoggedOut success...");
        navigate("/");
      }
    } catch (error) {
      console.log("Error during loggedout", error);
      toast.error("LoggedOut unsuccessful");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="text-2xl font-semibold text-red-600">
          <Link to={"/"} className="">
            Shop
          </Link>
        </div>

        <div className="flex items-center w-full justify-between max-w-[35%]  sm:max-w-[40%] md:max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="search product here..."
            className="w-full pl-1 outline-none"
          />
          <div className="text-lg min-w-[30px] sm:min-w-[40px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-7">
          <div className="relative flex justify-center">
            {userdetails?._id && (
              <div
                onClick={() => setMenuDisplay((prev) => !prev)}
                className="text-3xl cursor-pointer relative flex justify-center"
              >
                {userdetails?.userImage ? (
                  <div className="w-fit h-fit border-[3px] border-red-500 rounded-full">
                    <img
                      src={userdetails?.userImage}
                      className="w-8 h-8 rounded-full"
                      alt={userdetails?.name}
                    />
                  </div>
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div
                style={{ padding: userdetails?.role === "general" ? 8 : 0 }}
                className="absolute bg-white  top-14 h-fit shadow-lg rounded"
              >
                <nav>
                  {userdetails?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="whitespace-nowrap block md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {userdetails?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{countaddtocart.length}</p>
              </div>
            </Link>
          )}

          <div className="hidden sm:flex">
            {userdetails?._id ? (
              <button
                onClick={logouthandler}
                className="px-3 py-[2px] rounded-full text-red-600 border-2 border-red-600 hover:bg-red-500 transition-all hover:text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-[2px] rounded-full text-red-600 border-2 border-red-600 hover:bg-red-500 transition-all hover:text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div
          onClick={() => setrotate(!rotate)}
          className=" flex sm:hidden h-fit w-fit"
        >
          {rotate ? (
            <IoReorderThreeOutline className="text-3xl" />
          ) : (
            <RxCross1 />
          )}
        </div>
      </div>

      {/* For mobile size */}

      <div className="flex sm:hidden">
        {!rotate && (
          <div className="absolute top-[100%] right-0 w-fit  pr-4 bg-white ">
            <div className="mt-16">
              {userdetails?._id ? (
                <button
                  onClick={logouthandler}
                  className="px-3 py-[2px] rounded-full text-red-600 border-2 border-red-600 hover:bg-red-500 transition-all hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="px-3 py-[2px] rounded-full text-red-600 border-2 border-red-600 hover:bg-red-500 transition-all hover:text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
