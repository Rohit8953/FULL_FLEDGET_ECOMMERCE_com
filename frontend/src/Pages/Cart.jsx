import React, {useEffect, useState } from 'react'
import displayINRCurrency from '../helpers/DisplayCurrency';
import { MdDelete } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getaddtocartproduct, getrefresher } from '../Redux/productSlice';
import {loadStripe} from '@stripe/stripe-js';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const loadingCart = new Array(4).fill(null)
    const user=useSelector(state=>state.userdetails.user);
    const refresh=useSelector(state=>state.product.refresher);
    const userId=user._id;
    const dispatch=useDispatch();
    console.log("REfresher is there",refresh);

    const fetchData = async() =>{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/addtocartproduct`,{userId});
        if(response.data.success){
            setData(response.data.addtocartproduct)
            dispatch(getaddtocartproduct(response.data.addtocartproduct));
        }
    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[refresh])

    const increaseQty=async(id,qty)=>{
        console.log("product id and its quantity",id,qty);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/countupdate`,
                {   
                    productId : id,
                    quantity : qty + 1,
                }
            )
            if(response.data.success){
                fetchData()
            }
    }

    const decraseQty = async(id,qty)=>{
       if(qty >= 2){
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/countupdate`,
                    {   
                        productId : id,
                        quantity : qty - 1,
                    }
                )
                if(response.data.success){
                    fetchData()
                }
            }
    }

    const deleteCartProduct = async(id)=>{
        console.log("deleted------------->>>>>>>>>>>");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/deleteaddtocartproduct`,{_id:id})
        console.log("deleted response",response);
        if(response.data.success){
            fetchData()
        }
    }

    let totalprice=0;
    let quantity=0;

    const makepayments=async()=>{
        const stripe = await loadStripe('pk_test_51Ph7haRxahYVGxLcvVOKSiOEL1bVwPrZhqKfnM46GUv4f6C38qagplHiwBYMPxiinxFb12xjSy9Vwk2GtvQOlRuO00mzbRK2eO');

        const body = {
            products:data
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/create-checkout-session`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });
        const session=await response.json();
        const result=stripe.redirectToCheckout({
            sessionId:session.id
        });

        if (result.error){
            console.log(result.error);
        }
    }
    
  return (
    <div className='container mx-auto'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <div className='w-full h-full bg-white flex flex-row items-center justify-center p-5'>
                        <div class="bg-gray-100 w-fit h-fit mt-10">
                            <div class="p-6 md:mx-auto">
                            <svg viewBox="0 0 24 24" class="text-red-600 w-16 h-16 mx-auto my-6">
                               <MdRemoveShoppingCart />
                            </svg>
                            <div class="text-center">
                                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">No product in cart!</h3>
                                <p class="text-gray-600 my-2">There is not any card that you have added...</p>
                                <p> Have a great day!</p>
                                <div class="py-10 text-center">
                                    <Link to='/' class="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
                                        GO BACK 
                                    </Link>
                                </div>
                            </div>
                         </div>
                        </div>
                    </div>
                )
            }
        </div>
        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })     
                        ) : (
                          data.map((product,index)=>{
                              totalprice+=product?.productId?.sellingPrice  * product?.quantity;
                              quantity+=product.quantity;
                              return(
                                  <div key={product?._id} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
                                
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' 
                                     onClick={()=>deleteCartProduct(product?._id)}
                                    >
                                        <MdDelete/>
                                    </div>
                                   
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' 
                                           onClick={()=>decraseQty(product?._id, product?.quantity)}
                                        >-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded '
                                           onClick={()=>increaseQty(product?._id, product?.quantity)}
                                        >+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}

                {
                    data.length !== 0 && (
                        <div className='mt-5 lg:mt-0 w-full'>
                                {
                                    loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                        
                                    </div>
                                    ) : (
                                        <div className='h-36 bg-white'>
                                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                                <p>Quantity</p>
                                                <p>{quantity}</p>
                                            </div>

                                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                                <p>Total Price</p>
                                                <p>
                                                {displayINRCurrency(totalprice)}
                                                </p>    
                                            </div>

                                            <button onClick={makepayments} className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

                                        </div>
                                    )
                                }
                        </div>
                    )
                }

        </div>
    </div>

  )
}

export default Cart