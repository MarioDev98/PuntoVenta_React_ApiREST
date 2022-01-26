import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import './Ganancias.css'
import * as FaIcons from "react-icons/fa";
import MaterialTable from "material-table";
import swal from 'sweetalert';
import Nav from '../components/Nav';

function Productos() {
   // variables para el titulo de las tablas 
 const columns =[
  {title:"NOMBRE", field: 'nombre'},
  {title:"CODIGO BARRAS", field: 'c_barras'},
  {title:"COSTO", field: 'costo'},
  {title:"PRECIO", field: 'precio'},
  {title:"EXISTENCIA", field: 'existencia'}
];
const mostrarAlerta=()=>{
  swal({
   title: "Exito",
    text: "El producto se elimino satisfactoriamente",
    icon: "success",
    button: "Aceptar"
});
}
const mostrarAlertaModificado=()=>{
 swal({
  title: "Exito",
   text: "El producto se modifico satisfactoriamente",
   icon: "success",
   button: "Aceptar"
});
}
const mostrarAlertaInsertado=()=>{
  swal({
   title: "Exito",
    text: "El producto se agrego satisfactoriamente",
    icon: "success",
    button: "Aceptar"
 });
 }
  const apiurl="http://localhost/api/productos.php";// url de la api para la obtencion de los datos
  const [data,setData]=useState([]);// estado de los datos
  const [modalInsertar, setModalInsertar]= useState(false); //estado del modal captura
  const [modalEditar, setmodalEditar]= useState(false); //estado del modal edicion
  const [modalEliminar, setmodalEliminar]= useState(false); //estado del modal eliminacion
//metodo para capturar lo que se escribe en los input
 const [ productoCapturado, setproductoCapturado] = useState ({
   id: '',
   nombre: '',
   c_barras: '',
   costo: '',
   precio: '',
   existencia: ''
 })
 const handleChange=e=> {
   const {name, value}=e.target;
   setproductoCapturado((prevState)=> ({ 
     ...prevState,
     [name]: value
    }))
   console.log(productoCapturado);
 }
 //fin del metodo de captura
  const abrirCerrarModalInsertar=()=> {
    setModalInsertar(!modalInsertar);
  }
  
  const abrirCerrarModalEditar=()=> {
    setmodalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=> {
    setmodalEliminar(!modalEliminar);
  }
  //peticion get
  const peticionGet=async()=> {
    await axios.get(apiurl).then(response=> {setData(response.data)}).catch(error=>{
      console.log(error);
    })
  }
  //peticion post
  const peticionPost=async()=> {
    var f = new FormData();
    f.append("nombre", productoCapturado.nombre);
    f.append("c_barras", productoCapturado.c_barras);
    f.append("costo", productoCapturado.costo);
    f.append("precio", productoCapturado.precio);
    f.append("existencia", productoCapturado.existencia);
    f.append("METHOD", "POST");
    await axios.post(apiurl, f).then(response=>{
    setData(data.concat(response.data));
    abrirCerrarModalInsertar();
    mostrarAlertaInsertado();
  }).catch(error=>{
    console.log(error);
  })
  }
  //peticion PUT(editar)
  const peticionPut=async()=> {
    var f = new FormData();
    f.append("nombre", productoCapturado.nombre);
    f.append("c_barras", productoCapturado.c_barras);
    f.append("costo", productoCapturado.costo);
    f.append("precio", productoCapturado.precio);
    f.append("existencia", productoCapturado.existencia);
    f.append("METHOD", "PUT");
    await axios.post(apiurl, f, {params: {id: productoCapturado.id}}).then(response=>{
    var dataNueva= data;
    dataNueva.map(proveedor=> {
      if(proveedor.id===productoCapturado.id){
        proveedor.nombre=productoCapturado.nombre;
        proveedor.c_barras=productoCapturado.c_barras;
        proveedor.costo=productoCapturado.costo;
        proveedor.precio=productoCapturado.precio;
        proveedor.existencia=productoCapturado.existencia;
        proveedor.RFC=productoCapturado.RFC;
      }
    })
    setData(dataNueva);
    abrirCerrarModalEditar();
    mostrarAlertaModificado();
  }).catch(error=>{
    console.log(error);
  })
  }
   //fila que se selecciono (estado)
  const seleccionarProveedor=(proveedor,caso)=>{
    setproductoCapturado(proveedor);
    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }
  //metodo delete (eliminar)
  const peticionDelete=async()=> {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(apiurl, f, {params: {id: productoCapturado.id}}).then(response=>{
    setData(data.filter(proveedor=>proveedor.id!==productoCapturado.id));
    abrirCerrarModalEliminar();
    mostrarAlerta();
  }).catch(error=>{
    console.log(error);
  })
  }

  useEffect(() =>{
  peticionGet();
  },[]) 
  return (
    <div className='Productos'>
      <Nav/>
      <br/>
      <div className="row">
        <div className="col-9">
        </div>
        <div className="col-3">
        <button className="btn btn-flotante" onClick={()=>abrirCerrarModalInsertar()}><FaIcons.FaUserPlus/> Nuevo Producto</button>
        </div>
      </div>
      {/* FIN DE LO QUE ES EL BOTON JAJA  */}
      <div className="header-table" align="center">Lista Productos</div>
      <MaterialTable
          columns={columns}
          data={data}
          title="Lista de productos"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Cliente',
              onClick: (event, proveedor) => seleccionarProveedor(proveedor, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Cliente',
              onClick: (event, proveedor) =>  seleccionarProveedor(proveedor, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: {
              csv: true,
              pdf: true
            }
          }}
          localization={{
            header:{
              actions: "ACCIONES"
            },
            toolbar: {
              exportCSVName: "Exportar formato EXCEL",
              exportPDFName: "Exportar formato PDF"
            }
          }}
        />
   
    <Modal isOpen={modalInsertar}>
      <ModalHeader style= {{background: "blue", color: "white"}}>Nuevo Producto</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div className="input-group mb-3 " >
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaDatabase/></span>
         <input type="text" className="form-control " name="nombre" placeholder="Nombre" onChange={handleChange}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaMemory/></span>
         <input type="text" className="form-control" name="c_barras" placeholder="Codigo de Barras" onChange={handleChange}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaHandHoldingUsd/></span>
         <input type="text" className="form-control" name="costo" placeholder="Costo" onChange={handleChange}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaHandHoldingUsd/></span>
         <input type="text" className="form-control" name="precio" placeholder="Precio" onChange={handleChange}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaTasks/></span>
         <input type="text" className="form-control" name="existencia" placeholder="Existencia" onChange={handleChange}/>
         </div>
         
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-success" onClick={()=> peticionPost()}>Guardar</button>
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    {/* Moodal para ediocion*/}

    <Modal isOpen={modalEditar}>
      <ModalHeader style= {{background: "blue", color: "white"}}>Edita Producto</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div className="input-group mb-3 " >
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control " name="nombre" placeholder="Nombre" onChange={handleChange}
         value= {productoCapturado && productoCapturado.nombre}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaMemory/></span>
         <input type="text" className="form-control" name="c_barras" placeholder="Codigo Barras" onChange={handleChange}
         value= {productoCapturado && productoCapturado.c_barras}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaHandHoldingUsd/></span>
         <input type="text" className="form-control" name="costo" placeholder="Costo Unitario" onChange={handleChange}
         value= {productoCapturado && productoCapturado.costo}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaHandHoldingUsd/></span>
         <input type="text" className="form-control" name="precio" placeholder="Precio Venta" onChange={handleChange}
         value= {productoCapturado && productoCapturado.precio}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaTasks/></span>
         <input type="text" className="form-control" name="existencia" placeholder="Existencia" onChange={handleChange}
         value= {productoCapturado && productoCapturado.existencia}/>
         </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-success" onClick={()=> peticionPut()}>Guardar</button>
        <button className="btn btn-danger" onClick={()=> abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    
    {/* MODAL PARA LA VERIFDICACION DE ELIMINACION DE REGISTRO */}
    <Modal isOpen={modalEliminar}>
      <ModalHeader style= {{background: "blue", color: "white"}}>Eliminar Producto</ModalHeader>
      <ModalBody>
        <p  style= {{fontFamily: "arial", fontSize: 20, textAlign: "center"}}>¿Estas seguro que desea eliminar el producto {productoCapturado && productoCapturado.nombre}?</p>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>SI</button>
          <button className="btn btn-primary" onClick={()=>abrirCerrarModalEliminar()}>NO</button>
        </ModalFooter>
      </ModalBody>
    </Modal>


    </div>
  );
}

export default Productos;

