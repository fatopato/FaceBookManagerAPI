import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Facebook Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Default Tasks</Nav.Link>
                        <NavDropdown title="Create" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/campaigns">Campaign</NavDropdown.Item>
                            <NavDropdown.Item href="/adsets">Ad Set</NavDropdown.Item>
                            <NavDropdown.Item href="/adcreatives">Ad Creative</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleNavbar;