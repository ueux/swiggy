import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/FirebaseAuth";
import { removeUserData } from "../utilities/auth-slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authSlice.userData);

  async function handleSignOut() {
    await signOut(auth);
    dispatch(removeUserData());
    toast.success("Signed out successfully");
    navigate("/");
  }

  return (
    <div>

      <button
        onClick={handleSignOut}
        className="w-[80%] py-1 bg-red-500 text-white  rounded-lg shadow-md hover:bg-orange-600 focus:outline-non"
      >
        Sign Out
      </button>
    </div>
  );
}

export default Signout;
