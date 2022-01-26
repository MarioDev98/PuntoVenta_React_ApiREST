import React, {  Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Inicio.css';
import {Pie} from  'react-chartjs-2';
import Barras from './Barras';
import Nav from '../components/Nav';
import axios from 'axios';
class Inicio extends Component{
  
    state={
     
      respuesta:[],
      nombre: [],
      existencia:[],
      data: [],
      opciones: [],
  
    }
  
    async peticion(){
      var peticion=await fetch('http://localhost/api/productos.php');
      var respuesta = await peticion.json();
      this.setState({respuesta: respuesta});
      var nombre=[], existencia=[]; //areglos auxiliares
      this.state.respuesta.map((elemento)=>{
        nombre.push(elemento.nombre);
        existencia.push(elemento.existencia);
      });
      this.setState({nombre: nombre, existencia: existencia});
     // console.log(this.state.nombre);
     // console.log(this.state.existencia);
    }
    
    // colores de manera aleatorioa
    generarCaracter(){
      var caracter = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
      var numero =(Math.random()*15).toFixed(0);
      return caracter[numero];
    }
    //este es para colores asigando a los estados
    colorHex(){
      var color ="";
      for(var i=0; i<6; i++){
        color = color + this.generarCaracter();
      }
      return "#" + color;
    }

    generarColores(){
      var colores=[];
      for(var i=0; i<this.state.respuesta.length; i++){
        colores.push(this.colorHex());
      }
      this.setState({colores:colores});
      //console.log(this.state.colores);
    }

    configurarGrafica(){
      const data={
        labels: this.state.nombre,
        datasets:[{
          data: this.state.existencia,
          backgroundColor: this.state.colores
        }]
      };
      //tamaño de la grafica
      var opciones ={
        responsive:true,
        maintainAspectRatio: false
      }
      ;this.setState({data: data, opciones: opciones})
    }
   
    //
  
//
    async componentDidMount(){
     await this.peticion();
   
    await this.generarColores();
    this.configurarGrafica();
   
  
    }
    
   
  

  
   
   
    render(){ 
    return(
        <div className='inicio'>
          <Nav/>  
        <br/>
        <div className="container">
        <div className="row">
        <div className="col-md-6">
      <div className="card-counter primary">
        <i className="fa fa-code-fork">VENTAS</i>
      
        <span className="count-numbers" >$770</span>
       
      </div>
    </div>
    <div className="col-md-6">
      <div className="card-counter info">
        <i className="fa fa-users">COMPRAS</i>
        <span className="count-numbers">$994</span>
      </div>
    </div>

        </div>
        </div>
        <br/>
        
        <div className="container">
        <div className="row">
        <div className="col-md-6" style={{width: "100", height:"300px"}}>
        <h3 align="center">Producto en stock</h3>        
        <Pie data={this.state.data} options={this.state.opciones}/>
        </div>

        <div className="col-md-6" style={{width: "100", height:"300px"}}>
        <h3 align="center">Ventas Mensuales</h3>        
        <Barras/>
        </div>

        </div>
        
        

     
        </div>


        </div>
    )
  }
}

export default Inicio;

