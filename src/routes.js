import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
// import App from "./App";
import Orders from "./pages/Orders";
import { GlobalProvider } from "./context/GlobalContext";
import useGlobal from "./hooks/useGlobal";
import Header from "./components/Header";
import OrderAssingnment from "./pages/OrderAssignment";
import TrackingOrder from "./pages/TrackingOrder/TrackingOrder";
import Modal from "./components/Modal/Modal";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

function ProtectedRoute(props) {
  const { token } = useGlobal();
  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

export default function Routes(params) {
  return (
    <div>
      <Router>
        <Switch>
          <GlobalProvider>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/cadastrar" component={SignUp} />
            <Route exact path="/" component={Home} />
            <ProtectedRoute>
              <Header texto="lucas" />
              <Route path="/pedidos" exact component={Orders} />
              <Route path="/pedido" exact component={OrderAssingnment} />
              <Route path="/rastreamento" exact component={TrackingOrder} />
              <div className="container-top" />
            </ProtectedRoute>
            <Modal />
          </GlobalProvider>
        </Switch>
      </Router>
    </div>
  );
}
