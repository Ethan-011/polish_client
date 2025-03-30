
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import * as crypto from '@/context/Crypto';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
}

interface Auth_response {
  token?: string;
  user_exist?: boolean;
  error?:string;
}

interface Auth_request {
  email: string;
  password: string;
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


    
    try {
      // Sending login request to the server
      const response = await axios.post<Auth_response>('http://91.107.243.157:8080/Login', data);
      // Check the response (assuming response.data.success indicates whether login was successful)

      console.log("response is:",response)

      if("error" in response.data){
        return response.data.error
      }

      
      if("user_exist" in response.data){

      if (response.data.user_exist) {
        console.log('Login successful');

        sessionStorage.setItem("auth-status", "logged-in");
        sessionStorage.setItem("auth-token", response.data.token);

        console.log("auth token is set:",response.data.token)

        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          description: "Welcome back to the portfolio editor!"
        });

        return true;  // Return true if login is successful
      } else {
        console.log('Login failed');

        toast({
          title: "Login Failed",
          description: "Invalid username or password",
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
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
