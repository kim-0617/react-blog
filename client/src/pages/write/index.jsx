import { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context'
import './Write.css'

function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState("");

    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            category
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;

            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;

            try {
                await axios.post("/upload", data)
            } catch (err) {
                console.log(err)
            }
        }

        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='write'>
            {file && <img className='writeImg' src={URL.createObjectURL(file)} alt="writeImg" />}
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input onChange={e => setFile(e.target.files[0])} type="file" id='fileInput' style={{ display: "none" }} />
                    <input onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' className='writeInput' autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <select name="cat" style={{ outlineColor: "teal" }} onChange={e => {
                        setCategory(e.target.value);
                    }}>
                        <option value="">카테고리 선택</option>
                        <option value="playground">playground</option>
                        <option value="tutorials">tutorials</option>
                        <option value="articles">articles</option>
                        <option value="collective">collective</option>
                    </select>
                </div>
                <div className="writeFormGroup">
                    <textarea onChange={e => setDesc(e.target.value)} placeholder='Tell your stroy ...' type="text" className='writeInput writeText'></textarea>
                </div>
                <button type='submit' className='writeSubmit'>Publish</button>
            </form>
        </div>
    )
}

export default Write