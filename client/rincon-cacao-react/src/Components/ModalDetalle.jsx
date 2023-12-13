import React from 'react'
import { useState } from 'react';

const ModalDetalle = ({handleCloseDetalle,handleFormDetalle,dataProveedor,dataMateria,dataMedida,proveedorSeleccionado}) => {
  let dataMateriaProveedor = dataMateria.filter((materia) => materia.id_proveedor === parseInt(proveedorSeleccionado));
  const [dataMedidaMateria,setDataMedidaMateria] = useState(dataMedida.filter((medida) => medida.id === 1));
  const [precio,setPrecio] = useState(0);
  const [subtotal,setSubtotal] = useState(0);
  
  const onChangeMateria = (e) => {
    let id_materia = e.target.value;
    console.log(id_materia);
    setDataMedidaMateria(dataMedida.filter((medida) => medida.id === dataMateria.filter((materia) => materia.id === parseInt(id_materia))[0].medida));
    setPrecio(dataMateria.filter((materia) => materia.id === parseInt(id_materia))[0].precio)
  }

  const onChangeCantidad = (e) => {
    let cantidad = e.target.value;
    setSubtotal(cantidad*precio);
  }

  return(
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalDetalleA'>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold fs-4 text-primary" id='titleAgregarDetalle'>Detalle Compra</h5>
                  <button type="button" className="btn-close" onClick={handleCloseDetalle} aria-label="Close" id='btnCerrarModalDetalleA'></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleFormDetalle}>
                    <div className="mb-3">
                        <label htmlFor="id_materia_prima" className="form-label fw-bold">Materia Prima</label>
                        <select className="form-control"  id="txtIdMateriaAD" name="id_materia_prima"  onChange={onChangeMateria} required>
                          <option value="0">Selecciona una materia</option>
                          {

                            dataMateriaProveedor.length>0  ? (dataMateriaProveedor.map((materia) => (
                              <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                            ))) : <option value="1">Este proveedor no tiene materia </option>
                          }
                        </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="medida" className="form-label fw-bold">Medida</label>
                      <select className="form-control"  id="txtMedidaAD" name="medida" required>
                        <option value="0">Selecciona una medida</option>
                        {
                          dataMedidaMateria.length>0 ? (dataMedidaMateria.map((medida) => (
                              <option key={medida.id} value={medida.id}>{medida.nombre}</option>
                          ))) : <option value="1">Esta materia no tiene medida </option>
                            
                            /*dataMedida.map((medida) => (
                                <option key={medida.id} value={medida.id}>{medida.nombre}</option>
                            ))*/
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cantidad" className="form-label fw-bold">Cantidad</label>
                      <input type="number" className="form-control" id="txtCantidadAD" name="cantidad" onChange={onChangeCantidad} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="subtotal" className="form-label fw-bold">Subtotal</label>
                      <input type="number" className="form-control" id="txtSubtotalAD" name="subtotal" required value={subtotal} readOnly={true} />
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                        <button type="submit" className="btn btn-success text-center" id='btnAgregarUsuarioA'>
                            Agregar
                        </button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalDetalle