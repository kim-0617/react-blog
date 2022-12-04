import './Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErr(false);
            const res = await axios.post('/auth/register', {
                username,
                email,
                password
            });
            res.data && window.location.replace('/login');
        } catch (err) {
            setErr(true);
            console.log(err);
        }
    }

    return (
        <div className='register'>
            <span className="registerTitle">register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor='registername'>Username</label>
                <input onChange={e => setUsername(e.target.value)} id='registername' className='registerInput' type="text" placeholder='Enter your name...' />

                <label htmlFor='registerEmail'>Email</label>
                <input onChange={e => setEmail(e.target.value)} id='registerEmail' className='registerInput' type="text" placeholder='Enter your email...' />

                <label htmlFor='registerPassword'>Password</label>
                <input onChange={e => setPassword(e.target.value)} id='registerPassword' className='registerInput' type="password" placeholder='Enter your password...' />

                <button type='submit' className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton"><Link to="/login" className='link'>Login</Link></button>
            {err && <span style={{ color: "red" }}>Something went wrong!</span>}
        </div>
    )
}

export default Register