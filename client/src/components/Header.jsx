//import { Link, useLocation } from 'react-router-dom';

import NavList from './NavList';

function Header() {
    //const currentPage = useLocation().pathname;
    return (
        <div className="header">
            <h1 className="title"><a href="/">My Recipes</a></h1>
            <NavList />
        </div>
    )
}  
export default Header;