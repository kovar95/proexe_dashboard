import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  deleteUser,
  updateLoadingState,
  updateErrors,
} from '../store/ActionCreators';
import ProexeDataService from '../services/proexe/service';

type Props = {
  id: number | null;
  setDeleteUserId: (userId: number | null) => void;
};

const DELETE_USER_ERROR = 'Unable to delete this user!';

const DeleteModal: React.FC<Props> = ({ id, setDeleteUserId }) => {
  const resetModal = () => {
    setDeleteUserId(null);
  };

  const dispatch = useDispatch();

  const onDelete = async () => {
    if (id) {
      dispatch(updateLoadingState(true));
      dispatch(deleteUser(id));
      resetModal();
      dispatch(updateLoadingState(false));
      try {
        const req = await ProexeDataService.delete(id);
        if (req) {
          dispatch(deleteUser(id));
        } else {
          updateErrors(DELETE_USER_ERROR);
        }
      } catch (error: any) {
        if (!error.message.includes('404')) {
          dispatch(updateErrors(error?.message ?? DELETE_USER_ERROR));
          setTimeout(() => dispatch(updateErrors(null)), 5000);
        }
      }
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
