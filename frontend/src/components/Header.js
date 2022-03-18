import React from 'react'
import { Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FormattedMessage } from "react-intl"

function Header() {

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="flex-nowrap flex-row">
                <Container>
                    <LinkContainer to='/' className="mx-auto pr-2">
                        <Navbar.Brand ><FormattedMessage id="component.header.brand" /></Navbar.Brand>
                    </LinkContainer>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header
