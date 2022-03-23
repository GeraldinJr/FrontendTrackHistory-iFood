import { toast } from "react-toastify";

function messageError(message) {
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: false,
    theme: "colored",
    draggable: true,
    progress: undefined,
  });
}

function messageSuccess(message) {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "colored",
  });
}

export default { messageError, messageSuccess };
