import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Home";
import Layout from "./Component/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./Component/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list" element={<List />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
