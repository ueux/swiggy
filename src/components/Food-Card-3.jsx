import React from "react";
import { Link } from "react-router-dom";
import AddBtn from "./Add-btn";

function FoodCard3({ info }) {
  return (
    info && (
      <div className="bg-white ml-8 rounded-xl w-[45%] border h-[200px] mt-5 shadow-md ">
        <Link to={`rest-menu/${info.id}`}>
          <div className=" hover:scale-95 flex p-5 duration-75 cursor-pointer">
            <div
              key={info.id}
              className="w-[120px] h-[120px]  rounded-2xl  shadow-lg bg-white relative"
            >
              <img
                className=" w-full h-full mt-3 rounded-lg object-cover"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`}
                alt=""
              />
              <div className=" w-full h-full top-0  bg-gradient-to-b from-transparent from-60% to-100% to-black absolute"></div>
              <p className="absolute font-semibold text-xl m-2 shadow-lg h-fit bg-white text-orange-400 text-center px-1 rounded-xl  -bottom-8  translate-x-2  ">
                {info.aggregatedDiscountInfoV3
                                  ? <><div>{info.aggregatedDiscountInfoV3?.header}</div><div className="text-xs">.{
                                      info.aggregatedDiscountInfoV3?.subHeader}.</div></>
                  : ""}
              </p>
            </div>
            <div className="p-3 ml-9 ">
              <h1 className="font-bold text-xl line-clamp-1">{info.name}</h1>
              <p className="flex gap-2 font-semibold">
                <i className="fi fi-ss-circle-star text-xl text-lime-700 " />
                {info.avgRatingString} <span>{info.sla.slaString}</span>
              </p>
              <p className="text-slate-600 text-lg line-clamp-1">
                {info.cuisines.join(", ")}
              </p>
              <p className="text-slate-600 text-lg">{info.areaName}</p>
            </div>
          </div>
        </Link>
      </div>
    )
  );
}

export default FoodCard3;
