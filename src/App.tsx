import './App.css';
import CourseViewer from './CourseViewer';
import userdefault from './assets/user.png';
import CourseData from './types/courseData';
import firebase from 'firebase/compat/app';
import React, { useRef } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

interface AppProps {
  authlevel: number;
  coursedata: CourseData;
  signInWithRedirect: () => void; // fix this type later probably...
  user: firebase.User | null;
}

function App(props: AppProps): JSX.Element {
  const signInButton = useRef(null);
  const { signInWithRedirect, user, authlevel, coursedata } = props;

  // When the user clicks on the button, scroll to the top of the document
  function topFunction(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function toggleNav(): void {
    if (
      getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-width')
        .trim() !== '250px'
    ) {
      if (
        getComputedStyle(document.documentElement)
          .getPropertyValue('--pull-width')
          .trim() !== '0px'
      ) {
        document.documentElement.style.removeProperty('--pull-width');
      } else {
        document.documentElement.style.setProperty(
          '--pull-width',
          `${
            250 -
            (getComputedStyle(document.documentElement)
              .getPropertyValue('--nav-width')
              .trim()
              .substring(
                0,
                getComputedStyle(document.documentElement)
                  .getPropertyValue('--nav-width')
                  .trim().length - 2
              ) as unknown as number)
          }px`
        );
      }
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a href=".">
                <span className="icon">
                  {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
                  <ion-icon name="school-outline" />
                </span>
                <span className="title">Course Inspector</span>
              </a>
            </li>
            <li className="hovered">
              <a href=".">
                <span className="icon">
                  {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
                  <ion-icon name="search-outline" />
                </span>
                <span className="title">Search All</span>
              </a>
            </li>
            <li>
              <a href="https://cdn.linnmar.k12.ia.us/wp-content/uploads/2016/11/2022-2023-LMHS-Program-of-Studies-FINAL2-1.pdf">
                <span className="icon">
                  {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
                  <ion-icon name="document-text-outline" />
                </span>
                <span className="title">PDF</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main">
        <div className="topbar">
          <div className="toggle" onClick={toggleNav}>
            {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
            <ion-icon name="menu-outline" />
          </div>
          <div className="search">
            <label htmlFor="searchbar">
              {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
              <ion-icon name="search-outline" />
            </label>
            <input
              id="searchbar"
              type="text"
              name="search"
              placeholder="Search for classes..."
            />
          </div>

          <button
            ref={signInButton}
            id="signer"
            onClick={signInWithRedirect}
            className="login"
          >
            {user != null ? 'Sign Out' : 'Login'}
          </button>

          <div className="user">
            <img
              alt="profile"
              id="user-img"
              src={user !== null && user.photoURL ? user.photoURL : userdefault}
            />
          </div>
        </div>
        <Router>
          <Routes>
            <Route path="/test" />
            <Route
              path="/"
              element={
                <CourseViewer coursedata={coursedata} authlevel={authlevel} />
              }
            />
          </Routes>
        </Router>
      </div>
      <div onClick={topFunction} id="to-top" className="jump-to-top">
        {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
        <ion-icon name="chevron-up-outline" />
      </div>
    </div>
  );
}

export default App;
