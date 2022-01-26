import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css'
import Inicio from './pages/Inicio';
import Ventas from './pages/Ventas';
import Compras from './pages/Compras';
import Ganancias from './pages/Ganancias';
import Cliente from './pages/Cliente';
import Proveedor from './pages/Proveedor';
import Productos from './pages/Productos';
import Login from './components/Login';
function App()  {
  return (
    <React.Fragment>
    <Router>
   
    <Switch>
    <Route path='/' exact render={props=> ( <Login {...props}/>)} />
   
    <Route path='/Inicio'  render={props=> ( <Inicio {...props}/>)}/>
      <Route path='/ventas' component= {Ventas} />
      <Route path='/compras' component= {Compras} />
      <Route path='/ganancias' component= {Ganancias} />
      <Route path='/cliente' component= {Cliente} />
      <Route path='/proveedor' component= {Proveedor} />
      <Route path='/productos'  component= {Productos} />
    </Switch>
    </Router>
    
    </React.Fragment>
  );
}

export default App;
