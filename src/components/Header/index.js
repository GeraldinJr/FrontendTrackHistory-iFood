/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import "./style.css";
import { useHistory } from "react-router-dom";
import signOut from "../../assets/sign-out.svg";
import useGlobal from "../../hooks/useGlobal";

export default function Header(props) {
  const {
    removeToken,
    nomeEntregador,
    token,
    removeOrder,
    setNomeEntregador,
    setGenericLocation,
    geoLocation,
    trackingStarted,
  } = useGlobal();
  const history = useHistory();
  function handleSignOut() {
    removeToken();
    removeOrder();
    setNomeEntregador("nome ");
    clearInterval(geoLocation.current);
    if (!trackingStarted) {
      setGenericLocation([
        {
          lat: 0,
          lng: 0,
        },
      ]);
    }
    history.push("/login");
  }

  return (
    <header style={{ display: token ? "flex" : "none" }} className="app-header">
      <h3>Olá {nomeEntregador.split(" ", 1)}!</h3>
      <button onClick={handleSignOut}>
        <img src={signOut} alt="Sair" />
      </button>
    </header>
  );
}
