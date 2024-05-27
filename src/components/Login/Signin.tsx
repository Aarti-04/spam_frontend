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
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import LoginhtmlForm from "./LoginhtmlForm";
import { useDispatch, useSelector } from "react-redux";
// import {  } from "../../redux/SLICE/UserSlice/userSlice";
import { useRouter } from "next/navigation";
import { TokenExchangeAndRegisterUser } from "@/app/redux/THUNK/USER-THUNK/userslicethunk";
import { useAppSelector } from "@/app/redux/STORE/store";
import Loader from "../Loader";
import Image from "next/image";
// import { useCookies } from 'next-client-cookies';

const Signin = () => {
  // console.log("Signin called");

  const dispatch: any = useDispatch();
  const { user_google_cred, user_token, userStatus, userError } =
    useAppSelector((state: any) => state.user);
  // const cookieStore = cookies()
  const router = useRouter();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);

      await dispatch(TokenExchangeAndRegisterUser(tokenResponse));
      router.push("/mail/inbox");
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
    // scope: "https://www.googleapis.com/auth/gmail.send",
  });
  // console.log(user_google_cred);
  // console.log(user_token);

  // const refreshAccessToken = async () => {
  //   const refreshToken = JSON.parse(

  //     // localStorage.getItem("user_google_cred")
  //   ).refresh_token;
  //   try {
  //     const { data } = await axios.post("https://oauth2.googleapis.com/token", {
  //       refresh_token: refreshToken,
  //       client_id:
  //         "189496678458-fpihrhl6pae85mhtq0tsra89cpguccja.apps.googleusercontent.com",
  //       client_secret: "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",
  //       grant_type: "refresh_token",
  //     });

  //     console.log(data);

  //     // Update the stored token data with the new access token
  //     localStorage.setItem("my_token", JSON.stringify(data));

  //     // Use the new access token htmlhtmlFor further API requests
  //     const accessToken = data.access_token;
  //     // Make API requests using the new access token...
  //   } catch (error) {
  //     console.error("Error refreshing access token:", error);
  //   }
  // };
  return (
    <>
      {userStatus == "loading" && (
        <>
          <Loader open={true}></Loader>
        </>
      )}
      {/* <Container maxWidth="sm">
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Login To Spam detector
            </Typography>

            <LoginhtmlForm />
            <Typography variant="body1" align="center" gutterBottom>
              Or sign in with
            </Typography>
            <Button
              onClick={() => googleLogin()}
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign in with Google
            </Button>
          </Grid>
        </Grid>
      </Container> */}
      {/* <div classNameName="h-screen flex items-center justify-center bg-gray-100">
        <div classNameName="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h2 classNameName="text-3xl font-bold mb-4">Login</h2>
          <htmlForm classNameName="space-y-4">
            <div classNameName="flex flex-wrap -mx-3">
              <div classNameName="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  classNameName="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlhtmlFor="email"
                >
                  Email
                </label>
                <input
                  classNameName="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div classNameName="w-full md:w-1/2 px-3">
                <label
                  classNameName="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlhtmlFor="password"
                >
                  Password
                </label>
                <input
                  classNameName="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="password"
                  type="password"
                  placeholder="●●●●●●●●●●"
                />
              </div>
            </div>
            <button
              classNameName="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
            <div classNameName="flex items-center justify-center mt-4">
              <button
                classNameName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => googleLogin()}
              >
                <i classNameName="fab fa-google mr-2"></i> Login with Google
              </button>
            </div>
          </htmlForm>
        </div>
      </div> */}
      <>
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
                <form className="space-y-4 md:space-y-6" action="#">
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
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => googleLogin()}
                    className="text-sm font-light text-gray-500 dark:text-gray-400"
                  >
                    Or Sign in With Google?
                    <button className="font-medium text-primary-600 hover:underline dark:text-primary-500"></button>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    </>
  );
};

Signin.propTypes = {};

export default Signin;
