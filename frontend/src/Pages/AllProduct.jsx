import React, { useEffect, useState } from "react";
import UploadProduct from "../Components/UploadProduct";
import axios from "axios";
import AdminProduct from "../Components/Product/AdminProduct";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../Redux/productSlice";
import toast from "react-hot-toast";
const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const allProduct = useSelector((state) => state.product.AllProducts);
  const refresher = useSelector((state) => state.product.refresher);
  const usedispatch = useDispatch();
  const fetchalldata = async (req, res) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/allproducts`,
        { withCredentials: true }
      );
      if (response.data.success) {
        usedispatch(getAllProduct(response?.data?.products));
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchalldata();
  }, [refresher]);
  return (
    <div>
      <div>
        <div className="bg-white py-2 px-4 flex justify-between items-center">
          <h2 className="font-bold text-lg">All Product</h2>
          <button
            className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full "
            onClick={() => setOpenUploadProduct(true)}
          >
            Upload Product
          </button>
        </div>
        {/**all product */}
        <div className="w-full flex items-center flex-wrap justify-center gap-5 py-4 h-[100vh] md:h-[calc(100vh-190px)] overflow-y-scroll">
          {allProduct.map((product, index) => {
            return (
              <div>
                <AdminProduct product={product} key={index} />
              </div>
            );
          })}
        </div>

        {/**upload prouct component */}
        {openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} />
        )}
      </div>
    </div>
  );
};

export default AllProduct;
