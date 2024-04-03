"use server";

import client from "@/db";

export const logout = async () => {
  try {
    return true;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
