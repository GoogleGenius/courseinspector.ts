import Course from './Course';
import CourseData from './types/courseData';
import React, { useRef } from 'react';

interface CourseViewerProps {
  authlevel: number;
  coursedata: CourseData;
}

function CourseViewer(props: CourseViewerProps): JSX.Element {
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

  type TagTypes = 'MAT' | 'ENG' | 'SOC' | 'SCI' | 'BUS' | 'ART' | 'IND' | 'MUS';

  // Ideally refactor literal types to enum later...
  function tagToggle(id: TagTypes): void {
    const tagButton = tagRefs[id].current; // I have no idea what I'm doing
    // @ts-expect-error Migration
    if (tagButton.classList.contains('tag-true')) {
      // @ts-expect-error Migration
      tagButton.classList.remove('tag-true');
    } else {
      // @ts-expect-error Migration
      tagButton.classList.add('tag-true');
    }
  }

  // Load classes
  const coursedata = Array.from(Object.keys(props.coursedata));
  const courseItems = Object.keys(coursedata).map((name) => (
    // eslint-disable-next-line react/jsx-key
    <Course
      authlevel={props.authlevel}
      course={coursedata[name as unknown as number]}
    />
  ));

  return (
    <div className="course-viewer">
      <div className="tag-container">
        <button
          ref={tagRefs.MAT}
          className="tag"
          onClick={() => tagToggle('MAT')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
          Math
        </button>
        <button
          ref={tagRefs.ENG}
          className="tag"
          onClick={() => tagToggle('ENG')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
          English
        </button>
        <button
          ref={tagRefs.SOC}
          className="tag"
          onClick={() => tagToggle('SOC')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
          History
        </button>
        <button
          ref={tagRefs.SCI}
          className="tag"
          onClick={() => tagToggle('SCI')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
          Science
        </button>
        <button
          ref={tagRefs.BUS}
          className="tag"
          onClick={() => tagToggle('BUS')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
          Business
        </button>
        <button
          ref={tagRefs.ART}
          className="tag"
          onClick={() => tagToggle('ART')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
          Art
        </button>
        <button
          ref={tagRefs.IND}
          className="tag"
          onClick={() => tagToggle('IND')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
          Trade
        </button>
        <button
          ref={tagRefs.MUS}
          className="tag"
          onClick={() => tagToggle('MUS')}
        >
          {/* @ts-expect-error Ion Icons with React and TypeScript are not compatible */}
          <ion-icon class="hide" name="checkmark-outline" />
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
