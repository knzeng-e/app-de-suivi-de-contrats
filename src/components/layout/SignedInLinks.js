/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    const { initials } = props
    console.log('state to props ==> ', initials)
    return (
        <ul className = "right">
            <li><NavLink to = '/create'>Nouveau contrat</NavLink></li>
            <li><a onClick = {props.signOut}>Déconnexion</a></li>
            <li><NavLink to = '/' className = 'btn btn-floating green lighten-2'>MEVA</NavLink></li>
        </ul>
    );
}

const mapStateToProps = (state) => {
    return {
        initials : state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks);