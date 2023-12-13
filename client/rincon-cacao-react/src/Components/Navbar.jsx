import React from 'react'
import {Link } from "react-router-dom"
import Logo from '../assets/logo.webp';

const Navbar = () => {
  return (
    <div className='row'>
        <div className='col-md-12'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#"><img src={Logo} width="70px"/></a>
                    <a className="navbar-brand fw-bold" href="#">Rincon del Cacao</a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link active" aria-current="page" id="liInicio" to="/Inicio">Inicio</Link>
                            <Link className="nav-link" to="/Usuarios" id="liUsuarios">Usuario</Link>
                            <Link className="nav-link" id="liProveedores" to="/Provedores">Provedores</Link>
                            <Link className="nav-link" id="liMaterias" to="/Materias">Materia Prima</Link>
                            <Link className="nav-link" id="liCompras" to="/Compras">Compras</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default Navbar