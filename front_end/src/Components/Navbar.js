import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div>
                    <ul className="navbar-nav">
                        <li className="nav-item" ><Link className="navbar-brand" to="/">BookTrak</Link></li>
                        <li className="nav-item"><Link to="/" className="nav-link">Book List</Link></li>
                        <li className="nav-item" ><Link to="/author" className="nav-link">Add Author</Link></li>
                        <li className="nav-item" ><Link to="/create" className="nav-link">Add Book </Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar