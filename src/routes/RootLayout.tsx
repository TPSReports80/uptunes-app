import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
type Props = {};

const RootLayout = (props: Props) => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
