import './Header.css';

export default function Header() {
    return (
        <div className='header'>
            <div className="headerTitles">
                <span className='headerTitleSm'>React & Node</span>
                <span className='headerTitleLg'>Blog</span>
            </div>
            <img className='headerImage' src="https://images.unsplash.com/photo-1496769336828-c522a3a7e33c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTM4fHxuYXR1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="headerImage" />
        </div>
    )
}
