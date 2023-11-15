import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import UnidadMedida from '../../../types/unidadMedida';

type SaveUnidadMedidaModalProps = {
  onHide: () => void;
  onSave: (p: UnidadMedida) => void;
  unidadMedida: UnidadMedida | null;
  show: boolean;
};

const SaveUnidadMedidaModal: React.FC<SaveUnidadMedidaModalProps> = ({ onSave, onHide, unidadMedida, show }) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    const data = Object.fromEntries(new FormData(form));
    onSave({ ...unidadMedida!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{unidadMedida?.id === 0 ? 'Create' : 'Edit'} UnidadMedida </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>denominacion</Form.Label>
              <Form.Control
                defaultValue={unidadMedida?.denominacion}
                name="denominacion"
                placeholder="Denominacion"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>abreviatura</Form.Label>
              <Form.Control
                defaultValue={unidadMedida?.abreviatura}
                name="abreviatura"
                placeholder="Abreviatura"
                required
                type="text"
              />
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveUnidadMedidaModal;
