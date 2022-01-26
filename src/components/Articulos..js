import React from 'react';
import Product from '../components/Product';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Articulos(props) {
    const {products, onAdd }= props;
  
    return(
    <div>
        <br/>
    <div className='card-header' style={{background: "#488DF5", color: "white", fontfamily: "arial", fontSize: 15}}>
      Lista Productos</div>
        <table className="table product-overview" id="zero_config">
        <td className="text-center">C.Barras</td>
            <td className="text-center">Producto</td>
            <td className="text-center">Precio</td>
            <td className="text-center">Accion</td>
            {products.map((product)=>(
            <tbody key={product.id} product={product} onAdd={onAdd}>
            <th className="text-center">{product.codigobarras}</th>
            <th className="text-center">{product.name}</th>
            <th className="text-center">${product.price} </th>
            <th className="text-center"><button className="btn btn-success" onClick={()=> onAdd(product)}>Añadir</button></th>
        </tbody>
        ))}
       </table>
    </div>
    
    
    );
}