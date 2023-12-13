import React from 'react'

const ModalAddCompra = ({handleClose,handleFormSubmit,dataProveedor,dataMateria,dataUsuario,handleShowDetalle,
    dataDetalle, dataTotal,dataMedida,setProveedorSeleccionado,proveedorSeleccionado}) => {
        
  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex="-1"
      role="dialog"
      id='ModalCompraA'
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold fs-4 text-primary" id='titleAgregarCompra'>Agregar Compra</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
              id='btnCerrarModalCompraA'
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              {/* Campos del formulario */}
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-bold">
                  Usuario
                </label>
                <select
                  className="form-control"
                  id="txtIdUsuarioAC"
                  name="id_usuario"
                  defaultValue="1"
                  required
                >
                  {
                    //<input type="text" className="form-control" id="nombre" name="nombre" required />
                    dataUsuario.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.nombre}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="id_proveedor" className="form-label fw-bold">
                  Proveedor
                </label>
                <select
                  className="form-control"
                  id="txtIdProveedorAC"
                  name="id_proveedor"
                  defaultValue={proveedorSeleccionado}
                  onChange={(e) => setProveedorSeleccionado(e.target.value)}
                  required
                >
                  {dataProveedor.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <h6 className='form-label fw-bold'>Detalle de la Compra</h6>
  
                <table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Materia Prima</th>
                      <th scope="col">Medida</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      //mostrar los datos del detalle de la compra
                      dataDetalle.map((detalle) => (
                        <tr key={`${detalle.cantidad}-${detalle.id_materia_prima}-${detalle.subtotal}`}>
                          <td>
                            {
                              dataMateria.find(
                                (materia) =>
                                  materia.id == parseInt(detalle.id_materia_prima)
                              )?.nombre
                            }
                          </td>
                          <td>
                            {
                              dataMedida.find(
                                (medida) => medida.id == parseInt(detalle.medida)
                              )?.nombre
                            }
                          </td>
                          <td>{detalle.cantidad}</td>
                          <td>${detalle.subtotal}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
  
              <div className="mb-3">
                <label htmlFor="total" className="form-label fw-bold">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="txtTotalAC"
                  name="total"
                  value={dataTotal}
                  readOnly={true}
                  required
                />
              </div>
              <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                <button type="button" className="btn btn-success text-center" onClick={handleShowDetalle} id='btnAgregarDetalleA'>
                    Agregar Detalles de Compra
                </button>
                <button type="submit" className="btn btn-danger text-center" id='btnAgregarCompraA'>
                    Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAddCompra