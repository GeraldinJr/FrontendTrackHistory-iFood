/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable operator-linebreak */
import { useEffect, useState, useRef } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";

import useRequest from "../../hooks/useRequest";
import useGlobal from "../../hooks/useGlobal";

export default function Orders() {
  const { get } = useRequest();

  const history = useHistory();
  const { setSelectedOrder, hasOrderTracking, setTrackingStarted } =
    useGlobal();
  const [orders, setOrders] = useState([]);
  const currentRef = useRef(1);
  const [current, setCurrent] = useState(1);
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await get(
        "/pedidos/em-aberto?numeroPagina=1&tamanhoPagina=10",
        {},
        true
      );
      setOrders(result.pedidos);
      setLastPage(result.totalPaginas);
      return result;
    }
    async function getOrderInfo() {
      const result = await get("/pessoa-entregadora/possui-pedido", {}, true);
      if (!result.possuiPedido) {
        setSelectedOrder({});
        fetchData();
      } else {
        setSelectedOrder(result.pedido);
        setTrackingStarted(true);
        hasOrderTracking.current = true;
        history.push("/rastreamento");
      }
    }
    getOrderInfo();
  }, []);

  async function handlePage(param) {
    setSelectedOrder(param);
    history.push("/pedido");
  }

  async function handleChangePage(btn, crrnt) {
    if (btn === "next") {
      currentRef.current += 1;
      setCurrent(currentRef.current);
      const result = await get(
        `/pedidos/em-aberto?numeroPagina=${crrnt}&tamanhoPagina=10`,
        {},
        true
      );
      setOrders(result.pedidos);
    } else if (btn === "previous") {
      currentRef.current -= 1;
      setCurrent(currentRef.current);
      const result = await get(
        `/pedidos/em-aberto?numeroPagina=${crrnt}&tamanhoPagina=10`,
        {},
        true
      );
      setOrders(result.pedidos);
    }
  }
  return (
    <div className="orders">
      <h1>Pedidos</h1>
      <div className="orders-table">
        {/* <PaginationComponent onClickProp={handlePage} data={orders} /> */}
        {orders[0] &&
          orders.map((order) => (
            <div
              onClick={(e) => handlePage(order)}
              className="order"
              key={order.id}
            >
              <h2>
                {order.cliente.nome}#{order.id}
              </h2>
            </div>
          ))}
      </div>
      <div
        className="div-btns-orders"
        style={{
          justifyContent: current === lastPage ? "flex-start" : "flex-end",
        }}
      >
        {current > 1 && (
          <Button
            onClickProp={() => handleChangePage("previous", current - 1)}
            clsName="btn-prev"
            text="Anterior"
          />
        )}
        {lastPage !== 1 && <p>{current}</p>}
        {current < lastPage && (
          <Button
            onClickProp={() => handleChangePage("next", current + 1)}
            clsName="next"
            text="Próxima"
          />
        )}
      </div>
    </div>
  );
}
