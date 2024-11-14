import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
function Layout() {
  return (
    <>
      <div className="">
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
      </div>
    </>
  );
}

export default Layout;
