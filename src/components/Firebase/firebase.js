import app from "firebase/app";
import firebase from 'firebase';
import config from "../../configs/firebaseConfig";
import "firebase/auth";

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = firebase.database()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  transactions = uid =>
    this.db
      .ref()
      .child("Transaction")
      .orderByChild("merchantId")
      .equalTo(uid);
}

export default Firebase;
