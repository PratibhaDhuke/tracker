import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bgcolor container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="product" className="nav-link">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="home" className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="productlist" className="nav-link">
                Productlist
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Header;
