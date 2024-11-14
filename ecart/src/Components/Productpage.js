import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Productpage() {
  const [id, setId] = useState(0);
  const [title, settitle] = useState(0);
  const [desc, setdesc] = useState(0);
  const [Image, setImage] = useState(0);
  const [price, setprice] = useState(0);

  const loc = useLocation();

  useEffect(() => {
    console.log(loc.state.id);
    setId(() => loc.state.id);
    settitle(() => loc.state.title);
    setdesc(() => loc.state.desc);
    setImage(() => loc.state.Image);
    setprice(() => loc.state.price);
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <h1>Shoping item - {id}</h1>
            <img src={Image} alt="" className="w-100"></img>
          </div>
          <div className="col-9">
            <h1>{title}</h1>
            <h4>Price: {price}rs</h4>
            <h5>{desc}</h5>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Productpage;
