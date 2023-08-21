import express, { Request, Response } from "express";
import modelSignup from "../model/signup.model";

interface SignupData {
  username: string;
  email: string;
  uid: string;
}

export default {
  async createUser(userdata: SignupData) {
    try {
      const {
        username,
        email,
        uid,
      }: { username: string; email: string; uid: string } = userdata;
      
      if(username.length < 1) {
        throw new Error()
      }
      
      const newUser = await modelSignup.createUser(username, email, uid)
      return newUser
      
    } catch (error) {
      return new Error("Something went wrong")
    }
 
  },
};
