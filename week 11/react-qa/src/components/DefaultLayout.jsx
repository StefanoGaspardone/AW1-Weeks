import { Container } from "react-bootstrap";
import { Outlet } from "react-router";
import NavHeader from "./NavHeader";

function DefaultLayout() {
  
  return(
    <>
      <NavHeader />
      <Container fluid className="mt-3">
        <Outlet />
      </Container>
    </>
  );
}

export default DefaultLayout;