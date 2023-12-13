import { useCallback ,useEffect,useState} from 'react'
import Navbar from '../components/Navbar';
import ModalAddUser from '../components/ModalAddUser';
import ModalEditUser from '../components/ModalEditUser';
import TablaUser from '../components/TablaUser';
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const UsuarioPage = () => {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const getUsuarios = useCallback(async () => {
        const response = await fetch('http://localhost:3001/usuarios')
        const data = await response.json()
        setData(data)
    }
    , [])

    useEffect(() => {
        getUsuarios()
    }, [])

    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Agrega la lógica para manejar el envío del formulario aquí
        //imprimir los datos del formulario del onsubmit formatearlos a json
        let data = {
            nombre: e.target.nombre.value,
            apellido_paterno: e.target.apellido_paterno.value,
            apellido_materno: e.target.apellido_materno.value,
            domicilio: e.target.domicilio.value,
            telefono: e.target.telefono.value,
            email: e.target.email.value,
            rfc: e.target.rfc.value,
            contrasennia: e.target.contrasennia.value,
            fecha_nacimiento: e.target.fecha_nacimiento.value
        }
        console.log(data);
        guardarUsuario(data);
        handleClose(); // Cierra el modal después de enviar el formulario
    };

    //function guardar usuario
    const guardarUsuario = async (data) => {
        const response = await fetch('http://localhost:3001/usuarios/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.text()
        console.log(res)

        getUsuarios();
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
        editarUsuario(dataEdit);

        // Agrega la lógica para manejar el envío del formulario aquí
        handleCloseEdit(); // Cierra el modal después de enviar el formulario
    }

    //function editar usuario
    const editarUsuario = async (data) => {
        await fetch('http://localhost:3001/usuarios/edit', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.log(err))

        getUsuarios();
    }

    //function eliminar usuario
    const handleDelete = async (id) => {
        await fetch('http://localhost:3001/usuarios/delete', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({id:id})
        }).then(res => res.text())
        .then(data => console.log(data))
        .catch(err => console.log(err));

        getUsuarios();
    }

  return (
    <>
        <div className='col-md-11 mx-auto'>
            <div className='d-flex justify-content-between align-items-center'>
                <h6 className='text-start fw-bold fs-1 text-primary mt-3 mb-4' id='titleUsuario'>Usuario</h6>
                <button type="button" className="btn btn-success text-end" onClick={handleShow} id='btnAgregarUsuario'>
                    <FaPlus className='pb-1'/> Nuevo Usuario
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
                    id='txtBuscarU'
                />
            </div>
            {showModal && ( <ModalAddUser handleClose={handleClose} handleFormSubmit={handleFormSubmit}/>)}
            {showModalEdit && ( <ModalEditUser handleClose={handleCloseEdit} handleFormSubmit={handleFormSubmitEdit} dataEdit={dataEdit} handleInputEditarChange={handleInputEditarChange}/>)}
            <TablaUser data={data} handleModalEdit={handleShowModalEdit} searchTerm={searchTerm} handleDelete={handleDelete}/>
        </div>
    </>
  )
}

export default UsuarioPage