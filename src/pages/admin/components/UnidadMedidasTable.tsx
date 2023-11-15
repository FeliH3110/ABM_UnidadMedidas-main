import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import UnidadMedida from "../../../types/unidadMedida";
import DataLayer from '../../../services/data-layer';

const DeleteUnidadMedidaModal = React.lazy(() => import('./DeleteUnidadMedidaModal'));
const SaveUnidadMedidaModal = React.lazy(() => import('./SaveUnidadMedidaModal'));

type UnidadMedidasTableProps = {
  unidadMedidas: UnidadMedida[];
};

const emptyUnidadMedida: UnidadMedida = {
  denominacion: '',
  abreviatura: '',
  id: 0,
};

const UnidadMedidasTable: React.FC<UnidadMedidasTableProps> = ({ unidadMedidas }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedUnidadMedidas, setListedUnidadMedidas] = React.useState<UnidadMedida[]>(unidadMedidas);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedUnidadMedida, setSelectedUnidadMedida] = React.useState<UnidadMedida | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedUnidadMedida) {
      setShowDeleteModal(false);
      setLoading(true);
      DataLayer.delete.unidadMedida(selectedUnidadMedida.id!)
        .then(() => setListedUnidadMedidas((prevState: UnidadMedida[]) => prevState.filter((item: UnidadMedida) => item.id !== selectedUnidadMedida.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedUnidadMedida, setShowDeleteModal, setListedUnidadMedidas, setLoading]);
  const onSave = React.useCallback((u: UnidadMedida) => {
    if (selectedUnidadMedida) {
      setShowSaveModal(false);
      setLoading(true);
      if (u.id) {
        DataLayer.update.unidadMedida(u)
          .then((editedUnidadMedida: UnidadMedida) => setListedUnidadMedidas((prevState: UnidadMedida[]) => prevState.map((item: UnidadMedida) => item.id === editedUnidadMedida.id ? editedUnidadMedida : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete u.id;

        DataLayer.create.unidadMedida(u)
          .then((createdUnidadMedida: UnidadMedida) => {
            setListedUnidadMedidas((prevState: UnidadMedida[]) => [...prevState, createdUnidadMedida]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedUnidadMedida, setShowSaveModal, setListedUnidadMedidas, setLoading]);
  const onShowDeleteModal = React.useCallback((u: UnidadMedida) => {
    setSelectedUnidadMedida(u);
    setShowDeleteModal(true);
  }, [setSelectedUnidadMedida, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((u?: UnidadMedida) => {
    setSelectedUnidadMedida(u ?? emptyUnidadMedida);
    setShowSaveModal(true);
  }, [setSelectedUnidadMedida, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
              <Button onClick={() => onShowSaveModal()} style={{ float: 'left',  marginTop: '70px', marginBottom: '10px' }} variant="primary">Crear Unidad Medida</Button>
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Denominacion</th>
                    <th>Abreviatura</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedUnidadMedidas.map((u: UnidadMedida) => (
                      <tr key={u.id}>
                        <td width='2%'>{u.id}</td>
                        <td width='23%'>{u.abreviatura}</td>
                        <td width='45%'>{u.denominacion}</td>
                        <td width='10%'>
                          <Button onClick={() => onShowSaveModal(u)} variant="link" className="table-btn-editar">Editar</Button>
                          <Button onClick={() => onShowDeleteModal(u)} variant="link" className="table-btn-eliminar">Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }
      <DeleteUnidadMedidaModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        unidadMedida={selectedUnidadMedida}
        show={showDeleteModal}
      />
      <SaveUnidadMedidaModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        unidadMedida={selectedUnidadMedida}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default UnidadMedidasTable