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
      
      if(username.length < 1) {
        throw new Error()
      }
  
      return modelSignup.createUser(username, email, uid);
      
    } catch (error) {
      return new Error("Something went wrong")
    }
 
  },
};
