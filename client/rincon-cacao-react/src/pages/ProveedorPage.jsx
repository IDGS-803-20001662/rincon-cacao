import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar';
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import ModalAddProveedor from '../components/ModalAddProveedor';
import ModalEditProveedor from '../components/ModalEditProveedor';
import TablaProveedor from '../components/TablaProveedor';

const ProveedorPage = () => {
  const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const getProveedores = useCallback(async () => {
        const response = await fetch('http://localhost:3001/proveedores')
        const data = await response.json()
        setData(data)
    }
    , [])

    useEffect(() => {
      getProveedores()
    }, [])

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        //lógica para manejar el envío del formulario a guardar
        let data = {
            nombre: e.target.nombre.value,
            apellido_paterno: e.target.apellido_paterno.value,
            apellido_materno: e.target.apellido_materno.value,
            empresa: e.target.empresa.value,
            direccion: e.target.direccion.value,
            telefono: e.target.telefono.value,
            email: e.target.email.value,
        };
        console.log(data);
        guardarProveedor(data);

        handleClose(); // Cierra el modal después de enviar el formulario
    };


    //funcion guardar
    const guardarProveedor = async (data) => {
        const response = await fetch('http://localhost:3001/proveedores/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const res = await response.text()
        console.log(res)

        getProveedores();
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
    };
        

    const handleFormSubmitEdit = (e) => {
        e.preventDefault();
        //imprimir los datos del formulario del onsubmit
        console.log(e.target.nombre.value);
        editarProveedor(dataEdit);


        // Agrega la lógica para manejar el envío del formulario aquí
        handleCloseEdit(); // Cierra el modal después de enviar el formulario
    }

    //funcion editar Proveedor
    const editarProveedor = async (data) => {
        const response = await fetch('http://localhost:3001/proveedores/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        const res = await response.text()
        console.log(res)

        getProveedores();
    }

     //function eliminar usuario
     const handleDelete = async (id) => {
        await fetch('http://localhost:3001/proveedores/delete', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id:id})
        }).then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))

        getProveedores();
    }

  return (
    <>
        <div className='col-md-11 mx-auto'>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 className='text-start fw-bold fs-1 text-primary mt-3 mb-4' id='titleProveedor'>Proveedor</h6>
                <button type="button" className="btn btn-success text-end" onClick={handleShow} id='btnAgregarProveedor'>
                    <FaPlus className='pb-1'/> Nuevo Proveedor
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
                    id='txtBuscarP'
                    />
            </div>
            {showModal && ( <ModalAddProveedor handleClose={handleClose} handleFormSubmit={handleFormSubmit}/>)}
            {showModalEdit && ( <ModalEditProveedor handleClose={handleCloseEdit} handleFormSubmit={handleFormSubmitEdit} dataEdit={dataEdit} handleInputEditarChange={handleInputEditarChange}/>)}
            <TablaProveedor data={data} handleModalEdit={handleShowModalEdit} searchTerm={searchTerm} handleDelete={handleDelete}/>
        </div>
    </>
  )
}

export default ProveedorPage