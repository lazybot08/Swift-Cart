// import css 
import "./navbar-overlay.css"
//hook imports
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { NavbarContext } from "../../../../../context/NavbarContext";

export default function NavbarOverlay() {
    const {navbarState, dispatch} = useContext(NavbarContext)
    const [nav1Class, updateNav1Class] = useState("nav1")
    const [nav2Class, updateNav2Class] = useState("nav2")
    const [nav3Class, updateNav3Class] = useState("nav3")
    const [nav4Class, updateNav4Class] = useState("nav4")
    const [headingClass, updateHeadingClass] = useState("heading")
    const [navlink1Class, updateNavlink1Class] = useState("navlink1")
    const [navlink2Class, updateNavlink2Class] = useState("navlink2")
    const [navlink3Class, updateNavlink3Class] = useState("navlink3")
    const [navlink4Class, updateNavlink4Class] = useState("navlink4")

    
    const detectClick = () => {
        navbarState.navIconState ? updateNav1Class("nav1 opening") : updateNav1Class("nav1 closing")
        navbarState.navIconState ? updateNav2Class("nav2 opening") : updateNav2Class("nav2 closing")
        navbarState.navIconState ? updateNav3Class("nav3 opening") : updateNav3Class("nav3 closing") 
        navbarState.navIconState ? updateNav4Class("nav4 opening") : updateNav4Class("nav4 closing")
        navbarState.navIconState ? updateHeadingClass("heading closeHeading") : updateHeadingClass("heading openHeading") 
        navbarState.navIconState ? updateNavlink1Class("navlink1 closeLink"): updateNavlink1Class("navlink1 openLink") 
        navbarState.navIconState ? updateNavlink2Class("navlink2 closeLink"): updateNavlink2Class("navlink2 openLink") 
        navbarState.navIconState ? updateNavlink3Class("navlink3 closeLink"): updateNavlink3Class("navlink3 openLink") 
        navbarState.navIconState ? updateNavlink4Class("navlink4 closeLink"): updateNavlink4Class("navlink4 openLink") 
    }

    const closeNavOverlay = ()=>{
        dispatch({
            type: 'CLOSING_NAV_OVERLAY'
        })
    }

    useEffect(detectClick, [navbarState.navIconState])
    return (
        <>
            <div className="navbar">
                <div className={nav1Class}></div>
                <div className={nav2Class}></div>
                <div className={nav3Class}></div>
                <div className={nav4Class}></div>
            </div>
            <div className="navlist-container">
                <h1 className={headingClass}>SwiftCart</h1>
                <ul className="navlist">
                    <NavLink to="/" className={navlink1Class} onClick={closeNavOverlay}>Home</NavLink>
                    <NavLink to="/products" className={navlink2Class} onClick={closeNavOverlay}>Products</NavLink>
                    <NavLink to="/contact" className={navlink3Class} onClick={closeNavOverlay}>Contact</NavLink>
                    <NavLink to="/about" className={navlink4Class} onClick={closeNavOverlay}>About</NavLink>
                </ul>
            </div>
        </>
    )
}
