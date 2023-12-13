import React from 'react'
import { useState, useEffect } from 'react';
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

const TablaUser = ({data,handleModalEdit,searchTerm,handleDelete}) => {
    const [filteredData, setFilteredData] = useState([]);

        useEffect(() => {
            const obtenerData = async () => {
              if (searchTerm.trim() !== '') {
                return data.filter(
                  (usuario) =>
                    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    usuario.apellido_paterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    usuario.apellido_materno.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
                );
              } else {
                return data;
              }
            };
            obtenerData().then((filtered) => setFilteredData(filtered));
          }, [data, searchTerm]);
  
          return(
            <div className="table table-responsive" id='tUsuario'>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark" id='theadUsuario'>
                        <tr>
                            <th className='text-center fs-5' scope="col">Nombre</th>
                            <th className='text-center fs-5' scope="col">Apellido Paterno</th>
                            <th className='text-center fs-5' scope="col">Apellido Materno</th>
                            <th className='text-center fs-5' scope="col">Domicilio</th>
                            <th className='text-center fs-5' scope="col">Telefono</th>
                            <th className='text-center fs-5' scope="col">Email</th>
                            <th className='text-center fs-5' scope="col">RFC</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id='tbodyUsuario'>
                        {filteredData.map((usuario) => (
                            <tr key={usuario.id} id={usuario.id}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido_paterno}</td>
                                <td>{usuario.apellido_materno}</td>
                                <td>{usuario.domicilio}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.rfc}</td>
                                <td className='text-center'>
                                    <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>handleModalEdit(usuario)} id='btnEditarUsuario'>
                                        <FaPencil />
                                    </button>
                                    <button type="button" className="btn btn-danger btn-sm mr-1" onClick={()=>handleDelete(usuario.id)} id='btnEliminarUsuario'>
                                    <FaTrashCan />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
}

export default TablaUser