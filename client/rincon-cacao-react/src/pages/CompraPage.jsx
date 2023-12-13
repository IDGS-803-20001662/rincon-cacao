import { useState, useEffect, useCallback } from 'react'
import Navbar from '../Components/Navbar';
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import ModalAddCompra from '../Components/ModalAddCompra';
import ModalDetalle from '../Components/ModalDetalle';
import ModalDetalleCompraId from '../Components/ModalDetalleCompraId';
import TablaCompra from '../Components/TablaCompra';

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
  }, [])

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

    getCompra();
    getUsuarios();
    getMateria();
    getProveedor();
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

    getCompra();
    getUsuarios();
    getMateria();
    getProveedor();
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

    getCompra();
    getUsuarios();
    getMateria();
    getProveedor();
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

    getCompra();
    getUsuarios();
    getMateria();
    getProveedor();
  }

  return (
    <>
      <Navbar/>
      <div className='col-md-11 mx-auto'>
        <div className='d-flex justify-content-between align-items-center'>
          <h6 className='text-start fw-bold fs-1 text-primary mt-3 mb-4' id='titleCompra'>Compra</h6>
          <button type="button" className="btn btn-success text-end" onClick={handleShow} id='btnAgregarCompra'>
            <FaPlus className='pb-1'/> Nueva Compra
          </button>
        </div>
        <div className='d-flex justify-content-between align-items-center col-5 mb-4'>
          <FaSearch className='mx-3'/>
          <input
            className='form-control'
            type='text'
            placeholder='Buscar'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id='txtBuscarC'
          />
        </div>
        {showModal && ( <ModalAddCompra handleClose={handleClose} handleFormSubmit={handleFormSubmit} dataProveedor={dataProveedor}  dataUsuario={dataUsuario} dataMateria={dataMateria} handleShowDetalle={handleShowDetalle} dataDetalle={detalleCompra} dataTotal={dataTotal} dataMedida={dataMedida} setProveedorSeleccionado={setProveedorSeleccionado} proveedorSeleccionado={proveedorSeleccionado}/>)}
        {showModalDetalle && ( <ModalDetalle handleCloseDetalle={handleCloseDetalle} handleFormDetalle={handleFormDetalle}  dataProveedor={dataProveedor} dataMateria={dataMateria} dataMedida={dataMedida} proveedorSeleccionado={proveedorSeleccionado}/>)}
        {showModalDetalleCompraId && ( <ModalDetalleCompraId handleCloseDetalleCompraId={handleCloseDetalleCompraId} dataDetalleCompraId={dataDetalleCompraId} dataMateria={dataMateria} dataMedida={dataMedida}/>)}
        <TablaCompra data={data}  searchTerm={searchTerm} dataProveedor={dataProveedor}  handleDelete={handleDelete} dataUsuario={dataUsuario} dataMateria={dataMateria} handleShowDetalleCompraId={handleDetalleCompraId}/>
      </div>
    </>
  )
}

export default CompraPage