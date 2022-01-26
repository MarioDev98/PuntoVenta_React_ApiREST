import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ganancias.css';
import axios from 'axios';
import MaterialTable from "material-table";
import Nav from '../components/Nav';

function Ganancias(){
   // variables para el titulo de las tablas 
   const columns =[
    {title:"ID VENTA", field: 'id'},
    {title:"TOTAL DE VENTA", field: 'total'},
    {title:"CLIENTE", field: 'id_cliente'},
    {title:"FECHA DE VENTA", field: 'fecha'}
  ];
  const apiurl="http://localhost/api/ventas.php";// url de la api para la obtencion de los datos
  const [data,setData]=useState([]);// estado de los datos
   //peticion get
   const peticionGet=async()=> {
    await axios.get(apiurl).then(response=> {setData(response.data)}).catch(error=>{
      console.log(error);
    })
  }
  useEffect(() =>{
    peticionGet();
    },[]) 

    return(
        <div className='ganancias'>
          <Nav/>
          <br/>
          <div className="header-table" align="center">Historial de ventas</div>
      <MaterialTable
          columns={columns}
          data={data}
          title="Historial ventas"  
         
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
        </div>
    )
}

export default Ganancias;