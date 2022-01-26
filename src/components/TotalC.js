import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import swal from 'sweetalert';

export default function TotalC(props) {
    const {cartItems, onAdd, onRemove} = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = itemsPrice * 0.16;
    const shippingPrice = itemsPrice > 2000 ? 0 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    const mostrarAlerta=()=>{
        swal({
            position: 'top-end',
            icon: 'success',
            title: 'Compre conm exito',
            showConfirmButton: true,
           
           
      });
     pdfgenerador();
      window.location.href = window.location.href
      }
  
    const [modalInsertar, setModalInsertar]= useState(false); //estado del modal captura

    const abrirCerrarModalInsertar=()=> {
        setModalInsertar(!modalInsertar);
      }
    // aqui va para generar le pendejo pdf
    const pdfgenerador=()=>{
      
       
        var opciones = {
            orientation: 'p',
            unit: 'mm',
            format: [100, 300]
        };
       
        var doc = new jsPDF(opciones);
        doc.setFontSize(10); 
        doc.text(30,5,'Ticket de compra Sucursal 1')
        
        doc.addImage("logo.png", "PNG",35,10,30,30);
        doc.text(30,50,'AGROQUIMICOS LUNA');
        doc.text(25,55,"Avenida Lazaro cardenas #12");
        
       doc.autoTable({
        margin: { top: 60 },
        html: '#tabla'
       })
       doc.text(25,110,'Firma de encargado')
        doc.setFont('arial');
        doc.autoPrint();
        doc.output('dataurlnewwindow', {filename: 'TicketCompra.pdf'});
      
    }
    // aqyui finaliza esa madrejaja

    return( 
    <div>
    <br/>
    <div className='card-header' style={{background: "#488DF5", color: "white", fontfamily: "arial", fontSize: 15}}>
      Compra</div>
        <div align= "center">
            <br/>
            {cartItems.length === 0 && <div>No se han agregado productos</div>}
        </div>
        {cartItems.map((item)=>(
         
            <div key={item.id} className="row">
            <div className="col-4">{item.name}</div>
            <div className="col-3">
                <button onClick={()=> onAdd(item)} className="btn btn-success" > + </button>
                <button onClick={()=> onRemove(item)} className="btn btn-danger"> - </button>
            </div>
            <div className="col-5">
                Cant: {item.qty} x ${item.price.toFixed(2)} 
            </div>
            </div>
           
        ))}
        {cartItems.length !== 0 && (
            <>
            <hr></hr>
            <div className="row">
                <div className="col-12">
                <p>Total Compra</p>
                <p className="form-control" >${itemsPrice.toFixed(2)}</p>
                </div>
            </div>
            <div align="center">
            <button className="btn btn-primary"  onClick={()=>abrirCerrarModalInsertar()}>Finalizar compra</button>
            </div>
            </>
        )}
        <Modal isOpen={modalInsertar}>
      <ModalHeader style= {{background: "blue", color: "white"}}>Detalles compra</ModalHeader>
      <ModalBody>
        <div className="form-group">
       
        <div align="center">
        <table class="table" id= "tabla">
        <thead>
         <tr>
             <th scope="col"> Producto </th>
             <th scope="col"> Cantidad  </th>
             <th scope="col"> Precio</th>

         </tr>
         </thead>
         <tbody>
        {cartItems.map((item)=>(
        
         <tr key={item.id} >
            
         <td> {item.name} </td>
         <td> {item.qty} </td>
         <td> ${item.price.toFixed(2)} </td>
         
         </tr>
        
         

     ))}
     <br/>
      
     </tbody>
        </table>
        </div>
    
        <p><b>Total compra </b></p>
        <p className="form-control" >${itemsPrice.toFixed(2)}</p>
        
        <div className="input-group mb-3 " >
        
         <select className="form-control">
             <option>-- Selecciona un proveedor -- </option>
             <option>Oscar Bonilla Sanchez</option>
             <option>Guillermo Urzua Sanchez</option>
             <option>Jairo Cesar Apreza Flores </option>
             <option>Emiliano Meza Mora</option>
         </select>
         </div>
         
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-success" onClick={()=>pdfgenerador(),()=>mostrarAlerta()} >Finalizar e imprimir</button>
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}
        >Seguir comprando</button>
      </ModalFooter>
    </Modal>
    </div>
    );
}