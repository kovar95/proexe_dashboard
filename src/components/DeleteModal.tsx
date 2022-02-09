import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { deleteUser, updateLoadingState } from '../store/ActionCreators';

type Props = {
  id: number | null;
  setDeleteUserId: (userId: number | null) => void;
};

const DeleteModal: React.FC<Props> = ({ id, setDeleteUserId }) => {
  const resetModal = () => {
    setDeleteUserId(null);
  };

  const dispatch = useDispatch();

  const onDelete = () => {
    if (id) {
      dispatch(updateLoadingState(true));
      dispatch(deleteUser(id));
      resetModal();
      dispatch(updateLoadingState(false));
    }
  };

  return (
    <Modal isOpen={!!id} toggle={resetModal}>
      <ModalHeader toggle={resetModal}>Delete user</ModalHeader>
      <ModalBody>User id {id} will be permanently deleted!</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={resetModal}>
          Cancel
        </Button>{' '}
        <Button color="danger" onClick={onDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
