import "./css/style.css";
import img from "../Images/img1.png";
import img1 from "../Images/img2.png";
import img2 from "../Images/img3.png";
import { useNavigate, useNavigation } from "react-router-dom";

function Home({ product }) {
  const nav = useNavigate();

  const showdetails = (pid, title, desc, Image, price) => {
    nav("/productpage", {
      state: { id: pid, title: title, desc: desc, Image: Image, price: price },
    });
  };

  const addproduct = () => {
    nav("/addproduct");
  };

  // productpage;
  if (!product) {
    return <p>Product not found</p>;
  } else {
    return (
      <>
        <input
          type="button"
          className="btn"
          onClick={(e) => addproduct()}
          value="Add"
        />
        <div className="card-group crdgroup">
          {product.map((data, id) => {
            return (
              <div
                className="card"
                onClick={() =>
                  showdetails(
                    data.pid,
                    data.title,
                    data.desc,
                    data.Image,
                    data.price
                  )
                }
              >
                <img src={data.Image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text">{data.desc}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">{data.price}</small>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Home;
