import useGlobal from "./useGlobal";
import toast from "../helpers/toast";

export default function useRequest() {
  const { token } = useGlobal();

  //   async function get() {}

  async function post(route, body, withToken) {
    const config = withToken ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BE_URL}${route}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...config,
          },
          body: JSON.stringify(body),
        }
      );
      const dataObj = await response.json();
      if (!response.ok) {
        throw new Error(dataObj.message);
      }
      return dataObj;
    } catch (error) {
      console.log(error);
      toast.messageError(error.message);
    }
  }

  //   async function put() {}

  //   async function del() {}

  return {
    // get,
    post,
    // put,
    // del,
  };
}
