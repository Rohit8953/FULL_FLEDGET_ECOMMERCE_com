import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const userdetails = useSelector((store) => store.userdetails.user);
  //   useEffect(()=>{
  //          if(user.role!=='admin'){
  //             navigate('/');
  //          }
  //   },[user])

  return (
    <div className="h-full w-full flex sm:flex-row flex-col mt-[0.1rem]">
      <aside className="bg-white sm:w-[20%] w-full h-fit sm:h-[100vh] shadow-md shadow-slate-300 pt-5">
        <div className="flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {userdetails?.userImage ? (
              <img
                src={userdetails?.userImage}
                className="w-20 h-20 rounded-full border-[3px] border-red-500"
                alt={userdetails?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold mx-auto text-center">
            {userdetails?.name}
          </p>
          <p className="text-sm text-red-500">{userdetails?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link
              to={"/admin/allusers"}
              className="px-4 py-1 hover:bg-slate-100"
            >
              All Users
            </Link>
            <Link
              to={"/admin/allProduct"}
              className="px-4 py-1 hover:bg-slate-100"
            >
              All product
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full sm:w-[80%] p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
