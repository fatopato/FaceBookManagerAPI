import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Facebook Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/campaigns">Campaign</Nav.Link>
                        <Nav.Link href="/adsets">Ad Set</Nav.Link>
                        <Nav.Link href="#pricing">Ad Creative</Nav.Link>
                        <NavDropdown title="Default Tasks" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Create Default Campaign</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Create Default Ad Set
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Create Default Ad Creative</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CollapsibleNavbar;