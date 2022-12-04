import Sidebar from '../../components/sidebar';
import SinglePost from '../../components/singlePost';
import './Single.css';

function Single() {
    return (
        <div className='single'>
            <SinglePost />
            <Sidebar />
        </div>
    )
}

export default Single