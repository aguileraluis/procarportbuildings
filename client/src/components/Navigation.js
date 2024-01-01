import React from 'react';
import './Navigation.css';
import logo from '../images/logocarport.png';
import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigation = () => {

    function toggleNavigation() {

        let nav = document.querySelector('nav');

        let navList = document.getElementById('navlist');

        console.log(nav)
        nav.classList.toggle('active')
        
        nav.classList.value === "active" ? navList.style.display = "flex" : navList.style.display = "none"
        return;
    }

    const quantity = useSelector(state=> state.cart.quantity);

    return (
      
            <nav>
                <div className="menu-icons" onClick={(toggleNavigation)} style={{display: 'flex', textAlign: 'center'}}>
                    <i className="fas fa-bars"></i>
                    <i className="fas fa-times"></i>
                </div>
                <a href="/" className="logo"><img style={{ height: '40px', alignItems: 'left' }} src={logo} alt="logo" />PRO CARPORT BUILDINGS</a>
                 <ul className="nav-list" id="navlist">
                    <li>
                        <b><a href="http://localhost:3000/products/Standard%20Buildings">Standard</a></b>
                    </li>
                    <li>
                        <b><a href="http://localhost:3000/products/Barn%20Buildings">Barn</a></b>
                    </li>
                    <li>
                        <b><a href="http://localhost:3000/products/Triple%20Buildings">Triple</a></b>
                    </li>
                    <li>
                        <b><a href="http://localhost:3000/products/Commercial%20Buildings">Commercial</a></b>
                    </li>
                    <li>
                        <b><a href="/gallery">Gallery</a></b>
                    </li>
                    <li>
                        <b><a href="/about">About</a></b>
                    </li>
                    {/* <li>
                        <h1 id="dropdownh1">Menu <i className="fas fa-caret-down"></i></h1>
                        <ul className="sub-menu">
                            <li>
                                <a href="/">Navel</a>
                            </li>
                            <li>
                                <h1 id="dropdownh1">Mandarine
                                    <i className="fas fa-caret-down"></i></h1>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/">Cara Cara</a>
                                    </li>
                                    <li>
                                        <a href="/">Tangerine</a>
                                    </li>
                                    <li>
                                        <h1 id="dropdownh1" href="/">Others
                                            <i className="fas fa-caret-down"></i>
                                        </h1>
                                        <ul className="sub-menu">
                                            <li>
                                                <a href="/">Lima</a>
                                            </li>
                                            <li>
                                                <a href="/">Seville</a>
                                            </li>
                                            <li>
                                                <a href="/">Lime</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/">Tangelos</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                       <h1 id="dropdownh1">Gallery
                            <i className="fas fa-caret-down"></i>
                        </h1>
                        <ul className="sub-menu">
                            <li>
                                <a href="/">Yellow Oranges</a>
                            </li>
                            <li>
                                <h1 id="dropdownh1">Green Oranges
                                    <i className="fas fa-caret-down"></i></h1>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="/">For Health</a>
                                    </li>
                                    <li>
                                        <a href="/">Sweet Oranges</a>
                                    </li>
                                    <li>
                                        <a href="/">Bitter Oranges
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="/">Dinner</a>
                            </li>
                        </ul>
                    </li> */}
                    {/* <li>
                        <Link to="/cart/0/0">
                    <div style={{color: 'black'}}>
                    <Badge badgeContent={quantity} color="white">
                    <ShoppingCartOutlined className="cart"/>
                    </Badge>
                    </div>
    
                </Link>
                    </li> */}
                </ul>
                
            </nav>
     
        //    <div classNameName="container">
        //     <nav>
        //          <a href="/" className="logo"><img style={{height: '40px', alignItems: 'left'}} src={logo} alt="logo"/>PRO CARPORT BUILDINGS</a>
        //         <div className="menu-icons">
        //             <i className="fas fa-bars"></i>
        //             <i className="fas fa-times"></i>
        //         </div>    
        //         <ul className="nav-list">
        //             <li>
        //                 <a href="/">Home ◾</a>
        //             </li>
        //             <li>
        //                 <a href="/">Menu <i className="fas fa-caret-down"></i></a>
        //                 <ul className="sub-menu"></ul>
        //                     <li>
        //                         <a href="/">Navel</a>
        //                     </li>
        //                     <li>
        //                         <a href="/">Mandarine
        //                             <i className="fas fa-caret-down"></i>
        //                         </a>
        //                         <ul className="sub-menu">
        //                             <li>
        //                                 <a href="/">Cara Cara</a>
        //                             </li>
        //                             <li>
        //                                 <a href="/">Tangerine</a>
        //                             </li>
        //                             <li>
        //                                 <a href="/">Others
        //                                     <li className="fas fa-caret-down"></li>
        //                                 </a>
        //                                 <ul className="sub-menu">
        //                                     <li>
        //                                         <a href="/">Lima</a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="/">Lima</a>
        //                                     </li>
        //                                     <li>
        //                                         <a href="/">Lima</a>
        //                                     </li>
        //                                 </ul>
        //                             </li>
        //                         </ul>
        //                     </li>

        //             </li>
        //         </ul>
        //     </nav>      
        // </div>   
    )
    
}

export default Navigation;