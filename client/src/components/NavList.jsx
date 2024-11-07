import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import Auth from "../utils/auth";
import "../assets/css/Navbar.css";


const menuItems = [
    "Profile",
    "Saved Recipes"
];

const NavList = () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const user = Auth.getProfile();

    console.log("Token: " + token);
    console.log(user);


    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenuOnMobile = () => {
        if (window.innerWidth <= 1150) {
          setShowMenu(false);
        }
    };

    const handleLogout = (event) => {
        event.preventDefault();
        console.log("Inside handleLogout");
        Auth.logout(); // Log user out
        //alert("You have been logged out.");
        navigate('/'); // Redirect to home page
        console.log(user);
      };

    return (
        <nav className="nav container">
            <div className={`nav__menu ${showMenu ? "show-menu" : ""}`}>
                <ul className="nav nav__list">
                {
                    menuItems.map((item) => (
                        <li className="nav__item" key={item}>
                            <NavLink to={`/${item}`} className="nav__link" activeclassname="active" 
                            onClick={closeMenuOnMobile}>
                            {item}
                            </NavLink>
                        </li>
                    ))
                }

                {user ? (
                    <li className="nav__item">
                        <button onClick={handleLogout} className="nav__link">
                            Logout
                        </button>
                  </li>
                ) : (
                    <>
                        <li className="nav__item">
                            <NavLink to="/login" className="nav__link" onClick={closeMenuOnMobile}>Login</NavLink>
                        </li>

                        <li className="nav__item">
                        <NavLink to="/signup" className="nav__link" onClick={closeMenuOnMobile}>Signup</NavLink>
                        </li>
                    </>
                    
                    
                )

                }
                </ul>

                <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                    <IoClose />
                </div>
            </div>
   
            <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                <IoMenu />
            </div>  
        </nav>
            
    );
}

export default NavList;