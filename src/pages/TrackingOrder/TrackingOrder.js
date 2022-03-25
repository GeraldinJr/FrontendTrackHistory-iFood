/* eslint-disable indent */
import { useEffect, useRef } from "react";
import imgRastreamento from "../../assets/img-rastreamento.png";
import Button from "../../components/Button";
import useGlobal from "../../hooks/useGlobal";
import "./style.css";

const options = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 0,
};
function success(pos) {
  const crd = pos.coords;
  console.log("Sua posição atual é:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`Mais ou menos ${crd.accuracy} metros.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export default function TrackingOrder() {
  const { geoLocation, setOpenModal, setModalText } = useGlobal();
  const index = useRef(0);

  useEffect(() => {
    geoLocation.current = setInterval(() => {
      console.log(index.current);
      index.current++;
      navigator.geolocation.getCurrentPosition(success, error, options);
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
        <h2>Pedido #123</h2>
        <img src={imgRastreamento} alt="imagem rastreamento" />

        <h3>Cliente: #123</h3>
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
