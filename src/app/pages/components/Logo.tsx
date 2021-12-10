import React, { Component } from 'react';

const logo = require('../../../../_metronic/assets/img/logoImg.png').default;

export default class Logo extends Component {
  render(): JSX.Element {
    return (
      <img src={logo} alt='Logo' />
    );
  }
}
