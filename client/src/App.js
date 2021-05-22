import './App.css';
import routes from "./routes";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/authContext";
import AuthHook from "./hooks/auth.hook";

function App() {
    const {token, userId, login, logout} = AuthHook()
    const isAuthentication = !!token
  return (
      <AuthContext.Provider value={{
          token, userId, login, logout
      }}>
          <div className="App">
              <BrowserRouter>
                  {routes(isAuthentication)}
              </BrowserRouter>
          </div>
      </AuthContext.Provider>
  );
}

export default App;
