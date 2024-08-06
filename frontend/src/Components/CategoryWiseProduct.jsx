import React, { useEffect, useState } from 'react'
import displayINRCurrency from '../helpers/DisplayCurrency'
import { Link } from 'react-router-dom'
import axios from 'axios'


const CategoryWiseProduct = ({ category, heading }) =>{
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)
    const fetchData = async () => {
        setLoading(true)
        try {
            const categoryProduct = await axios.post(`${process.env.REACT_APP_API_URL}/getCategoryWiseProduct`,{category})
        
                setData(categoryProduct?.data?.data)

      
        } catch (error) {
            console.error("Error fetching data", error)
            setData([])
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='px-4 my-6 h-full w-full '>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className=' h-full w-full gap-6'>
                {loading ? (
                    <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                        {loadingList.map((_, index) => (
                            <div key={index} className='group relative bg-white rounded-sm shadow'>
                                <div className='bg-slate-200  w-full overflow-hidden rounded-md aspect-none group-hover:opacity-75 h-72 animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className=' line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                        <p className=' line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    </div>
                                    <button className='px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                                </div>
                            </div>
                        ))}
                    </div>
                   
                ) : (
                    <div className=' mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                        {
                        data.map((product,index)=>(
                            <Link to={`/product/${product?._id}`} key={index} className=' group relative bg-white rounded-sm shadow'>
                                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 h-72">
                                    <img src={product.productImage[0]}  className=" w-full object-center h-full"/>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'>
                                        Add to Cart
                                    </button>
                                </div>
                            </Link> 
                        ))
                        }
                    </div>
                )}
            </div>


        </div>
    )
}
export default CategoryWiseProduct
