import React, { useState } from 'react';
import axios from 'axios';

function Category() {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCat = {
            name
        };

        try {
            await axios.post("/categories", newCat);
            window.location.replace("/");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='write'>
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <input onChange={e => setName(e.target.value)} type="text" placeholder='catName' className='writeInput' autoFocus={true} />
                </div>
                <button type='submit' className='writeSubmit'>Add cats</button>
            </form>
        </div>
    )
}

export default Category;