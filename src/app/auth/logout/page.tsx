"use client";
import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <div>page</div>;
};

export default Logout;
