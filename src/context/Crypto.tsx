import { sha256 } from "js-sha256";

// Function to generate SHA-256 hash using the Web Crypto API
async function generateSHA256(input: string): Promise<string> {
    try {
        const encoder:TextEncoder = new TextEncoder();  // Converts string to Uint8Array
        const data:Uint8Array = encoder.encode(input); // Convert input string to bytes
    
        // Generate the SHA-256 hash
        const hashBuffer:ArrayBuffer = await crypto.subtle.digest('SHA-256', data);
    
        // Convert the hash buffer to a hexadecimal string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex:string= hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
        return '';
    }
  }


function generateSHA256_js(input: string): string {
    return sha256(input);
}

export { generateSHA256 };
export { generateSHA256_js };   