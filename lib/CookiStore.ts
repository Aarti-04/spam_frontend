"use server";
import { cookies } from "next/headers";
export const setCookies = async (key: string, value: string) => {
  cookies().set(key, value);
};
export const getAuthCookies = (key: string) => {
  if (cookies().get(key)?.value!) {
    return JSON.parse(cookies().get(key)?.value!);
  } else return null;
};
export const clearCookies = (key: string) => {
  cookies().delete(key);
};

export const setRoleCookie = async (key: string, value: string) => {
  cookies().set(key, value);
};
