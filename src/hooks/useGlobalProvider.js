import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

function useGlobalProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [toastOn, setToastOn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const geoLocation = useRef();

  useEffect(() => {
    console.log(token);
  }, [token]);

  return {
    token,
    setToken,
    removeToken,
    toastOn,
    setToastOn,
    setSelectedOrder,
    selectedOrder,
    geoLocation,
  };
}

export default useGlobalProvider;
