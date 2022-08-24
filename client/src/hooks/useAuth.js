import { useSelector } from "react-redux";

const useAuth = () => {
  const { success } = useSelector((state) => state.user);
  return success;
};

export default useAuth;
