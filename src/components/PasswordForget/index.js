import React from 'react';
import {Link} from 'react-router-dom'; // <<<

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => {
    return (
        <div>
            <h1>PasswordForget</h1>
            <PasswordForgetForm /> {/* << */}
        </div>
    );
}

class PasswordForgetFormBase extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { // <<<<<
            email: '',
            error: null
        };
    }

    onSubmit = event => {
        const {email} = this.state;
        event.preventDefault();
        this.props.firebase
            // call firebase's password reset
            .doPasswordReset(email) // <<<<

             // if successful, reinitialize state back to blanks
            .then(() => {
                this.setState({ // <<<<
                    email: '',
                    error: null
                });
            })

            .catch(error => {
                this.setState({error});
            }); 
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, error} = this.state;

        const isInvalid =  email === ''; // <<< only need to check email
        return (
        <form onSubmit={this.onSubmit}>
            <input 
                name = "email"
                value = {email}
                onChange = {this.onChange}
                type = "text"
                placeholder = "Email"
            />
            <button disabled = {isInvalid} type = "submit">Submit</button>
            {error && <p>{error.message}</p>}
        </form> 
        );
    }
}


const PasswordForgetLink = () => ( <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;
export { PasswordForgetLink, PasswordForgetForm };
