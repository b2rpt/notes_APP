import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LogInForm from "./components/loginPage";
import HomePage from "./components/homepageOut";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <BrowserRouter>
      
          <header className="App-header">
            <Route path="/mynotes" exact component={HomePage} />
            <Route path="/" exact component={LogInForm} />
          </header>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
