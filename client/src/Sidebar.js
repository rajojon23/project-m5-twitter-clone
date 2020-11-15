import React from 'react';
import { FiBell, FiBookmark } from "react-icons/fi";
import { BiHomeAlt } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
  import { COLORS } from "./constants";

import styled from "styled-components";
import {ReactComponent as Logo} from "./assets/logo.svg";

  
  const Sidebar = (props) => {
  
    
    return(
            
                <Nav  style={{fontFamily : "'Roboto', sans-serif"}}>
                  
                <ul>
                    <Logo className="logo"/>
                  <li>
                     <NavigationLink className="navlink" exact to="/"> <BiHomeAlt className="logolink"/> Home</NavigationLink>
                  </li>
                  <li>
                      <NavigationLink className="navlink"  exact to="/treasurymog/profile"><BsPerson className="logolink"/> Profile</NavigationLink>
                  </li>                  
                  <li>
                     <NavigationLink className="navlink" exact to="/notifications"> <FiBell className="logolink"/> Notifications</NavigationLink>
                  </li>
                  <li>
                     <NavigationLink className="navlink" exact to="/bookmarks"><FiBookmark className="logolink"/> Bookmarks</NavigationLink>
                  </li>
                </ul>
              </Nav>
          );
  };
 
const Nav = styled.nav `
  margin-right: 40px;
  font-weight: bold;
  width: 280px;

  li {
    padding: 4px;
    
    list-style-type: none;
    
  }

  li:hover{
    color: ${COLORS.primary};
    cursor: pointer;
    border-radius: 20px;
  }

  .logo{
    margin-bottom: 20px;
  }

  .navlink{
    padding-left: 10px;
    text-decoration: none;
    color: #000;
    cursor: pointer;
  }

  .logolink{
    padding-top: 2px;
    cursor: pointer;
    margin-right: 10px;
  }
`; 
const NavigationLink = styled(NavLink)`
  /* default styles here */

  &.active {
    color: ${COLORS.primary};
  }
`;
  export default Sidebar;
