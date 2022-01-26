import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Product(props){
    const {product, onAdd} = props;
    return(
        <div style={{ display:'flex',flexdirection:'column'}}>
                <h3>{product.name} ${product.price} </h3>
                <button className="btn btn-success" onClick={()=> onAdd(product)}>Añadir</button>
        </div>
    );
}