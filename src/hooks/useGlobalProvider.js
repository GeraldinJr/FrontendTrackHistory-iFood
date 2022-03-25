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
  const [nomeEntregador, setNomeEntregador] = useState("nome sobrenome");
  const location = useRef();

  if (path !== "/rastreamento") {
    clearInterval(geoLocation.current);
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0,
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function success(pos) {
    const crd = pos.coords;
    location.current = {
      latitude: crd.latitude,
      longitude: crd.longitude,
    };
    console.log(location.current);
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
    nomeEntregador,
    setNomeEntregador,
    location,
    options,
    error,
    success,
  };
}

export default useGlobalProvider;
