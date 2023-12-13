import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Cacao from '../assets/cacao.png'
import "../styles/LoginStyle.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [contrasennia, setContrasennia] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, contrasennia, navigate);
};

  return (
    <>
      <div className='col-md-11 mx-auto'>
        <div className='container mt-5'>
          <div className='login-box'>
            <h1 className='text-center fw-bold fs-1 text-dark mt-3 mb-2' id='titleIniciarSesion'>Iniciar Sesión</h1>
            <div className='text-center'>
              <img className='text-center mb-2' src={Cacao} width="150px"/>
            </div>
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="email" className='fw-bold'>Correo Electrónico:</label>
                <input type="email" id="txtEmailLogin" name="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="input-group">
                <label htmlFor="contrasennia" className='fw-bold'>Contraseña:</label>
                <input type="password" id="txtContrasenniaLogin" name="contrasennia" required value={contrasennia}
                  onChange={(e) => setContrasennia(e.target.value)}/>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" id='btnLogin' className='btn btn-primary'>Iniciar sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage