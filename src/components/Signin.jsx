import React, { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../config/FirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utilities/auth-slice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // State to toggle between sign-up and login
  const [isForgotPassword, setIsForgotPassword] = useState(false); // State to handle forgot password

  async function handleSignOut() {
    await signOut(auth);
    dispatch(removeUserData());
    toast.success("Signed out successfully");
    navigate("/");
  }

  async function handleAuth() {
    try {
      const data = await signInWithPopup(auth, provider);
      const userData = {
        name: data.user.displayName,
        photo: data.user.photoURL,
      };
      dispatch(addUserData(userData));
      toast.success("Signed in successfully");
      navigate("/");
    } catch (error) {
      toast.error("Sign in failed: " + error.message);
    }
  }

  async function handleEmailAuth(event) {
    event.preventDefault();
    try {
      let data;
      if (isSignUp) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully");
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully");
      }
      const userData = {
        name: data.user.displayName || data.user.email,
        photo: data.user.photoURL || "https://via.placeholder.com/150", // Placeholder image if no photoURL
      };
      dispatch(addUserData(userData));
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handleForgotPassword(event) {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
      setIsForgotPassword(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="">
      <div className="w-[75%] bg-white pl-8 rounded-lg  ">
        <div className="text-4xl flex justify-between font-semibold mb-6 ">
          <span className="mt-8">Login</span>{" "}
          <img
            className="w-28"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
            alt=""
          />
        </div>
        {!userData ? (
          <>
            {/* <form
              onSubmit={
                isForgotPassword ? handleForgotPassword : handleEmailAuth
              }
              className="space-y-4"
            >
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />
              </div>
              {!isForgotPassword && (
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-lime-500 text-white rounded-lg shadow-md hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400"
              >
                {isForgotPassword
                  ? "Reset Password"
                  : isSignUp
                  ? "Sign Up"
                  : "Log In"}
              </button>
            </form>
            {!isForgotPassword && (
              <div className="mt-4">
                <p
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-lime-700 cursor-pointer hover:underline"
                >
                  {isSignUp
                    ? "Already have an account? Log In"
                    : "Don't have an account? Sign Up"}
                </p>
                <p
                  onClick={() => setIsForgotPassword(true)}
                  className="text-red-700 cursor-pointer hover:underline mt-2"
                >
                  Forgot Password?
                </p>
              </div>
            )}
            {isForgotPassword && (
              <div className="mt-4">
                <p
                  onClick={() => setIsForgotPassword(false)}
                  className="text-lime-700 cursor-pointer hover:underline"
                >
                  Back to Log In
                </p>
              </div>
            )} */}
            <div className="mt-4">
              <button
                onClick={handleAuth}
                className="w-full py-3 h-16 bg-orange-500 text-white font-bold shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign In with Google
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default SignIn;
