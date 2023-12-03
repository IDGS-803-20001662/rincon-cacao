import { useState, useEffect, useCallback } from 'react'

const Materia = () => {
  const [data, setData] = useState([])
  const [dataProveedor, setDataProveedor] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [dataMedida,setDataMedida] = useState([
         {
            id: 1,
            nombre: 'Kilogramo'
        },{
            id: 2,
            nombre: 'Gramo'
        }, {
            id: 3,
            nombre: 'Litro'
        },{
            id: 4,
            nombre: 'Mililitro'
        },{
            id: 5,
            nombre: 'Unidad'
        },{
            id: 6,
            nombre: 'Paquete'
        },{
            id: 7,
            nombre: 'Bolsa'
        },{
            id: 8,
            nombre: 'Onza'
        }
    ]);




    const getMateria = useCallback(async () => {
        const response = await fetch('http://localhost:3001/materias')
        const data = await response.json()
        setData(data)
    }
    , [])

    const getProveedor = useCallback(async () => {
        const response = await fetch('http://localhost:3001/proveedores')
        const data = await response.json()
        setDataProveedor(data)
    }
    , [])

    

    useEffect(() => {
      getMateria()
      getProveedor()
    }, [getMateria, data, getProveedor])

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // formater datos
        let data = {
            nombre: e.target.nombre.value,
            descripcion: e.target.descripcion.value,
            duracion: e.target.duracion.value,
            id_proveedor: e.target.id_proveedor.value,
            stock: e.target.stock.value,
            cantidad_minima: e.target.cantidad_minima.value,
            medida: e.target.medida.value,
            precio: e.target.precio.value
        }
        console.log(data)
        guardarMateria(data)
        handleClose(); // Cierra el modal después de enviar el formulario
    };

    //Funcion guardar Materia
    const guardarMateria = async (data) => {
        const response = await fetch('http://localhost:3001/materias/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const res = await response.text()
        console.log(res)
    }

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
        console.log(dataEdit);
    };
        

    const handleFormSubmitEdit = (e) => {
        e.preventDefault();
        //imprimir los datos del formulario del onsubmit
        console.log(e.target.medida.value);
        editarMateria(dataEdit);

        // Agrega la lógica para manejar el envío del formulario aquí
        handleCloseEdit(); // Cierra el modal después de enviar el formulario
    }

    //funcion para editar la materia Prima
    const editarMateria = async (data) => {
        const response = await fetch('http://localhost:3001/materias/edit', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const res = await response.text()
        console.log(res)
    }

    //funcion para eliminar la materia prima
    const handleDelete = async (id) => {
        await fetch('http://localhost:3001/materias/delete', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id:id})
        }).then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))
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
    <div className='d-flex justify-content-between align-items-center col-5'>
        <h6 className=''>Buscar</h6>
        <input
            className='form-control'
              type='text'
              placeholder='Buscar'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
    </div>
    {showModal && ( <ModalAdd handleClose={handleClose} handleFormSubmit={handleFormSubmit} dataProveedor={dataProveedor} dataMedida={dataMedida}/>)}
    {showModalEdit && ( <ModalEdit handleClose={handleCloseEdit} handleFormSubmit={handleFormSubmitEdit} dataEdit={dataEdit} handleInputEditarChange={handleInputEditarChange} dataProveedor={dataProveedor} dataMedida={dataMedida}/>)}
    <Tabla data={data} handleModalEdit={handleShowModalEdit} searchTerm={searchTerm} dataProveedor={dataProveedor} dataMedida={dataMedida} handleDelete={handleDelete}/>
    </div>
    </div>
    </>
  )
}

export default Materia


function Tabla({data,handleModalEdit,searchTerm, dataProveedor,dataMedida,handleDelete}){
      const [filteredData, setFilteredData] = useState([]);

      useEffect(() => {
          const obtenerData = async () => {
            if (searchTerm.trim() !== '') {
              return data.filter(
                (usuario) =>
                  usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  usuario.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
              );
            } else {
              return data;
            }
          };
          obtenerData().then((filtered) => setFilteredData(filtered));
        }, [data, searchTerm]);
 

  return(
      <div className="table-responsive">
          <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Descripcion</th>
                      <th scope="col">Duracion</th>
                      <th scope="col">Proveedor</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Cantidad Minima</th>
                      <th scope="col">Medida</th>
                      <th scope="col">Precio</th>
                      <th scope="col">Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  {filteredData.map((materia) => (
                      <tr key={materia.id}>
                          <td>{materia.nombre}</td>
                          <td>{materia.descripcion}</td>
                          <td>{materia.duracion}</td>
                          {
                            dataProveedor.map((proveedor) => (
                              proveedor.id === materia.id_proveedor ? <td key={proveedor.id}>{proveedor.nombre}</td> : null
                            ))
                          }
                          <td>{materia.stock}</td>
                          <td>{materia.cantidad_minima}</td>
                          {
                            dataMedida.map((medida)=>(
                             medida.id === materia.medida ? <td key={medida.id}>{medida.nombre}</td> : null
                            ))
                          }
                          <td>{materia.precio}</td>
                          <td>
                              <button type="button" className="btn btn-warning" onClick={()=>handleModalEdit(materia)}>
                                  Editar
                              </button>
                              <button type="button" className="btn btn-danger" onClick={()=>handleDelete(materia.id)}>
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

function ModalAdd({handleClose,handleFormSubmit,dataProveedor,dataMedida}){
  return(
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title">Agregar Materia</h5>
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
                                      <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                     <textarea className="form-control" id="descripcion" name="descripcion" required></textarea>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="duracion" className="form-label">Duracion</label>
                                      <input type="number" className="form-control" id="duracion" name="duracion" required />
                                  </div>
                                    <div className="mb-3">
                                      <label htmlFor="id_proveedor" className="form-label">Proveedor</label>
                                      <select className="form-control"  id="id_proveedor" name="id_proveedor" defaultValue="1" required>
                                        {
                                          dataProveedor.map((proveedor) => (
                                            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                          ))
                                        }
                                      </select>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="stock" className="form-label">Stock</label>
                                      <input type="number" className="form-control" id="stock" name="stock" required />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="cantidad_minima" className="form-label">Cantidad Minima</label>
                                      <input type="number" className="form-control" id="cantidad_minima" name="cantidad_minima" required />
                                  </div>
                                  <div className="mb-3">
                                  <label htmlFor="medida" className="form-label">Medida</label>
                                  <select className="form-control"  id="medida" name="medida" defaultValue="1" required>
                                        {
                                            dataMedida.map((medida) => (
                                                <option key={medida.id} value={medida.id}>{medida.nombre}</option>
                                            ))
                                            }
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="precio" className="form-label">Precio</label>
                                      <input type="number" className="form-control" id="precio" name="precio" required />
                                  </div>
                                  {/* Otros campos del formulario... */}
                                  <button type="submit" className="btn btn-primary">
                                      Agregar Materia
                                  </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>

          
  )
}

function ModalEdit({handleClose,handleFormSubmit,dataEdit,handleInputEditarChange, dataProveedor,dataMedida}){
  return(
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                  <div className="modal-dialog" role="document">
                      <div className="modal-content">
                          <div className="modal-header">
                              <h5 className="modal-title">Editar Materia</h5>
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
                                      <label htmlFor="descripcion" className="form-label">Descripcion</label>
                                     <textarea className="form-control" id="descripcion" name="descripcion" value={dataEdit.descripcion} onChange={handleInputEditarChange} required></textarea>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="duracion" className="form-label">Duracion</label>
                                      <input type="number" className="form-control" id="duracion" name="duracion" value={dataEdit.duracion} onChange={handleInputEditarChange} required />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="id_proveedor" className="form-label">Proveedor</label>
                                      <select className="form-control"  id="id_proveedor" name="id_proveedor" defaultValue={dataEdit.id_proveedor} onChange={handleInputEditarChange} required>
                                        {
                                          dataProveedor.map((proveedor) => (
                                            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>
                                          ))
                                        }
                                      </select>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="stock" className="form-label">Stock</label>
                                      <input type="number" className="form-control" id="stock" name="stock" value={dataEdit.stock} onChange={handleInputEditarChange} required />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="cantidad_minima" className="form-label">Cantidad Minima</label>
                                      <input type="number" className="form-control" id="cantidad_minima" name="cantidad_minima" value={dataEdit.cantidad_minima} onChange={handleInputEditarChange} required />
                                  </div>
                                  <div className="mb-3">
                                  <label htmlFor="medida" className="form-label">Medida</label>
                                  <select className="form-control"  id="medida" name="medida" defaultValue={dataEdit.medida} onChange={handleInputEditarChange} required>
                                        {
                                            dataMedida.map((medida) => (
                                                <option key={medida.id} value={medida.id}>{medida.nombre}</option>
                                            ))
                                            }
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="precio" className="form-label">Precio</label>
                                      <input type="number" className="form-control" id="precio" name="precio" value={dataEdit.precio} onChange={handleInputEditarChange} required />
                                  </div>
                                  {/* Otros campos del formulario... */}
                                  <button type="submit" className="btn btn-primary">
                                      Editar Materia
                                  </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
            
  )
}