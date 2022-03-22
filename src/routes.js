import { BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import SignIn from "./pages/SignIn";
import App from "./App";
import { GlobalProvider } from "./context/GlobalContext";
import useGlobal from "./hooks/useGlobal";

function ProtectedRoute(props) {
    
    const { token } = useGlobal();

    return (
        <Route
        render={()=> (token ? props.children : <Redirect to="/login" />)}
        />
        );
    }

    
    export default  function Routes(params) {
        
        return(
            <Router>
                <Switch>
                    <GlobalProvider>
                    <Route exact path="/login" component={SignIn} />
                    <ProtectedRoute>
                        <Route path="/home" exact component={App} />
                    </ProtectedRoute>
                    </GlobalProvider>
                </Switch>
            </Router>
        );
    }
    