import axios from 'axios'
import { toast } from 'react-hot-toast'

const addtocart =async(userId,id) => {
    const response=await axios.post(`${process.env.REACT_APP_API_URL}/addtocart`,{
        id,userId},
        {withCredentials:true}
    );

    if(response.data.success){
        toast.success(response.data.message)
       
    }
    if(response.data.error){
        toast.error(response.data.message)
    }
    return response;
}
export default addtocart