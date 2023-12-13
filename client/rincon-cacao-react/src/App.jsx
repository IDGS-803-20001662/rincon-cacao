import React from 'react'
import { BrowserRouter,Routes, Route } from "react-router-dom"
import UsuarioPage from './pages/UsuarioPage'
import ProveedorPage from './pages/ProveedorPage'
import MateriaPage from './pages/MateriaPage'
import CompraPage from './pages/CompraPage'
import InicioPage from './pages/InicioPage'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Login</h1>}/>
        <Route path="/Inicio" element= {<InicioPage/>}/>
        <Route path="/Usuarios" element={<UsuarioPage/>}/>
        <Route path="/Provedores" element={<ProveedorPage/>}/>
        <Route path="/Materias" element={<MateriaPage/>}/>
        <Route path="/Compras" element={<CompraPage/>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;