import { Outlet } from "react-router-dom";
import Navbar from "../../components/student/Navbar";
import Sidebar from "../../components/educator/Sidebar";
import Footer from "../../components/educator/Footer";

const Educator = () => {
  return (
    <div className="default min-h-screen bg-white">
      <Navbar />
      <div>
        <div className="flex">
          <Sidebar />
        <div className="flex-1">{<Outlet />}</div>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Educator;
