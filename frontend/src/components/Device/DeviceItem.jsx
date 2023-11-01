import React, { useState, useEffect } from "react";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AssignDevice from "../AssignDevice";

import "./DeviceItem.css"; // Import your CSS file for StoryItem styles

const DeviceItem = ({ device, userInfo, onTitleClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log();
  });

  const handleAssignDevice = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="device-item">
      <div className="device-info">
        <div>
          <h3>Device</h3>
        </div>
        <p>{userInfo?.username}</p>
      </div>

      <div className="actions">
        <button className="btn" onClick={handleAssignDevice}>
          Assign
        </button>
      </div>
      <AssignDevice
        show={showModal}
        handleClose={handleCloseModal}
        deviceId={device._id}
      />
    </div>
  );
};

export default DeviceItem;
