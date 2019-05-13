import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { GpaStore } from '../../stores/gpa.store';
import Semester from './semester';

export interface SemesterGroupProps {
  gpaStore?: GpaStore;
}

export interface SemesterGroupState {}

@inject('gpaStore')
@observer
class SemesterGroup extends React.Component<
  SemesterGroupProps,
  SemesterGroupState
> {
  render() {
    return (
      <div className="row">
        {this.props.gpaStore!.semesters.map(semester => (
          <Semester semester={semester} key={semester.name} />
        ))}
      </div>
    );
  }
}

export default SemesterGroup;
