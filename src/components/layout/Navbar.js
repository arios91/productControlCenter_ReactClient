import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to="/posts">
                    <span className="hide-sm">Input Order</span>
                </Link>
            </li>
            <li>
                <Link to="/employees">
                    <span className="hide-sm">Employees</span>
                </Link>
            </li>
            <li><Link to="/profiles">Orders</Link></li>
            <li><a href="#!" onClick={logout}>
                <i className="fas fa-sign-out-alt"></i>{' '}
                <span className="hide-sm">Logout</span></a>
            </li>
        </ul>
    );


    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> Petalos y Arte
                </Link>
            </h1>
            {!loading ? (<Fragment>{isAuthenticated ? authLinks : null}</Fragment>) : null}
            
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);