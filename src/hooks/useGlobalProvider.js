import { useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { useLocation } from "react-router-dom";

function useGlobalProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [toastOn, setToastOn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const geoLocation = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const path = useLocation().pathname;
  console.log(path);
  if (path !== "/rastreamento") {
    clearInterval(geoLocation.current);
  }
  return {
    token,
    setToken,
    removeToken,
    toastOn,
    setToastOn,
    setSelectedOrder,
    selectedOrder,
    geoLocation,
    openModal,
    setOpenModal,
    modalText,
    setModalText,
  };
}

export default useGlobalProvider;
