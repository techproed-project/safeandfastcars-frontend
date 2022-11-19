import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  Spinner,
  Row,
  Col,
  ButtonGroup,
  Alert,
} from "react-bootstrap";
import * as Yup from "yup";
import ReactInputMask from "react-input-mask-next";
import Loading from "../../common/loading/loading";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "../../../api/user-service";
import { question, toast } from "../../../utils/functions/swal";

const AdminUserEdit = () => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userId } = useParams();

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    zipCode: "",
    userName: "",
    password: "",
    roles: [],
    builtIn: false,
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    phoneNumber: Yup.string("Please enter your phone number").required(),
    email: Yup.string().email().required("Please enter your email"),
    address: Yup.string().required("Please enter your address"),
    zipCode: Yup.string().required("Please enter your zip code"),
    roles: Yup.array().required("Please select a role"),
    password: Yup.string(),
  });

  const onSubmit = async (values) => {
    setSaving(true);

    const data = { ...values };

    if (!data.password) {
      delete data.password;
    }

    try {
      await updateUserById(userId, data);
      toast("User is updated", "success");
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true, // sonradan formik initialValues değerini tekrar initialize yapmak için kullandık
  });

  const loadData = async () => {
    try {
      const resp = await getUserById(userId);
      setInitialValues({ ...resp.data, password: "" });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async () => {
    setDeleting(true);
    try {
      await deleteUserById(userId);
      toast("User was deleted", "success");
      navigate(-1);
    } catch (err) {
      toast(err.response.data.message, "error");
    } finally {
      setDeleting(false);
    }
  };

  const handleDelete = () => {
    question(
      "Are you sure to delete?",
      "You won't be able to revert this!"
    ).then((result) => {
      if (result.isConfirmed) {
        removeUser();
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <fieldset disabled={initialValues.builtIn}>
        <Row>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("firstName")}
              isInvalid={formik.touched.firstName && formik.errors.firstName}
              isValid={formik.touched.firstName && !formik.errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("lastName")}
              isInvalid={formik.touched.lastName && formik.errors.lastName}
              isValid={formik.touched.lastName && !formik.errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              as={ReactInputMask}
              mask="(999) 999-9999"
              {...formik.getFieldProps("phoneNumber")}
              isInvalid={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              isValid={formik.touched.phoneNumber && !formik.errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && formik.errors.email}
              isValid={formik.touched.email && !formik.errors.email}
              disabled
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("address")}
              isInvalid={formik.touched.address && formik.errors.address}
              isValid={formik.touched.address && !formik.errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.address}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              {...formik.getFieldProps("zipCode")}
              isInvalid={formik.touched.zipCode && formik.errors.zipCode}
              isValid={formik.touched.zipCode && !formik.errors.zipCode}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.zipCode}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...formik.getFieldProps("password")}
              isInvalid={formik.touched.password && formik.errors.password}
              isValid={formik.touched.password && !formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md={6} lg={4} className="mb-3">
            <Form.Label>Roles</Form.Label>
            <div>
              <Form.Check
                label="Customer"
                type="checkbox"
                name="roles"
                value="Customer"
                checked={formik.values.roles.includes("Customer")}
                onChange={formik.handleChange}
              />
              <Form.Check
                label="Admin"
                type="checkbox"
                name="roles"
                value="Administrator"
                checked={formik.values.roles.includes("Administrator")}
                onChange={formik.handleChange}
              />
            </div>
          </Form.Group>
        </Row>
      </fieldset>
      {initialValues.builtIn && (
        <Alert variant="danger">
          Built-in accounts can not be deleted and updated
        </Alert>
      )}

      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          {!initialValues.builtIn && (
            <>
              <Button variant="primary" type="submit" disabled={saving}>
                {saving && <Spinner animation="border" size="sm" />} Update
              </Button>
              <Button
                variant="danger"
                type="button"
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting && <Spinner animation="border" size="sm" />} Delete
              </Button>
            </>
          )}
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminUserEdit;
