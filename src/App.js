import { useState } from "react";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import About from "./components/About";
import Alert from "./components/Alert";
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  // 🌙 Dark/Light Mode
  const [mode, setMode] = useState("light"); // 'light' | 'dark'
  // 🌿 Green Mode (separate flag)
  const [modeGreen, setModeGreen] = useState("light"); // 'green' | 'light'
  // 🚨 Alert state
  const [alert, setAlert] = useState(null);

  // Show alert for 1.5 sec
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  // Toggle dark mode
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      setModeGreen("light"); // disable green when dark
      document.body.style.backgroundColor = "#042743";
      showAlert("Dark mode has been enabled", "success");
      document.title = "Text_tools - Dark Mode";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
      document.title = "Text_tools - Light Mode";
    }
  };

  // Toggle green mode
  const toggleGreenMode = () => {
    if (modeGreen === "light") {
      setModeGreen("green");
      setMode("light"); // disable dark when green
      document.body.style.backgroundColor = "#9FE2BF";
      showAlert("Green mode has been enabled", "success");
      document.title = "Text_tools - Green Mode";
    } else {
      setModeGreen("light");
      document.body.style.backgroundColor = "white";
      showAlert("Light mode has been enabled", "success");
      document.title = "Text_tools - Light Mode";
    }
  };

  return (
    <>
      <Router>
        {/* Navbar always visible */}
        <Navbar
          title="Text_tools"
          mode={mode}
          modeGreen={modeGreen}
          toggleMode={toggleMode}
          toggleGreenMode={toggleGreenMode}
        />
        {/* Alert below Navbar */}
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            {/* About Page */}
            <Route
              path="/about"
              element={<About mode={mode} modeGreen={modeGreen} />}
            />
            {/* Home Page with TextForm */}
            <Route
              path="/"
              element={
                <TextForm
                  showAlert={showAlert}
                  heading="Try Texttools - Word Counter, Character Counter, Remove Extra Spaces"
                  mode={mode}
                  modeGreen={modeGreen}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
