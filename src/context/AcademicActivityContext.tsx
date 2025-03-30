import { AcademicActivity, read_academic_activities_responose, write_academic_activities_responose } from "@/types";
import axios from "axios";

export async function read_academic_activities():Promise<AcademicActivity[]>{
  // Define the API endpoint URL
  const apiUrl:string = "http:///91.107.243.157:8080/Read_academic_activities"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  const response= await  axios.get<read_academic_activities_responose>(apiUrl,{headers});
      console.log("academic_activities data:", response.data);
      
      return response.data.Academic_activity;
      
}

export async function update_academic_activities(academic_activities_user:AcademicActivity[]):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = "http:///91.107.243.157:8080/Update_academic_activities"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  console.log("Auth:", sessionStorage.getItem("auth-token"));

  // Define the body
  const body:read_academic_activities_responose = {
    Academic_activity: academic_activities_user,
  };

  const response= await  axios.post<write_academic_activities_responose>(apiUrl,body,{headers});
      console.log("Academic activities data:", response.data);
      
      return response.data.message;
      
}
//export {read_cv};