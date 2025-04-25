import {About,About_read_Resp,About_write_Resp} from "@/types/Types";
import axios from "axios";
import Server_config from "@/context/BasicNetConfig";


export async function read_about():Promise<About>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Read_about"; // Replace with your actual API endpoint


  const response= await  axios.get<About_read_Resp>(apiUrl);

  return response.data.my_about;
      
}

export async function update_about(contact_data:About):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Update_about"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };


  const body = contact_data;

  const response= await  axios.post<About_write_Resp>(apiUrl,body,{headers});
      
      return response.data.error;
      
}
//export {read_cv};