import React from 'react'
import { BrowserRouter,Routes, Route,Link } from "react-router-dom"
import Usuario from './pages/Usuario'
import Provedor from './pages/Proveedor'
import Materia from './pages/Materia'
import Compra from './pages/Compra'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <div className='container'>
    <Navegation/>
    <Routes>
      <Route path="/" element={<h1>Inicio</h1>}/>
      <Route path="/Usuarios" element={<Usuario/>}/>
      <Route path="/Provedores" element={<Provedor/>}/>
      <Route path="/materia" element={<Materia/>}/>
      <Route path="/Compra" element={<Compra/>}/>
      </Routes>
      </div>
    </BrowserRouter>

    </>
  )
}

export default App

function Navegation(){
  return (
  <div className='row'>
    <div className='col-md-12'>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Rincon del Cacao</a>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
         <a  className="nav-link active" aria-current="page" ><Link to="/">Inicio</Link></a>
          <a className="nav-link"><Link to="/Usuarios">Usuario</Link></a>
          <a className="nav-link"><Link to="/Provedores">Provedores</Link></a>
          <a className="nav-link"><Link to="/materia">Materia Prima</Link></a>
          <a className="nav-link"><Link to="/Compra">Compra</Link></a>
      </div>
    </div>
  </div>
  </nav>
  </div>
  </div>
    
  )
}