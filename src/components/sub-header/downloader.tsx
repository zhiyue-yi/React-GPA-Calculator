import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GpaStore } from '../../stores/gpa.store';

export interface DownloaderProps {
  gpaStore?: GpaStore;
}

export interface DownloaderState {}

@inject('gpaStore')
@observer
class Downloader extends React.Component<DownloaderProps, DownloaderState> {
  downloadJSON = () => {
    const json = JSON.stringify(this.props.gpaStore!.semesters);
    const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(json);
    const element = document.createElement('a');
    element.setAttribute('href', data);
    element.setAttribute('download', 'GPA.json');
    element.click();
  };
  render() {
    return (
      <button
        className="btn btn-primary btn-sm mb-2 ml-2"
        onClick={() => this.downloadJSON()}
      >
        <FontAwesomeIcon icon="download" /> Export as JSON
      </button>
    );
  }
}

export default Downloader;
