import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const CategoryList=()=>{
    const [categoryProduct,setcategoryProduct]=useState([]);
    const [loading,setloading]=useState(true);
    const categoryLoading=new Array(13).fill(null);

    const fetchcategoryProduct=async(req,res)=>{
        try {
            const data=await axios.get(`${process.env.REACT_APP_API_URL}/getcategory`,{withCredentials:true});
            console.log("category list data",data.data.data);
            setcategoryProduct(data.data.data);
            setloading(false);
        } catch (error){
            console.log("Error aya  hai bhai",error);
        }
    }
    useEffect(()=>{
        fetchcategoryProduct();
    },[])

  return (
    <div className='container mx-auto p-4'>
           <div className='flex items-center gap-4 justify-between overflow-x-scroll' style={{scrollbarWidth: 'none' }}>
            {
                loading ? (
                    categoryLoading.map((el,index)=>{
                            return(
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>
                                </div>
                            )
                    })  
                ) :
                (
                    categoryProduct.map((product)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                                <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                    <img src={product?.productImage[0]} loading='lazy' alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                                </div>
                                <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                  )
            }
           </div>
    </div>
  )
}

export default CategoryList