import * as React from 'react';
import { Component, FormEvent, ChangeEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { GpaStore } from '../../stores/gpa.store';

export interface SemesterInputProps {
  gpaStore?: GpaStore;
}

export interface SemesterInputState {
  name: string;
}

@inject('gradeSettingsStore')
@inject('gpaStore')
@observer
class SemesterInput extends React.Component<
  SemesterInputProps,
  SemesterInputState
> {
  state = {
    name: '',
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.gpaStore!.addSemester(this.state.name);
  };

  render() {
    return (
      <form onSubmit={(e: FormEvent) => this.handleSubmit(e)}>
        <div className="form-row mt-2">
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              placeholder="Semester Name"
              value={this.state.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.setState({ name: e.target.value })
              }
            />
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-success w-100">
              Add semester
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SemesterInput;
