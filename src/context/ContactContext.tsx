import { Contact_read_Response,Contact_write_Response,Contact} from "@/types/Types";
import axios from "axios";
import Server_config from "@/context/BasicNetConfig";


export async function read_contact():Promise<Contact>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Read_contact"; // Replace with your actual API endpoint


  const response= await  axios.get<Contact_read_Response>(apiUrl);

  return response.data.my_contact;
      
}

export async function update_contact(contact_data:Contact):Promise<string>{
  // Define the API endpoint URL
  const apiUrl:string = Server_config.base_url + ":" + Server_config.port +"/Update_contact"; // Replace with your actual API endpoint

  // Define the headers
  const headers = {
    "Authorization": sessionStorage.getItem("auth-token"), // Replace with your actual token
    "Content-Type": "application/json",
  };


  const body = contact_data;

  const response= await  axios.post<Contact_write_Response>(apiUrl,body,{headers});
      
      return response.data.error;
      
}
//export {read_cv};