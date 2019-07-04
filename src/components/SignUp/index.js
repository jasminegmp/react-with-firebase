import React from 'react';
import { Link, withRouter} from 'react-router-dom';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignUpPage = () => {
    return (
        <div>
            <h1>Sign Up</h1>
            <SignUpForm />
        </div>
    );
}

class SignUpFormBase extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            error: null
        };
    }

    onSubmit = event => {
        const {username, email, password} = this.state;
        event.preventDefault();
        this.props.firebase
            // call firebase's signup function
            .doCreateUserWithEmailAndPassword(email, password)

             // if successful, reinitialize state back to blanks
            .then(authUser => {
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    passwordConfirmation: '',
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
        const {username, email, password, passwordConfirmation, error} = this.state;

        const isInvalid =
            password !== passwordConfirmation ||
            password === '' ||
            email === '' ||
            username === '';
        return (
        <form onSubmit={this.onSubmit}>
            <input 
                name = "username"
                value = {username}
                onChange = {this.onChange}
                type = "text"
                placeholder = "Username"
            />
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
            <input 
                name = "passwordConfirmation"
                value = {passwordConfirmation}
                onChange = {this.onChange}
                type = "password"
                placeholder = "Password Confirmation"
            />
            <button disabled = {isInvalid} type = "submit">Sign Up</button>
            {error && <p>{error.message}</p>}
        </form> 
        );
    }
}


const SignUpLink = () => {
    return(
        <p>Don't have an account? 
            <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
    )
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink };
