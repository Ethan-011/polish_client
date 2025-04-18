
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import * as crypto from '@/context/Crypto';

import Server_config from "./BasicNetConfig";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
  change_one_time_pass: (username: string, old_password: string, new_password: string) => Promise <any>;
  check_one_time_pass:(username: string, password: string) => Promise <any>;
  change_pass: (username: string, old_password: string, new_password: string) => Promise <any>;
  
}

interface Auth_response {
  token?: string;
  user_exist?: string;
  error?:string;
}

interface Auth_request {
  email: string;
  password: string;
}

interface One_time_pass_request {
  email: string;
  password: string;
  new_pass:string;
}

interface One_time_pass_response {
  pass?:string;
  error?:string;
}

interface Is_it_one_time_pass {
  one_time_pass:string;
  error?:string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const authStatus = sessionStorage.getItem("auth-status");
    if (authStatus === "logged-in") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<any> => {

    console.log('Password is:', password);
    const pass:string  = crypto.generateSHA256_js(password);

    console.log('Password  sha256 is:', password);

    var _login_is_successful:boolean = false;


    const data: Auth_request = {
      email: username,
      password: pass
    };

    

    console.log('Data:', data);


    const apiUrl:string =  Server_config.base_url + ":" + Server_config.port + "/Login";



    
    try {
      // Sending login request to the server
      const response = await axios.post<Auth_response>(apiUrl, data);
      // Check the response (assuming response.data.success indicates whether login was successful)

      console.log("response is:",response)

      if("error" in response.data){
        return response.data.error
      }

      
      if("user_exist" in response.data){

      if (response.data.user_exist == "user and pass is correct") {
        console.log('Login successful');

        sessionStorage.setItem("auth-status", "logged-in");
        sessionStorage.setItem("auth-token", response.data.token);

        console.log("auth token is set:",response.data.token)

        setIsLoggedIn(true);
        toast({
          title: "ورود با موفقیت ",
          description: "به ویرایشگر پرتفولیو خوش آمدید"
        });

        return true;  // Return true if login is successful
      } else {
        console.log('Login failed');

        toast({
          title: "خطا",
          description: "یوزنیم یا پسورد اشتباه",
          variant: "destructive"
        });
        return false; // Return false if login failed
      }
    }

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error logging in:', error);
      return false; // Return false if an error occurred during login
    }


  };

  const logout = () => {
    sessionStorage.removeItem("auth-status");
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
    navigate("/login");
  };


  const change_one_time_pass = async (username: string, old_password: string, new_password:string): Promise<any> => {

    console.log('Password is:', old_password);
    const old_pass:string  = crypto.generateSHA256_js(old_password);
    const new_pass_:string  = crypto.generateSHA256_js(new_password);

    console.log('Password  sha256 is:', old_pass);

    var _login_is_successful:boolean = false;


    const data: One_time_pass_request = {
      email: username,
      password: old_pass,
      new_pass: new_pass_
    };


    const apiUrl:string =  Server_config.base_url + ":" + Server_config.port + "/Change_first_pass";

    const headers = {
      "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
      "Content-Type": "application/json",
    };


    
    try {
      // Sending login request to the server
      const response = await axios.post<One_time_pass_response>(apiUrl, data ,{headers});
      // Check the response (assuming response.data.success indicates whether login was successful)

      console.log("response is:",response)

      if("pass" in response.data){
        if(response.data.pass == "one time password changed successfully")
          {
            

            // toast(
            // {
            //   title: "تغییر موفقیت آمیز پسورد",
            //   description:"پسورد با موفقیت تغییر پیدا کرد"

            // });
          }
        return response.data.pass
      }

      if("error" in response.data){
        if(response.data.error == "Invalid token")
        {



            return response.data.error
          }
       

        }
      

      

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error logging in:', error);
      return false; // Return false if an error occurred during login
    }


  };


  const check_one_time_pass = async (username: string, password: string): Promise<any> => {

    const data: One_time_pass_request = {
      email: username,
      password: password,
      new_pass: password
    };


    const headers = {
      "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
      "Content-Type": "application/json",
    };



    const apiUrl:string =  Server_config.base_url + ":" + Server_config.port + "/Is_one_time_pass";


    
    try {
      // Sending login request to the server
      const response = await axios.post<Is_it_one_time_pass>(apiUrl, data  ,{headers});
      // Check the response (assuming response.data.success indicates whether login was successful)

      console.log("response is:",response)
      return  response.data.one_time_pass
   

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error logging in:', error);
      return false; // Return false if an error occurred during login
    }


  };


  
  const change_pass = async (username: string, old_password: string, new_password:string): Promise<any> => {

    console.log('Password is:', old_password);
    const old_pass:string  = crypto.generateSHA256_js(old_password);
    const new_pass_:string  = crypto.generateSHA256_js(new_password);

    console.log('Password  sha256 is:', old_pass);

    var _login_is_successful:boolean = false;


    const data: One_time_pass_request = {
      email: username,
      password: old_pass,
      new_pass: new_pass_
    };



    const apiUrl:string =  Server_config.base_url + ":" + Server_config.port + "/Change_pass";


    const headers = {
      "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
      "Content-Type": "application/json",
    };


    
    try {
      // Sending login request to the server
      const response = await axios.post<One_time_pass_response>(apiUrl, data ,{headers});
      // Check the response (assuming response.data.success indicates whether login was successful)

      console.log("response is:",response)

      if("pass" in response.data){
        if(response.data.pass == "password changed successfully")
          {
            return response.data.pass
          }
      
      }

      if("error" in response.data){
        if(response.data.error == "Invalid token")
        {



            return response.data.error
          }
       

        }
      

      

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error logging in:', error);
      
      return false; // Return false if an error occurred during login
    }


  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout , change_one_time_pass , check_one_time_pass , change_pass}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("context is:",context)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
