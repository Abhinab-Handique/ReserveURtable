import React, { useState, useEffect } from "react";
import { data } from "../restApi.json";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle log-out
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000//logout'); // Add your logout API endpoint
      localStorage.removeItem("token"); // Clear the token from local storage
      setIsLoggedIn(false); // Update state
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav style={navbarStyles}>
      <div style={logoStyles}>ReserveUrSeat</div>
      <div style={menuStyles}>
        <div style={linksStyles}>
          {data[0].navbarLinks.map((element) => (
            <Link
              to={element.link}
              spy={true}
              smooth={true}
              duration={500}
              key={element.id}
              style={navLinkStyles}
              activeStyle={navLinkHoverStyles}
            >
              {element.title}
            </Link>
          ))}
        </div>
        <div style={actionButtonsStyles}>
          {isLoggedIn ? (
            <>
              <button style={menuBtnStyles} onClick={() => navigate('/Resturants')}>
                Restaurants Near You
              </button>
              <button style={menuBtnStyles} onClick={() => navigate('/Add')}>
                Add Your Restaurant
              </button>
              <button style={menuBtnStyles} onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button style={menuBtnStyles} onClick={() => navigate('/login')}>
                Sign In
              </button>
              <button style={menuBtnStyles} onClick={() => navigate('/SignUp')}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      <div style={hamburgerStyles} onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
      <div style={{ ...dropdownStyles, display: show ? 'block' : 'none' }}>
        {isLoggedIn ? (
          <>
            <button style={dropdownBtnStyles} onClick={() => navigate('/Resturants')}>
              Restaurants Near You
            </button>
            <button style={dropdownBtnStyles} onClick={() => navigate('/Add')}>
              Add Your Restaurant
            </button>
            <button style={dropdownBtnStyles} onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <button style={dropdownBtnStyles} onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button style={dropdownBtnStyles} onClick={() => navigate('/register')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

// Inline styles
const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#333',
  color: '#fff',
  position: 'relative',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const logoStyles = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
};

const menuStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const linksStyles = {
  display: 'flex',
  gap: '1rem',
};

const navLinkStyles = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1rem',
  transition: 'color 0.3s, border-bottom 0.3s',
  padding: '0.5rem 0',
};

const navLinkHoverStyles = {
  color: '#f39c12',
  borderBottom: '2px solid #f39c12',
};

const actionButtonsStyles = {
  display: 'flex',
  gap: '1rem',
};

const menuBtnStyles = {
  backgroundColor: '#f39c12',
  border: 'none',
  color: '#fff',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.3s',
};

const menuBtnHoverStyles = {
  backgroundColor: '#e67e22',
};

const hamburgerStyles = {
  display: 'none',
  cursor: 'pointer',
};

const dropdownStyles = {
  position: 'absolute',
  top: '100%',
  right: '0',
  backgroundColor: '#333',
  width: '200px',
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  padding: '0.5rem 1rem',
  zIndex: '1000',
};

const dropdownBtnStyles = {
  backgroundColor: '#f39c12',
  border: 'none',
  color: '#fff',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
  borderRadius: '4px',
  display: 'block',
  width: '100%',
  textAlign: 'left',
  marginBottom: '0.5rem',
  transition: 'background-color 0.3s',
};

const dropdownBtnHoverStyles = {
  backgroundColor: '#e67e22',
};

// Apply responsive styles
const responsiveStyles = {
  '@media (max-width: 768px)': {
    navbarStyles: {
      flexDirection: 'column',
    },
    menuStyles: {
      display: 'none',
    },
    hamburgerStyles: {
      display: 'block',
    },
    dropdownStyles: {
      display: 'block',
    },
  },
};

export default Navbar;
