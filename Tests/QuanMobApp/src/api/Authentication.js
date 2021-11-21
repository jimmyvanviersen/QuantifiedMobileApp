// React import

// Library imports (Alphabetical order)
import axios from 'axios';
import base64 from 'base-64';

// Absolute imports from the project (Alphabetical order)
import { API_URL } from './API_URL';

// Relative imports (Alphabetical order)

// Import * as

// Import ‘./<some file>.<some extension>


const formatResult = async (result) => {
    const formatted = {
        status: result.status,
        expiry: result.data.expiry,
        token: result.data.token,
    };

    if (result.ok) {
        formatted = await result.json();
    }

    return formatted;
};


// POST request is ONLY used for LOGIN and LOGOUT
//export const post = async (destination, credentials) => {
export const login = async (data) => {
    
    let destination = 'token/login/'

    let userToken = base64.encode(`${data.username}:${data.password}`);

    const result = await axios({
        method: 'post',
        url: `${API_URL}${destination}`,
        headers: {
           'accept': 'application/json',
           'authorization': `Basic ${userToken}`,
           'content-type': 'application/json',
        } 
   });
   
   const formattedResult = await formatResult(result);
   return formattedResult;
};
