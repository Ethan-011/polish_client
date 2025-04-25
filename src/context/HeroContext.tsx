import { Hero_read_Response,Hero,Hero_write_Response} from "@/types/Types";
import axios from "axios";
import Server_config from "@/context/BasicNetConfig";


export async function read_hero():Promise<Hero>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Read_hero"; // Replace with your actual API endpoint


  const response= await  axios.get<Hero_read_Response>(apiUrl);

  return response.data.Hero;
      
}

export async function update_hero(hero:Hero):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Update_hero"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };


  const body = hero;

  const response= await  axios.post<Hero_write_Response>(apiUrl,body,{headers});
      
      return response.data.error;
      
}
//export {read_cv};