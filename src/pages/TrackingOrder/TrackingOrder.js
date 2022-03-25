/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable indent */
import { useEffect, useRef } from "react";
import imgRastreamento from "../../assets/img-rastreamento.png";
import Button from "../../components/Button";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";
import "./style.css";

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
  } = useGlobal();
  const { post } = useRequest();
  const index = useRef(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
    post(
      `/pedidos/${selectedOrder.id}/atribuir-pedido`,
      location.current,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    geoLocation.current = setInterval(() => {
      console.log(index.current);
      index.current++;
      navigator.geolocation.getCurrentPosition(success, error, options);
      post(
        `/pedidos/${selectedOrder.id}/geolocalizacao`,
        location.current,
        true
      );
    }, 3000);
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
