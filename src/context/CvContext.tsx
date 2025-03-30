import { CV, read_cv_responose,write_cv_responose } from "@/types";
import axios from "axios";


export async function read_cv():Promise<CV>{
  // Define the API endpoint URL
  const apiUrl:string = "http:///91.107.243.157:8080/Read_cv"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  const response= await  axios.get<read_cv_responose>(apiUrl,{headers});
      console.log("CV data:", response.data);
      
      return response.data.Cv;
      
}

export async function update_cv(cv_user:CV):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = "http:///91.107.243.157:8080/Update_cv"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  console.log("Auth:", sessionStorage.getItem("auth-token"));

  // Define the body
  const body:read_cv_responose = {
    Cv: cv_user,
  };

  const response= await  axios.post<write_cv_responose>(apiUrl,body,{headers});
      console.log("cv data:", response.data);
      
      return response.data.message;
      
}
//export {read_cv};