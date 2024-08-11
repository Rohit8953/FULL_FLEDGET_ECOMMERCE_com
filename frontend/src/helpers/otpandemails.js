import axios from "axios";
import toast from "react-hot-toast";

const otpandemails = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/otpandemail`,
      {
        withCredentials: true, // This is important for cookies
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log("error aya hai...", error);
    toast.error(error?.response?.data?.message);
  }
};
export default otpandemails;
