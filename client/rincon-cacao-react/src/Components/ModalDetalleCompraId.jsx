import React from 'react'

const ModalDetalleCompraId = ({handleCloseDetalleCompraId,dataDetalleCompraId,dataMateria,dataMedida}) => {
    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" id='ModalCompraDetalle'>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                        <h5 className="modal-title fw-bold fs-4 text-primary" id='titleCompraDetalle'>Detalles de Compra</h5>
                        <button type="button" className="btn-close" onClick={handleCloseDetalleCompraId} aria-label="Close" id='btnCerrarModalCompraDetalle'></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-striped table-bordered" id='tCompraDetalle'>
                            <thead className="thead-dark" id='theadCompraDetalle'>
                                <tr>
                                    <th scope="col">Materia Prima</th>
                                    <th scope="col">Medida</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody id='tbodyCompraDetalle'>
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

export default ModalDetalleCompraId