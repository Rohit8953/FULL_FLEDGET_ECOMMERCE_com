import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import VerticalCard from './VerticalCard';


const SearchProduct = () => {
  const queries=useLocation();
  const [data,setData]=useState([]);
  const [loading,setloading]=useState(false);

  const query=queries.search.split('=')[1];
  console.log("query form searchproducts--->>>",query);

  const fetchProduct=async()=>{
    setloading(true);
    const response=await axios.get(`${process.env.REACT_APP_API_URL}/search`,{
      params: { query}
    })
    setData(response?.data?.data);
    console.log("response is",response)
    setloading(false);
  }
  
  useEffect(()=>{
    fetchProduct()
  },[query]);

  return (
     <div className='container mx-auto p-4 w-full transition-all duration-300'>

      {
        loading && (
          <p className='text-lg text-center'>Loading....</p>
        )
      }

      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }

      {
        data.length !==0 && !loading && (
           <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>
  )
}

export default SearchProduct