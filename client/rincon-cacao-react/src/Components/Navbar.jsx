import React from 'react'
import { useState } from 'react';
import {Link } from "react-router-dom"
import Logo from '../assets/logo.webp';
import { CiLogout } from "react-icons/ci";

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className='col-12'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#"><img src={Logo} width="70px"/></a>
                <a className="navbar-brand fw-bold" href="#">Rincon del Cacao</a>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                {user ? 
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" id="liInicio" to="/Inicio">Inicio</Link>
                        <Link className="nav-link" to="/Usuarios" id="liUsuarios">Usuario</Link>
                        <Link className="nav-link" id="liProveedores" to="/Provedores">Provedores</Link>
                        <Link className="nav-link" id="liMaterias" to="/Materias">Materia Prima</Link>
                        <Link className="nav-link" id="liCompras" to="/Compras">Compras</Link>
                    </div>
                : <></>}
                    <div className="navbar-nav ms-auto">
                        <button className='btn btn-secondary p-1' id='btnLogout' onClick={handleLogout}><CiLogout /></button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar