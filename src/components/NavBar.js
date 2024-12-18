/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          ThriveWell
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto nav-links">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link href="/">Home</Link>
            <Link passHref href="/dailyJournals">
              Journal Entries
            </Link>
            <Link passHref href="/symptoms">
              Symptoms
            </Link>
            <Link passHref href="/triggers">
              Triggers
            </Link>

            <Link passHref href="/dailyJournals/new">
              <button type="submit" className="button">
                New Journal Entry
              </button>
            </Link>
            <Link passHref href="/symptomLogs/new">
              <button type="submit" className="button">
                Log a Symptom
              </button>
            </Link>
          </Nav>

          <button className="button" type="submit" onClick={signOut}>
            Sign Out
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
