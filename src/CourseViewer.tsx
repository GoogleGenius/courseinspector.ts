import React, { useRef } from "react";
import Course from "./Course.js";
import IonIcon from "@reacticons/ionicons";

function CourseViewer(props: { coursedata: any; authlevel: number }) {
    const tagRefs = {
        MAT: useRef(null),
        ENG: useRef(null),
        SOC: useRef(null),
        SCI: useRef(null),
        BUS: useRef(null),
        ART: useRef(null),
        IND: useRef(null),
        MUS: useRef(null),
    };

    // Ideally refactor literal types to enum later...
    function tagToggle(
        id: "MAT" | "ENG" | "SOC" | "SCI" | "BUS" | "ART" | "IND" | "MUS"
    ) {
        const tagButton = tagRefs[id].current;
        if (tagButton.classList.contains("tag-true")) {
            tagButton.classList.remove("tag-true");
        } else {
            tagButton.classList.add("tag-true");
        }
    }

    //Load classes
    const coursedata = Array.from(Object.keys(props.coursedata));
    console.table(props.coursedata);
    const courseItems = Object.keys(coursedata).map((name) => (
        <Course authlevel={props.authlevel} course={coursedata[name]} />
    ));

    return (
        <div className="course-viewer">
            <div className="tag-container">
                <button
                    ref={tagRefs.MAT}
                    className="tag"
                    onClick={() => tagToggle("MAT")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    Math
                </button>
                <button
                    ref={tagRefs.ENG}
                    className="tag"
                    onClick={() => tagToggle("ENG")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    English
                </button>
                <button
                    ref={tagRefs.SOC}
                    className="tag"
                    onClick={() => tagToggle("SOC")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    History
                </button>
                <button
                    ref={tagRefs.SCI}
                    className="tag"
                    onClick={() => tagToggle("SCI")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    Science
                </button>
                <button
                    ref={tagRefs.BUS}
                    className="tag"
                    onClick={() => tagToggle("BUS")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    Business
                </button>
                <button
                    ref={tagRefs.ART}
                    className="tag"
                    onClick={() => tagToggle("ART")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    Art
                </button>
                <button
                    ref={tagRefs.IND}
                    className="tag"
                    onClick={() => tagToggle("IND")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    Trade
                </button>
                <button
                    ref={tagRefs.MUS}
                    className="tag"
                    onClick={() => tagToggle("MUS")}
                >
                    <IonIcon className="hide" name="checkmark-outline"></IonIcon>
                    Music
                </button>
            </div>
            <div className="course-container">
                <div className="parent">{courseItems}</div>
            </div>
        </div>
    );
}

export default CourseViewer;
