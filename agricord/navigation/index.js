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
import DrumScanLoginStack from 'modules/login/LoginWithDrumScanDrawer.js';
import AppSettingsStack from 'modules/appSettings/AppSettingsDrawer.js';
import PaddockStack from 'modules/paddockPage/Drawer.js';
import MixNameStack from 'modules/mixName/Drawer.js';
import MixPageStack from 'modules/mixPage/Drawer.js';
import BatchStack from 'modules/batchPage/Drawer.js';
import ApplyTaskStack from 'modules/applyTask/ApplyTaskDrawer.js';
import OrderDetailsStack from 'modules/orderDetails/OrderDetailsDrawer.js';
import SettingsPageStack from 'modules/settingsPage/SettingsPageDrawer.js';
import ProductDetails from 'modules/product/ProductDetailsDrawer.js';
import HomeDrawerStack from 'modules/homepage/HomeStack.js';
import ProductDetailsOfflineDrawer from 'modules/product/ProductDetailsOfflineDrawer.js';
import DetailsStack from 'modules/paddockPage/DetailsDrawer.js'
import UnallocatedBatchStack from 'modules/unallocatedBatch/Drawer.js'
import SessionStack from 'modules/sessionPage/DetailsDrawer.js'
import MixNameUnallocatedStack from 'modules/mixNameUnallocated/Drawer.js';
import ManualBatchPage from 'modules/manualBatchPage/Drawer.js';
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
    drumScanLoginStack: {screen: DrumScanLoginStack},
    appSettingsStack: {screen: AppSettingsStack},
    applyTaskStack: {screen: ApplyTaskStack},
    orderDetailsStack: {screen: OrderDetailsStack},
    batchStack: {screen: BatchStack},
    paddockStack: {screen: PaddockStack},
    mixNameStack: {screen: MixNameStack},
    mixPageStack: {screen: MixPageStack},
    settingsPageStack: {screen: SettingsPageStack},
    productDetailsStack: {screen: ProductDetails},
    HomeDrawerStack: {screen: HomeDrawerStack},
    productDetailsOfflineStack: { screen: ProductDetailsOfflineDrawer},
    detailsStack: { screen: DetailsStack},
    unallocatedBatchStack: { screen: UnallocatedBatchStack},
    sessionStack: { screen: SessionStack},
    mixNameUnallocatedStack: {screen: MixNameUnallocatedStack},
    manualBatchPage: { screen: ManualBatchPage }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'loginStack',
  },
);

export default PrimaryNav;
