import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Welcome from './src/Screens/Welcome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Welcome />
    );
  }
}
