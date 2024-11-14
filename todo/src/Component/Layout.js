import { Outlet } from "react-router-dom";
import Header from "./Header";

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
    </>
  );
}

export default Layout;
