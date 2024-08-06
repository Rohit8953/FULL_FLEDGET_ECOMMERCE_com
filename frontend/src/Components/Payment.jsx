import React from 'react'

const Payment = () => {
    const getpayments=async()=>{
        const stripe = await loadStripe('pk_test_51Ph7haRxahYVGxLcvVOKSiOEL1bVwPrZhqKfnM46GUv4f6C38qagplHiwBYMPxiinxFb12xjSy9Vwk2GtvQOlRuO00mzbRK2eO');
    }
  return (
    <div>Payment</div>
  )
}

export default Payment