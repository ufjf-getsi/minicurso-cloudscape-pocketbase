import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import NotesBoard from "./pages/NotesBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/NotesBoard" element={<NotesBoard />} />
    </Routes>
  );
}

export default App;
