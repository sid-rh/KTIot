import React, { useState, useEffect } from "react";
import { FaHeart, FaBookmark, FaShare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AssignDevice from "../AssignDevice";

import "./RoomItem.css"; // Import your CSS file for StoryItem styles

const RoomItem = ({ room, onTitleClick }) => {
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
    <div className="room-item">
      <div className="room-info">
        <div>
          <h3>{room.room_name}</h3>
        </div>
      </div>

      <div className="actions">
        <button className="btn" onClick={handleAssignDevice}>
          Assign
        </button>
      </div>
    </div>
  );
};

export default RoomItem;
