import React from 'react'
import { Link } from 'react-router-dom'

function FoodCard(info ) {
  // console.log(info.link.split("/")[4])
  // console.log(info.id)
  return (
    <Link to={`/rest-menu/${info.id}`}>
      <div className=" hover:scale-95 duration-75 cursor-pointer">
                <div
                  key={info.id}
                  className="w-[295px] h-[200px]  rounded-2xl overflow-hidden shadow-lg bg-white relative"
                >
                  <img
                    className=" w-full h-full object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`}
                    alt=""
                  />
                  <div className=" w-full h-full top-0  bg-gradient-to-b from-transparent from-60% to-100% to-black absolute"></div>
                  <p className="absolute font-extrabold text-2xl m-2 text-white bottom-0">
                    {info.aggregatedDiscountInfoV3? info.aggregatedDiscountInfoV3?.header +
                      " " +
                      info.aggregatedDiscountInfoV3?.subHeader : ""}
                  </p>
                </div>
                <div className="p-3 text-lg ">
                  <h1 className="font-bold text-xl line-clamp-1">{info.name}</h1>
                  <p className="flex gap-2 font-semibold">
                    <i className="fi fi-ss-circle-star text-xl text-lime-700 "/>
                    {info.avgRatingString} <span>{info.sla.slaString}</span>
                  </p>
                  <p className="text-slate-600 text-lg line-clamp-1">{info.cuisines.join(", ")}</p>
                  <p className="text-slate-600 text-lg">{info.areaName}</p>
                </div>
              </div>
    </Link>
  )
}

export default FoodCard
