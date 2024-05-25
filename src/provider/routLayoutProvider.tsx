"use client";
import React from "react";
// import Header from "../components/header";
import Link from "next/link";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "@/app/redux/STORE/store";

// import Login from "../components/login";
function RouteLayoutProvider({ children }: any) {
  // console.log("RouteLayoutProvider");

  return (
    <div>
      {/* <Header></Header> */}
      {/* <Link href="/auth/register">Register</Link>
      <Link href="/auth/login">Login</Link> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </div>
  );
}

export default RouteLayoutProvider;
