import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../../helpers/DisplayCurrency'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {getrefresher} from '../../Redux/productSlice';

const AdminProduct=(datas)=>{
    
    const data=datas.product;
    const [editProduct,setEditProduct] = useState(false)
    const id=data._id;
    const dispatch=useDispatch();
    console.log("data from adminproduct is",data._id)

    const deletehandler=async(req,res)=>{
          const response=await axios.post(`${process.env.REACT_APP_API_URL}/product-delete`,{id});
          console.log("deleted product is there",response);

          if (response.data.success){
            dispatch(getrefresher());
          }
    }  

  return (
    <div className='bg-slate-200 p-2 rounded-lg'>
       <div className='w-40 flex flex-col'>
             
            <div className='w-full h-40 flex justify-center items-center'>
              <img src={data?.productImage[0]} className='mx-auto object-fill h-full rounded-t-lg mix-blend-multiply'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            <div>
                <p className='font-semibold'>
                  {
                    displayINRCurrency(data.sellingPrice)
                  }
                </p>
            </div>   
            <div className='flex flex-row justify-between w-full'>
                  <div className='w-fit  p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                      <MdModeEditOutline/>
                  </div>
                  <div className='w-fit  p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={()=>deletehandler(true)}>
                      <MdDelete/>
                  </div>
            </div>
       </div>
        {
          editProduct && (
            <AdminEditProduct id={id} productData={data} onClose={()=>setEditProduct(false)} />
          )
        }

    </div>
  )
}
export default AdminProduct
