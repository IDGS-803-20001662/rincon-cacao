import React from 'react'

const ModalAddUser = ({handleClose,handleFormSubmit}) => {
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalUsuarioA'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold fs-4 text-primary" id='titleAgregarUsuario'>Agregar Usuario</h5>
                        <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" id='btnCerrarModalUsuarioA'></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                <input type="text" className="form-control" name="nombre" id='txtNombreAU' required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_paterno" className="form-label fw-bold">Apellido Paterno</label>
                                <input type="text" className="form-control" id="txtApellidoPAU" name="apellido_paterno" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido_materno" className="form-label fw-bold">Apellido Materno</label>
                                <input type="text" className="form-control" id='txtApellidoMAU' name="apellido_materno" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="domicilio" className="form-label fw-bold">Domicilio</label>
                                <input type="text" className="form-control" id="txtDomicilioAU" name="domicilio" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fecha_nacimiento" className="form-label fw-bold">Fecha de Nacimiento</label>
                                <input type="date" className="form-control" id="txtFechaNacimientoAU" name="fecha_nacimiento" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contrasennia" className="form-label fw-bold">Contraseña</label>
                                <input type="password" className="form-control" id="txtContrasenniaAU" name="contrasennia" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label fw-bold">Teléfono</label>
                                <input type="tel" className="form-control" id="txtTelefonoAU" name="telefono" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Email</label>
                                <input type="email" className="form-control" id="txtEmailAU" name="email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rfc" className="form-label fw-bold">RFC</label>
                                <input type="text" className="form-control" id="txtRfcAU" name="rfc" required />
                            </div>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-center">
                                <button type="submit" className="btn btn-success text-center" id='btnAgregarUsuarioA'>
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

export default ModalAddUser