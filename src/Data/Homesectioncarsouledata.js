
import axios from "axios";
export const Homesectioncaroseldata = [];
try{
  const response= await axios.get("https://fakestoreapi.com/products");
    Homesectioncaroseldata.push(...response.data);
  console.log(response.data);

}catch(error){
  console.error("Error fetching data:", error);
}
