import { useState, useEffect, useCallback } from 'react'
import Navbar from '../Components/Navbar';

const dataMedida = [
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
];

const CompraPage = () => {
  const [data, setData] = useState([])
  const [dataProveedor, setDataProveedor] = useState([])
  const [dataMateria, setDataMateria] = useState([])
  const [dataUsuario, setDataUsuario] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [detalleCompra, setDetalleCompra] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(1);
    const [dataDetalleCompraId, setDataDetalleCompraId] = useState([]);
    



    const getCompra = useCallback(async () => {
        const response = await fetch('http://localhost:3001/compras')
        const data = await response.json()
        setData(data)
    }
    , [])

    const getUsuarios = useCallback(async () => {
      const response = await fetch('http://localhost:3001/usuarios')
      const data = await response.json()
      setDataUsuario(data)
  }
  , [])

    const getMateria = useCallback(async () => {
        const response = await fetch('http://localhost:3001/materias')
        const data = await response.json()
        setDataMateria(data)
    }
    , [])

    const getProveedor = useCallback(async () => {
        const response = await fetch('http://localhost:3001/proveedores')
        const data = await response.json()
        setDataProveedor(data)
    }
    , [])

    

    useEffect(() => {
      getCompra()
      getUsuarios()
      getMateria()
      getProveedor()
    }, [getMateria, getProveedor,getCompra,getUsuarios,data])

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () =>{ 
      setDetalleCompra([]);
      setDataTotal(0);
      setShowModal(false);
    }
   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // formater datos
        let data = {
            id_usuario: e.target.id_usuario.value,
            //id_proveedor: e.target.id_proveedor.value,
            total: e.target.total.value,
        }
        guardarCompra(data)
        handleClose(); // Cierra el modal después de enviar el formulario
    };

    //funcion para guardar la compra
    const guardarCompra = async (data) => {
        const response = await fetch('http://localhost:3001/compras/create', {
            method: 'POST',
            headers: {

                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const res = await response.text()
        if(res){
          guardarDetalleCompra(parseInt(res));
        }
    }

    //funcion para guardar el detalle de la compra
    const guardarDetalleCompra = async (id) => {
      detalleCompra.map((detalle) => {
        guardarDetalle(detalle,id)
        
  })
  setDetalleCompra([]);
}

    const guardarDetalle = async (detalle,id) => {
      const response = await fetch('http://localhost:3001/detalles/create', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(
            {
              id_compra: id,
              id_materia_prima: detalle.id_materia_prima,
              id_proveedor: proveedorSeleccionado,
              medida: detalle.medida,
              cantidad: detalle.cantidad,
              subtotal: detalle.subtotal
            }
          ),
      })
      const res = await response.text()
      console.log(res)
    }



   // const [showModalEdit, setShowModalEdit] = useState(false);
    //const [dataEdit, setDataEdit] = useState([]);
   // const handleCloseEdit = () => setShowModalEdit(false);

    

    //Funcion para abrir el modal y mandar los datos
    /*const handleShowModalEdit = (data) => {
        console.log(data);
        setShowModalEdit(true);
        setDataEdit(data);
    };*/

    //Estado para guardar los datos del formulrio del modal editar
   /* const handleInputEditarChange = (e) => {
        const { name, value } = e.target;
        setDataEdit({ ...dataEdit, [name]: value });
        console.log(dataEdit);
    };*/
        

    /*const handleFormSubmitEdit = (e) => {
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
    }*/

    //funcion para eliminar la materia prima
    const handleDelete = async (id) => {
        await fetch('http://localhost:3001/compras/delete', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id:id})
        }).then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    //Modal detelle compra
    const [showModalDetalle, setShowModalDetalle] = useState(false);
    const handleCloseDetalle = () => setShowModalDetalle(false);
    const handleShowDetalle = () => setShowModalDetalle(true);

    const handleFormDetalle = (e) => {
      e.preventDefault();
      // formater datos
      let data = {
          id_materia_prima: e.target.id_materia_prima.value,
          medida: e.target.medida.value,
          cantidad: e.target.cantidad.value,
          subtotal: e.target.subtotal.value
      }
        setDetalleCompra([...detalleCompra,data]);
        setDataTotal(dataTotal+parseInt(data.subtotal));
        console.log(detalleCompra)
      handleCloseDetalle(); // Cierra el modal después de enviar el formulario
  }

  //Show molad detalle correspondiente a la compra
  const [showModalDetalleCompraId, setShowModalDetalleCompraId] = useState(false);
  const handleCloseDetalleCompraId = () => setShowModalDetalleCompraId(false);
  const handleShowDetalleCompraId = () => setShowModalDetalleCompraId(true);
  
  const handleDetalleCompraId = async(id) => {
    await fetch(`http://localhost:3001/detalles/compra/${id}`)
    .then(res => res.json())
    .then(data => {
      setDataDetalleCompraId(data);
      handleShowDetalleCompraId();
    })
    .catch(err => console.log(err))
  }

  return (
    <>
    <Navbar/>
        <div className='row'>
            <div className='col-md-10 mx-auto'>
    <div className='d-flex justify-content-between align-items-center'>
        <h6 className='text-start'>Compra</h6>
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
    {showModal && ( <ModalAdd handleClose={handleClose} handleFormSubmit={handleFormSubmit} dataProveedor={dataProveedor}  dataUsuario={dataUsuario} dataMateria={dataMateria} handleShowDetalle={handleShowDetalle} dataDetalle={detalleCompra} dataTotal={dataTotal} dataMedida={dataMedida} setProveedorSeleccionado={setProveedorSeleccionado} proveedorSeleccionado={proveedorSeleccionado}/>)}
    {//showModalEdit && ( <ModalEdit handleClose={handleCloseEdit} handleFormSubmit={handleFormSubmitEdit} dataEdit={dataEdit} handleInputEditarChange={handleInputEditarChange} dataProveedor={dataProveedor} dataMedida={dataMedida}/>)
    }
    {showModalDetalle && ( <ModalDetalle handleCloseDetalle={handleCloseDetalle} handleFormDetalle={handleFormDetalle}  dataProveedor={dataProveedor} dataMateria={dataMateria} dataMedida={dataMedida} proveedorSeleccionado={proveedorSeleccionado}/>)}
    {showModalDetalleCompraId && ( <ModalDetalleCompraId handleCloseDetalleCompraId={handleCloseDetalleCompraId} dataDetalleCompraId={dataDetalleCompraId} dataMateria={dataMateria} dataMedida={dataMedida}/>)}
    <Tabla data={data}  searchTerm={searchTerm} dataProveedor={dataProveedor}  handleDelete={handleDelete} dataUsuario={dataUsuario} dataMateria={dataMateria} handleShowDetalleCompraId={handleDetalleCompraId}/>
    </div>
    </div>
    </>
  )
}

export default CompraPage

function Tabla({data,searchTerm, handleDelete,dataUsuario,handleShowDetalleCompraId}){
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
      const obtenerData = async () => {
        if (searchTerm.trim() !== '') {
          return data.filter(
            (compra) =>
            compra.fecha.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
           // compra.id_usuario.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
              
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
                  <th scope="col">Usuario</th>
                  <th scope="col">fecha</th>
                  <th scope="col">Total</th>
                  <th scope="col">Acciones</th>
              </tr>
          </thead>
          <tbody>
              {filteredData.map((compra) => (
                  <tr key={compra.id}>
                    {
                        dataUsuario.map((usuario)=>(
                            usuario.id === compra.id_usuario
                            ? <td key={usuario.id}>{usuario.nombre}</td>
                            : null
                        ))
                    }
                    {
                      //mostrar solo la fecha anio-mes-dia
                      <td>{compra.fecha.substring(0,10)}</td>
                    }
                      <td>{compra.total}</td>
                    
                      <td>
                          <button type="button" className="btn btn-warning" onClick={()=>handleShowDetalleCompraId(compra.id)}>
                              Ver detalles
                          </button>
                          <button type="button" className="btn btn-danger" onClick={()=>handleDelete(compra.id)}>
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

function ModalAdd({handleClose,handleFormSubmit,dataProveedor,dataMateria,dataUsuario,handleShowDetalle,
 dataDetalle, dataTotal,dataMedida,setProveedorSeleccionado,proveedorSeleccionado}){
  

return (
  <div
    className="modal fade show"
    style={{ display: "block" }}
    tabIndex="-1"
    role="dialog"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Agregar Compra</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleFormSubmit}>
            {/* Campos del formulario */}
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Usuario
              </label>
              <select
                className="form-control"
                id="id_usuario"
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
              <label htmlFor="id_proveedor" className="form-label">
                Proveedor
              </label>
              <select
                className="form-control"
                id="id_proveedor"
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
              <h6>Detalle de la Compra</h6>

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
              <label htmlFor="total" className="form-label">
                Total
              </label>
              <input
                type="number"
                className="form-control"
                id="total"
                name="total"
                value={dataTotal}
                readOnly={true}
                required
              />
            </div>

            {/* Otros campos del formulario... */}
            <button type="submit" className="btn btn-primary">
              Agregar Materia
            </button>
            <button
              type="button"
              className="btn btn-succes"
              onClick={handleShowDetalle}
            >
              Agregar Detalle
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);
}
/*
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
*/
function ModalDetalle({handleCloseDetalle,handleFormDetalle,dataProveedor,dataMateria,dataMedida,proveedorSeleccionado}){


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
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">Detalle Compra</h5>
                        <button type="button" className="btn-close" onClick={handleCloseDetalle} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={handleFormDetalle}>
                            {/* Campos del formulario */}
                            <div className="mb-3">
                                <label htmlFor="id_materia_prima" className="form-label">Materia Prima</label>
                                <select className="form-control"  id="id_materia_prima" name="id_materia_prima"  onChange={onChangeMateria} required>
                                  <option value="0">Selecciona una materia</option>
                                  {

                                    dataMateriaProveedor.length>0  ? (dataMateriaProveedor.map((materia) => (
                                      <option key={materia.id} value={materia.id}>{materia.nombre}</option>
                                    ))) : <option value="1">Este proveedor no tiene materia </option>
                                  }
                                </select>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="medida" className="form-label">Medida</label>
                              <select className="form-control"  id="medida" name="medida" required>
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
                                  <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                  <input type="number" className="form-control" id="cantidad" name="cantidad" onChange={onChangeCantidad} required />
                              </div>
                              <div className="mb-3">
                                  <label htmlFor="subtotal" className="form-label">Subtotal</label>
                                  <input type="number" className="form-control" id="subtotal" name="subtotal" required value={subtotal} readOnly={true} />
                              </div>
                                  
                            {/* Otros campos del formulario... */}
                            <button type="submit" className="btn btn-primary">
                                Agregar Detalle
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
  )
}

const ModalDetalleCompraId = ({handleCloseDetalleCompraId,dataDetalleCompraId,dataMateria,dataMedida}) => {
    return (
      
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                        <h5 className="modal-title">Detalle Compra</h5>
                        <button type="button" className="btn-close" onClick={handleCloseDetalleCompraId} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
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
                                    dataDetalleCompraId.map((detalle) => (
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
                </div>
            </div>
        </div>
    )
 }