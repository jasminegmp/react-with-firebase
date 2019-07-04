import app from 'firebase/app';
import 'firebase/auth';

const config = require('../../config').default;

var firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
  };


// Initialize Firebase
class Firebase{
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }
  // Authentication API

  // create a user
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  // set up login and signin that uses password and email
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  //sign out
  doSignOut = () => this.auth.signOut();

  //reset and update password
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;


