import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import PasswordInput from "../../common/password-input/password-input";
import { toast } from "../../../utils/functions/swal";
import { updatePassword } from "../../../api/user-service";

const PasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Please enter your current password"),
    newPassword: Yup.string()
      .required("Please enter your new password")
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&.-^]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmNewPassword: Yup.string()
      .required("Please re-enter your new password")
      .oneOf([Yup.ref("newPassword")], "Password fields doesn't match"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await updatePassword(values);
      toast("Your password is updated", "success");
      formik.resetForm();
    } catch (err) {
      console.log(err);
      toast(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Current Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("oldPassword")}
          isInvalid={formik.touched.oldPassword && formik.errors.oldPassword}
          isValid={formik.touched.oldPassword && !formik.errors.oldPassword}
          error={formik.errors.oldPassword}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>New Password</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("newPassword")}
          isInvalid={formik.touched.newPassword && formik.errors.newPassword}
          isValid={formik.touched.newPassword && !formik.errors.newPassword}
          error={formik.errors.newPassword}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password Confirm</Form.Label>
        <PasswordInput
          {...formik.getFieldProps("confirmNewPassword")}
          isInvalid={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
          }
          isValid={
            formik.touched.confirmNewPassword &&
            !formik.errors.confirmNewPassword
          }
          error={formik.errors.confirmNewPassword}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && <Spinner animation="border" size="sm" />} Update
      </Button>
    </Form>
  );
};

export default PasswordForm;
