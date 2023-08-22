import express, { Request, Response } from "express";
import modelSignup from "../model/signup.model";

interface SignupData {
  username: string;
  email: string;
  uid: string;
}

export default {
  createUser(userdata: SignupData) {
    try {
      const {
        username,
        email,
        uid,
      }: { username: string; email: string; uid: string } = userdata;
      
      switch ("") {
        case username:
          throw new Error("username is missing")
        case email:
          throw new Error("email is missing")
        case uid:
          throw new Error("uid is missing")
        default:
          break;
      }

      return modelSignup.createUser(username, email, uid)
      
    } catch (error: any) {
      console.error(error.message, userdata)
      return new Error("Something went wrong")
    }
 
  },
};
