"use client";
import React from "react";
// import Header from "../components/header";
import Link from "next/link";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "../reduxToolKit/store";
// import Login from "../components/login";
function RouteLayoutProvider({ children }: any) {
  return (
    <div>
      {/* <Header></Header> */}
      {/* <Link href="/auth/register">Register</Link>
      <Link href="/auth/login">Login</Link> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Component {...pageProps} /> */}
          {/* <Rootlayout></Rootlayout> */}
          {/* <Login></Login> */}
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
}

export default RouteLayoutProvider;
