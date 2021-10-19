import React from 'react';
import Color from './Color.js';
import {
  faEdit,
  faComments,
  faCheck,
  faPaperPlane,
  faUser,
  faMapMarker,
  faCreditCard,
  faQuestionCircle,
  faUsers,
  faFile,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

import TasksIcon from 'assets/drawer/tasks_icon.svg';
import InventoryIcon from 'assets/drawer/inventory_icon.svg';
import OrdersIcon from 'assets/drawer/orders_icon.svg';
import SettingsIcon from 'assets/drawer/settings_icon.svg';
import TasksActive from 'assets/drawer/tasks_active.svg';
import InventoryActive from 'assets/drawer/inventory_active.svg';
import OrdersActive from 'assets/drawer/orders_active.svg';
import SettingsActive from 'assets/drawer/settings_active.svg';
import CompleteTaskIcon from 'assets/drawer/complete_task_icon.svg';
import HammerIcon from 'assets/drawer/hammer_solid.svg';
import LogoutIcon from 'assets/drawer/logout_icon.svg';

export default {
  company: 'Increment Technologies',
  APP_NAME: '@Agicord_',
  APP_NAME_BASIC: 'Agicord',
  APP_EMAIL: 'support@traceag.com.au',
  APP_WEBSITE: 'support@traceag.com.au',
  APP_HOST: 'com.agricord',
  DrawerMenu: [
    {
      title: 'Tasks',
      route: 'Tasks',
      defaultIcon: <TasksIcon />,
      activeIcon: <TasksActive />,
      subRoutes: [{
        title: 'Tasks In Progress',
        route: 'TasksInProgress'
      }, {
        title: 'Tasks Due',
        route: 'TasksDue'
      }, {
        title: 'Tasks History',
        route: 'TasksHistory'
      }]
    }, {
      title: 'Inventory',
      route: 'InventoryHerbicides',
      defaultIcon: <InventoryIcon />,
      activeIcon: <InventoryActive />,
      subRoutes: [{
        title: 'Herbicides',
        route: 'InventoryHerbicides'
      }, {
        title: 'Fungicides',
        route: 'InventoryFungicides'
      }, {
        title: 'Insecticides',
        route: 'InventoryInsecticides'
      }, {
        title: 'Other',
        route: 'InventoryOther'
      }]
    }, {
      title: 'Orders',
      route: 'Orders',
      defaultIcon: <OrdersIcon />,
      activeIcon: <OrdersActive />,
      subRoutes: [{
        title: 'Upcoming Orders',
        route: 'UpcomingOrders'
      }, {
        title: 'Historical Orders',
        route: 'HistoricalOrders'
      }]
    }, {
      title: 'Settings',
      route: 'Settings',
      defaultIcon: <SettingsIcon />,
      activeIcon: <SettingsActive />,
      subRoutes: [{
        title: 'Account Settings',
        route: 'AccountSettings'
      }, {
        title: 'App Settings',
        route: 'AppSettings'
      }]
    }
  ],
  DrawerMenuLogout: [{
    // TEMP. ONLY (SHOULD BE ON DRAWERMENU_LOGGEDIN)
    title: 'Tasks',
    route: 'Tasks',
    defaultIcon: <TasksIcon />,
    activeIcon: <TasksActive />,
    subRoutes: [{
      title: 'Tasks In Progress',
      route: 'TasksInProgress'
    }, {
      title: 'Tasks Due',
      route: 'TasksDue'
    }, {
      title: 'Tasks History',
      route: 'TasksHistory'
    }]
  }, {
    title: 'Inventory',
    route: 'InventoryHerbicides',
    defaultIcon: <InventoryIcon />,
    activeIcon: <InventoryActive />,
    subRoutes: [{
      title: 'Herbicides',
      route: 'InventoryHerbicides'
    }, {
      title: 'Fungicides',
      route: 'InventoryFungicides'
    }, {
      title: 'Insecticides',
      route: 'InventoryInsecticides'
    }, {
      title: 'Other',
      route: 'InventoryOther'
    }]
  }, {
    title: 'Orders',
    route: 'Orders',
    defaultIcon: <OrdersIcon />,
    activeIcon: <OrdersActive />,
    subRoutes: [{
      title: 'Upcoming Orders',
      route: 'UpcomingOrders'
    }, {
      title: 'Historical Orders',
      route: 'HistoricalOrders'
    }]
  }, {
    title: 'Settings',
    route: 'Settings',
    defaultIcon: <SettingsIcon />,
    activeIcon: <SettingsActive />,
    subRoutes: [{
      title: 'Account Settings',
      route: 'AccountSettings'
    }, {
      title: 'App Settings',
      route: 'AppSettings'
    }]
  }],
  DrawerMenuBottom: [
    // {
    //   title: 'Settings',
    //   route: 'Settings',
    // },
    // {
    //   title: 'Terms and Conditions',
    //   route: 'TermsAndConditions',
    // },
    // {
    //   title: 'Privacy Policy',
    //   route: 'PrivacyPolicy',
    // },
    {
      title: 'Unallocated batches',
      route: 'UnallocatedBatch',
      defaultIcon: <HammerIcon />,
    }, {
      title: 'Complete spray task',
      route: 'TasksHistory',
      defaultIcon: <CompleteTaskIcon />,
    }, {
      title: 'Log out',
      route: 'Logout',
      defaultIcon: <LogoutIcon />
    }
  ],
  pagerMenu: [
    {
      title: 'FEATURED',
      value: 'featured',
    },
    {
      title: 'CATEGORIES',
      value: 'categories',
    },
    {
      title: 'SHOPS',
      value: 'shops',
    },
    {
      title: 'OTHERS',
      value: 'others',
    },
  ],
  pusher: {
    broadcast_type: 'pusher',
    channel: 'runway',
    notifications: 'App\\Events\\Notifications',
    orders: 'App\\Events\\Orders',
    typing: 'typing',
    messages: 'App\\Events\\Message',
    messageGroup: 'App\\Events\\MessageGroup',
    rider: 'App\\Events\\Rider',
  },
  tutorials: [
    // {
    //   key: 1,
    //   title: 'Welcome to Agicord!',
    //   text: 'Delivering food and more to your doorstep!',
    //   icon: null,
    //   // image: require('assets/logo.png'),
    //   colors: [Color.primary, Color.lightGray],
    // },
  ],
  referral: {
    message:
      `Share the benefits of <<popular products>> with your friends and family. ` +
      `Give them ₱100 towards their first purchase when they confirm your invite. ` +
      `You’ll get ₱100 when they do!`,
    emailMessage: "I'd like to invite you on RunwayExpress!",
  },
  categories: [
    {
      type: 'Asian',
    },
    {
      type: 'American',
    },
    {
      type: 'Beverages',
    },
  ],
  retrieveDataFlag: 1,
  delimeter: '<>',
  validateEmail(email) {
    let reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+.[a-zA-Z0-9]*$/;
    if (reg.test(email) === false) {
      return false;
    } else {
      return true;
    }
  },
};
