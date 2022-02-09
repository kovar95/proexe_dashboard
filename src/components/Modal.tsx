import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Form from './EditForm';

const EditUserModal = () => {
  return (
    <Modal isOpen>
      <ModalHeader>Form</ModalHeader>
      <ModalBody>
        <Form />
      </ModalBody>
    </Modal>
  );
};

export default EditUserModal;
