import React, { useState } from 'react'
import { addToCart, removeAll, removeFromCart } from "../utilities/cart-slice";
import { useDispatch, useSelector } from 'react-redux';
import { setFirtItem, setIsDiffRes } from '../utilities/dif-res';
import toast from 'react-hot-toast';


function AddBtn({info,css}) {
  const [itemCount, setItemCount] = useState(1);
  const cartData = useSelector((state) => state.cartSlice.info);
  const dispatch = useDispatch()




  function handleIncreaseItemCount() {
    setItemCount((pre) => ++pre);
  }
  function handleDecreaseItemCount() {
    setItemCount((pre) => --pre);
  }
  const handleRemoveFromCart = (info) => {
    const id = cartData.findIndex((data) => data.id === info.id);
    const newArr = cartData.filter((item, index) => index !== id);
    dispatch(removeFromCart(newArr));
    localStorage.setItem("cartData", JSON.stringify(newArr));
    toast.success("Removed");
  };
  const handleAddToCart = (info) => {
    if (!cartData.find((data) => data.id === info.id)) {
      if (!cartData.find((data) => data.resData.name !== info.resData.name)) {
        dispatch(addToCart([...cartData, { ...info }]));
        toast.success("Added");
      } else {
        dispatch(setFirtItem(info))
        dispatch(setIsDiffRes(true));
      }
    } else {
      toast.error("already prese");
    }
  };
  // console.log(info)
  return (
    <>
{cartData.find((data) => data?.name == info?.name &&data.resData?.name==info.resData?.name) ? (
      <button className={`${css}`}>
        {" "}
        <div className="flex items-center justify-between gap-6">
          <span
            onClick={() =>
              handleRemoveFromCart(info)
            }
          >
            -
          </span>
          <span>{itemCount}</span>
          <span
            onClick={() =>
              handleAddToCart(info)
            }
          >
            +
          </span>
        </div>
      </button>
    ) : (
      <button
        onClick={() =>
          handleAddToCart(info)
        }
        className={`${css}`}
      >
        ADD
      </button>
    )}
    </>
  )
}

export default AddBtn
