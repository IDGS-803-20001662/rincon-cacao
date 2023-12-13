import React from 'react'
import { useState, useEffect } from 'react';
import { BiShow } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";

function TablaCompra({data,searchTerm, handleDelete,dataUsuario,handleShowDetalleCompraId}) {
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const obtenerData = async () => {
            if (searchTerm.trim() !== '') {
            return data.filter(
                (compra) =>
                compra.fecha.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
            // compra.id_usuario.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
                
            );
            } else {
            return data;
            }
        };
        obtenerData().then((filtered) => setFilteredData(filtered));
        }, [data, searchTerm]);

    return(
        <div className="table table-responsive" id='tCompra'>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark" id='theadCompra'>
                    <tr>
                        <th className='text-center fs-5' scope="col">Usuario</th>
                        <th className='text-center fs-5' scope="col">fecha</th>
                        <th className='text-center fs-5' scope="col">Total</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody id='tbodyCompra'>
                    {filteredData.map((compra) => (
                        <tr key={compra.id} id={compra.id}>
                            {
                                dataUsuario.map((usuario)=>(
                                    usuario.id === compra.id_usuario
                                    ? <td key={usuario.id}>{usuario.nombre}</td>
                                    : null
                                ))
                            }
                            {
                            //mostrar solo la fecha anio-mes-dia
                            <td>{compra.fecha.substring(0,10)}</td>
                            }
                            <td>{compra.total}</td>
                            
                            <td className='text-center'>
                                <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>handleShowDetalleCompraId(compra.id)} id='btnVerDetalleCompra'>
                                    <BiShow />
                                </button>
                                <button type="button" className="btn btn-danger btn-sm mr-1" onClick={()=>handleDelete(compra.id)} id='btnEliminarCompra'>
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

export default TablaCompra