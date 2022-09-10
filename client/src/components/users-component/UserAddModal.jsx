import React, { useState } from "react";

const UserAddModal = () => {
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
    console.log(userInfo);

    // dispatch(loginStart());
    // try {
    //   const res = await axios.post("/auth/signup", userInfo);
    //   useToast(res.data.message, true);
    //   dispatch(loginSuccess(res.data));
    // } catch (error) {
    //   useToast(error.message);
    //   dispatch(loginFailure());
    // }
    clearValues();
  };
  return (
    <div
      className="modal fade"
      id="userAddModal"
      tabIndex="-1"
      aria-labelledby="userAddLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="userAddLabel">
              ADD NEW USER
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  User name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">
                  Choose user postion
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
                    Couldn't find the right position? Click the button and type
                    user postion.
                  </small>
                  <button
                    className={`btn ${
                      togglePosition ? "btn-danger" : "btn-primary"
                    }`}
                    onClick={handleTogglePosition}
                    type="button"
                  >
                    {togglePosition ? "Back to select" : "Type user postion"}
                  </button>
                </div>
              </div>
              {togglePosition && (
                <div className="mb-3">
                  <label htmlFor="position" className="form-label">
                    User postion
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="position"
                    name="position"
                    value={userInfo.position}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  User phone number
                </label>
                <input
                  type="phone"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  User Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  aria-describedby="emailHelp"
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  User Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAddModal;
