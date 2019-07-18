import * as React from 'react';
import { Component, FormEvent, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { GradeSettingsStore } from '../../stores/grade-settings.store';
import { GpaStore } from '../../stores/gpa.store';
import { ICourse } from '../../interfaces/course.interface';
import { ISemester } from '../../interfaces/semester.interface';

export interface CourseInputProps {
  gradeSettingsStore?: GradeSettingsStore;
  gpaStore?: GpaStore;
}

export interface CourseInputState {
  course?: ICourse;
  selectedSemester: ISemester;
}

@inject('gradeSettingsStore')
@inject('gpaStore')
@observer
class CourseInput extends React.Component<CourseInputProps, CourseInputState> {
  state = {
    selectedSemester: this.props.gpaStore!.semesters[0],
    course: {
      name: '',
      grade: '',
      credit: 0,
    },
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.gpaStore!.addCourse(
      this.state.selectedSemester,
      this.state.course,
    );
  };

  handleSemesterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSemester = this.props.gpaStore!.semesters.find(
      s => s.name === e.target.value,
    );
    if (selectedSemester) {
      this.setState({
        selectedSemester,
      });
    }
  };

  render() {
    return (
      <form className="course-input" onSubmit={(e: FormEvent) => this.handleSubmit(e)}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="course-input__name form-control"
              placeholder="Course Name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.setState({
                  course: {
                    ...this.state.course,
                    name: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="form-row mt-2">
          <div className="col-5">
            <select
              className="course-input__semester form-control"
              defaultValue={this.state.selectedSemester.name}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                this.handleSemesterChange(e)
              }
            >
              <option>Select a semester</option>
              {this.props.gpaStore!.semesters.map(semester => (
                <option
                  key={semester.name}
                  value={semester.name}
                  defaultChecked={
                    semester.name === this.state.selectedSemester.name
                  }
                >
                  {semester.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <input
              type="text"
              className="course-input__credit-unit form-control"
              placeholder="Credit Units"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.setState({
                  course: {
                    ...this.state.course,
                    credit: Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div className="col-3">
            <select
              className="course-input__grade form-control"
              value={this.state.course.grade}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                this.setState({
                  course: {
                    ...this.state.course,
                    grade: e.target.value,
                  },
                })
              }
            >
              <option>Select Grade</option>
              {this.props.gradeSettingsStore!.settings.map(setting => (
                <option value={setting.grade} key={setting.grade}>
                  {setting.grade}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row mt-2">
          <div className="col">
            <button type="submit" className="course-input__add-button btn btn-success w-100">
              Add Course
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default CourseInput;
