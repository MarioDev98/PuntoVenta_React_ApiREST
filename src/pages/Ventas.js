import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ventas.css';

import Nav from '../components/Nav';
import Articulos from '../components/Articulos.';
import TotalV from '../components/TotalV';
import data from '../data';

function Ventas(){
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
        <div className='Ventas'>
          <Nav/>
          <div className="row">
            <div className="col-8">
            <Articulos onAdd={onAdd} products={products}></Articulos>
            </div>
            <div className="col-4">
          <TotalV onAdd={onAdd} onRemove={onRemove} cartItems={cartItems}></TotalV>
          </div>
          </div>
        </div>
    )
}

export default Ventas;