import { Outlet } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <Header />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Outlet />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
