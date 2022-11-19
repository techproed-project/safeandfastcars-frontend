import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  Button,
  Row,
  Col,
  ButtonGroup,
  Badge,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "../../../utils/functions/swal";
import {
  createVehicle,
  uploadVehicleImage,
} from "../../../api/vehicle-service";
import "./admin-vehicle.scss";

const AdminVehicleNew = () => {
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const fileImageRef = useRef(null);
  const navigate = useNavigate();

  const initialValues = {
    model: "",
    doors: "",
    seats: "",
    luggage: "",
    transmission: "",
    airConditioning: "",
    fuelType: "",
    age: "",
    pricePerHour: "",
    image: "",
  };

  const validationSchema = Yup.object({
    model: Yup.string().required("Please enter the model"),
    doors: Yup.number().required("Please enter the number of doors"),
    seats: Yup.number().required("Please enter the number of seats"),
    luggage: Yup.number().required("Please enter the luggage capacity"),
    transmission: Yup.string().required("Please enter type of transmission"),
    airConditioning: Yup.string().required(
      "Please enter whether air conditioning exists"
    ),
    fuelType: Yup.string().required("Please enter type of fuel"),
    age: Yup.number().required("Please enter age of car"),
    pricePerHour: Yup.number().required("Please enter price per hour"),
    image: Yup.mixed().required("Please select an image"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", values.image);

      const resp = await uploadVehicleImage(formData);
      const { imageId } = resp.data;

      const payload = { ...values};
      delete payload.image;


      await createVehicle(imageId, payload);
      toast("Vehicle is created", "success");
      navigate(-1);
    } catch (err) {
      console.log(err);
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleSelectImage = () => {
    fileImageRef.current.click();
  };

  const handleImageChange = () => {
    const file = fileImageRef.current.files[0];
    if (!file) return;

    if (!["image/png", "image/jpg"].includes(file.type)) {
      toast("Please select an image file", "error");
      return;
    }

    formik.setFieldValue("image", file);
    // formik state manuel olarak set edildi. Yani seçilen dosyayı image alanına yerleştirdik

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log("ended");
      setImageSrc(reader.result);
    };

  };

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        <Col xl={3} className="image-area">
          <Form.Control
            type="file"
            name="image"
            className="d-none"
            ref={fileImageRef}
            onChange={handleImageChange}
          />
          <img src={imageSrc} className={imageSrc ? "img-fluid" : "d-none"} alt="..." />
          {formik.errors.image && (
            <Badge bg="danger" className="image-area-error">
              Please select an image
            </Badge>
          )}
          <Button
            variant={formik.errors.image ? "danger" : "primary"}
            onClick={handleSelectImage}
          >
            Select Image
          </Button>
        </Col>
        <Col xl={9}>
          <Row>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                {...formik.getFieldProps("model")}
                isInvalid={formik.touched.model && formik.errors.model}
                isValid={formik.touched.model && !formik.errors.model}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.model}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Doors</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("doors")}
                isInvalid={formik.touched.doors && formik.errors.doors}
                isValid={formik.touched.doors && !formik.errors.doors}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.doors}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Seats</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("seats")}
                isInvalid={formik.touched.seats && formik.errors.seats}
                isValid={formik.touched.seats && !formik.errors.seats}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.seats}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Luggage</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("luggage")}
                isInvalid={formik.touched.luggage && formik.errors.luggage}
                isValid={formik.touched.luggage && !formik.errors.luggage}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.luggage}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Transmission</Form.Label>
              <Form.Select
                {...formik.getFieldProps("transmission")}
                isInvalid={
                  formik.touched.transmission && formik.errors.transmission
                }
                isValid={
                  formik.touched.transmission && !formik.errors.transmission
                }
              >
                <option>Select</option>
                <option value="Automatic">Automatic</option>
                <option value="Manuel">Manuel</option>
                <option value="Tiptronic">Tiptronic</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.transmission}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Air Conditioning</Form.Label>
              <Form.Select
                {...formik.getFieldProps("airConditioning")}
                isInvalid={
                  formik.touched.airConditioning &&
                  formik.errors.airConditioning
                }
                isValid={
                  formik.touched.airConditioning &&
                  !formik.errors.airConditioning
                }
              >
                <option>Select</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.airConditioning}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Select
                {...formik.getFieldProps("fuelType")}
                isInvalid={formik.touched.fuelType && formik.errors.fuelType}
                isValid={formik.touched.fuelType && !formik.errors.fuelType}
              >
                <option>Select</option>
                <option value="Electricity">Electricity</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hydrogen">Hydrogen</option>
                <option value="LPG">LPG</option>
                <option value="CNG">CNG</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.fuelType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("age")}
                isInvalid={formik.touched.age && formik.errors.age}
                isValid={formik.touched.age && !formik.errors.age}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} lg={3} className="mb-3">
              <Form.Label>Price Per Hour</Form.Label>
              <Form.Control
                type="number"
                {...formik.getFieldProps("pricePerHour")}
                isInvalid={
                  formik.touched.pricePerHour && formik.errors.pricePerHour
                }
                isValid={
                  formik.touched.pricePerHour && !formik.errors.pricePerHour
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.pricePerHour}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Col>
      </Row>
      <div className="text-end">
        <ButtonGroup aria-label="Basic example">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading && <Spinner animation="border" size="sm" />} Create
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default AdminVehicleNew;
