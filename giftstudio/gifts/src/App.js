import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import Product from "./Components/Product";
import Productlist from "./Components/Productlist";

function App() {
  const product = [
    {
      pid: 123,
      title: "gift1",
      description:
        "This card has supporting text below as a natural lead-in to additional content.",
      image: "/Images/img1.png",
      price: "70",
    },
    {
      pid: 444,
      title: "gift2",
      description:
        "2This card has supporting text below as a natural lead-in to additional content.",
      image: "/Images/img2.png",
      price: "34",
    },
    {
      pid: 66,
      title: "gift3",
      description:
        "3This card has supporting text below as a natural lead-in to additional content.",
      image: "/Images/img3.png",
      price: "45",
    },
  ];

  const list = [
    {
      id: 12,
      title: "gift3",
      price: "123",
      contactno: "123455655",
    },
    {
      id: 16,
      title: "gift5",
      price: "123",
      contactno: "0000000000",
    },
    {
      id: 15,
      title: "gift3",
      price: "66",
      contactno: "8888888888",
    },
    {
      id: 13,
      title: "gift2",
      price: "887",
      contactno: "44444444455",
    },
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home product={product} />} />
            <Route path="home" element={<Home product={product} />} />
            <Route path="home" element={<Home />} />
            <Route path="product" element={<Product product={product} />} />
            <Route path="productlist" element={<Productlist list={list} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
