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

  return (
    <>
      {userStatus == "loading" && (
        <>
          {/* <Loader open={true}></Loader> */}
          sign in loading
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
                <button
                  onClick={() => googleLogin()}
                  className="text-sm font-light text-gray-500 dark:text-gray-400"
                >
                  Or Sign in With Google?
                </button>
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
