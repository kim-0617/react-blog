import './Login.css';
import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

function Login() {
    const userRef = useRef(null);
    const passwordRef = useRef(null);

    const { dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            console.log(err);
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }
    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor='loginEmail'>Username</label>
                <input ref={userRef} id='loginEmail' className='loginInput' type="text" placeholder='Enter your username...' />

                <label htmlFor='loginPassword'>Password</label>
                <input ref={passwordRef} id='loginPassword' className='loginInput' type="password" placeholder='Enter your password...' />

                <button disabled={isFetching} type='submit' className="loginButton">Login</button>
            </form>
            <button className="loginRegisterButton"><Link to='/register' className='link'>Register</Link></button>
        </div>
    )
}

export default Login