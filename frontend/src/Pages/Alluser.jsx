import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import ChangeUserRole from "../Components/ChangeUserRole";

const Alluser = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [id, setid] = useState();
  const fetchAllUsers = async () => {
    try {
      const dataResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/allusers`,{withCredentials:true}
      );
      if (dataResponse?.data?.success) {
        setAllUsers(dataResponse?.data?.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4 overflow-x-scroll sm:overflow-x-hidden">
      <table className="w-full ">
        <thead>
          <tr className="bg-black text-white">
            <th className="border-2 border-white text-center">Sr.</th>
            <th className="border-2 border-white text-center">Name</th>
            <th className="border-2 border-white text-center">Email</th>
            <th className="border-2 border-white text-center">Role</th>
            <th className="border-2 border-white text-center">Created Date</th>
            <th className="border-2 border-white text-center">Action</th>
          </tr>
        </thead>
        <tbody className="">
          {allUser.map((el, index) => {
            return (
              <tr>
                <td className="border-[1px] border-black text-center">
                  {index + 1}
                </td>
                <td className="border-[1px] border-black text-center">
                  {el?.name}
                </td>
                <td className="border-[1px] border-black text-center">
                  {el?.email}
                </td>
                <td className="border-[1px] border-black text-center">
                  {el?.role}
                </td>
                <td className="border-[1px] border-black text-center">
                  {moment(el?.createdAt).format("LL")}
                </td>
                <td className="border-[1px] border-black text-center">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setOpenUpdateRole(true);
                      setid(el._id);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          callFunc={fetchAllUsers}
          id={id}
        />
      )}
    </div>
  );
};

export default Alluser;
