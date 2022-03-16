import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FormattedMessage, useIntl } from "react-intl"

function Header() {

    const intl = useIntl()

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="flex-nowrap flex-row">
                <Container>
                    <LinkContainer to='/' className="mx-auto pr-2">
                        <Navbar.Brand ><FormattedMessage id="component.header.brand" /></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-first" />
                    <Navbar.Collapse id="basic-navbar-nav" className="flex-shrink-1 flex-grow-0 order-lg-1 order-last">
                        <Nav activeKey={window.location.pathname}>

                            <NavDropdown title={intl.formatMessage({ id: "component.header.admin" })} id='adminmenu'>

                                <LinkContainer to='/productlist'>
                                    <NavDropdown.Item><FormattedMessage id="component.header.products" /></NavDropdown.Item>
                                </LinkContainer>

                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
