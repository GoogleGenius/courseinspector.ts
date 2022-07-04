import './App.css';
import firebaseConfig from './config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import React, { useRef, useState } from 'react';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Set data to realtime database
firebase.database().ref();

interface CourseProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any;
  authlevel: number;
}

function Course(props: CourseProps): JSX.Element {
  const course = props.course; // needs to be re-typed
  console.log(course);
  const authlevel = props.authlevel ? props.authlevel : 0;
  const [isEditing, setIsEditing] = useState(false);

  const refs = {
    credits: useRef(null),
    length: useRef(null),
    format: useRef(null),
    courseid: useRef(null),
    gradelevels: useRef(null),
    prerequisites: useRef(null),
    fees: useRef(null),
    corequisite: useRef(null),
    subsequent: useRef(null),
    studentrecommendations: useRef(null),
    considerations: useRef(null),
    description: useRef(null),
  };

  // Add collapse
  function ToggleCollapse(
    btn: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    btn.currentTarget.classList.toggle('active');
    const content = btn.currentTarget.nextElementSibling as HTMLButtonElement;
    if (content.style.maxHeight) {
      btn.currentTarget.innerHTML = 'See more';
      content.style.removeProperty('max-height');
    } else {
      btn.currentTarget.innerHTML = 'See less';
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }

  function Edit(btn: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    // btn.classList.toggle("hide");
    btn.currentTarget.classList.toggle('hide');
    setIsEditing(true);
  }

  function Cancel(): void {
    setIsEditing(false);
  }

  function Submit(): void {
    const newCourse = {};
    const loopName: string = course.coursename
      .toLowerCase()
      .replaceAll(' ', '-');

    // @ts-expect-error Migration
    newCourse[loopName] = {};

    Object.keys(course).forEach((key) => {
      try {
        if (key === 'description') {
          // @ts-expect-error Migration
          newCourse[loopName][key] =
            // @ts-expect-error Migration
            refs[key].current.childNodes[0].textContent;
        } else {
          // @ts-expect-error Migration
          newCourse[loopName][key] =
            // @ts-expect-error Migration
            refs[key].current.childNodes[1].wholeText.trim();
        }
      } catch (error) {
        // @ts-expect-error Migration
        newCourse[loopName][key] = course[key];
      }
    });

    firebase
      .database()
      .ref('courses')
      .update({
        // @ts-expect-error Migration
        [loopName]: newCourse[loopName],
      });

    // Note: introduce student comments with this: studentrecommendations: parseInt(studentrecommendations.current.childNodes[1].wholeText.trim()),
    // Exit the edit menu
    setIsEditing(false);
  }

  return (
    <div suppressContentEditableWarning className="Course">
      <h1 className="coursetitle">{course.coursename}</h1>
      <br />
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.credits}
        className="coursedescription"
      >
        <b contentEditable="false">Credits:</b> {course.credits}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.length}
        className="coursedescription"
      >
        <b contentEditable="false">Length:</b> {course.length}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.format}
        className="coursedescription"
      >
        <b contentEditable="false">Format:</b> {course.format}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.courseid}
        className="coursedescription"
      >
        <b contentEditable="false">Course ID:</b> {course.courseid}
      </p>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.gradelevels}
        className="coursedescription"
      >
        <b contentEditable="false">Grade Levels:</b> {course.gradelevels}
      </p>
      <br />
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.prerequisites}
        className="coursedescription"
      >
        <b contentEditable="false">Prerequisites:</b> {course.prerequisites}
      </p>
      <br />
      {course.fees !== null && (
        <p
          suppressContentEditableWarning
          contentEditable={isEditing}
          ref={refs.fees}
          className="coursedescription"
        >
          <b contentEditable="false">Fees:</b> {course.fees}
        </p>
      )}
      {course.corequisite !== null && (
        <div>
          <p
            suppressContentEditableWarning
            contentEditable={isEditing}
            ref={refs.corequisite}
            className="coursedescription"
          >
            <b contentEditable="false">Corequisites:</b> {course.corequisite}
          </p>
          <br />
        </div>
      )}
      {course.subsequent !== null && (
        <div>
          <p
            suppressContentEditableWarning
            contentEditable={isEditing}
            ref={refs.subsequent}
            className="coursedescription"
          >
            <b contentEditable="false">Subsequent:</b> {course.subsequent}
          </p>
          <br />
        </div>
      )}
      {course.studentrecommendations !== null && (
        <div>
          <p
            suppressContentEditableWarning
            contentEditable={isEditing}
            ref={refs.studentrecommendations}
            className="coursedescription"
          >
            <b contentEditable="false">Recommendation:</b>{' '}
            {course.studentrecommendations}
          </p>
          <br />
        </div>
      )}
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.considerations}
        className="coursedescription"
      >
        <b contentEditable="false">Considerations:</b> {course.considerations}
      </p>
      <br />
      <button className="collapsible" onClick={(btn) => ToggleCollapse(btn)}>
        See more
      </button>
      <p
        suppressContentEditableWarning
        contentEditable={isEditing}
        ref={refs.description}
        className="coursedescription content-collapsible"
      >
        {course.description}
      </p>
      <div className="flex-container">
        {isEditing && (
          <button onClick={() => Cancel()} className="button">
            Cancel
          </button>
        )}
        {isEditing && (
          <button onClick={() => Submit()} className="button-primary">
            Submit
          </button>
        )}
      </div>
      {authlevel === 5 && !isEditing && (
        /* @ts-expect-error Ion Icons with React and TypeScript are not compatible */
        <ion-icon
          onClick={(btn: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            Edit(btn)
          }
          className="edit"
          name="pencil-outline"
        />
      )}
    </div>
  );
}

export default Course;
