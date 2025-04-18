import { Hero_read_Response,Hero_write_Response ,Hero} from "@/types/Types";
import axios from "axios";
import Server_config from "./BasicNetConfig";


export async function read_hero():Promise<Hero>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Read_hero"; // Replace with your actual API endpoint


  const response= await  axios.get<Hero_read_Response>(apiUrl);

  return response.data.my_hero;
      
}

export async function update_hero(hero:Hero):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Update_hero"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };


  // Define the body
  const body:Hero_read_Response = {
    my_hero: hero,
  };

  const response= await  axios.post<Hero_write_Response>(apiUrl,body,{headers});
    console.log("cv data:", response.data);
      
      return response.data.error;
      
}
//export {read_cv};