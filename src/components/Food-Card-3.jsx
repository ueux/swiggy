import React from "react";
import { Link } from "react-router-dom";
import AddBtn from "./Add-btn";

function FoodCard3({info:{id,cuisines,avgRatingString,areaName,cloudinaryImageId,promoted=false,aggregatedDiscountInfoV3,name,sla} }) {
  return (
    id && (
      <div className="bg-white ml-8 rounded-xl w-[45%] border h-[200px] mt-5 shadow-md ">
        <Link to={`rest-menu/${id}`}>
          <div className=" hover:scale-95 flex p-5 duration-75 cursor-pointer">
            <div
              key={id}
              className="w-[120px] h-[120px]  rounded-2xl  shadow-lg bg-white relative"
            >
              <img
                className=" w-full h-full mt-3 rounded-lg object-cover"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${cloudinaryImageId}`}
                alt=""
              />
              <div className=" w-full h-full top-0  bg-gradient-to-b from-transparent from-60% to-100% to-black absolute"></div>
              <p className="absolute font-semibold text-xl m-2 shadow-lg h-fit bg-white text-orange-400 text-center px-1 rounded-xl  -bottom-8  translate-x-2  ">
                {aggregatedDiscountInfoV3
                                  ? <><div>{aggregatedDiscountInfoV3?.header}</div><div className="text-xs">.{
                                    aggregatedDiscountInfoV3?.subHeader}.</div></>
                  : ""}
              </p>
            </div>
            <div className="p-3 ml-9 ">
              <h1 className="font-bold text-xl line-clamp-1">{name}</h1>
              <p className="flex gap-2 font-semibold">
                <i className="fi fi-ss-circle-star text-xl text-lime-700 " />
                {avgRatingString} <span>{sla.slaString}</span>
              </p>
              <p className="text-slate-600 text-lg line-clamp-1">
                {cuisines.join(", ")}
              </p>
              <p className="text-slate-600 text-lg">{areaName}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  );
}

export default FoodCard3;

export function withHOC(wrappedComponent) {
  // return (<>
  //   <h1>hello</h1>
  // </>)
  return (prop) => {
    console.log(prop)
    return (
      <div className="relative">
        <p className="absolute left-14 text-sm mt-4 bg-gray-800 text-white  p-1 z-50 rounded-md top-5">ADD</p>
       <wrappedComponent {...prop}/></div>
    )
  }
}
