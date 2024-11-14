import "./css/style.css";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function Products({ product }) {
  // pid;

  // const [id, setId] = useState(0);

  const navigate = useNavigate();

  const loc = useLocation();
  const handlechange = () => {
    navigate("/home");
  };
  // useEffect(() => {
  //   console.log(loc.state.id);
  //   setId(() => loc.state.id);
  // });

  return (
    <>
      <div className="card-group crdgroup">
        <h1>Product List</h1>
        <h1>Shoping item - </h1>
        <div className="card">
          <img src="/Images/img1.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card">
          <img src="/Images/img2.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div className="card">
          <img src="/Images/img3.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <input type="button" value="back to list" onClick={handlechange} />
      </div>
    </>
  );
}

export default Products;
