import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';
const MainNavbar=()=>{
    return(
        <>
         <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">My List</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="create" >Create List</Nav.Link>
            <Nav.Link as={Link} to="display" >Display List</Nav.Link>
            
            <Nav.Link ></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        <Outlet/>
        </>
    )
}

export default MainNavbar;