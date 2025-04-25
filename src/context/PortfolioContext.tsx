import { Portfolio,Portfolios_read_response,Portfolios_write_response } from "@/types/Types";
import axios from "axios";
import Server_config from "@/context/BasicNetConfig";

export async function read_portfolios():Promise<Portfolio[]>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Read_portfolios"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  console.log("ProjectContext->"+"read_projects:" + "Auth:", sessionStorage.getItem("auth-token"));

  const response= await  axios.get<Portfolios_read_response>(apiUrl,{headers});
      console.log("Project data:", response.data);
      
      return response.data.portfolios;
      
}

export async function update_portfolios(portfolis_user:Portfolio[]):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Update_portfolios"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };

  console.log("Auth:", sessionStorage.getItem("auth-token"));

  // Define the body
  const body:Portfolios_read_response = {
    portfolios: portfolis_user,
  };

  const response= await  axios.post<Portfolios_write_response>(apiUrl,body,{headers});
      console.log("portfolios data:", response.data);
      
      return response.data.error;
      
}
