/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable operator-linebreak */
import { useEffect, useState } from "react";
import "./style.css";
// import { useHistory } from "react-router-dom";
import Button from "../../components/Button";

import useRequest from "../../hooks/useRequest";
// import useGlobal from "../../hooks/useGlobal";

export default function Orders() {
  const { get } = useRequest();

  //   const history = useHistory();
  //   const { setSelectedOrder, selectedOrder } = useGlobal;

  const [orders, setOrders] = useState([]);
  const [current, setCurrent] = useState(1);
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    async function fetchData() {
      //   const result = await get( `/${current}?por_pagina=${5}`, {}, true);
      const result = await get("/", {}, true);
      setOrders(result.pedidos);
      setLastPage(result.lastPage);
      return result;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  async function handlePage(id) {
    console.log(`page ${id}`);
    //   const result = await get(`/pedido/${}`, {}, true);
    // const result = await get("/", {}, true);
    // setSelectedOrder(result.pedido);
    // console.log("order");
    // if (result.ok) {
    //   history.push("/pedido");
    // }
  }

  return (
    <div className="orders">
      <h1>Pedidos</h1>
      {orders[0] &&
        orders.map((order) => (
          <div
            onClick={() => handlePage(order.pedido)}
            className="order"
            key={order.lanche}
          >
            <h2>{order.lanche}</h2>
          </div>
        ))}
      <div
        className="div-btns-orders"
        style={{
          justifyContent: current === lastPage ? "flex-start" : "flex-end",
        }}
      >
        {current > 1 && (
          <Button
            onClickProp={(e) => setCurrent(current - 1)}
            clsName="btn-prev"
            text="Anterior"
          />
        )}
        {lastPage !== 1 && <p>{current}</p>}
        {current < lastPage && (
          <Button
            onClickProp={(e) => setCurrent(current + 1)}
            clsName="next"
            text="Proxima"
          />
        )}
      </div>
    </div>
  );
}
