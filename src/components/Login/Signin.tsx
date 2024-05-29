// "use client";
// import React, { useEffect } from "react";
// import PropTypes from "prop-types";
// import { Button } from "@mui/material";
// import axios from "axios";
// // import getConfig from "next/config";
// import {
//   GoogleLogin,
//   GoogleOAuthProvider,
//   useGoogleLogin,
// } from "@react-oauth/google";
// import LoginhtmlForm from "./Signin";
// // const { publicRuntimeConfig } = getConfig();

// const Signin = () => {
//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       console.log("Google login successful", tokenResponse);
//       console.log(tokenResponse);
//       // console.log(publicRuntimeConfig.CLIENT_ID);

//       const { data } = await axios.post("https://oauth2.googleapis.com/token", {
//         code: tokenResponse["code"],
//         client_id:
//           "189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com",
//         client_secret: "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",
//         redirect_uri: "http://localhost:3000",
//         grant_type: "authorization_code",
//       });

//       //   res.json(data);
//       console.log(data);
//       console.log(process.env.CLIENT_ID);

//       localStorage.setItem("my_token", JSON.stringify(data));
//       // const res = await axios.post(
//       //   'http://127.0.0.1:8000/api/google-auth-verify/',
//       //   data
//       // );
//       // console.log(res);
//     },
//     onError: () => {
//       console.error("Google login failed");
//       // Handle login errors here
//     },
//     flow: "auth-code", // Use 'auth-code' htmlhtmlFor the authorization code flow
//   });
//   const getdata = async () => {
//     if (localStorage.getItem("my_token")) {
//       const data = localStorage.getItem("my_token");
//       console.log(data);
//       // const res = await axios.post(
//       //   'http://127.0.0.1:8000/api/google-auth-verify/',
//       //   JSON.parse(data)
//       // );
//       // console.log(res);
//     }
//   };
//   useEffect(() => {
//     getdata();
//   }, []);
//   return (
//     <>
//       <div style={{ position: "absolute", left: "28%", padding: "110px" }}>
//         <div
//           style={{
//             border: "1px solid grey",
//             padding: "20px",
//             textAlign: "center",
//             borderRadius: "5px",
//             minHeight: "310px",
//             maxWidth: "350px",
//           }}
//         >
//           <img style={{ width: "70px" }} src={""} />
//           <h2 style={{ fontWeight: "200" }}>
//             Create your google clone account
//           </h2>
//           <LoginhtmlForm></LoginhtmlForm>
//           <h3 style={{ fontWeight: "200" }}>Click the signin button</h3>
//           <Button onClick={() => googleLogin()} variant="contained">
//             Signin with google
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// Signin.propTypes = {};

// export default Signin;
"use client";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
// import LoginhtmlForm from './LoginhtmlForm';
import { useDispatch, useSelector } from "react-redux";
// import {  } from "../../redux/SLICE/UserSlice/userSlice";
import { useRouter } from "next/navigation";
import {
  TokenExchangeAndRegisterUser,
  UserFormSignIn,
} from "@/app/redux/THUNK/USER-THUNK/userslicethunk";
import { useAppDispatch, useAppSelector } from "@/app/redux/STORE/store";
import Loader from "../Loader";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { setUserStateToInitial } from "@/app/redux/SLICE/UserSlice/userSlice";
// import { useCookies } from 'next-client-cookies';

const Signin = () => {
  // console.log("Signin called");

  const dispatch = useAppDispatch();
  const { user_google_cred, user_token, userStatus, userError } =
    useAppSelector((state: any) => state.user);
  // const cookieStore = cookies()
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);

      await dispatch(TokenExchangeAndRegisterUser(tokenResponse));
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
    // scope: "https://www.googleapis.com/auth/gmail.send",
  });
  interface loginData {
    email: string;
    password: string;
  }
  const initialLoginData: loginData = { email: "", password: "" };
  const [loginFormData, setLoginFormData] =
    useState<loginData>(initialLoginData);
  const formDataChangeHandler = (e: any) => {
    setLoginFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const loginFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    console.log("loginFormData", loginFormData);
    dispatch(setUserStateToInitial());
    const res = await dispatch(UserFormSignIn(loginFormData));
    console.log(res);
  };
  useEffect(() => {
    console.log("userStatus", userStatus);
    console.log("userError", userError);
  }, []);
  useEffect(() => {
    // if (userStatus == "failed") toast.error(userError);
    console.log("userStatus", userStatus);
    console.log("userError", userError);

    if (userStatus === "success") toast.success("login successfully");
    if (userStatus === "success") {
      // setTimeout(() => {
      router.push("/mail/inbox");
      // }, 3000);
      console.log("hello");
    }
    if (userStatus == "failed") {
      setTimeout(() => {
        dispatch(setUserStateToInitial());
      }, 4000);
      toast.error(userError);
    }
    // dispatch(setUserStateToInitial());
  }, [userStatus]);
  return (
    <>
      <ToastContainer></ToastContainer>
      {userStatus == "loading" && <p>User login loading</p>}
      {/* <ToastContainer></ToastContainer> */}

      <section className="bg-white-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
              alt="logo"
            />
            SpamDetector
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={loginFormSubmitHandler}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => formDataChangeHandler(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => formDataChangeHandler(e)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Reset password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
              <button
                onClick={() => googleLogin()}
                className="text-sm font-light text-gray-500 dark:text-gray-400"
              >
                Or Continue With Google?
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Signin.propTypes = {};

export default Signin;
