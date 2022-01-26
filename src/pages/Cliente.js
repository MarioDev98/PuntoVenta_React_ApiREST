import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import './Ganancias.css'
import * as FaIcons from "react-icons/fa";
import MaterialTable from "material-table";
import swal from 'sweetalert';
import { withFormik } from 'formik'; 

import Nav from '../components/Nav';

function Cliente(props) {

// variables para el titulo de las tablas \
 const columns =[
   {title:"NOMBRE", field: 'nombre'},
   {title:"APELLIDO PATERNO", field: 'a_paterno'},
   {title:"APELLIDO MATERNO", field: 'a_materno'},
   {title:"TELEFONO", field: 'telefono'},
   {title:"CORREO", field: 'correo'}
 ];
 const mostrarAlerta=()=>{
   swal({
    title: "Exito",
     text: "El cliente se elimino satisfactoriamente",
     icon: "success",
     button: "Aceptar"
 });
}
const mostrarAlertaModificado=()=>{
  swal({
   title: "xito",
    text: "l cliente se modifico satisfactoriamente",
    icon: "success",
    button: "aceptar"
});
}
const mostrarAlertaInsertado=()=>{
  swal({
   title: "Exito",
    text: "El Cliente se agrego satisfactoriamente",
    icon: "success",
    button: "Aceptar"
 });
 }
// mios jaja
  const apiurl="http://localhost/api/clientes.php";// url de la api para la obtencion de los datos
  const [data,setData]=useState([]);// estado de los datos
  const [modalInsertar, setModalInsertar]= useState(false); //estado del modal captura
  const [modalEditar, setmodalEditar]= useState(false); //estado del modal edicion
  const [modalEliminar, setmodalEliminar]= useState(false); //estado del modal eliminacion
//metodo para capturar lo que se escribe en los input
 const [ clienteCapturado, setclienteCapturado] = useState ({
   id: '',
   nombre: '',
   a_paterno: '',
   a_materno: '',
   telefono: '',
   correo: ''
 }

 )
 const handleChange=e=> {
   const {name, value}=e.target;
   setclienteCapturado((prevState)=> ({ 
     ...prevState,
     [name]: value
    }))
   //console.log(clienteCapturado);
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
     // console.log(error);
    })
  }
  //peticion post
  const peticionPost=async()=> {
    var f = new FormData();
    f.append("nombre", clienteCapturado.nombre);
    f.append("a_paterno", clienteCapturado.a_paterno);
    f.append("a_materno", clienteCapturado.a_materno);
    f.append("telefono", clienteCapturado.telefono);
    f.append("correo", clienteCapturado.correo);
    f.append("METHOD", "POST");
    await axios.post(apiurl, f).then(response=>{
    setData(data.concat(response.data));
    abrirCerrarModalInsertar();
    mostrarAlertaInsertado();
  }).catch(error=>{
   // console.log(error);
  })
  }
  //peticion PUT(editar)
  const peticionPut=async()=> {
    var f = new FormData();
    f.append("nombre", clienteCapturado.nombre);
    f.append("a_paterno", clienteCapturado.a_paterno);
    f.append("a_materno", clienteCapturado.a_materno);
    f.append("telefono", clienteCapturado.telefono);
    f.append("correo", clienteCapturado.correo);
    f.append("METHOD", "PUT");
    await axios.post(apiurl, f, {params: {id: clienteCapturado.id}}).then(response=>{
    var dataNueva= data;
    dataNueva.map(cliente=> {
     
      if(cliente.id===clienteCapturado.id){
        cliente.nombre=clienteCapturado.nombre;
        cliente.a_paterno=clienteCapturado.a_paterno;
        cliente.a_materno=clienteCapturado.a_materno;
        cliente.telefono=clienteCapturado.telefono;
        cliente.correo=clienteCapturado.correo;
        
      }
    })
    setData(dataNueva);
    abrirCerrarModalEditar();
    mostrarAlertaModificado();
  }).catch(error=>{
   // console.log(error);
  })
  }
   //fila que se selecciono (estado)
  const seleccionarCliente=(cliente,caso)=>{
    setclienteCapturado(cliente);
    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }
  //metodo delete (eliminar)
  const peticionDelete=async()=> {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(apiurl, f, {params: {id: clienteCapturado.id}}).then(response=>{
    setData(data.filter(cliente=>cliente.id!==clienteCapturado.id));
    abrirCerrarModalEliminar();
    mostrarAlerta();
  }).catch(error=>{
   // console.log(error);
  })
  }

  useEffect(() =>{
  peticionGet();
  },[]) 
 
  //
  
  //

  
  return (
    <React.StrictMode>
    <div className='cliente'>
      <Nav/>
      <br/>
      <div className="row">
        <div className="col-9">
        
        </div>
        <div className="col-3">
        <button className="btn btn-flotante" onClick={()=>abrirCerrarModalInsertar()}><FaIcons.FaUserPlus/> Nuevo cliente</button>
        </div>
      </div>
      {/* FIN DE LO QUE ES EL BOTON JAJA  */}
      <div className="header-table" align="center">Lista Clientes</div>
      
      
      <MaterialTable
          columns={columns}
          data={data}
          title="Lista Clientes"
          
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Cliente',
              onClick: (event, Cliente) => seleccionarCliente(Cliente, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Cliente',
              onClick: (event, Cliente) =>  seleccionarCliente(Cliente, "Eliminar")
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
      <ModalHeader style= {{background: "blue", color: "white"}}>Nuevo Cliente</ModalHeader>
      <ModalBody>
       <form >
        <div className="form-group">
        <div className="input-group mb-3 " >
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control " name="nombre" placeholder="Nombre" onChange={handleChange}
         />
       
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control" name="a_paterno" placeholder="Apellido Paterno" onChange={handleChange}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control" name="a_materno" placeholder="Apellido Materno" onChange={handleChange}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaPhoneAlt/></span>
         <input type="text" className="form-control" name="telefono" placeholder="Telefono" onChange={handleChange}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaMailBulk/></span>
         <input type="text" className="form-control" name="correo" placeholder="Correo" onChange={handleChange}/>
         </div>
        </div>
        <ModalFooter>
        <button type="submit" className="btn btn-success" onClick={()=> peticionPost()}>Guardar</button>
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>

      </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
    {/* Moodal para ediocion*/}

    <Modal isOpen={modalEditar}>
      <ModalHeader style= {{background: "blue", color: "white"}}>Edita Cliente</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div className="input-group mb-3 " >
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control " name="nombre" placeholder="Nombre" onChange={handleChange}
         value= {clienteCapturado && clienteCapturado.nombre}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control" name="a_paterno" placeholder="Apellido Paterno" onChange={handleChange}
         value= {clienteCapturado && clienteCapturado.a_paterno}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control" name="a_materno" placeholder="Apellido Materno" onChange={handleChange}
         value= {clienteCapturado && clienteCapturado.a_materno}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaPhoneAlt/></span>
         <input type="text" className="form-control" name="telefono" placeholder="Telefono" onChange={handleChange}
         value= {clienteCapturado && clienteCapturado.telefono}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaMailBulk/></span>
         <input type="text" className="form-control" name="correo" placeholder="Correo" onChange={handleChange}
         value= {clienteCapturado && clienteCapturado.correo}/>
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
      <ModalHeader style= {{background: "blue", color: "white"}}>Eliminar Cliente</ModalHeader>
      <ModalBody>
        <p  style= {{fontFamily: "arial", fontSize: 20, textAlign: "center"}}>¿Estas seguro que desea eliminar el cliente {clienteCapturado && clienteCapturado.nombre}?</p>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>SI</button>
          <button className="btn btn-primary" onClick={()=>abrirCerrarModalEliminar()}>NO</button>
        </ModalFooter>
      </ModalBody>
    </Modal>
    
    </div>
    </React.StrictMode>
  );
}

export default Cliente;

