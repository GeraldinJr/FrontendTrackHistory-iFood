/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/Button";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";
import "./style.css";
import toast from "../../helpers/toast";
import Maps from "../../components/Maps/index.tsx";

export default function TrackingOrder() {
  const {
    geoLocation,
    setOpenModal,
    setModalText,
    selectedOrder,
    location,
    lastLocation,
    orderAssigned,
    setGenericLocation,
    hasOrderTracking,
    genericLocation,
    setSelectedOrder,
  } = useGlobal();
  const { post, postPedido, get } = useRequest();
  const history = useHistory();

  let arrayLct = [];

  useEffect(() => {
    async function getOrderInfo() {
      const result = await get("/pessoa-entregadora/possui-pedido", {}, true);
      if (result.possuiPedido) {
        setSelectedOrder(result.pedido);
        hasOrderTracking.current = true;
      }
    }
    getOrderInfo();
  }, []);

  function getLocationMaps() {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
  function setPosition(position) {
    location.current = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  }
  getLocationMaps();

  useEffect(() => {
    getLocationMaps();
    setTimeout(() => {
      async function getLocation() {
        const tryAssigning = await postPedido(
          `/pedidos/${selectedOrder.id}/atribuir-pedido`,
          location.current,
          true
        );
        if (tryAssigning) {
          lastLocation.current = location.current;
          orderAssigned.current = true;
        }
        arrayLct.push({
          lat: lastLocation.current.latitude,
          lng: lastLocation.current.longitude,
        });
        setGenericLocation(arrayLct);
      }
      if (!hasOrderTracking.current) {
        getLocation();
      } else {
        arrayLct = genericLocation;
        setGenericLocation(arrayLct);
        orderAssigned.current = true;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getLocationMaps();
      if (
        lastLocation.current.latitude !== location.current.latitude &&
        lastLocation.current.longitude !== location.current.longitude
      ) {
        post(
          `/pedidos/${selectedOrder.id}/geolocalizacao`,
          lastLocation.current,
          true
        );
        lastLocation.current = location.current;
        arrayLct.push({
          lat: lastLocation.current.latitude,
          lng: lastLocation.current.longitude,
        });
        setGenericLocation(arrayLct);
      }
    }, 30000);
    geoLocation.current = interval;
  }, []);

  function handleClick(params) {
    if (params === "confirm") {
      setOpenModal(true);
      setModalText("CONFIRMAR");
    } else {
      setOpenModal(true);
      setModalText("CANCELAR");
    }
  }
  if (!selectedOrder.id) {
    history.push("/pedidos");
    toast.messageError("Selecione um pedido para rastrear");
    return <div />;
  }

  console.log(geoLocation.current);
  setInterval(() => {
    console.log(geoLocation.current);
  }, 1000);
  return (
    <div className="div-tracking">
      <div className="">
        <h2>Pedido {selectedOrder.id}</h2>
        <Maps />
        <h3>Cliente: {selectedOrder.cliente.nome}</h3>
      </div>
      <div className="tracking-btns">
        <Button
          onClickProp={() => {
            handleClick("confirm");
          }}
          clsName="btn-complete"
          text="Concluir"
        />
        <Button
          onClickProp={() => {
            handleClick("cancel");
          }}
          clsName="btn-cancel"
          text="Cancelar"
        />
      </div>
    </div>
  );
}
