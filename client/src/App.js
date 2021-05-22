import './App.css';
import routes from "./routes";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/authContext";
import AuthHook from "./hooks/auth.hook";
import NavBar from "./components/NavBar/NavBar";

function App() {
    const {token, userId, login, logout, email} = AuthHook()
    const isAuthenticated = !!token
    return (
      <AuthContext.Provider value={{
          token, userId, login, logout, email
      }}>
          <div className="App">
              <BrowserRouter>
                  {isAuthenticated && <NavBar/>}
                  {routes(isAuthenticated)}
              </BrowserRouter>
          </div>
      </AuthContext.Provider>
  );
}

export default App;
