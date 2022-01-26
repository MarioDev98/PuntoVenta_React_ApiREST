import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import swal from 'sweetalert';
import axios from 'axios';

export default function TotalV(props) {
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
        doc.text(30,5,'Ticket de venta Sucursal 1')
        
        doc.addImage("logo.png", "PNG",35,10,30,30);
        doc.text(30,50,'AGROQUIMICOS LUNA');
        doc.text(25,55,"Avenida Lazaro cardenas #12");
        
       doc.autoTable({
        margin: { top: 60 },
        html: '#tablav'
       })
       doc.text(25,110,'Guarde para cualquier aclaracion')
       
        doc.setFont('arial');
        doc.autoPrint();
        doc.output('dataurlnewwindow', {filename: 'TicketVenta.pdf'});
        
    }
    // aqyui finaliza esa madrejaja
    //venats post
    const apiurl="http://localhost/api/ventas.php";// url de la api para la obtencion de los datos
  const [data,setData]=useState([]);// estado de los datos
  const [ ventaCapturada, setventaCapturada] = useState ({
   
    total: '',
    id_cliente: '',
   
  })
  
  //peticion post
  const peticionPost=async()=> {
    var f = new FormData();
    f.append("total", ventaCapturada.total);
    f.append("id_cliente", ventaCapturada.id_cliente);
   
    f.append("METHOD", "POST");
    await axios.post(apiurl, f).then(response=>{
    setData(data.concat(response.data));
    abrirCerrarModalInsertar();
   pdfgenerador();
   window.location.href = window.location.href
  }).catch(error=>{
    console.log(error);
  })
  }
  const handleChange=e=> {
    const {name, value}=e.target;
    setventaCapturada((prevState)=> ({ 
      ...prevState,
      [name]: value
     }))
    console.log(ventaCapturada);
  }
    //fin post ventas
    return( 
    <div>
    <br/>
    <div className='card-header' style={{background: "#488DF5", color: "white", fontfamily: "arial", fontSize: 15}}>
      Venta</div>
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
                <p>Total Venta</p>
                <p className="form-control" >${itemsPrice.toFixed(2)}</p>
                </div>
            </div>
            <div align="center">
            <button className="btn btn-primary" onClick={()=>abrirCerrarModalInsertar()}>Finalizar venta</button>
            </div>
            </>
        )}
     <Modal isOpen={modalInsertar}>
      <ModalHeader style= {{background: "blue", color: "white"}}>Detalles compra</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div align="center">
        <table className="table" id= "tablav">
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
        
     </tbody>
        </table>
        </div>
        <p><b>Total Venta</b></p>
        <input  className="form-control" value={itemsPrice.toFixed(2)} name="total"  onChange={handleChange} />
        <p></p>
        <p className="form-control" hidden>${itemsPrice.toFixed(2)}</p>
        
        <div className="input-group mb-3 " >
       
         
         <select className="form-control" name="id_cliente"  onChange={handleChange}>
             <option value="Ninguno">-- Selecciona un cliente -- </option>
             <option value="Fabiola Naranjo Sierra">Fabiola Naranjo Sierra</option>
             <option value="Mario Isai Medina Lucero">Mario Isai Medina Lucero</option>
             <option value="Jose Eduardo Contreras">Jose Eduardo Contreras</option>
             <option value="Eduardo Ramos Rosales">Eduardo Ramos Rosales</option>
         </select>
        
         </div>
         
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-success" onClick={()=>peticionPost()} >Finalizar e imprimir</button>
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Seguir comprando</button>
      </ModalFooter>
    </Modal>
    </div>
    );
}