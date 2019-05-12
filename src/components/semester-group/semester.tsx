import React, { Component } from 'react';
import { ISemester } from '../../interfaces/semester.interface';
import { inject, observer } from 'mobx-react';
import { GpaStore } from '../../stores/gpa.store';

export interface SemesterProps {
  gpaStore?: GpaStore;
  semester: ISemester;
}

export interface SemesterState {
  semester: ISemester;
}

@inject('gpaStore')
@observer
class Semester extends React.Component<SemesterProps, SemesterState> {
  render() {
    return (
      <div className="col-12 col-md-4 mt-2" style={{ color: 'black' }}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Year {this.props.semester.year} Term {this.props.semester.term}
            </h5>

            <ul className="list-group">
              {this.props.semester.courses.map(course => (
                <li
                  key={course.name}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {course.name}
                  <span>
                    <span className="badge badge-pill mr-1">
                      {course.credit} CU
                    </span>
                    <span className="badge badge-primary badge-pill">
                      {course.grade}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Semester;
