import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeAll, removeFromCart } from "../utilities/cart-slice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { toogleSignIn } from "../utilities/toogle-slice";
import AddBtn from "./Add-btn";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartSlice.info);
  const userData = useSelector((state) => state.authSlice.userData);

  function handleCheckout() {
    if (!userData) {
      toast.error("Sign In Before Placing Order");
      dispatch(toogleSignIn())
      return;
    }
    toast.success("Order Is Placed");
  }

  const handleRemoveFromCart = (id) => {
    const newArr = cartData.filter((item, index) => index !== id);
    dispatch(removeFromCart(newArr));
    localStorage.setItem("cartData", JSON.stringify(newArr));
    toast.success("Removed");
  };

  const clearCart = () => {
    dispatch(removeAll());
    toast.success("All Cleared");
  };

  const getDataFromLS = () => {
    let data = JSON.parse(localStorage.getItem("cartData")) || [];
    dispatch(addToCart(data));
  };

  useEffect(() => {
    getDataFromLS();
  }, []);

  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + (item.price || item.defaultPrice) / 100,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
        {cartData.length > 0 ? (
          <>
            <div
              className="text-red-600 hover:text-red-800 cursor-pointer mx-96"
              onClick={clearCart}
            >
              Clear Cart
            </div>
            <div className="flex items-center justify-between pb-4">
              <Link to={`/rest-menu/${cartData[0].resData.id}`} className="flex items-center">
                <img
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${cartData[0].resData.cloudinaryImageId}`}
                  alt=""
                />
                <div className="flex-col justify-between">
                  <h1 className="text-xl font-semibold ">
                    {cartData[0].resData.name}
                  </h1>
                  <h2 className="w-fit border-b-2 pb-4 border-black">
                    {cartData[0].resData.locality}
                  </h2>
                </div>
              </Link>
            </div>

            <div className="space-y-4 mt-3">
              {cartData.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center">
                  {item?.itemAttribute?.vegClassifier === "VEG"|| item.isVeg===1 ? (
                      <img
                        className="w-6 mb-4 mr-2"
                        src="https://clipground.com/images/veg-logo-png-6.png"
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-6 mb-4 mr-2"
                        src="https://www.pinclipart.com/picdir/big/419-4194820_veg-icon-png-non-veg-logo-png-clipart.png"
                        alt=""
                      />
                    )}

                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">
                        ₹ {(item.price || item.defaultPrice) / 100}
                      </p>
                    </div>

                  </div>
                  <AddBtn info={item} css={"text-3xl cursor-pointer flex text justify-center shadow-sm items-center text-lime-700 h-12 w-48 ml-3 pb-1 rounded-xl border bg-white"} />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center text-2xl font-bold">
                <span>Total:</span>
                <span>₹ {calculateTotal()}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-6 w-full bg-lime-700 text-white py-3 rounded-lg text-lg hover:bg-lime-800"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Link to="/" className="text-lime-700 hover:underline">
              Go back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
