/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable operator-linebreak */
import { useEffect, useState } from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";

import useRequest from "../../hooks/useRequest";
import useGlobal from "../../hooks/useGlobal";

export default function Orders() {
  const { get } = useRequest();

  const history = useHistory();
  const { setSelectedOrder } = useGlobal();
  useEffect(() => {
    setSelectedOrder({});
  }, []);

  const [orders, setOrders] = useState([]);
  const [current, setCurrent] = useState(1);
  const [lastPage, setLastPage] = useState();

  useEffect(() => {
    async function fetchData() {
      const result = await get(
        "/pedidos/em-aberto?numeroPagina=1&tamanhoPagina=10",
        {},
        true
      );
      // const result = await get("/pedidos", {}, true);
      console.log(result);
      // console.log(result[0].statusPedido === "EM_ABERTO");
      // setOrders(result.filter((e) => e.statusPedido === "EM_ABERTO"));
      setOrders(result.pedidos);
      setLastPage(result.totalPaginas);
      return result;
    }
    fetchData();
  }, [current]);

  async function handlePage(param) {
    setSelectedOrder(param);
    history.push("/pedido");
  }
  console.log(orders);

  async function handleChangePage(btn, crrnt) {
    if (btn === "next") {
      // if (current < lastPage) {
      setCurrent(crrnt + 1);
      // }
      const result = await get(
        `/pedidos?numeroPagina=${crrnt}&tamanhoPagina=10`,
        {},
        true
      );
      console.log(result);
      setOrders(result.pedidos);
    } else if (btn === "previous") {
      // if (current > 1) {
      //   setCurrent(current - 1);
      // }
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
            onClickProp={(e) => setCurrent(current - 1)}
            clsName="btn-prev"
            text="Anterior"
          />
        )}
        {lastPage !== 1 && <p>{current}</p>}
        {current < lastPage && (
          <Button
            onClickProp={() => handleChangePage("next", current + 1)}
            clsName="next"
            text="Proxima"
          />
        )}
      </div>
    </div>
  );
}

/*
 *
 *
 *
 */

// function RenderData(data, onClickProp) {
//   return (
//     // eslint-disable-next-line react/jsx-no-useless-fragment
//     <>
//       {data[0] &&
//         data.map((order) => (
//           <div
//             onClick={() => onClickProp(order)}
//             className="order"
//             key={order.id}
//           >
//             <h2>
//               {order.cliente.nome}#{order.id}
//             </h2>
//           </div>
//         ))}
//     </>
//   );
// }

/*
 *
 *
 *
 */

// function PaginationComponent(props) {
//   const [currentPage, setcurrentPage] = useState(1);
//   const [itemsPerPage, setitemsPerPage] = useState(9);
//   const [pageNumberLimit, setpageNumberLimit] = useState(1);
//   const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(1);
//   const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

//   const { data: allClients, onClickProp } = props;

//   const handleClick = (event) => {
//     setcurrentPage(Number(event.target.id));
//   };

//   useEffect(() => {
//     setcurrentPage(1);
//   }, [allClients]);

//   const pages = [];
//   if (!allClients) {
//     return;
//   }
//   for (let i = 1; i <= Math.ceil(allClients.length / itemsPerPage); i++) {
//     pages.push(i);
//   }

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const clientsPerPage = allClients.slice(indexOfFirstItem, indexOfLastItem);

//   const renderPageNumbers = pages.map((number) => {
//     if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
//       return (
//         // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
//         <p
//           key={number}
//           id={number}
//           onClick={handleClick}
//           className={currentPage === number ? "active number" : "number"}
//         >
//           {number}
//         </p>
//       );
//     }
//     return null;
//   });

//   const handleNextbtn = () => {
//     setcurrentPage(currentPage + 1);

//     if (currentPage + 1 > maxPageNumberLimit) {
//       setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
//     }
//   };

//   const handlePrevbtn = () => {
//     setcurrentPage(currentPage - 1);

//     if ((currentPage - 1) % pageNumberLimit === 0) {
//       setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
//     }
//   };

//   let pageIncrementBtn = null;
//   if (pages.length > maxPageNumberLimit) {
//     pageIncrementBtn = <span onClick={handleNextbtn}> &hellip; </span>;
//   }

//   let pageDecrementBtn = null;
//   if (minPageNumberLimit >= 1) {
//     pageDecrementBtn = <span onClick={handlePrevbtn}> &hellip; </span>;
//   }

//   return (
//     <>
//       {RenderData(clientsPerPage, onClickProp)}
//       <div className="pageNumbers">
//         <span className="btn-prev-prox">
//           <button
//             onClick={handlePrevbtn}
//             className={currentPage === pages[0] ? "disable" : ""}
//             disabled={currentPage === pages[0]}
//           >
//             Anterior
//           </button>
//         </span>
//         {/* {pageDecrementBtn} */}
//         {renderPageNumbers}
//         {/* {pageIncrementBtn} */}
//         <span className="btn-prev-prox">
//           <button
//             onClick={handleNextbtn}
//             disabled={currentPage === pages[pages.length - 1]}
//             className={currentPage === pages[pages.length - 1] ? "disable" : ""}
//           >
//             Próximo
//           </button>
//         </span>
//       </div>
//     </>
//   );
// }
