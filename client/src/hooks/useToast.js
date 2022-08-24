import { toast } from "react-toastify";

const toastOptions = {
  position: "top-right",
  autoClose: 5000,
  draggable: true,
  theme: "light",
};

const useToast = (message, success = false) => {
  if (success) {
    return toast.success(message, toastOptions);
  }
  return toast.error(message, toastOptions);
};

export default useToast;
