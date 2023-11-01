import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { assignDevice, getAllDevices } from "../features/device/deviceSlice";

const AssignDevice = ({ show, handleClose, deviceId }) => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [formData, setFormData] = useState({
    deviceId: deviceId,
    username: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onPromptChange = (e) => {
    setPrompt(e.target.value);
  };
  useEffect(() => {
    setFormData({
      deviceId: deviceId,
      username: "",
    });
  }, []);

  const handleAssignDevice = async () => {
    await dispatch(assignDevice(formData));
    await dispatch(getAllDevices());

    setFormData({
      deviceId: deviceId,
      username: "",
    });

    handleClose();
  };

  const handleModalHide = () => {
    setFormData({
      title: "",
      content: "",
    });
    setPrompt(""); // Reset the prompt to an empty string
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="assign"></Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter the username"
              value={formData.username}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAssignDevice}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignDevice;
