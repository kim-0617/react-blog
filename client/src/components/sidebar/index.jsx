import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get('/categories');
            setCats(res.data);
        }

        getCats();
    }, []);

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">About me</span>
                <img src="https://images.unsplash.com/photo-1526781100743-007e0dc2b474?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Zmxvd2VyJTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="flower" />
                <p style={{ lineHeight: "1.6" }}>
                    <span>Anyone who stops learning is old, whether at twenty or eighty. Anyone who keeps learning stays young. The greatest thing in life is to keep your mind young. <br /></span>
                    <span style={{ display: "inline-block", marginTop: "10px" }}>누구든지 배우기를 멈춘다면 늙은 것이다. 그 사람이 20세이건 80세이건 상관없이 말이다. 누구든지 항상 배우는 자는 젊음에 머무르고 있는 것이다. 인생에서 가장 위대한 일은 당신의 마음을 젊게 유지하는 것이다.</span>
                </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className='sidebarList'>
                    {cats.map(c => (
                        <Link key={c._id} to={`/?cat=${c.name}`} className='link'><li className='sidebarListItem'>{c.name}</li></Link>
                    ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <div className="sidebarTitle">FOLLOW US</div>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-instagram"></i>
                </div>
            </div>
        </div>
    )
}
