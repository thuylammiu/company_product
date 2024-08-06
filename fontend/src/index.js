import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/normailize.css';
import App from './App';
import { ProductProvider } from './context/productContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
   
    <ProductProvider>
      <App />
    </ProductProvider>
   
  
);
