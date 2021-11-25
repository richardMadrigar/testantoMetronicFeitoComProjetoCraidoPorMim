import React, { Component } from 'react';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// import Logo from '../../../../_metronic/assets/img/logoImg.png';
const logo = require('../../../../_metronic/assets/img/logoImg.png').default;

export default class Logo extends Component {
  render(): JSX.Element {
    return (
      <img src={logo} alt='Logo' />
    );
  }
}
