import React from 'react'

const ModalAddProveedor = ({handleClose,handleFormSubmit}) => {
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalProveedorA'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold fs-4 text-primary" id='titleAgregarProveedor'>Agregar Proveedor</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" id='btnCerrarModalProveedorA'></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleFormSubmit}>
                            {/* Campos del formulario */}
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                <input type="text" className="form-control" id="txtNombreAP" name="nombre" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_paterno" className="form-label fw-bold">Apellido Paterno</label>
                                <input type="text" className="form-control" id="txtApellidoPAP" name="apellido_paterno" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_materno" className="form-label fw-bold">Apellido Materno</label>
                                <input type="text" className="form-control" id="txtApellidoMAP" name="apellido_materno" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empresa" className="form-label fw-bold">Empresa</label>
                                <input type="text" className="form-control" id="txtEmpresaAP" name="empresa" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="domicilio" className="form-label fw-bold">Dirrecion</label>
                                <input type="text" className="form-control" id="txtDireccionAP" name="direccion" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                                <input type="tel" className="form-control" id="txtTelefonoAP" name="telefono" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Email</label>
                                <input type="email" className="form-control" id="txtEmailAP" name="email" required />
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="submit" className="btn btn-success text-center" id='btnAgregarProveedorA'>
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

export default ModalAddProveedor