/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { useHistory } from "react-router-dom";
import { useEffect, useRef } from "react";
import imgRastreamento from "../../assets/img-rastreamento.png";
import Button from "../../components/Button";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";
import "./style.css";
import toast from "../../helpers/toast";

export default function TrackingOrder() {
  const {
    geoLocation,
    setOpenModal,
    setModalText,
    selectedOrder,
    location,
    options,
    error,
    success,
    lastLocation,
  } = useGlobal();
  const { post } = useRequest();
  const index = useRef(0);
  const history = useHistory();
  const assigned = useRef(true);

  useEffect(() => {
    async function getLocation() {
      navigator.geolocation.getCurrentPosition(success, error, options);
      const tryAssigning = await post(
        `/pedidos/${selectedOrder.id}/atribuir-pedido`,
        location.current,
        true
      );
      if (tryAssigning) {
        assigned.current = true;
        console.log("Pedido atribuído com sucesso!");
      }
    }
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (assigned.current) {
      geoLocation.current = setInterval(() => {
        console.log(index.current);
        index.current++;
        navigator.geolocation.getCurrentPosition(success, error, options);
        //
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
        }
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div className="div-tracking">
      <div className="">
        <h2>Pedido {selectedOrder.id}</h2>
        <img src={imgRastreamento} alt="imagem rastreamento" />
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
