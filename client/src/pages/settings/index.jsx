import './Settings.css';
import SideBar from '../../components/sidebar'
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import { useEffect } from 'react';

function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);

    const PF = "http://localhost:5000/images/";

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user._id, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updateUser = {
            userId: user._id,
            username,
            email,
            password
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;

            data.append("name", filename);
            data.append("file", file);
            updateUser.profilePic = filename;

            try {
                await axios.post("/upload", data);
                setSuccess(true);
                alert("다음 로그인시 반영됩니다!")
            } catch (err) {
                console.log(err)
            }
        }

        try {
            const res = await axios.put("/users/" + user._id, updateUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
            console.log(err)
        }
    }


    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="writeImg" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-sharp fa-solid fa-user-plus"></i>
                        </label>
                        <input onChange={e => setFile(e.target.files[0])} type="file" id='fileInput' style={{ display: "none" }} />
                    </div>

                    <label>Username</label>
                    <input onChange={e => setUsername(e.target.value)} type="text" placeholder={user.username} value={username} />

                    <label>Email</label>
                    <input onChange={e => setEmail(e.target.value)} type="email" placeholder={user.email} value={email} />

                    <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" />

                    <button type='submit' className="settingsSubmit">Update</button>
                    {success && <span style={{ color: "green", textAlign: "center", marginTop: 10 }}>Profile has been updated...</span>}
                </form>
            </div>
            <SideBar />
        </div>
    )
}

export default Settings