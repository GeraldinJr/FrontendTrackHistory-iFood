import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

function useGlobalProvider() {
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [currentContact, setCurrentContact] = useState(false);
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [toastOn, setToastOn] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    if (!openAddEditModal) {
      setCurrentContact(false);
    }
  }, [openAddEditModal]);

  useEffect(() => {
    console.log(token);
  }, [token]);

  return {
    openAddEditModal,
    setOpenAddEditModal,
    currentContact,
    setCurrentContact,
    token,
    setToken,
    removeToken,
    toastOn,
    setToastOn,
    setSelectedOrder,
    selectedOrder
  };
}

export default useGlobalProvider;
