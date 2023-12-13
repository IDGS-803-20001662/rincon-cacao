import React from 'react'
import Navbar from '../components/Navbar';
import Cacao from '../assets/cacao2.png'

const InicioPage = () => {
  return (
    <>
      <div className='col-md-11 mx-auto'>
        <div className='justify-content-between align-items-center'>
          <h1 className='text-center fw-bold fs-1 text-dark mt-3 mb-4' id='titleBienvenido'>Bienvenido</h1>
          <div className='text-center'>
            <img className='text-center' src={Cacao} width="300px"/>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default InicioPage