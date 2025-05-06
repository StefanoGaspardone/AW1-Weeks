import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from "react-router";
import { useAppContext } from '../contexts/AppContext';

function NavHeader() {
  const {theme, toggleTheme} = useAppContext();

  return(
    <Navbar bg='primary' data-bs-theme='dark'>
      <Container fluid>
      <Link to="/" className="navbar-brand">HeapOverrun</Link>
      <Button variant='warning' onClick = {toggleTheme}>{theme === 'light' ? 'dark' : 'light'}</Button>
      </Container>
    </Navbar>
  );
}

export default NavHeader;