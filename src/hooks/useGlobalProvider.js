/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { useLocation, useHistory } from "react-router-dom";

function useGlobalProvider() {
  const history = useHistory();
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [header, setHeader] = useState(true);
  const [selectedOrder, setSelectedOrder, removeOrder] = useLocalStorage(
    "order",
    {}
  );
  const hasOrderTracking = useRef(false);
  const geoLocation = useRef();
  const [trackingStarted, setTrackingStarted, removeTrackingStarted] =
    useLocalStorage("trackingStarted", false);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const path = useLocation().pathname;
  const [nomeEntregador, setNomeEntregador, removeNomeEntregador] =
    useLocalStorage("nomeEntregador", "nomeEntregador");
  const location = useRef({
    latitude: 0,
    longitude: 0,
  });
  const lastLocation = useRef({
    latitude: 0,
    longitude: 0,
  });
  const orderAssigned = useRef(false);

  const array = useRef([]);
  // eslint-disable-next-line prefer-const
  let current = 0;
  let repeat;
  // eslint-disable-next-line operator-linebreak
  const [genericLocation, setGenericLocation, removeGenericLocation] =
    useLocalStorage("genericLocation", [
      {
        lat: 0,
        lng: 0,
      },
    ]);

  useEffect(() => {
    if (path === "/" || path === "/login" || path === "/cadastrar") {
      clearInterval(geoLocation.current);
      if (token) {
        history.push("/pedidos");
      }
      // eslint-disable-next-line no-dupe-else-if
    } else if (path === "/login" || path === "/cadastrar") {
      removeToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (path !== "/rastreamento") {
    clearInterval(geoLocation.current);
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
  function setPosition(position) {
    location.current = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  }
  return {
    token,
    setToken,
    removeToken,
    header,
    setHeader,
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
    lastLocation,
    removeNomeEntregador,
    array,
    current,
    repeat,
    genericLocation,
    setGenericLocation,
    orderAssigned,
    removeOrder,
    removeGenericLocation,
    hasOrderTracking,
    getLocation,
    trackingStarted,
    setTrackingStarted,
  };
}

export default useGlobalProvider;
