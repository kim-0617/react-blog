import Post from '../post';
import './Posts.css';

export default function Posts({ posts }) {
    return (
        <div className='posts'>
            {posts.map((post, index) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    )
}
