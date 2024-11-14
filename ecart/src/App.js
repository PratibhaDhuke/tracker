import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import Header from "./Components/Header";
import Layout from "./Components/Layout";
import List from "./Components/List";
import Form from "./Components/Form";
import Contact from "./Components/Contact";
import Contacts from "./Components/Contacts";
import Productpage from "./Components/Productpage";
import Addproduct from "./Components/Addproduct";

function App() {
  const data = [
    {
      id: 3,
      name: "Pink flower",
      price: 25,
      phone: 9665467219,
    },
    {
      id: 2,
      name: "Green Flower",
      price: 28,
      phone: 88888888888,
    },
    {
      id: 3,
      name: "Red Flower",
      price: 30,
      phone: 99988888888,
    },
    {
      id: "4",
      name: "Pink white Flower",
      price: 30,
      phone: 99988888888,
    },
  ];

  const product = [
    {
      pid: "01",
      title: "Pink flower",
      desc: "This card has supporting text below as a natural lead-in to additional content.",
      Image: "../Images/img1.png",
      price: "90",
    },
    {
      pid: "02",
      title: "Red flower",
      desc: "This card has supporting text below as a natural lead-in to additional content.",
      Image: "../Images/img2.png",
      price: "70",
    },
    {
      pid: "02",
      title: "white Pink flower",
      desc: "This card has supporting text below as a natural lead-in to additional content.",
      Image: "../Images/img3.png",
      price: "37",
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home product={product} />} />
          <Route path="home" element={<Home product={product} />} />
          <Route path="products" element={<Products product={product} />} />
          <Route path="list" element={<List user={data} />} />
          <Route path="form" element={<Form />} />
          <Route path="contact" element={<Contact />} />
          <Route path="productpage" element={<Productpage />} />
          <Route path="addproduct" element={<Addproduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
