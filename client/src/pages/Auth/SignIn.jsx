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

const SignIn = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const clearValues = () => {
    setUserInfo({
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((res) => ({ ...res, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/auth/signin", userInfo);
      dispatch(loginSuccess(res.data));
      useToast(`Welcome back ${res.data.user.name}!`, true);
    } catch (error) {
      useToast(error.response.data.message);
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
        <h4 className="text-center text-uppercase fw-bold mb-4">Sign In</h4>
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
            required
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={userInfo.password}
            onChange={handleChange}
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
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default SignIn;
