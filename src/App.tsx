import React from 'react';
import './App.css';
import CGPA from './components/cgpa/cgpa';
import CourseInput from './components/course-input/course-input';
import SemesterGroup from './components/semester-group/semester-group';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faDownload,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import SubHeader from './components/sub-header/sub-header';
import SemesterInput from './components/semester-input/semester-input';

library.add(faTimes, faDownload, faUpload);

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container mt-5 mb-5">
        <CGPA />
        <hr />
        <CourseInput />
        <hr />
        <SemesterInput />
        <hr />
        <SubHeader />
        <SemesterGroup />
      </div>
    </div>
  );
};

export default App;
