import { useHistory } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";
import Button from "../Button";
import "./style.css";

export default function Modal() {
  // eslint-disable-next-line object-curly-newline
  const {
    openModal,
    modalText,
    setOpenModal,
    geoLocation,
    selectedOrder,
    location,
    removeOrder,
    hasOrderTracking,
  } = useGlobal();

  const { patch } = useRequest();
  const history = useHistory();

  function handleClick(params) {
    if (params === "confirm" && modalText === "CONFIRMAR") {
      setOpenModal(false);
      clearInterval(geoLocation.current);
      const result = patch(
        `/pedidos/${selectedOrder.id}/concluir`,
        location.current,
        true
      );
      if (result) {
        setTimeout(() => {
          history.push("/pedidos");
          removeOrder();
          hasOrderTracking.current = false;
        }, 1000);
      }
    } else if (params === "confirm" && modalText === "CANCELAR") {
      setOpenModal(false);
      clearInterval(geoLocation.current);
      const result = patch(
        `/pedidos/${selectedOrder.id}/cancelar`,
        location.current,
        true
      );
      if (result) {
        setTimeout(() => {
          history.push("/pedidos");
          removeOrder();
          hasOrderTracking.current = false;
        }, 1000);
      }
    } else {
      setOpenModal(false);
    }
  }

  return (
    <div
      style={{ display: openModal ? "initial" : "none" }}
      className="container-modal"
    >
      <div className="modal">
        <h2>Deseja realmente {modalText} o pedido</h2>
        <Button
          onClickProp={() => handleClick("confirm")}
          clsName="btn-modal-confirm"
          text="Sim"
        />
        <Button
          onClickProp={() => handleClick("cancel")}
          clsName="btn-modal-cancel"
          text="Não"
        />
      </div>
    </div>
  );
}
