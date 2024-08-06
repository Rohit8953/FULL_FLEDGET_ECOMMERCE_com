import React from 'react'
import CategoryList from './Category/CategoryList'
import HorizontalProduct from './Category/HorizontalProduct'
import VerticalCardProduct from './Category/VerticalCardProduct'

const Home = () => {
  
  return (

    <div>
      <CategoryList/>
      <HorizontalProduct category={'airpodes'} heading={"Top's AirPodes"}/>
      <HorizontalProduct category={"watches"} heading={"Popular's Watches"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>

  )
}

export default Home