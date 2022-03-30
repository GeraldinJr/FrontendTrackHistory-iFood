/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { useLocation } from "react-router-dom";

function useGlobalProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [header, setHeader] = useState(true);
  const [selectedOrder, setSelectedOrder, removeOrder] = useLocalStorage(
    "order",
    {}
  );
  const hasOrderTracking = useRef(false);
  const geoLocation = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const path = useLocation().pathname;
  // eslint-disable-next-line operator-linebreak
  const [nomeEntregador, setNomeEntregador, removeNomeEntregador] =
    useLocalStorage("nomeEntregador", "nomeEntregador");
  // const [centerMap, setCenterMap, removeCenterMap] = useLocalStorage(
  //   "centerMap",
  //   {}
  // );
  const location = useRef({
    latitude: 0,
    longitude: 0,
  });
  const lastLocation = useRef({
    latitude: 0,
    longitude: 0,
  });
  const orderAssigned = useRef(false);

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
    timeout: 1000,
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

  const neighborhoods = [
    {
      lat: -9.62747033607328,
      lng: -35.698957443237305,
    },
    {
      lat: -9.626622502743155,
      lng: -35.698231295432734,
    },
    {
      lat: -9.625887347809005,
      lng: -35.6975231922528,
    },
    {
      lat: -9.626220547725588,
      lng: -35.69711549648254,
    },
    {
      lat: -9.62709321261623,
      lng: -35.69775386222808,
    },
    {
      lat: -9.62807694124428,
      lng: -35.698231295432734,
    },
    {
      lat: -9.628957534601902,
      lng: -35.69864972003906,
    },
    {
      lat: -9.62980877727435,
      lng: -35.69915638847884,
    },
    {
      lat: -9.630586714633859,
      lng: -35.69962889027843,
    },
    {
      lat: -9.63112617349442,
      lng: -35.69996148419628,
    },
    {
      lat: -9.631739674680496,
      lng: -35.7002887136961,
    },
    {
      lat: -9.63237961869529,
      lng: -35.70064276528606,
    },
    {
      lat: -9.632495972022209,
      lng: -35.70000439954052,
    },
    {
      lat: -9.632400773848634,
      lng: -35.69895833802471,
    },
    {
      lat: -9.63237961869529,
      lng: -35.69774061513195,
    },
    {
      lat: -9.632485394448693,
      lng: -35.697295368435476,
    },
  ];
  console.log(neighborhoods.length);
  const array = useRef([]);
  // eslint-disable-next-line prefer-const
  let current = 0;
  let repeat;
  // const [genericLocation, setGenericLocation] = useState([]);
  // eslint-disable-next-line operator-linebreak
  const [genericLocation, setGenericLocation, removeGenericLocation] =
    useLocalStorage("genericLocation", [
      {
        lat: 0,
        lng: 0,
      },
    ]);
  const [centerMap, setCenterMap] = useState({ lat: 0, lng: 0 });

  // useEffect(() => {
  //   repeat = setInterval(() => {
  //     array.current = [...array.current, neighborhoods[current]];
  //     setGenericLocation(array.current);
  //     if (array.current.length === neighborhoods.length) {
  //       clearInterval(repeat);
  //     }
  //     current++;
  //   }, 2000);
  // }, []);
  // console.log(genericLocation);
  //
  //
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
    current,
    repeat,
    neighborhoods,
    genericLocation,
    setGenericLocation,
    orderAssigned,
    removeOrder,
    // setCenterMap,
    // centerMap,
    // removeCenterMap,
    centerMap,
    setCenterMap,
    removeGenericLocation,
    hasOrderTracking,
  };
}

export default useGlobalProvider;
