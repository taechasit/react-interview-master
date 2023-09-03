
import logo from "../../assets/newLogo.svg";
import bag from "../../assets/bag.svg";
import "./Navbar.css"

export default function Car({ onAction,cartcount }) {


    return <div className="nav">
        <div className="mainnavcontainer mainmargin mainflexcenter">
            <div><img src={logo} alt="logo" /> </div>
            <div className="cart" onClick={onAction}>
                <img src={bag} alt="bag" />
                <span className="textheader">Cart ({cartcount}) </span>
            </div>
        </div>
    </div>;
}