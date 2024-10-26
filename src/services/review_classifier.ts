// import axios from "axios"

// const baseUrl:string = "https://15ff-124-43-209-181.ngrok-free.app"
// export const reviewClassifierService =async()=>{
//     console.log("valled")
//     axios.post(`${baseUrl}/classify`,{
//         reviews : [
          
//         ]
//     }).then(
//         (res)=>{
// console.log(res.data)
//     }).catch(errr=>{
//         console.error( `Error review classifiying ${errr}`)
//     })
// }

import axios from 'axios';

const baseUrl: string = 'https://15ff-124-43-209-181.ngrok-free.app';

export const reviewClassifierService = async (reviews: string[]): Promise<string[]> => {
    try {
      const response = await axios.post(`${baseUrl}/classify`, { reviews });
      // Ensure that response.data is an array of strings
      return response.data; // Adjust this if the response structure is different
    } catch (error) {
      console.error('Error classifying reviews:', error);
      throw error;
    }
  };
  
