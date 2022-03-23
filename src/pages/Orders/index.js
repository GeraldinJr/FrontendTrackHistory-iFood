import { useEffect, useState } from "react";

import useRequest from "../../hooks/useRequest";

export default function Orders() {
  const { get } = useRequest();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await get("/", {}, true);
      console.log(result);
      setOrders(result);
      return result;
    }
    fetchData();
  }, []);

  return (
    <div className="orders">
      <h1>Orders</h1>
    </div>
  );
}
