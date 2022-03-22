import { toast } from "react-toastify";

function messageError(message) {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  });
}

function messageSuccess(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  });
}

export default { messageError, messageSuccess };
