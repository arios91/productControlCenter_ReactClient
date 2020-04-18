import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <Fragment>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li>
                </ul>
            </div>
        </Fragment>
    );
    // <ul>
    //     <li>
    //         <Link to="/dashboard">
    //             <i className="fas fa-user"></i>{' '}
    //             <span className="hide-sm">Dashboard</span>
    //         </Link>
    //     </li>
    //     <li>
    //         <Link to="/employees">
    //             <span className="hide-sm">Employees</span>
    //         </Link>
    //     </li>
    //     <li><Link to="/orders">Orders</Link></li>
    //     <li><a href="/" onClick={logout}>
    //         <i className="fas fa-sign-out-alt"></i>{' '}
    //         <span className="hide-sm">Logout</span></a>
    //     </li>
    // </ul>


    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/dashboard" className="nav-item nav-link">Dashboard</Link>
                    <Link to="/employees" className="nav-item nav-link">Employees</Link>
                    <Link to="/orders" className="nav-item nav-link">Orders</Link>
                    <a href="/" className="nav-item nav-link" onClick={logout}>Logout</a>
                </div>
            </div>
            </nav>
    )
        // <nav className="navbar navbar-expand-lg">
            {/* <Link to="/" className="headerTitle">
                <i className="fas fa-code"></i> Petalos y Arte
            </Link> */}
        //     {!loading ? (<Fragment>{isAuthenticated ? authLinks : null}</Fragment>) : null}
            
        // </nav>
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);