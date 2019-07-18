import React, { Component, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inject, observer } from 'mobx-react';
import { GpaStore } from '../../stores/gpa.store';
import { ISemester } from '../../interfaces/semester.interface';

export interface ImporterProps {
  gpaStore?: GpaStore;
}

export interface ImporterState {}

@inject('gpaStore')
@observer
class Importer extends React.Component<ImporterProps, ImporterState> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = this.importJSON;

    if (event.target.files && event.target.files.length) {
      reader.readAsText(event.target.files[0]);
    }
  };

  importJSON = (event: any) => {
    const target = event.target as FileReader;
    this.props.gpaStore!.import(JSON.parse(
      target.result as string,
    ) as ISemester[]);
  };

  render() {
    return (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'inline',
        }}
      >
        <button className="btn btn-primary btn-sm mb-2">
          <FontAwesomeIcon icon="upload" /> Import GPA from JSON
          <input
            type="file"
            name="GPAJson"
            onChange={e => this.handleChange(e)}
            style={{
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              opacity: 0,
            }}
          />
        </button>
      </div>
    );
  }
}

export default Importer;
