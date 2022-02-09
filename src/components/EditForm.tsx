import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
} from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ProexeDataService from '../services/proexe/service';
import {
  addUser,
  editUser,
  updateLoadingState,
  updateErrors,
} from '../store/ActionCreators';
import { IRootState } from '../store/reducers';
import { User } from '../services/proexe/types';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Must have a character!')
    .max(255, 'Must be shorter than 255!')
    .required('Must enter a name!'),
  email: Yup.string()
    .email('Must be a valid email adress!')
    .max(255, 'Must be shorter than 255!')
    .required('Must enter an email!'),
});

type FormUser = {
  name: string;
  email: string;
};

const UPDATE_USER_ERROR = 'Unable to update user info!';
const CREATE_USER_ERROR = 'Unable to create new user!';

const FormikForm = () => {
  const dispatch = useDispatch();
  const users = useSelector<IRootState, User[]>(
    (state) => state.usersReducer.users
  );

  const submitError = (message: string, timeout: number = 5000) => {
    dispatch(updateErrors(message));
    setTimeout(() => dispatch(updateErrors(null)), timeout);
  };

  const generateRandomCity = () => {
    const randNumber = Math.floor(Math.random() * users.length);

    // Return one of existing cities or Belgrade if no cities
    return users?.[randNumber]?.city ?? 'Belgrade';
  };

  const findNextId = () => {
    const ids = users.map((user) => user.id).sort((id1, id2) => id1 - id2);

    // Return id larger for 1 from highest
    if (!ids?.length) {
      return 11;
    }
    return ids[ids.length - 1] < 11 ? 11 : ids[ids.length - 1] + 1;
  };

  const onAddUser = async (user: FormUser) => {
    const { email } = user;
    const userForSubmit = {
      ...user,
      id: findNextId(),
      city: generateRandomCity(),
      username: email.substring(0, email.indexOf('@')),
    };
    try {
      const req = await ProexeDataService.create(userForSubmit);
      dispatch(addUser(req));
    } catch (error: any) {
      submitError(error?.message ?? CREATE_USER_ERROR);
    }
  };

  const onEditUser = async (user: FormUser) => {
    const { name, email } = user;
    const updatedUser = {
      ...initialValues!,
      name,
      email,
    };
    try {
      const req = await ProexeDataService.update(
        updatedUser,
        initialValues!.id
      );
      if (req.status === 200) {
        dispatch(editUser(req.data));
      }
      if (req.status === 404) {
        dispatch(editUser(updatedUser));
      }
    } catch (error: any) {
      if (!error.message.includes('404')) {
        submitError(error?.message ?? UPDATE_USER_ERROR);
      }
      dispatch(editUser(updatedUser));
    }
  };

  const onSubmitForm = (user: FormUser) => {
    dispatch(updateLoadingState(true));

    if (params?.id) {
      onEditUser(user);
    } else {
      onAddUser(user);
    }

    dispatch(updateLoadingState(false));
  };

  const navigate = useNavigate();
  const params = useParams();
  const [initialValues, setInitialValues] = useState<User | null>(null);

  useEffect(() => {
    if (params?.id) {
      const userForEditing = users.find(
        (user) => user.id === Number(params.id)
      );
      setInitialValues(userForEditing ?? null);
    }
  }, [params, users]);

  return (
    <Formik
      initialValues={{
        name: initialValues?.name ?? '',
        email: initialValues?.email ?? '',
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        onSubmitForm(values);
        resetForm();
        setSubmitting(false);
        navigate('/');
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} className="form-horizontal">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              invalid={!!errors.name && touched.name}
            />
            <FormFeedback valid={!errors.name}>{errors.name}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              invalid={!!errors.email && touched.email}
            />
            <FormFeedback valid={!errors.email}>{errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Row className="ml-auto">
              <Col sm={{ size: 'auto', offset: 7 }}>
                <Link to="/">
                  <Button
                    type="button"
                    className="m-1"
                    outline
                    color="danger"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="m-1"
                  color="success"
                  disabled={isSubmitting}
                >
                  {params?.id ? 'Edit user' : 'Add user'}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
