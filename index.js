/**
 * @format
 */
import 'react-native-gesture-handler';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

GoogleSignin.configure({
    webClientId: '1086206763805-c702vpspr6g0hf38pn5bubkn79944q6p.apps.googleusercontent.com',
  });

AppRegistry.registerComponent(appName, () => App);

