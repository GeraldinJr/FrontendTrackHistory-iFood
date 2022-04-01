/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./styles.css";

import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import imgEntregadores from "../../assets/img-entregadores.png";
import useGlobal from "../../hooks/useGlobal";
import toast from "../../helpers/toast";

export default function OrderAssignment() {
  const history = useHistory();
  const {
    selectedOrder,
    setGenericLocation,
    location,
    genericLocation,
    setTrackingStarted,
  } = useGlobal();
  function handleClick() {
    setTrackingStarted(true);
    history.push("/rastreamento");
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition(setPosition);
  }
  function setPosition(position) {
    location.current = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    setGenericLocation([
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    ]);
  }
  if (genericLocation[0].lat === 0 && genericLocation[0].lng === 0) {
    getLocation();
  }
  if (!selectedOrder.id) {
    history.push("/pedidos");
    toast.messageError("Selecione um pedido para rastrear");
    return <div />;
  }

  return (
    <main>
      <div className="assignment">
        <h2>Pedido {selectedOrder.id}</h2>
        <img src={imgEntregadores} alt="imagem entregadores" />

        <h3>Cliente: {selectedOrder.cliente.nome}</h3>
        <Button
          onClickProp={handleClick}
          clsName="div-btn-assignment"
          text="Iniciar Tracking"
        />
      </div>
    </main>
  );
}
