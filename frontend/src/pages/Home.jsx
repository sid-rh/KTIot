import { useState, useEffect } from "react";
import { NavDropdown, Badge, Button } from "react-bootstrap";
import { FaSignInAlt, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { logout, reset, resetCredentials } from "../features/auth/authSlice";
import { createDevice, getAllDevices } from "../features/device/deviceSlice";
import AllDevices from "./AllDevices";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const createDev = async () => {
    try {
      dispatch(createDevice());

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const assignDev = async () => {
    try {
      navigate("/assign");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDevices = async () => {
    try {
      await dispatch(getAllDevices());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {user ? (
        <>
          {user.user.isAdmin ? (
            <>
              <button className="btn" onClick={createDev}>
                <FaPlus /> Create Device
              </button>
              <button className="btn mt-5" onClick={assignDev}>
                Assign Device
              </button>
            </>
          ) : (
            <>
              <button className="btn mt-5">
                <FaPlus /> Create Room
              </button>
              <button className="btn mt-5">Assign Room</button>
            </>
          )}
        </>
      ) : (
        <>
          <h1>Home</h1>
        </>
      )}
    </>
  );
};

export default Home;
