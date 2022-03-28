/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { useLocation } from "react-router-dom";

function useGlobalProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [header, setHeader] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState({});
  const geoLocation = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const path = useLocation().pathname;
  // eslint-disable-next-line operator-linebreak
  const [nomeEntregador, setNomeEntregador, removeNomeEntregador] =
    useLocalStorage("nomeEntregador", "");
  const location = useRef();
  const lastLocation = useRef({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (path === "/" || path === "/login" || path === "/cadastrar") {
      clearInterval(geoLocation.current);
      removeToken();
    }
    console.log(selectedOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

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
  }

  useEffect(() => {
    setNomeEntregador("nomeEntregador");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //

  const neighborhoods = [
    {
      lat: -9.515814585183048,
      lng: -35.792598724365234,
    },
    {
      lat: -9.515869424825283,
      lng: -35.795103662921136,
    },
    {
      lat: -9.514726652703258,
      lng: -35.79849397511596,
    },
    {
      lat: -9.513329926032835,
      lng: -35.8025709328186,
    },
    {
      lat: -9.513499226539231,
      lng: -35.80523168416137,
    },
    {
      lat: -9.51436689031862,
      lng: -35.80528532834167,
    },
    {
      lat: -9.516948706099027,
      lng: -35.80391203732604,
    },
    {
      lat: -9.518435357566775,
      lng: -35.80319320531005,
    },
    {
      lat: -9.520735200820653,
      lng: -35.80207124521162,
    },
    {
      lat: -9.523657390639746,
      lng: -35.80069828029023,
    },
    {
      lat: -9.525493183041897,
      lng: -35.799786329225164,
    },
  ];

  const array = useRef([]);
  let current = 0;
  let repeat;
  const [genericLocation, setGenericLocation] = useState([
    { lat: -9.515814585183048, lng: -35.792598724365234 },
  ]);
  useEffect(() => {
    repeat = setInterval(() => {
      array.current = [...array.current, neighborhoods[current]];
      setGenericLocation(array.current);
      if (array.current.length === neighborhoods.length) {
        clearInterval(repeat);
      }
      current++;
    }, 2000);
  }, []);
  console.log(genericLocation);
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
    options,
    error,
    success,
    lastLocation,
    removeNomeEntregador,
    array,
    genericLocation,
  };
}

export default useGlobalProvider;
