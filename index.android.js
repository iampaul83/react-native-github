/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HomeScene from './src/home';
import RepoScene from './src/repo';

console.disableYellowBox = true;

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={HomeScene} title="Home" sceneStyle={{ marginTop: 54 }} initial={true} />
    <Scene key="repo" component={RepoScene} title="Repo" sceneStyle={{ marginTop: 54 }} />
  </Scene>
);

export default class ReactNativeProject extends Component {
  render() {
    return <Router scenes={scenes} />
  }
}

AppRegistry.registerComponent('ReactNativeProject', () => ReactNativeProject);
