import React from 'react'
import { useState, useEffect } from 'react'
import { BrowserRouter,Routes, Route } from "react-router-dom"
import UsuarioPage from './pages/UsuarioPage'
import ProveedorPage from './pages/ProveedorPage'
import MateriaPage from './pages/MateriaPage'
import CompraPage from './pages/CompraPage'
import InicioPage from './pages/InicioPage'
import LoginPage from './pages/LoginPage'
import Navbar from './components/Navbar'
import { ProtectedRoute } from './components/ProtectedRoute' 

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/usuarios');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogin = (email, contrasennia, navigate) => {
    // Verifica si el usuario existe en la lista de usuarios
    const foundUser = users.find(
      (user) => user.email === email && user.contrasennia === contrasennia
    );

    if (foundUser) {
      setUser(foundUser);
      // Redirigir al usuario a la página de inicio después del inicio de sesión
      navigate('/Inicio'); // Asegúrate de importar 'useHistory' de 'react-router-dom'
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <BrowserRouter>
      <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LoginPage handleLogin={handleLogin}/>}/>
          <Route element={<ProtectedRoute user={!!user}/>}>
            <Route path="/Inicio" element= {<InicioPage/>}/>
            <Route path="/Usuarios" element={<UsuarioPage/>}/>
            <Route path="/Provedores" element={<ProveedorPage/>}/>
            <Route path="/Materias" element={<MateriaPage/>}/>
            <Route path="/Compras" element={<CompraPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;