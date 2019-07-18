import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { GpaStore } from '../../stores/gpa.store';

export interface CGPAProps {
  gpaStore?: GpaStore;
}

export interface CGPAState {}

@inject('gpaStore')
@observer
class CGPA extends React.Component<CGPAProps, CGPAState> {
  render() {
    return <h2 className="cgpa text-center">CGPA {this.props.gpaStore!.cgpa}</h2>;
  }
}

export default CGPA;
