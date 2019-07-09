import React from 'react';
import {withRouter} from 'react-router-dom'; 

import {SignUpLink} from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignInPage = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <SignInForm />
            <SignUpLink />
            <PasswordForgetLink />
        </div>
    );
}

class SignInFormBase extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { // <<<<<
            email: '',
            password: '',
            error: null
        };
    }

    onSubmit = event => {
        const {email, password} = this.state;
        event.preventDefault();
        this.props.firebase
            // call firebase's signin function
            .doSignInWithEmailAndPassword(email, password) // <<<<

             // if successful, reinitialize state back to blanks
            .then(authUser => {
                this.setState({ // <<<<
                    email: '',
                    password: '',
                    error: null
                });
                this.props.history.push(ROUTES.HOME);
            })

            // otherwise, display error
            .catch(error => {
                this.setState({error});
            }); 
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        //destructure first
        const {email, password, error} = this.state;

        const isInvalid = // <<<<<
            password === '' ||
            email === '';
        return (
        <form onSubmit={this.onSubmit}>
            <input 
                name = "email"
                value = {email}
                onChange = {this.onChange}
                type = "text"
                placeholder = "Email"
            />
            <input 
                name = "password"
                value = {password}
                onChange = {this.onChange}
                type = "password"
                placeholder = "Password"
            />
            <button disabled = {isInvalid} type = "submit">Sign In</button>
            {error && <p>{error.message}</p>}
        </form> 
        );
    }
}

const SignInForm = withRouter(withFirebase(SignInFormBase));

export default SignInPage;
export { SignInForm };
