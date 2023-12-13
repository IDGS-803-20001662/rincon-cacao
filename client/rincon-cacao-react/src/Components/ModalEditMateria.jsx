import React from 'react'

const ModalEditMateria = ({handleClose,handleFormSubmit,dataEdit,handleInputEditarChange, dataProveedor,dataMedida}) => {
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalMateriaE'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold fs-4 text-primary">Editar Materia</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" id='btnCerrarModalMateriaE'></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleFormSubmit}>
                            <input type="text" className="form-control" id="txtIDEM" name="id" value={dataEdit.id} htmlFor="id" readOnly hidden />
                            <div className="mb-3">
                            <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                <input type="text" className="form-control" id="txtNombreEM" name="nombre" value={dataEdit.nombre} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descripcion" className="form-label fw-bold">Descripcion</label>
                                <textarea className="form-control" id="txtDescripcionEM" name="descripcion" value={dataEdit.descripcion} onChange={handleInputEditarChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="duracion" className="form-label fw-bold">Duracion</label>
                                <input type="number" className="form-control" id="txtDuracionEM" name="duracion" value={dataEdit.duracion} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="id_proveedor" className="form-label fw-bold">Proveedor</label>
                                <select className="form-control"  id="txtIdProveedorEM" name="id_proveedor" defaultValue={dataEdit.id_proveedor} onChange={handleInputEditarChange} required>
                                    {
                                    dataProveedor.map((proveedor) => (
                                        <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label fw-bold">Stock</label>
                                <input type="number" className="form-control" id="txtStockEM" name="stock" value={dataEdit.stock} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cantidad_minima" className="form-label fw-bold">Cantidad Minima</label>
                                <input type="number" className="form-control" id="txtCantidadMEM" name="cantidad_minima" value={dataEdit.cantidad_minima} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                            <label htmlFor="medida" className="form-label fw-bold">Medida</label>
                            <select className="form-control"  id="medida" name="txtMedidaEM" defaultValue={dataEdit.medida} onChange={handleInputEditarChange} required>
                                    {
                                        dataMedida.map((medida) => (
                                            <option key={medida.id} value={medida.id}>{medida.nombre}</option>
                                        ))
                                        }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label fw-bold">Precio</label>
                                <input type="number" className="form-control" id="txtPrecioEM" name="precio" value={dataEdit.precio} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estatus" className="form-label fw-bold" id='txtEstatusEU'>Estatus {dataEdit.estatus === 1 ? <p className='fw-bold text-success'>Activo</p> : <p className='fw-bold text-danger'>Inactivo</p>}</label>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="submit" className="btn btn-success" id='btnEditarMateriaE'>
                                    Actualizar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
              
    )
}

export default ModalEditMateria