import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VerticalCard from "../Components/VerticalCard";
import { productCategory } from "../helpers/Constant";
import axios from "axios";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState({});
  const [sortBy, setSortBy] = useState("");

  const location = useLocation();
  const initialCategory = location.search.split("=")[1];
  const [categoryArray, setcategoryArray] = useState([initialCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/filterproduct`,
        {
          category: categoryArray,
        },
        {
          withCredentials: true,
        }
      );
      setData(response.data.categoryProduct || []);
      setLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [categoryArray]);

  useEffect(() => {
    for (let key in selectCategory) {
      if (selectCategory[key] && !categoryArray.includes(key)) {
        setcategoryArray((prev) => {
          return [...prev, key];
        });
      }
    }
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);
  return (
    <div className="container mx-auto p-4">
      {/***desktop version */}
      <div className="flex sm:flex-row flex-col sm:gap-10">
        {/***left side */}

        <div className="bg-white p-2 w-full sm:w-[40%] md:w-[30%] lg:w-[20%] min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/**sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label className=" whitespace-nowrap">
                  Price - Low to High
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory?.categoryName}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/***right side ( product ) */}
        <div className="px-4 w-fit -mt-16 sm:mt-0 ">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
