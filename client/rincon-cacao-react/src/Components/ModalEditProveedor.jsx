import React from 'react'

const ModalEditProveedor = ({handleClose,handleFormSubmit,dataEdit,handleInputEditarChange}) => {
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalProveedorE'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold fs-4 text-primary">Editar Proveedor</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" id='btnCerrarModalProveedorE'></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleFormSubmit}>
                            <input type="text" className="form-control" id="txtIDEP" name="id" value={dataEdit.id} htmlFor="id" readOnly hidden />

                            <div className="mb-3">
                            <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                <input type="text" className="form-control" id="txtNombreEP" name="nombre" value={dataEdit.nombre} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_paterno" className="form-label fw-bold">Apellido Paterno</label>
                                <input type="text" className="form-control" id="txtApellidoPEP" name="apellido_paterno" value={dataEdit.apellido_paterno} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_materno" className="form-label fw-bold">Apellido Materno</label>
                                <input type="text" className="form-control" id="txtApellidoMEP" name="apellido_materno" value={dataEdit.apellido_materno} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empresa" className="form-label fw-bold">Empresa</label>
                                <input type="text" className="form-control" id="txtEmpresaEP" name="empresa" value={dataEdit.empresa} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="domicilio" className="form-label fw-bold">Domicilio</label>
                                <input type="text" className="form-control" id="txtDireccionEP" name="direccion" value={dataEdit.direccion} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                                <input type="tel" className="form-control" id="txtTelefonoEP" name="telefono" value={dataEdit.telefono} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Email</label>
                                <input type="email" className="form-control" id="txtEmailEP" name="email" value={dataEdit.email} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estatus" className="form-label fw-bold" id='txtEstatusEP'>Estatus {dataEdit.estatus === 1 ? <p className='fw-bold text-success'>Activo</p> : <p className='fw-bold text-danger'>Inactivo</p>}</label>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="submit" className="btn btn-success" id='btnEditarProveedorE'>
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

export default ModalEditProveedor