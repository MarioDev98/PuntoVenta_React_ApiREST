import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ventas.css';

import Nav from '../components/Nav';
import ArticulosC from "../components/ArticulosC";
import TotalC from "../components/TotalC";
import data from "../data";

function Compras(){
  // para la improtacion de datos
  
  const {products}= data;
  const [cartItems, setCartItems] = useState([]);
 
  const onAdd = (product) =>{
    const exist = cartItems.find(x => x.id === product.id);
    if(exist){
      setCartItems(cartItems.map((x)=> x.id === product.id ? {...exist, qty: exist.qty + 1}:x
        )
        );
    } else {
      setCartItems([...cartItems, {...product, qty:1}]);
    }
  };

  const onRemove =(product) =>{
    const exist = cartItems.find((x) => x.id === product.id);
    if(exist.qty === 1){
      setCartItems(cartItems.filter((x)=> x.id !== product.id));
    } else {
      setCartItems(cartItems.map((x)=> x.id === product.id ? {...exist, qty: exist.qty - 1}:x
        )
        );
    }
  };
    return(
        <div className='Compras'>
          <Nav/>
          <div className="row">
            <div className="col-8">
            <ArticulosC onAdd={onAdd} products={products}></ArticulosC>
            </div>
            <div className="col-4">
          <TotalC onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}></TotalC>
          </div>
          </div>
        </div>
    )
}


export default Compras;