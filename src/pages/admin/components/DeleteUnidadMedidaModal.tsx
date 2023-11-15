import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

import UnidadMedida from '../../../types/unidadMedida';

type DeleteUnidadMedidaModalProps = {
  onDelete: () => void;
  onHide: () => void;
  unidadMedida: UnidadMedida | null;
  show: boolean;
};


const DeleteUnidadMedidaModal: React.FC<DeleteUnidadMedidaModalProps> = ({ onDelete, onHide, unidadMedida, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Eliminar Unidad Medida</Modal.Title>
    </Modal.Header>
    <Modal.Body>Está seguro que quiere eliminar la siguiente unidad medida: <strong>{unidadMedida?.abreviatura}</strong> <strong>{unidadMedida?.denominacion}</strong>?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cerrar
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Eliminar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteUnidadMedidaModal;
