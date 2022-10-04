import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Api from "./API/Api";


function App() {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='Detail' element={<Detail />} />
      </Routes>
      <Api/>
    </div>
  );
}

export default App;
