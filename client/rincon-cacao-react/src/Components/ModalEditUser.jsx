import React from 'react'

const ModalEditUser = ({handleClose,handleFormSubmit,dataEdit,handleInputEditarChange}) => {
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalUsuarioE'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold fs-4 text-primary">Editar Usuario</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" id='btnCerrarModalUsuarioE'></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleFormSubmit}>
                            <input type="text" className="form-control" id="txtIDEU" name="id" value={dataEdit.id} htmlFor="id" readOnly hidden />

                            <div className="mb-3">
                            <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                <input type="text" className="form-control" id="txtNombreEU" name="nombre" value={dataEdit.nombre} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_paterno" className="form-label fw-bold">Apellido Paterno</label>
                                <input type="text" className="form-control" id="txtApellidoPEU" name="apellido_paterno" value={dataEdit.apellido_paterno} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_materno" className="form-label fw-bold">Apellido Materno</label>
                                <input type="text" className="form-control" id="txtApellidoMEU" name="apellido_materno" value={dataEdit.apellido_materno} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fecha_nacimiento" className="form-label fw-bold">Fecha de Nacimiento</label>
                                <input type="date" className="form-control" id="txtFechaNacimientoEU" name="fecha_nacimiento" value={dataEdit.fecha_nacimiento} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasennia" className="form-label fw-bold">Contraseña</label>
                                <input type="text" className="form-control" id="txtContrasenniaEU" name="contrasennia" value={dataEdit.contrasennia} onChange={handleInputEditarChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="domicilio" className="form-label fw-bold">Domicilio</label>
                                <input type="text" className="form-control" id="txtDomicilioEU" name="domicilio" value={dataEdit.domicilio} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                                <input type="tel" className="form-control" id="txtTelefonoEU" name="telefono" value={dataEdit.telefono} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Email</label>
                                <input type="email" className="form-control" id="txtEmailEU" name="email" value={dataEdit.email} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rfc" className="form-label fw-bold">RFC</label>
                                <input type="text" className="form-control" id="txtRfcEU" name="rfc" value={dataEdit.rfc} onChange={handleInputEditarChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="estatus" className="form-label fw-bold" id='txtEstatusEU'>Estatus {dataEdit.estatus === 1 ? <p className='fw-bold text-success'>Activo</p> : <p className='fw-bold text-danger'>Inactivo</p>}</label>
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="submit" className="btn btn-success" id='btnEditarUsuarioE'>
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

export default ModalEditUser