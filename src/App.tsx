import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import userdefault from "./assets/user.png";
import CourseViewer from "./CourseViewer.js";
import "./App.css";
import firebase from "firebase/compat/app";
import IonIcon from "@reacticons/ionicons";

function App(props: {
    signInWithRedirect: (ref: any) => void;
    user: firebase.User | null;
    authlevel: number;
    coursedata: any;
}) {
    const signInButton = useRef(null);
    const { signInWithRedirect, user, authlevel, coursedata } = props;

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    function toggleNav() {
        if (
            getComputedStyle(document.documentElement)
                .getPropertyValue("--nav-width")
                .trim() !== "250px"
        ) {
            if (
                getComputedStyle(document.documentElement)
                    .getPropertyValue("--pull-width")
                    .trim() !== "0px"
            ) {
                document.documentElement.style.removeProperty("--pull-width");
            } else {
                document.documentElement.style.setProperty(
                    "--pull-width",
                    `${
                        250 -
                        getComputedStyle(document.documentElement)
                            .getPropertyValue("--nav-width")
                            .trim()
                            .substring(
                                0,
                                getComputedStyle(document.documentElement)
                                    .getPropertyValue("--nav-width")
                                    .trim().length - 2
                            )
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
                                    <IonIcon name="school-outline"></IonIcon>
                                </span>
                                <span className="title">Course Inspector</span>
                            </a>
                        </li>
                        <li className="hovered">
                            <a href=".">
                                <span className="icon">
                                    <IonIcon name="search-outline"></IonIcon>
                                </span>
                                <span className="title">Search All</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://cdn.linnmar.k12.ia.us/wp-content/uploads/2016/11/2022-2023-LMHS-Program-of-Studies-FINAL2-1.pdf">
                                <span className="icon">
                                    <IonIcon name="document-text-outline"></IonIcon>
                                </span>
                                <span className="title">PDF</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main">
                <div className="topbar">
                    <div className="toggle" onClick={() => toggleNav()}>
                        <IonIcon name="menu-outline"></IonIcon>
                    </div>
                    <div className="search">
                        <label>
                            <input
                                id="searchbar"
                                type="text"
                                name="search"
                                placeholder="Search for classes..."
                            ></input>
                            <IonIcon name="search-outline"></IonIcon>
                        </label>
                    </div>

                    <button
                        ref={signInButton}
                        id="signer"
                        onClick={() => signInWithRedirect(signInButton)}
                        className="login"
                    >
                        {user ? "Sign Out" : "Login"}
                    </button>

                    <div className="user">
                        <img
                            alt="profile"
                            id="user-img"
                            src={user ? user.photoURL : userdefault}
                        ></img>
                    </div>
                </div>
                <Router>
                    <Routes>
                        <Route path="/test" />
                        <Route
                            path="/"
                            element={
                                <CourseViewer
                                    coursedata={coursedata}
                                    authlevel={authlevel}
                                />
                            }
                        ></Route>
                    </Routes>
                </Router>
            </div>
            <div
                onClick={() => topFunction()}
                id="to-top"
                className="jump-to-top"
            >
                <IonIcon name="chevron-up-outline" size="large"></IonIcon>
            </div>
        </div>
    );
}

export default App;
