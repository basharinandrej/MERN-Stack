import './App.css';
import routes from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            {routes(false)}
        </BrowserRouter>
    </div>
  );
}

export default App;
