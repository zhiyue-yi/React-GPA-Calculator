import React, { Component } from 'react';
import Downloader from './downloader';
import Importer from './importer';

const SubHeader: React.FC = () => (
  <div className="text-right">
    <Importer />
    <Downloader />
  </div>
);

export default SubHeader;
