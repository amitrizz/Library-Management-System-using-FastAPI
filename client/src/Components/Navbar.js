import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <div className='navbarbody'>
            <nav className='navbody'>
                <ul className="nav-link">
                    <li className="link">
                        <Link to="/" className={"link-styles"}>DashBoard</Link>
                    </li>
                    <li className="link">
                        <Link to="/add_user" className={"link-styles"}>Add User</Link>
                    </li>
                    <li className="link">
                        <Link to="/add_book" className={"link-styles"}>Add Book</Link>
                    </li>
                    <li className="link">
                        <Link to="/borrow_book" className={"link-styles"}>Borrow Book</Link>
                    </li>
                    <li className="link">
                        <Link to="/borrow_list" className={"link-styles"}>Borrow List</Link>
                    </li>
                    <li className="link">
                        <Link to="/return_book" className={"link-styles"}>Return Book</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
