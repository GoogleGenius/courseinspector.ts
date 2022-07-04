import App from './App';
import firebaseConfig from './config/firebase';
import localcoursedata from './data/coursedata.json';
import './index.css';
import CourseData from './types/courseData';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import React from 'react';
import ReactDOM from 'react-dom';

let coursedata: CourseData;
let user: firebase.User | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let authdata: any;
let authlevel = 0;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth();

const dbRef = firebase.database().ref();
const provider = new firebase.auth.GoogleAuthProvider();

dbRef
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) {
      coursedata = snapshot.val().courses;
      RenderDom();
    } else {
      coursedata = localcoursedata;
      RenderDom();
    }
  })
  .catch(() => {
    coursedata = localcoursedata;
    RenderDom();
  });

firebase
  .auth()
  .getRedirectResult()
  .then((result) => {
    // The signed-in user info.
    user = result.user;
    RenderDom();

    dbRef
      .get()
      .then((snapshot) => {
        if (!snapshot.exists() || user === null) {
          return;
        }

        // Authorize the user if the user has been logged in
        authdata = snapshot.val().users;

        try {
          Object.keys(authdata).forEach((key) => {
            if (user?.email === authdata[key].email) {
              authlevel = authdata[key].level;
              console.log(
                `You are currently authorized with a level of ${authlevel}`
              );
            }
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log(error));
  })
  .catch((error) => console.error(error));

function RenderDom(): void {
  ReactDOM.render(
    <React.StrictMode>
      <App
        coursedata={coursedata}
        user={user}
        authlevel={authlevel}
        signInWithRedirect={signInWithRedirect}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function signInWithRedirect(): void {
  if (user === null) {
    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase
      .auth()
      .signOut()
      .then(() => {
        user = null;
        authlevel = 0;
        // Sign-out successful.
        // Update DOM to match
        RenderDom();
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
}
