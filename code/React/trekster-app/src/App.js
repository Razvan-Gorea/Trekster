import { Home } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <div className="bg-blue-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>404: Not Found </h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
