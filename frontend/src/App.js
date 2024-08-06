import React from "react";
import Header from '../src/Components/Header.jsx'
import { Routes,Route } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import Cart from "./Pages/Cart.jsx";
import CategoryProduct from "./Pages/CategoryProduct.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import AdminPanel from "./Pages/AdminPanel.jsx";
import Alluser from "./Pages/Alluser.jsx";
import AllProduct from "./Pages/AllProduct.jsx";
import LogInSignIn from "./Pages/LogInSignIn.jsx";
import {Toaster} from 'react-hot-toast'
import ProductDetails from "./Pages/ProductDetails.jsx";
import SearchProduct from "./Components/SearchProduct.jsx";
import Success from "./Components/Success.jsx";
import Cancel from "./Components/Cancel.jsx";
import VerifyCode from "./Pages/VerifyCode.jsx";
import CreateNewPassword from "./Pages/CreateNewPassword.jsx";

function App() {

return(
   <main >

        <Toaster position="top-center"/>
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<LogInSignIn/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/product-category' element={<CategoryProduct/>}/>
              <Route path='/forgotPassword' element={<ForgotPassword/>}/>
              <Route path='/verifycode' element={<VerifyCode/>}/>
              <Route path='/newpassword' element={<CreateNewPassword/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/product/:id' element={<ProductDetails/>}/>
              <Route path='/search' element={<SearchProduct/>}/>
              <Route path='/sucess' element={<Success/>}/>
              <Route path='/cancel' element={<Cancel/>}/>
              <Route path='/admin' element={<AdminPanel/>}>
                     <Route path='/admin/allusers' element={<Alluser/>}/>
                     <Route path='/admin/allProduct' element={<AllProduct/>}/>
              </Route>
          </Routes>
        </main>
      
   </main>
  );
};
export default App;
