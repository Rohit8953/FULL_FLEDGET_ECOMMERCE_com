import toast from "react-hot-toast"
import axios from "axios"

const getotp=async(data)=>{
    if (!data.email) {
        return
    }
    let response;

    try {
      console.log("isClicked")
      response=await axios.post(`${process.env.REACT_APP_API_URL}/otp`,data,{   withCredentials: true,})
      console.log("response is--=-=-=-",response);
      if (response.data.success){
        toast.success(response.data.message)
      }
    } catch (error){
      toast.error(error?.response?.data?.message);
    }
    return response;

}
export default getotp;