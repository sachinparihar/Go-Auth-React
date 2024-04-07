// Nav.tsx
import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Nav = (props: { name: string, setName: (name: string) => void }) => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/logout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            });
    
            if (!response.ok) {
                throw new Error(`Logout failed: ${response.statusText}`);
            }
    
            props.setName('');
    
            // Redirect to home page after logout
            navigate('/');
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    }

    let menu;

    if (props.name === '') {
        menu = (
            <ul className="newnav">
                <li><Link to="/" className="active">Sata <span role="img" aria-label="house">🏡</span></Link></li>
                <li><Link to="/charts">Chart</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        )
        } else {
            menu = (
                <ul className="newnav">
                    <li><Link to="/" className="active">Sata <span role="img" aria-label="house">🏡</span></Link></li>
                    <li><Link to="/charts">Chart</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/logout" onClick={logout}>Logout</Link></li>
                </ul>
            )
        }

    return (
        <section className="topboxnew">
            <div className="container-fluid">
                <div className="col-md-16 nopadding">
                    <div className="newnav">
                        {menu}
                        <div className="clearfix"></div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Nav;