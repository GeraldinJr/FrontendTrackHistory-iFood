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
  // eslint-disable-next-line operator-linebreak
  const { selectedOrder, options, error, success } = useGlobal();
  function handleClick() {
    history.push("/rastreamento");
  }

  navigator.geolocation.getCurrentPosition(success, error, options);

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
