import React from 'react'
import { useState, useEffect } from 'react';
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

const TablaProveedor = ({data,handleModalEdit,searchTerm,handleDelete}) => {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const obtenerData = async () => {
          if (searchTerm.trim() !== '') {
            return data.filter(
              (proveedor) =>
              proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              proveedor.apellido_paterno.toLowerCase().includes(searchTerm.toLowerCase()) ||
              proveedor.apellido_materno.toLowerCase().includes(searchTerm.toLowerCase()) ||
              proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              proveedor.empresa.toLowerCase().includes(searchTerm.toLowerCase())
            );
          } else {
            return data;
          }
        };
        obtenerData().then((filtered) => setFilteredData(filtered));
    }, [data, searchTerm]);

    return(
        <div className="table table-responsive" id='tProveedor'>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark" id='theadProveedor'>
                    <tr>
                        <th className='text-center fs-5' scope="col">Nombre</th>
                        <th className='text-center fs-5' scope="col">Apellido Paterno</th>
                        <th className='text-center fs-5' scope="col">Apellido Materno</th>
                        <th className='text-center fs-5' scope="col">Empresa</th>
                        <th className='text-center fs-5' scope="col">Domicilio</th>
                        <th className='text-center fs-5' scope="col">Telefono</th>
                        <th className='text-center fs-5' scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id='tbodyProveedor'>
                    {filteredData.map((proveedor) => (
                        <tr key={proveedor.id} id={proveedor.id}>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.apellido_paterno}</td>
                            <td>{proveedor.apellido_materno}</td>
                            <td>{proveedor.empresa}</td>
                            <td>{proveedor.direccion}</td>
                            <td>{proveedor.telefono}</td>
                            <td>{proveedor.email}</td>
                            <td className='text-center'>
                                <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>handleModalEdit(proveedor)} id='btnEditarProveedor'>
                                    <FaPencil />
                                </button>
                                <button type="button" className="btn btn-danger btn-sm mr-1" onClick={()=>handleDelete(proveedor.id)} id='btnEliminarProveedor'>
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

export default TablaProveedor