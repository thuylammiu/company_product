import Product from '../product/Product';
import { FaWpforms } from 'react-icons/fa';
import {useEffect} from 'react';
import{getProducts} from '../../api/productApi';
import { useNavigate, } from "react-router";
import { ProductContext } from "../../context/productContext";
import React from 'react';

const ProductList = () => {

    const {products, setProducts, setOriginalProducts} = React.useContext(ProductContext);        

    const navigate = useNavigate();

    const addProduct = () => {
        navigate('/add');
    }

    useEffect(() => {
        const fetch = async () => {
            try {                
                const response =  await getProducts();
                if(response && response.data && response.data.success){
                    setProducts(response.data.data);
                    setOriginalProducts(response.data.data);
                }
            
            } catch (e) {}
        };
    
        fetch();
    },[])
    
    return (
        <div className='product-page'>
            <div className='product-add-bar'>
            <button
                type='button'
                className='btn add-btn'
                onClick={addProduct}
            >
            <FaWpforms/> Add Product
            </button>
            </div>
            <div className='product-list-container'>
                { products && products.length > 0 &&
                    products.map((item,index) => (
                        <Product key={index} product={item}/>
                    ))
                }
            
        </div>
        </div>
        
    )
}

export default ProductList;