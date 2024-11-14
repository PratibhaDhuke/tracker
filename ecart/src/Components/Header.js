import { Link } from "react-router-dom";
import "./css/style.css";

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-lightnpm bgcolor navpad">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Link className="nav-link" to="home">
                Home
              </Link>
              <li className="nav-item">
                <Link className="nav-link" to="products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="list">
                  List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="form">
                  Form
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contacts">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
