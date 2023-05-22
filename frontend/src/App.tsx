import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import BoardPage from "./pages/BoardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/BoardPage" element={<BoardPage />} />
    </Routes>
  );
}

export default App;
