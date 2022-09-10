import { Routes, Route } from "react-router-dom";
import { Home, SignIn, SignUp, Users } from "./pages";
import MainLayout from "./layouts/MainLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="vh-100 overflow-hidden">
      <Routes>
        <Route element={<EmptyLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
