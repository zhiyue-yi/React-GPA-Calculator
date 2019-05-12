import React from 'react';
import './App.css';
import CGPA from './components/cgpa/cgpa';
import CourseInput from './components/course-input/course-input';
import SemesterGroup from './components/semester-group/semester-group';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="container mt-5 mb-5">
        <CGPA />
        <hr />
        <CourseInput />
        <hr />
        <SemesterGroup />
      </div>
    </div>
  );
};

export default App;
