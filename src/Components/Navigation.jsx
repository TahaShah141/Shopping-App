import { Link } from 'react-router-dom';
import '../Styles/Navigation.css';
import { useEffect, useState } from 'react';

export default function Navigation({highlightIndex}) {
    
    const linkNames = ["All Products", "Cart"];
    const linkPaths = ['shop', 'cart'];
    const [links, setLinks] = useState([]);

    useEffect(() => {

        let newLinks = [];
        for (let i = 0; i < linkNames.length; i++) {
            let className = "";
            if (i === highlightIndex) className = "current-page-link";

            newLinks.push(<li key={linkNames[i]} className='nav-item'><Link to={linkPaths[i]} className={className}>{linkNames[i]}</Link></li>);
        }

        setLinks(newLinks);
    }, [highlightIndex])


    return (
        <nav className="nav-bar">
            <h1 className="logo-title">Shop<span className='rotate'>N</span>Go</h1>
            <ul className="nav-links">
                {links}
            </ul>
        </nav>
    )
}