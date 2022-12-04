import './TopBar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export default function TopBar() {
    const { user, dispatch } = useContext(Context);

    const handleClick = (e) => {
        dispatch({ type: "LOGOUT" });
    }

    const PF = "http://localhost:5000/images/";

    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topIcon fa-brands fa-facebook"></i>
                <i className="topIcon fa-brands fa-twitter"></i>
                <i className="topIcon fa-brands fa-pinterest"></i>
                <i className="topIcon fa-brands fa-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className='topListItem'>
                        <Link to="/" className='link'>HOME</Link>
                    </li>
                    <li className='topListItem'>
                        <Link to="/about" className='link'>ABOUT</Link>
                    </li>
                    <li className='topListItem'>
                        <Link to="/contact" className='link'>CONTACT</Link>
                    </li>
                    <li className='topListItem'>
                        <Link to="/write" className='link'>WRITE</Link>
                    </li>
                    <li onClick={handleClick} className='topListItem'>
                        {user && <Link to="/" className='link'>LOGOUT</Link>}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ?
                    <Link to="settings" className="link"><img className='topImage' src={user.profilePic ? PF + user.profilePic : 'https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} alt="topImage" /></Link> :
                    <ul className='topList'>
                        <li className="topListItem">
                            <Link to="/login" className='link'>Login</Link>
                        </li>
                        <li className="topListItem">
                            <Link to="/register" className='link'>Register</Link>
                        </li>
                    </ul>}
                {/* <i className="topSearchIcon fa-sharp fa-solid fa-magnifying-glass-plus"></i> */}
            </div>
        </div>
    )
}
