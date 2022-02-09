import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table, Spinner, Button, Alert } from 'reactstrap';
import {
  addAllUsers,
  updateLoadingState,
  updateApiDataLoaded,
  updateErrors,
} from '../store/ActionCreators';
import ProexeDataService from '../services/proexe/service';
import { IRootState } from '../store/reducers';
import { User } from '../services/proexe/types';
import DeleteModal from './DeleteModal';

const ERROR_MESSAGE = 'Unable to load data from API!';

const Users = () => {
  const {
    usersReducer: { users },
    errorReducer: { error },
    statesReducer: { loading, apiDataLoaded, sortingIndex },
  } = useSelector<IRootState, IRootState>((state) => state);

  const dispatch = useDispatch();
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [sortedUsers, setSortedUsers] = useState<User[] | null>(null);

  const fullfillStore = useCallback(async () => {
    const alertError = (error: string, timeout: number = 5000) => {
      dispatch(updateErrors(error));
      setTimeout(() => dispatch(updateErrors(null)), timeout);
    };

    try {
      dispatch(updateLoadingState(true));

      const response = await ProexeDataService.getAll();
      dispatch(addAllUsers(response));

      dispatch(updateLoadingState(false));
      dispatch(updateApiDataLoaded(true));
    } catch (error) {
      alertError(ERROR_MESSAGE);
      dispatch(updateLoadingState(false));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!apiDataLoaded) {
      fullfillStore();
    }
    if (sortingIndex) {
      const rawUsers = [...users].sort((user1, user2) =>
        user1.username.toLowerCase() > user2.username.toLowerCase()
          ? -sortingIndex
          : sortingIndex
      );
      setSortedUsers(rawUsers);
    } else {
      setSortedUsers(users);
    }
  }, [fullfillStore, apiDataLoaded, users, sortingIndex]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <DeleteModal setDeleteUserId={setDeleteUserId} id={deleteUserId} />
          {error && <Alert color="danger">{error}</Alert>}
          {!sortedUsers?.length ? (
            <Alert color="warning">Users table is empty!</Alert>
          ) : (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => {
                  const { id, name, username, email, city } = user;
                  return (
                    <tr key={id}>
                      <th scope="row">{id}</th>
                      <td>{name}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{city}</td>
                      <td>
                        <Link to={`/edit/${id}`}>
                          <Button color="warning">Edit</Button>
                        </Link>
                      </td>
                      <td>
                        <Button
                          color="danger"
                          onClick={() => setDeleteUserId(id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default Users;
