import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar';
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import ModalAddMateria from '../components/ModalAddMateria';
import ModalEditMateria from '../components/ModalEditMateria';
import TablaMateria from '../components/TablaMateria';

const MateriaPage = () => {
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
    }, [])

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

        getMateria();
        getProveedor();
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

        getMateria();
        getProveedor();
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

        getMateria();
        getProveedor();
    }


  return (
    <>
        <div className='col-md-11 mx-auto'>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 className='text-start fw-bold fs-1 text-primary mt-3 mb-4'>Materias Primas</h6>
                <button type="button" className="btn btn-success text-end" onClick={handleShow} id='btnAgregarMateria'>
                    <FaPlus className='pb-1'/> Nueva Materia
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
                    id='txtBuscarM'
                />
            </div>
            {showModal && ( <ModalAddMateria handleClose={handleClose} handleFormSubmit={handleFormSubmit} dataProveedor={dataProveedor} dataMedida={dataMedida}/>)}
            {showModalEdit && ( <ModalEditMateria handleClose={handleCloseEdit} handleFormSubmit={handleFormSubmitEdit} dataEdit={dataEdit} handleInputEditarChange={handleInputEditarChange} dataProveedor={dataProveedor} dataMedida={dataMedida}/>)}
            <TablaMateria data={data} handleModalEdit={handleShowModalEdit} searchTerm={searchTerm} dataProveedor={dataProveedor} dataMedida={dataMedida} handleDelete={handleDelete}/>
        </div>
    </>
  )
}

export default MateriaPage

