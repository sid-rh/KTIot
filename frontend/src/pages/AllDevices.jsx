import { useState, useEffect } from "react";
import { FaSignInAlt, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getAllDevices } from "../features/device/deviceSlice";
import DeviceItem from "../components/Device/DeviceItem";

const AllDevices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { device, isLoading, isError, isSuccess, totalCount } = useSelector(
    (state) => state.device
  );
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5); // Default perPage
  const [totalPages, setTotalPages] = useState(1);

  const openCreateStoryModal = () => {
    setShowModal(true);
  };

  const closeCreateStoryModal = () => {
    setShowModal(false);
  };

  const openGenerateStory = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowGenerate(true);
  };

  const closeGenerateStory = () => {
    setShowGenerate(false);
  };

  const getDevices = () => {
    try {
      dispatch(getAllDevices());
    } catch (error) {
      console.log(error?.data?.message || error);
    }
  };

  const handleItemClick = (storyId) => {
    // dispatch(getSingleStory(storyId));
    navigate(`/singleStory/${storyId}`, { state: { storyId: storyId } });
  };

  useEffect(() => {
    dispatch(getAllDevices());
  }, [dispatch]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // getStories(page);
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing perPage
    // getStories(1);
  };

  return (
    <>
      {/* {user && (
          <button className="btn" onClick={openCreateStoryModal}>
            <FaPlus /> Create Story
          </button>
        )} */}
      <h1>Devices</h1>

      {isLoading ? (
        <Spinner /> // Display a loading spinner while fetching data
      ) : isError ? (
        <p>Error loading stories</p> // Handle error state
      ) : isSuccess && device ? (
        <>
          {device.map((dev) => (
            <DeviceItem
              key={dev._id}
              device={dev}
              userInfo={dev.user[0]}
              onTitleClick={handleItemClick}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

export default AllDevices;
