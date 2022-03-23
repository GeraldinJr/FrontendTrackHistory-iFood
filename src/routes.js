import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import App from "./App";
import Orders from "./pages/Orders";
import { GlobalProvider } from "./context/GlobalContext";
import useGlobal from "./hooks/useGlobal";
import Header from "./components/Header";
import OrderAssingnment from "./pages/OrderAssignment";

function ProtectedRoute(props) {
  const { token } = useGlobal();

  return (
    <Route render={() => (token ? props.children : <Redirect to="/rastreio" />)} />
  );
}

export default function Routes(params) {
  return (
    <Router>
      <Switch>
        <GlobalProvider>
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/rastreio" component={OrderAssingnment} />
          <ProtectedRoute>
            <Header texto="lucas" />
            <Route path="/pedidos" exact component={Orders} />
          </ProtectedRoute>
        </GlobalProvider>
      </Switch>
    </Router>
  );
}
