import './App.css';
import routes from "./routes";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <h1>text</h1>
        <BrowserRouter>
            {routes(false)}
        </BrowserRouter>
    </div>
  );
}

export default App;
