import "./footer.css"
import { Link, NavLink } from "react-router-dom"
export default function Footer() {
    return (
        <>
            <div className="footer-left">
                <Link to='/'><h2>SwiftCart</h2></Link>
                <ul className="navigation-footer-list">
                    <NavLink to="/" className="footer-links">Home</NavLink>
                    <NavLink to="/products" className="footer-links">Products</NavLink>
                    <NavLink to="/about" className="footer-links">About</NavLink>
                    <NavLink to="/contact" className="footer-links">Contact</NavLink>
                </ul>
            </div>
            <div className="footer-mid">
                <h2>Follow Us on</h2>
                <div className="follow-links">
                    <a href="/#">Twitter</a>
                    <a href="/#">Facebook</a>
                    <a href="/#">LinkedIn</a>
                    <a href="/#">Instagram</a>
                </div>
            </div>
            <div className="footer-right">
                <div className="payment-options">
                    <h2>Payment Options</h2>
                    <div className="payment-images">
                        <img src="/assets/upi.png" alt="not loading" />
                        <img src="/assets/visa.png" alt="not loading" />
                        <img src="/assets/mastercard.png" alt="not loading" />
                    </div>
                </div>
                <div className="office-address">
                    <h2>Office Address: </h2>
                    <div className="address">
                        <p>232, XYZ street, <br/> ABC Industrial Area, <br/>Bangalore, 560103, <br/>Karnataka, India</p>
                    </div>
                </div>
            </div>
        </>
    )
}


