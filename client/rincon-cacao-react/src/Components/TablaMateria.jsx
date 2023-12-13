import React from "react";
import { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";

const TablaMateria = ({
  data,
  handleModalEdit,
  searchTerm,
  dataProveedor,
  dataMedida,
  handleDelete,
}) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const obtenerData = async () => {
      if (searchTerm.trim() !== "") {
        return data.filter(
          (materia) =>
            materia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            materia.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        return data;
      }
    };
    obtenerData().then((filtered) => setFilteredData(filtered));
  }, [data, searchTerm]);

  return (
    <div className="table table-responsive" id="tMateria">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark" id="theadMateria">
          <tr>
            <th className="text-center fs-5" scope="col">
              Nombre
            </th>
            <th className="text-center fs-5" scope="col">
              Descripcion
            </th>
            <th className="text-center fs-5" scope="col">
              Duracion
            </th>
            <th className="text-center fs-5" scope="col">
              Proveedor
            </th>
            <th className="text-center fs-5" scope="col">
              Stock
            </th>
            <th className="text-center fs-5" scope="col">
              Cantidad Mínima
            </th>
            <th className="text-center fs-5" scope="col">
              Medida
            </th>
            <th className="text-center fs-5" scope="col">
              Precio
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="tbodyMateria">
          {filteredData.map((materia) => (
            <tr key={materia.id} id={materia.id}>
              <td>{materia.nombre}</td>
              <td>{materia.descripcion}</td>
              <td>{materia.duracion} días</td>
              {dataProveedor.map((proveedor) =>
                proveedor.id === materia.id_proveedor ? (
                  <td key={proveedor.id}>{proveedor.nombre}</td>
                ) : null
              )}
              <td>{materia.stock}</td>
              <td>{materia.cantidad_minima}</td>
              {dataMedida.map((medida) =>
                medida.id === materia.medida ? (
                  <td key={medida.id}>{medida.nombre}</td>
                ) : null
              )}
              <td>{materia.precio}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm mx-1"
                  onClick={() => handleModalEdit(materia)}
                  id="btnEditarMateria"
                >
                  <FaPencil />
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm mr-1"
                  onClick={() => handleDelete(materia.id)}
                  id="btnEliminarMateria"
                >
                  <FaTrashCan />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMateria;
