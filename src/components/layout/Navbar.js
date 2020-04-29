import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <Fragment>
            <div className="navbar-nav ml-auto">
                <Link to="/dashboard" className="nav-item nav-link">Dashboard</Link>
                <Link to="/employees" className="nav-item nav-link">Employees</Link>
                <Link to="/orders" className="nav-item nav-link">Orders</Link>
                <a href="/" className="nav-item nav-link" onClick={logout}>Logout</a>
            </div>
        </Fragment>
    );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="d-flex flex-grow-1">
                <span className="w-100 d-lg-none d-block"></span>
                <Link to="/" className="navbar-brand">Petalos y Arte</Link>
                <div className="w-100 text-right">
                    <button className="navbar-toggler" tpye="button" data-toggle="collapse" data-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
            {/* <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="#navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse flex-grow-1 text-right" id="navbarNavAltMarkup">
                {isAuthenticated ? authLinks : null}
            </div>
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