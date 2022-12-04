import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './SinglePost.css';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../context/Context';

function SinglePost() {
    const location = useLocation();
    const path = (location.pathname.split('/')[2]);
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc)
        }
        getPost();
    }, [path]);
    const handleDelete = async (e) => {
        try {
            await axios.delete("/posts/" + path, {
                data: { username: user.username }
            });
            window.location.replace("/");
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, {
                username: user.username,
                title,
                desc
            });
            setUpdateMode(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && <img src={PF + post.photo} alt="singlePostImg" className='singlePostImg' />}
                {updateMode ? <input onChange={e => setTitle(e.target.value)} autoFocus type="text" value={title} className="singlePostTitleInput" /> : (
                    <h1 className="singlePostTitle">
                        {post.title}
                        {post?.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={(e) => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                            </div>
                        )}
                    </h1>
                )}

                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Author :
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <textarea onChange={e => setDesc(e.target.value)} className='singlePostDescInput' value={desc}></textarea> : (
                    <p className='singlePostDesc'>
                        {post.desc}
                    </p>
                )}
                {updateMode && <button onClick={handleUpdate} className="singlePostButton">Update</button>}
            </div >
        </div>
    )
}

export default SinglePost