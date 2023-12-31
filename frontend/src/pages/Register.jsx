import { useState, useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    isAdmin: false,
  });

  const { email, username, password, isAdmin } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      if (message.errors) {
        message.errors.map((res) => {
          return toast.error(res.msg);
        });
      } else toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !isAdmin || !username) {
      // Display an error message for empty fields
      toast.error("Please fill in all fields.");
      return;
    }
    {
      const userData = {
        username,
        email,
        password,
        isAdmin,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>

        <p>Create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter the password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <div onChange={onChange}>
              <input type="radio" value={true} name="isAdmin" /> Yes
              <input type="radio" value={false} name="isAdmin" /> No
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>

          <div className="form-group">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
