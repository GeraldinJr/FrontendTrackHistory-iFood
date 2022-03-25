/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./styles.css";

import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import imgEntregadores from "../../assets/img-entregadores.png";

export default function OrderAssignment() {
  const history = useHistory();
  function handleClick() {
    history.push("/rastreamento");
  }
  return (
    <main>
      <div className="assignment">
        <h2>Pedido #123</h2>
        <img src={imgEntregadores} alt="imagem entregadores" />

        <h3>Cliente: #123</h3>
        <Button
          onClickProp={handleClick}
          clsName="div-btn-assignment"
          text="Iniciar Tracking"
        />
      </div>
    </main>
  );
}
