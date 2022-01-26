import React from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from "react-icons/fa";
import axios from 'axios';
import {Apilogin} from '../services/Api';
import logo from '../img/logo.png';

class Login extends React.Component{
	
	constructor (props){
		super(props);
	}

	state={
		form:{
			"usuario" : "",
			"password" : ""
		},
		error:false,
		errorMsg: ""
	}
	
	manejadorSubmit2 =e=>{
		e.preventDefault();
	}

	//para los input
	manejadorChange = async e=> {
		await this.setState({
			form:{
				...this.state.form,
				[e.target.name] : e.target.value

			}
		});
		//console.log(this.state.form);
	}

	manejadorBoton=()=>{
		let url = Apilogin + "auth";
		axios.post(url,this.state.form)
		.then(response => {
			//console.log(response);
			if(response.data.status === "ok"){
				
				this.props.history.push("/Inicio");
			}else{
				this.setState({
					error: true,
					errorMsg: response.data.result.error_msg
				})
			}
		})

	}


	render(){
    return(
		
        <div className="fondo">
            <br/><br/><br/><br/>
	<div className="container">
	<div className="row">
		<div className="col-sm-4"></div>
		<div className="col-sm-4">
			<div className="panel panel-primary panelito" >
				<div className="panel panel-heading panelito1">Bienvenido</div>
				<div className="panel panel-body">
					<div style={{content: "center"}}>
                       
						<img src={logo} height="120" style={{marginLeft:'80px'}}/>
					</div>
					<br/><br/>
					<form onSubmit={this.manejadorSubmit2}>
					<div className="input-group mb-3 hola">
					  <span className="input-group-text" ><FaIcons.FaUserAlt/></span>
					  <input type="text" name="usuario" className="form-control" placeholder="Correo"
					   required onChange={this.manejadorChange}/>
					</div>
					
					<div className="input-group mb-3 hola">
					  <span className="input-group-text"><FaIcons.FaKey/></span>
					  <input type="password" name="password" className="form-control" placeholder="Contraseña" onChange={this.manejadorChange}/>
					</div>
					<br/>
					<div className="d-grid gap-2 col-6 mx-auto">
					  <button type="submit" className="btn btn-success botones form-control" onClick={this.manejadorBoton}>Entrar</button>
					</div>
					<br/>
					</form>

					{ this.state.error === true &&
					<div className="alert alert-danger" role="alert">
					 {this.state.errorMsg}
					</div>
	                }
				</div>
			
			</div>
			<br/><br/><br/><br/><p></p><p></p><p></p>
		</div>
		<div className="col-sm-4"><br/><br/></div>
	</div>
</div>
        </div>
    )//fin del return
}
}// fin del function login
export default Login;