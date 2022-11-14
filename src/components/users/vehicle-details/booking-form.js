import React, { useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormCheck,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import SectionHeader from "../common/section-header/section-header";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  combineDateAndTime,
  getCurrentDate,
  getDate,
} from "../../../utils/functions/date-time";
import { createReservation } from "../../../api/reservation-service";
import { toast } from "../../../utils/functions/swal";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BookingForm = ({ vehicleId }) => {
  const [loading, setLoading] = useState(false);
  const { isUserLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const initialValues = {
    pickUpLocation: "",
    dropOffLocation: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    contract: false,
  };

  const validationSchema = Yup.object({
    pickUpLocation: Yup.string().required("Enter a pick-up location"),
    dropOffLocation: Yup.string().required("Enter a drop-off location"),
    pickUpDate: Yup.string().required("Select a pick-up date"),
    pickUpTime: Yup.string().required("Select a pick-up time"),
    dropOffDate: Yup.string().required("Select a drop-off date"),
    dropOffTime: Yup.string().required("Select a drop-off time"),
    contract: Yup.boolean().oneOf(
      [true],
      "Please read the contract and check the box"
    ),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    const {
      pickUpLocation,
      dropOffLocation,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime,
    } = values;

    const reservationDto = {
      pickUpTime: combineDateAndTime(pickUpDate, pickUpTime),
      dropOffTime: combineDateAndTime(dropOffDate, dropOffTime),
      pickUpLocation,
      dropOffLocation,
    };

    try {
      if (!isUserLogin) throw Error("Please login first");
      await createReservation(vehicleId, reservationDto);
      formik.resetForm();
      toast("Reservation created", "success");
      navigate("/");
    } catch (err) {
      const msg = err?.message || err?.response?.data?.message;
      toast(msg, "error");
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
    <>
      <SectionHeader title="Booking Form" />

      <Form noValidate onSubmit={formik.handleSubmit}>
        <FloatingLabel label="Pick-up Location" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Pick-up Location"
            {...formik.getFieldProps("pickUpLocation")}
            isInvalid={
              formik.touched.pickUpLocation && formik.errors.pickUpLocation
            }
            isValid={
              formik.touched.pickUpLocation && !formik.errors.pickUpLocation
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.pickUpLocation}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel label="Drop-off Location" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Drop-off Location"
            {...formik.getFieldProps("dropOffLocation")}
            isInvalid={
              formik.touched.dropOffLocation && formik.errors.dropOffLocation
            }
            isValid={
              formik.touched.dropOffLocation && !formik.errors.dropOffLocation
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.dropOffLocation}
          </Form.Control.Feedback>
        </FloatingLabel>

        <InputGroup className="mb-3">
          <FloatingLabel label="Pick-up Date">
            <Form.Control
              type="date"
              min={getCurrentDate()}
              placeholder="Pick-up Date"
              {...formik.getFieldProps("pickUpDate")}
              isInvalid={formik.touched.pickUpDate && formik.errors.pickUpDate}
              isValid={formik.touched.pickUpDate && !formik.errors.pickUpDate}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.pickUpDate}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Pick-up Time">
            <Form.Control
              type="time"
              placeholder="Pick-up Time"
              {...formik.getFieldProps("pickUpTime")}
              isInvalid={formik.touched.pickUpTime && formik.errors.pickUpTime}
              isValid={formik.touched.pickUpTime && !formik.errors.pickUpTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.pickUpTime}
            </Form.Control.Feedback>
          </FloatingLabel>
        </InputGroup>

        <InputGroup className="mb-3">
          <FloatingLabel label="Drop-off Date">
            <Form.Control
              type="date"
              min={getDate(formik.values.pickUpDate)}
              placeholder="Drop-off Date"
              {...formik.getFieldProps("dropOffDate")}
              isInvalid={
                formik.touched.dropOffDate && formik.errors.dropOffDate
              }
              isValid={formik.touched.dropOffDate && !formik.errors.dropOffDate}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dropOffDate}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel label="Drop-off Time">
            <Form.Control
              type="time"
              placeholder="Drop-off Time"
              {...formik.getFieldProps("dropOffTime")}
              isInvalid={
                formik.touched.dropOffTime && formik.errors.dropOffTime
              }
              isValid={formik.touched.dropOffTime && !formik.errors.dropOffTime}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.dropOffTime}
            </Form.Control.Feedback>
          </FloatingLabel>
        </InputGroup>

        <FormCheck
          type="checkbox"
          label="I have read and aggree the contract"
          {...formik.getFieldProps("contract")}
          isInvalid={formik.touched.contract && formik.errors.contract}
          isValid={formik.touched.contract && !formik.errors.contract}
          className="mb-3"
        />

        <Button
          variant="primary"
          type="submit"
          disabled={!(formik.dirty && formik.isValid) || loading}
        >
          {loading && <Spinner animation="border" size="sm" />} Book Now
        </Button>
      </Form>
    </>
  );
};

export default BookingForm;
