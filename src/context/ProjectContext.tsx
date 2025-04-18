import { Project, read_project_responose, write_project_responose } from "@/types";
import axios from "axios";
import Server_config from "./BasicNetConfig";

export async function read_projects():Promise<Project[]>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Read_projects"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  console.log("ProjectContext->"+"read_projects:" + "Auth:", sessionStorage.getItem("auth-token"));

  const response= await  axios.get<read_project_responose>(apiUrl,{headers});
      console.log("Project data:", response.data);
      
      return response.data.projects;
      
}

export async function update_projects(projects_user:Project[]):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Update_projects"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  console.log("Auth:", sessionStorage.getItem("auth-token"));

  // Define the body
  const body:read_project_responose = {
    projects: projects_user,
  };

  const response= await  axios.post<write_project_responose>(apiUrl,body,{headers});
      console.log("Project data:", response.data);
      
      return response.data.message;
      
}
//export {read_cv};