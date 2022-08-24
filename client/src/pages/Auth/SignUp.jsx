import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/slices/userSlice";
import useToast from "../../hooks/useToast";

const SignUp = () => {
  const dispatch = useDispatch();
  const [togglePosition, setTogglePosition] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    position: "No position",
    phone: "",
    email: "",
    password: "",
  });

  const clearValues = () => {
    setUserInfo({
      name: "",
      position: "No position",
      phone: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((res) => ({ ...res, [name]: value }));
  };

  const handleTogglePosition = () => {
    setTogglePosition((prev) => !prev);
    setUserInfo((prev) => ({
      ...prev,
      position: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signup", userInfo);
      useToast(res.data.message, true);
      dispatch(loginSuccess(res.data));
    } catch (error) {
      useToast(error.message);
      dispatch(loginFailure());
    }
    clearValues();
  };
  return (
    <div className="d-flex justify-content-center align-items-center h-100 flex-column bg-light">
      <form
        style={{
          width: 420,
          border: "1px solid #ccc",
          background: "white",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
        }}
        className="p-4 rounded-4"
        onSubmit={handleSubmit}
      >
        <h4 className="text-center mb-4 fw-bold text-uppercase">Sign Up</h4>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={userInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            Choose Your postion
          </label>
          <select
            id="position"
            name={!togglePosition ? "position" : ""}
            className="form-select"
            onChange={handleChange}
            disabled={togglePosition}
          >
            <option value="Software engineer">Software engineer</option>
            <option value="HR">HR</option>
            <option value="Sales manager">Sales manager</option>
          </select>
          <div className="signup-position">
            <small className="text-danger fs-md">
              Couldn't find your position? Click the button and type your
              postion.
            </small>
            <button
              className={`btn ${togglePosition ? "btn-danger" : "btn-primary"}`}
              onClick={handleTogglePosition}
              type="button"
            >
              {togglePosition ? "Back to select" : "Type your postion"}
            </button>
          </div>
        </div>
        {togglePosition && (
          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Your postion
            </label>
            <input
              type="text"
              className="form-control"
              id="position"
              name="position"
              required
              value={userInfo.position}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Your phone number
          </label>
          <input
            type="phone"
            className="form-control"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary d-block"
          style={{ marginLeft: "auto" }}
        >
          Submit
        </button>
      </form>
      <div className="text-center mt-2">
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </div>
  );
};

export default SignUp;
