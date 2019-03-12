import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { auth } = props;
   const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
    return (
        <nav className = "nav-wrapper indigo darken-4 z-depth-4">
            <div className = "container">
                <Link to='/' className = "brand-logo">Contrats Papel</Link>
                { links }
            </div>
        </nav>
    );
}
const mapStateToProps = (state) => {
    console.log('Print State ====> ', state)
    return {
        auth : state.firebase.auth
        //auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);