import axios from "axios";
import {url} from "../utils/constants";

 async function getProducts() {       
    const userToken = localStorage.getItem('token');
    const response =  await axios
      .get(
        `${url}/products`,        
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .catch(error => console.log(error));
    
    return response;
  }

  
  async function addProduct({ name, origin, price, instock }) {      
    const userToken = localStorage.getItem('token');
    const response =  await axios
      .post(
        `${url}/products`,
        {
           name, origin, price, instock
        },         
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .catch(error => console.log(error));
    
    return response;
  }


  async function updateProduct({ id, name, origin, price, instock }) {       
    const userToken = localStorage.getItem('token');
    const response =  await axios
      .put(
        `${url}/products/` + id, 
        {
          id, name, origin, price, instock
        },    
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .catch(error => console.log(error));
    
    return response;
  }


  async function deleteProduct( id ) {       
    debugger;
    console.log('vao delete');
    const userToken = localStorage.getItem('token');
    const response =  await axios
      .delete(
        `${url}/products/` + id,          
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .catch(error => console.log(error));
    
    return response;
  }

  async function getProduct(id ) {       
    debugger;
    const response = await getProducts();
    let products = response.data.data;

    let product = products.filter((item) => item.id===id);  
       
    return product;
  }

  function searchProducts(products, name, origin, instock){
    debugger;
    var result=products;

    if (name)
    {
       result = result.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (origin)
    {
      result = result.filter(product => product.origin.toLowerCase().includes(origin.toLowerCase()));
    }

    if(instock)
    {
      result = result.filter(product => product.instock === instock);
    }
    return result;
  }

export {getProducts, addProduct, updateProduct, deleteProduct, getProduct, searchProducts} ;