import React, { useCallback ,useState} from 'react'

const Usuario = () => {
    const [data, setData] = useState([])

    const getUsuarios = useCallback(async () => {
        const response = await fetch('http://localhost:3001/usuarios')
        const data = await response.json()
        setData(data)
    }
    , [])

    React.useEffect(() => {
        getUsuarios()
    }, [getUsuarios, data])

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Agrega la lógica para manejar el envío del formulario aquí
        handleClose(); // Cierra el modal después de enviar el formulario
    };

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState([]);
    const handleCloseEdit = () => setShowModalEdit(false);

    

    //Funcion para abrir el modal y mandar los datos
    const handleShowModalEdit = (data) => {
        console.log(data);
        setShowModalEdit(true);
        setDataEdit(data);
    };

    //Estado para guardar los datos del formulrio del modal editar
    const handleInputEditarChange = (e) => {
        const { name, value } = e.target;
        setDataEdit({ ...dataEdit, [name]: value });
    };
        

    const handleFormSubmitEdit = (e) => {
        e.preventDefault();
        //imprimir los datos del formulario del onsubmit
        console.log(e.target.nombre.value);

        // Agrega la lógica para manejar el envío del formulario aquí
        handleCloseEdit(); // Cierra el modal después de enviar el formulario
    }

  return (
    <>
        <div className='row'>
            <div className='col-md-10 mx-auto'>
    <div className='d-flex justify-content-between align-items-center'>
        <h6 className='text-start'>Usuario</h6>
    <button type="button" className="btn btn-primary text-end" onClick={handleShow}>
                Abrir Modal
            </button>
    </div>
    {showModal && ( <ModalAdd handleClose={handleClose} handleFormSubmit={handleFormSubmit}/>)}
    {showModalEdit && ( <ModalEdit handleClose={handleCloseEdit} handleFormSubmit={handleFormSubmitEdit} dataEdit={dataEdit} handleInputEditarChange={handleInputEditarChange}/>)}
    <Tabla data={data} handleModalEdit={handleShowModalEdit}/>
    </div>
    </div>
    </>
  )
}

export default Usuario


function Tabla({data,handleModalEdit}){
    /*
    "id": 1,
    "nombre": "CITLALLI",
        "apellido_paterno": "MARTINEZ",
        "apellido_materno": "MEDINA",
        "domicilio": "CASA",
        "fecha_nacimiento": "2002-06-24",
        "telefono": "4772337489",
        "email": "citla@gmail.com",
        "contrasennia": "123",
        "rfc": "MAMJ020624HB1",
        "create_date": "2023-11-29T20:33:42.000Z",
    */
    return(
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido Paterno</th>
                        <th scope="col">Apellido Materno</th>
                        <th scope="col">Domicilio</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Email</th>
                        <th scope="col">RFC</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido_paterno}</td>
                            <td>{usuario.apellido_materno}</td>
                            <td>{usuario.domicilio}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.rfc}</td>
                            <td>
                                <button type="button" className="btn btn-warning" onClick={()=>handleModalEdit(usuario)}>
                                    Editar
                                </button>
                                <button type="button" className="btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function ModalAdd({handleClose,handleFormSubmit}){
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Usuario</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleFormSubmit}>
                                    {/* Campos del formulario */}
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" name="nombre" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido_paterno" className="form-label">Apellido Paterno</label>
                                        <input type="text" className="form-control" id="apellido_paterno" name="apellido_paterno" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido_materno" className="form-label">Apellido Materno</label>
                                        <input type="text" className="form-control" id="apellido_materno" name="apellido_materno" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="domicilio" className="form-label">Domicilio</label>
                                        <input type="text" className="form-control" id="domicilio" name="domicilio" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                                        <input type="tel" className="form-control" id="telefono" name="telefono" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="rfc" className="form-label">RFC</label>
                                        <input type="text" className="form-control" id="rfc" name="rfc" required />
                                    </div>
                                    {/* Otros campos del formulario... */}

                                    <button type="submit" className="btn btn-primary">
                                        Agregar Usuario
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
    )
}

function ModalEdit({handleClose,handleFormSubmit,dataEdit,handleInputEditarChange}){
    return(
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Usuario</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                   <label htmlFor="id" className="form-label">id:{dataEdit.id}</label>
                                   </div>
                                   <div className="mb-3">
                                   <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" name="nombre" value={dataEdit.nombre} onChange={handleInputEditarChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido_paterno" className="form-label">Apellido Paterno</label>
                                        <input type="text" className="form-control" id="apellido_paterno" name="apellido_paterno" value={dataEdit.apellido_paterno} onChange={handleInputEditarChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido_materno" className="form-label">Apellido Materno</label>
                                        <input type="text" className="form-control" id="apellido_materno" name="apellido_materno" value={dataEdit.apellido_materno} onChange={handleInputEditarChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="domicilio" className="form-label">Domicilio</label>
                                        <input type="text" className="form-control" id="domicilio" name="domicilio" value={dataEdit.domicilio} onChange={handleInputEditarChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                                        <input type="tel" className="form-control" id="telefono" name="telefono" value={dataEdit.telefono} onChange={handleInputEditarChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={dataEdit.email} onChange={handleInputEditarChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="rfc" className="form-label">RFC</label>
                                        <input type="text" className="form-control" id="rfc" name="rfc" value={dataEdit.rfc} onChange={handleInputEditarChange} required />
                                    </div>
                                    {/* Otros campos del formulario... */}
                                    <button type="submit" className="btn btn-primary">
                                        Editar Usuario
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    )
}