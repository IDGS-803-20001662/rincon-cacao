import React from 'react'

const ModalAddMateria = ({handleClose,handleFormSubmit,dataProveedor,dataMedida}) => {
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalMateriaA'>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold fs-4 text-primary" id='titleAgregarMateria'>Agregar Materia</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" id='btnCerrarModalMateriaA'></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                        <input type="text" className="form-control" id="txtNombreAM" name="nombre" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descripcion" className="form-label fw-bold">Descripcion</label>
                                       <textarea className="form-control" id="txtDescripcionAM" name="descripcion" required></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="duracion" className="form-label fw-bold">Duracion</label>
                                        <input type="number" className="form-control" id="txtDuracionAM" name="duracion" required />
                                    </div>
                                      <div className="mb-3">
                                        <label htmlFor="id_proveedor" className="form-label fw-bold">Proveedor</label>
                                        <select className="form-control"  id="txtIdProveedorAM" name="id_proveedor" defaultValue="1" required>
                                          {
                                            dataProveedor.map((proveedor) => (
                                              <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                            ))
                                          }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label fw-bold">Stock</label>
                                        <input type="number" className="form-control" id="txtStockAM" name="stock" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cantidad_minima" className="form-label fw-bold">Cantidad Minima</label>
                                        <input type="number" className="form-control" id="txtCantidadMAM" name="cantidad_minima" required />
                                    </div>
                                    <div className="mb-3">
                                    <label htmlFor="medida" className="form-label fw-bold">Medida</label>
                                    <select className="form-control"  id="medida" name="txtMedidaAM" defaultValue="1" required>
                                          {
                                              dataMedida.map((medida) => (
                                                  <option key={medida.id} value={medida.id}>{medida.nombre}</option>
                                              ))
                                              }
                                      </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="precio" className="form-label fw-bold">Precio</label>
                                        <input type="number" className="form-control" id="txtPrecioAM" name="precio" required />
                                    </div>
                                    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                        <button type="submit" className="btn btn-success text-center" id='btnAgregarMateriaA'>
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
  
            
    )
}

export default ModalAddMateria