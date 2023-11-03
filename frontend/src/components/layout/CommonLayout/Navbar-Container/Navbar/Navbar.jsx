import "./navbar.css"
import NavbarOverlay from "../Navbar-Overlay/NavbarOverlay"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useRef, useState } from "react";
import { createSearchParams, Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { LoginContext } from "../../../../../context/LoginContext";
import { RegisterContext } from "../../../../../context/RegisterContext";
import { NavbarContext } from "../../../../../context/NavbarContext";
import CloudinaryImg from "../../../../utils/Cloudinary Image/CloudinaryImg";
import MODE from "../../../../../mode";
const Navbar = () => {
    const { loginState } = useContext(LoginContext)
    const { registerState } = useContext(RegisterContext)
    const { navbarState, navbarDispatch } = useContext(NavbarContext)
    const [categories, setCategories] = useState([])
    const isSearchClicked = useRef(false)
    const prevPageState = useRef(navbarState.queryString.page)
    const prevDropdownState = useRef(navbarState.dropdownState.value)
    let queryObject = {}
    const searchInputRef = useRef()
    const navigate = useNavigate()
    const toggleNavOverlay = () => {
        if (navbarState.navIconState) {
            navbarDispatch({
                type: 'OPENING_NAV_OVERLAY'
            })
        } else {
            navbarDispatch({
                type: 'CLOSING_NAV_OVERLAY'
            })
        }
    }
    const changeHandler = (e) => {
        navbarDispatch({
            type: 'SET_DROPDOWN_VALUE',
            payload: {
                value: e.target.value
            }
        })
    }
    const toggleProfileOptions = () => {
        if (navbarState.profileOptionsState) {
            navbarDispatch({
                type: 'CLOSE_PROFILE_OPTIONS'
            })
        } else {
            navbarDispatch({
                type: 'OPEN_PROFILE_OPTIONS'
            })
        }
    }
    const setSearchKeyword = () => {
        isSearchClicked.current = true
        navbarDispatch({
            type: 'SET_QUERY_STRING',
            payload: {
                value: searchInputRef.current.value
            }
        })
    }
    useEffect(() => {
        if (isSearchClicked.current || navbarState.dropdownState.value !== prevDropdownState.current || navbarState.queryString.page !== prevPageState.current) {
            prevDropdownState.current = navbarState.dropdownState.value
            if (navbarState.queryString.keyword === '') {
                if (navbarState.queryString.page === 1) {
                    queryObject = { category: navbarState.dropdownState.value }
                } else {
                    queryObject = { page: navbarState.queryString.page, category: navbarState.dropdownState.value }
                }
            }
            else if (navbarState.queryString.page === 1) {
                if (navbarState.queryString.keyword) {
                    queryObject = { keyword: navbarState.queryString.keyword, category: navbarState.dropdownState.value }
                } else {
                    queryObject = { category: navbarState.dropdownState.value }
                }
            }
            else {
                queryObject = { ...navbarState.queryString, category: navbarState.dropdownState.value }
            }
            if (isSearchClicked.current || navbarState.queryString.page !== prevPageState.current) {
                isSearchClicked.current = false
                prevPageState.current = navbarState.queryString.page
                navigate({
                    pathname: '/products',
                    search: `?${createSearchParams(queryObject)}`
                })
            }
        }
    }, [navbarState.queryString, navbarState.dropdownState.value])
    useEffect(() => {
        const body = document.body
        if (navbarState.navIconState) {
            body.classList.add("active")
            if (body.classList.contains('inactive')) {
                body.classList.remove("inactive")
            }
        } else {
            body.classList.add("inactive")
            if (body.classList.contains('active')) {
                body.classList.remove("active")
            }
        }
    }, [navbarState.navIconState])
    useEffect(() => {
        const fetchProfileAvtar = async () => {
            if (loginState.isLoggedIn) {
                try {
                    const userAvtar = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/profile/getProfileImage`, {
                        method: 'GET',
                        credentials: 'include'
                    })
                    const jsonUserAvtar = await userAvtar.json()
                    navbarDispatch({
                        type: 'PROFILE_AVTAR_SUCCESS',
                        payload: {
                            public_id: jsonUserAvtar.avtar.public_id
                        }
                    })
                } catch (error) {
                    navbarDispatch({
                        type: 'PROFILE_AVTAR_FAILED',
                        payload: {
                            error: error
                        }
                    })
                }
            }
            try {
                const fetchedCategories = await fetch(`${MODE === 'DEVELOPMENT' ?'http://localhost:4000':'https://e-commerce-backend-y30k.onrender.com'}/api/v1/productCategories`, {
                    method: 'GET'
                })
                const jsonCategories = await fetchedCategories.json()
                const categoryArray = jsonCategories.category.map((obj, index) => {
                    return obj.category_name
                })
                setCategories(categoryArray)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfileAvtar()
    }, [])
    return (
        <>
            <div className="nav-top">
                <div className="logo">
                    <Link to='/'><h1>SwiftCart</h1></Link>
                </div>
                <div className="search-bar">
                    <select value={navbarState.dropdownState.value} onChange={changeHandler}>
                        <option value="All">All</option>
                        {categories.map((category, index) => {
                            return <option value={category} key={index}>{category}</option>
                        })}
                    </select>
                    <input type="text" placeholder="Search Products" ref={searchInputRef} />
                    <SearchIcon style={{
                        margin: '0.3rem',
                        cursor: "pointer"
                    }} onClick={setSearchKeyword} />
                </div>
                <div className="icons">
                    <div className="nav-icon-container" onClick={toggleNavOverlay}>
                        {navbarState.navIconState ? <MenuIcon style={{ color: 'white', fontSize: '2rem' }} /> : <CloseIcon style={{ color: 'white', fontSize: '2rem' }} />}
                    </div>
                    {
                        (loginState.isLoggedIn || registerState.isLoggedIn) ?
                            <>
                                <div className="shopping-icon-container">
                                    <ShoppingCartIcon style={{ color: 'white', fontSize: '2rem' }} />
                                </div>
                                <div className="profile-pic" onClick={toggleProfileOptions}>
                                    {navbarState.profileAvtarState.public_id ? <CloudinaryImg public_id={navbarState.profileAvtarState.public_id} /> : ''}
                                </div>
                            </> : <button className="login"><Link to='/login'>Login</Link></button>
                    }
                    {
                        navbarState.profileOptionsState ?
                            <div className="profile-options-container">
                                <ul className="profile-options">
                                    <Link to='/dashboard' onClick={() => navbarDispatch({ type: 'CLOSE_PROFILE_OPTIONS' })}><li>Dashboard</li></Link>
                                    <Link to='/logout' onClick={() => navbarDispatch({ type: 'CLOSE_PROFILE_OPTIONS' })}><li>Logout</li></Link>
                                </ul>
                            </div> : ""
                    }
                </div>
            </div>
            <div className={navbarState.navContainerClassState}>
                <NavbarOverlay />
            </div>
        </>
    )
}
export default Navbar

