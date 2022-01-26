import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';
import './Ganancias.css'
import * as FaIcons from "react-icons/fa";
import MaterialTable from "material-table";
import swal from 'sweetalert';
import Nav from '../components/Nav';



function Proveedor() {
  // variables para el titulo de las tablas 
 const columns =[
  {title:"NOMBRE", field: 'nombre'},
  {title:"APELLIDO PATERNO", field: 'a_paterno'},
  {title:"APELLIDO MATERNO", field: 'a_materno'},
  {title:"TELEFONO", field: 'telefono'},
  {title:"CORREO", field: 'correo'},
 
];

const mostrarAlerta=()=>{
  swal({
   title: "Exito",
    text: "El proveedor se elimino satisfactoriamente",
    icon: "success",
    button: "Aceptar"
});
}
const mostrarAlertaModificado=()=>{
 swal({
  title: "Exito",
   text: "El proveedor se modifico satisfactoriamente",
   icon: "success",
   button: "Aceptar"
});
}
const mostrarAlertaInsertado=()=>{
  swal({
   title: "Exito",
    text: "El proveedor se agrego satisfactoriamente",
    icon: "success",
    button: "Aceptar"
 });
 }
  const apiurl="http://localhost/api/proveedores.php";// url de la api para la obtencion de los datos
  const [data,setData]=useState([]);// estado de los datos
  const [modalInsertar, setModalInsertar]= useState(false); //estado del modal captura
  const [modalEditar, setmodalEditar]= useState(false); //estado del modal edicion
  const [modalEliminar, setmodalEliminar]= useState(false); //estado del modal eliminacion
//metodo para capturar lo que se escribe en los input
 const [ proveedorCapturado, setproveedorCapturado] = useState ({
   id: '',
   nombre: '',
   a_paterno: '',
   a_materno: '',
   telefono: '',
   correo: '',
  
 })
 const handleChange=e=> {
   const {name, value}=e.target;
   setproveedorCapturado((prevState)=> ({ 
     ...prevState,
     [name]: value
    }))
   console.log(proveedorCapturado);
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
    f.append("nombre", proveedorCapturado.nombre);
    f.append("a_paterno", proveedorCapturado.a_paterno);
    f.append("a_materno", proveedorCapturado.a_materno);
    f.append("telefono", proveedorCapturado.telefono);
    f.append("correo", proveedorCapturado.correo);
  
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
    f.append("nombre", proveedorCapturado.nombre);
    f.append("a_paterno", proveedorCapturado.a_paterno);
    f.append("a_materno", proveedorCapturado.a_materno);
    f.append("telefono", proveedorCapturado.telefono);
    f.append("correo", proveedorCapturado.correo);
  
    f.append("METHOD", "PUT");
    await axios.post(apiurl, f, {params: {id: proveedorCapturado.id}}).then(response=>{
    var dataNueva= data;
    dataNueva.map(proveedor=> {
      if(proveedor.id===proveedorCapturado.id){
        proveedor.nombre=proveedorCapturado.nombre;
        proveedor.a_paterno=proveedorCapturado.a_paterno;
        proveedor.a_materno=proveedorCapturado.a_materno;
        proveedor.telefono=proveedorCapturado.telefono;
        proveedor.correo=proveedorCapturado.correo;
      
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
    setproveedorCapturado(proveedor);
    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }
  //metodo delete (eliminar)
  const peticionDelete=async()=> {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(apiurl, f, {params: {id: proveedorCapturado.id}}).then(response=>{
    setData(data.filter(proveedor=>proveedor.id!==proveedorCapturado.id));
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
    <div className='Proveedor'>
      <Nav/>
      <br/>
      <div className="row">
        <div className="col-9">
        </div>
        <div className="col-3">
        <button className="btn btn-flotante" onClick={()=>abrirCerrarModalInsertar()}><FaIcons.FaUserPlus/> Nuevo Proveedor</button>
        </div>
      </div>
      {/* FIN DE LO QUE ES EL BOTON JAJA  */}
      <div className="header-table" align="center">Lista Proveedores</div>
      <MaterialTable
          columns={columns}
          data={data}
          title="Lista Proveedores"  
          actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Proveedor',
              onClick: (event, proveedor) => seleccionarProveedor(proveedor, "Editar")
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Proveedor',
              onClick: (event, proveedor) =>  seleccionarProveedor(proveedor, "Eliminar")
            }
          ]}
          options={{
            actionsColumnIndex:-1,
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
      <ModalHeader style= {{background: "blue", color: "white"}}>Nuevo proveedor</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div className="input-group mb-3 " >
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control " name="nombre" placeholder="Nombre" onChange={handleChange}/>
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
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-success" onClick={()=> peticionPost()}>Guardar</button>
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>
    {/* Moodal para ediocion*/}

    <Modal isOpen={modalEditar}>
      <ModalHeader style= {{background: "blue", color: "white"}}>Edita proveedor</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div className="input-group mb-3 " >
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control " name="nombre" placeholder="Nombre" onChange={handleChange}
         value= {proveedorCapturado && proveedorCapturado.nombre}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control" name="a_paterno" placeholder="Apellido Paterno" onChange={handleChange}
         value= {proveedorCapturado && proveedorCapturado.a_paterno}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaUserAlt/></span>
         <input type="text" className="form-control" name="a_materno" placeholder="Apellido Materno" onChange={handleChange}
         value= {proveedorCapturado && proveedorCapturado.a_materno}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaPhoneAlt/></span>
         <input type="text" className="form-control" name="telefono" placeholder="Telefono" onChange={handleChange}
         value= {proveedorCapturado && proveedorCapturado.telefono}/>
         </div>
         <div className="input-group mb-3">
         <span className="input-group-text" id="basic-addon1"><FaIcons.FaMailBulk/></span>
         <input type="text" className="form-control" name="correo" placeholder="Correo" onChange={handleChange}
         value= {proveedorCapturado && proveedorCapturado.correo}/>
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
      <ModalHeader style= {{background: "blue", color: "white"}}>Eliminar proveedor</ModalHeader>
      <ModalBody>
        <p  style= {{fontFamily: "arial", fontSize: 20, textAlign: "center"}}>¿Estas seguro que desea eliminar el proveedor {proveedorCapturado && proveedorCapturado.nombre}?</p>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>SI</button>
          <button className="btn btn-primary" onClick={()=>abrirCerrarModalEliminar()}>NO</button>
        </ModalFooter>
      </ModalBody>
    </Modal>


    </div>
  );
}

export default Proveedor;

