import React from "react";
const ProductContext = React.createContext();

function ProductProvider({ children }) {
  
  const [products, setProducts] = React.useState('');  
  const [originalProducts, setOriginalProducts] = React.useState('');  
  
  return (
    <ProductContext.Provider
      value={{ products, setProducts,  originalProducts, setOriginalProducts}}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductProvider};
