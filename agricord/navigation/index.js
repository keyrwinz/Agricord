import {createStackNavigator} from 'react-navigation-stack';
import Login from 'modules/login';
import ForgotPassword from 'modules/basics/ForgotPassword';
import Register from 'modules/basics/Register';
import Drawer from './Drawer';
import NotificationStack from 'modules/basics/Welcome.js';
import selectLocationStack from 'modules/basics/Welcome.js';
import selectFilterStack from 'modules/basics/Welcome.js';
import CartStack from 'modules/basics/Welcome.js';
import addressMapStack from 'modules/basics/Welcome.js';
import paymentOptionStack from 'modules/basics/Welcome.js';
import ChangeAddressStack from 'modules/basics/Welcome.js';
import DrumScanLogin from 'modules/login/DrumScanLogin';
import AppSettingsStack from 'modules/appSettings/AppSettingsDrawer.js';
// login stack
const LoginStack = createStackNavigator(
  {
    loginScreen: {screen: Login},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Forgot Password stack
const ForgotPasswordStack = createStackNavigator(
  {
    forgotPasswordScreen: {screen: ForgotPassword},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Forgot Password stack
const RegisterStack = createStackNavigator(
  {
    registerScreen: {screen: Register},
  },
  {
    headerMode: 'none',
    navigationOptions: {},
  },
);

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    loginStack: {screen: LoginStack},
    forgotPasswordStack: {screen: ForgotPasswordStack},
    registerStack: {screen: RegisterStack},
    drawerStack: {screen: Drawer},
    // selectLocation:{screen:selectLocationStack},
    // filterPicker:{screen:selectFilterStack},
    // notificationStack: {screen: NotificationStack},
    // Cart:{screen:CartStack},
    // addressMap: {screen: addressMapStack},
    // paymentOptions: {screen: paymentOptionStack},
    // ChangeAddress: {screen: ChangeAddressStack},
    drumScanLoginStack: {screen: DrumScanLogin},
    appSettingsStack: {screen: AppSettingsStack},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'drawerStack',
  },
);

export default PrimaryNav;
