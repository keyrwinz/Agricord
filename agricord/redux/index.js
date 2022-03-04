import AsyncStorage from '@react-native-community/async-storage';
import Data from 'services/Data';
import {Helper, Color} from 'common';

const types = {
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  UPDATE_USER: 'UPDATE_USER',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
  ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
  UPDATE_PRODUCT_TO_CART: 'UPDATE_PRODUCT_TO_CART',
  REMOVE_PRODUCT_TO_CART: 'REMOVE_PRODUCT_TO_CART',
  RETRIEVE_CART: 'RETRIEVE_CART',
  SET_THEME: 'SET_THEME',
  ADD_PRODUCT_FILTER: 'ADD_PRODUCT_FILTER',
  REMOVE_PRODUCT_FILTER: 'REMOVE_PRODUCT_FILTER',
  SET_LOCATION: 'SET_LOCATION',
  SET_MESSAGES: 'SET_MESSAGES',
  SET_MESSENGER_GROUP: 'SET_MESSENGER_GROUP',
  UPDATE_MESSENGER_GROUP: 'UPDATE_MESSENGER_GROUP',
  SET_MESSAGES_ON_GROUP: 'SET_MESSAGES_ON_GROUP',
  UPDATE_MESSAGES_ON_GROUP: 'UPDATE_MESSAGES_ON_GROUP',
  UPDATE_MESSAGE_BY_CODE: 'UPDATE_MESSAGE_BY_CODE',
  UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD: 'UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD',
  nav: null,
  SET_SELECTED_ORDER: 'SET_SELECTED_ORDER',
  SET_TASK: 'SET_TASK',
  SET_MIX_NAME: 'SET_MIX_NAME',
  SET_PADDOCK: 'SET_PADDOCK',
  SET_PRODUCT: 'SET_PRODUCT',
  SET_DEDICATED_NFC: 'SET_DEDICATED_NFC',
  SET_STAY_LOGGED_IN: 'SET_STAY_LOGGED_IN'
};

export const actions = {
  login: (user, token) => {
    return {type: types.LOGIN, user, token};
  },
  logout() {
    return {type: types.LOGOUT};
  },
  updateUser: user => {
    return {type: types.UPDATE_USER, user};
  },
  setNotifications(unread, notifications) {
    return {type: types.SET_NOTIFICATIONS, unread, notifications};
  },
  updateNotifications(unread, notification) {
    return {type: types.UPDATE_NOTIFICATIONS, unread, notification};
  },
  addProductToCart(product) {
    return {type: types.ADD_PRODUCT_TO_CART, product};
  },
  updateProductToCart(product) {
    return {type: types.UPDATE_PRODUCT_TO_CART, product};
  },
  retrieveCart: cartItems => {
    return {type: types.RETRIEVE_CART, cartItems};
  },
  removeProductToCart(product) {
    return {type: types.REMOVE_PRODUCT_TO_CART, product};
  },
  setTheme(theme) {
    return {type: types.SET_THEME, theme};
  },
  addProductFilter(productFilter) {
    return {type: types.ADD_PRODUCT_FILTER, productFilter};
  },
  removeProductFilter(productFilter) {
    return {type: types.REMOVE_PRODUCT_FILTER, productFilter};
  },
  setLocation(location) {
    return {type: types.SET_LOCATION, location};
  },
  setMessenger(unread, messages) {
    return {type: types.SET_MESSAGES, unread, messages};
  },
  setMessengerGroup(messengerGroup) {
    return {type: types.SET_MESSENGER_GROUP, messengerGroup};
  },
  updateMessengerGroup(messengerGroup) {
    return {type: types.UPDATE_MESSENGER_GROUP, messengerGroup};
  },
  updateMessagesOnGroupByPayload(messages) {
    return {type: types.UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD, messages};
  },
  setMessagesOnGroup(messagesOnGroup) {
    console.log({settingMessagesOnGroup: messagesOnGroup});
    return {type: types.SET_MESSAGES_ON_GROUP, messagesOnGroup};
  },
  updateMessagesOnGroup(message) {
    return {type: types.UPDATE_MESSAGES_ON_GROUP, message};
  },
  updateMessageByCode(message) {
    return {type: types.UPDATE_MESSAGE_BY_CODE, message};
  },
  setSelectedOrder(selectedOrder) {
    return {type: types.SET_SELECTED_ORDER, selectedOrder};
  },
  setTask(task) {
    return {type: types.SET_TASK, task};
  },
  setMixName(mix){
    return { type: types.SET_MIX_NAME, mix };
  },
  setPaddock(paddock){
    return { type: types.SET_PADDOCK, paddock };
  },
  setProduct(product){
    return { type: types.SET_PRODUCT, product };
  },
  setDedicatedNfc(dedicatedNfc) {
    return { type: types.SET_DEDICATED_NFC, dedicatedNfc };
  },
  setStayLoggedIn(stayLoggedIn) {
    return { type: types.SET_STAY_LOGGED_IN, stayLoggedIn };
  }
};

const initialState = {
  token: null,
  user: null,
  notifications: null,
  messenger: {
    unread: null,
    messages: null,
  },
  messengerGroup: null,
  messagesOnGroup: {
    groupId: null,
    messages: null,
  },
  cart: [],
  theme: null,
  location: null,
  productFilter: [],
  selectedOrder: null,
  task: null,
  mix: null,
  paddock: null,
  product: null,
  dedicatedNfc: false,
  stayLoggedIn: false
};

storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`${Helper.APP_NAME}${key}`, value);
  } catch (e) {
    // saving error
  }
};

const reducer = (state = initialState, action) => {
  const { type, user, token } = action;
  const { unread } = action;
  const { notification } = action;
  const { theme } = action;
  const { productFilter } = action;
  const { cartItems, location } = action;
  const { messages, message } = action;
  const { messengerGroup, messagesOnGroup } = action;
  const { selectedOrder } = action;
  const { task, setting, paddock } = action;
  const { product } = action;
  const { dedicatedNfc, flag } = action;
  const { stayLoggedIn } = action;
  switch (type) {
    case types.LOGOUT:
      AsyncStorage.clear();
      return Object.assign({}, initialState);
    case types.LOGIN:
      storeData('token', token);
      console.log('LOGIN', true);
      Data.setToken(token);
      return {...state, user, token};
    case types.UPDATE_USER:
      return {
        ...state,
        user,
      };
    case types.SET_NOTIFICATIONS:
      let notifications = {
        unread,
        notifications: action.notifications,
      };
      console.log('notifications', true);
      return {
        ...state,
        notifications,
      };
    case types.UPDATE_NOTIFICATIONS:
      let updatedNotifications = null;
      if (state.notifications == null) {
        let temp = [];
        temp.push(notification);
        updatedNotifications = {
          unread,
          notifications: temp,
        };
      } else {
        let oldNotif = state.notifications;
        if (oldNotif.notifications == null) {
          let temp = [];
          temp.push(notification);
          updatedNotifications = {
            unread,
            notifications: temp,
          };
        } else {
          if (
            parseInt(notification.id) !=
            parseInt(
              oldNotif.notifications[oldNotif.notifications.length - 1].id,
            )
          ) {
            oldNotif.notifications.unshift(notification);
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications,
            };
          } else {
            updatedNotifications = {
              unread: oldNotif.unread + unread,
              notifications: oldNotif.notifications,
            };
          }
        }
      }
      return {
        ...state,
        notifications: updatedNotifications,
      };
    case types.ADD_PRODUCT_TO_CART:
      let cartProduct = state.cart;
      let flag = false;
      for (var i = 0; i < state.cart.length; i++) {
        let item = state.cart[i];
        if (parseInt(product.id) == parseInt(item.id)) {
          flag = true;
          break;
        }
      }
      if (flag == false) {
        cartProduct.push(product);
      }
      return {
        ...state,
        cart: cartProduct,
      };
    case types.RETRIEVE_CART:
      return {
        ...state,
        cart: cartItems,
      };
    case types.UPDATE_PRODUCT_TO_CART:
      let updateCart = state.cart.map(item => {
        if (parseInt(product.id) == parseInt(item.id)) {
          return product;
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: updateCart,
      };
    case types.REMOVE_PRODUCT_TO_CART:
      let removeCart = state.cart.filter(item => {
        return parseInt(product.id) != parseInt(item.id);
      });
      return {
        ...state,
        cart: removeCart,
      };
    case types.SET_THEME:
      console.log('tertiary', theme.tertiary);
      storeData('primary', theme.primary);
      storeData('secondary', theme.secondary);
      storeData('tertiary', theme.tertiary);
      Color.setPrimary(theme.primary);
      Color.setSecondary(theme.secondary);
      Color.setTertiary(theme.tertiary);
      return {
        ...state,
        theme,
      };
    case types.ADD_PRODUCT_FILTER:
      let productFilterTemp = state.productFilter;
      let flagFilter = false;
      for (var i = 0; i < state.productFilter.length; i++) {
        let item = state.productFilter[i];
        if (productFilter == item) {
          flagFilter = true;
          break;
        }
      }
      if (flagFilter == false) {
        productFilterTemp.push(productFilter);
      }
      return {
        ...state,
        productFilter: productFilterTemp,
      };
    case types.REMOVE_PRODUCT_FILTER:
      let removeProductFilter = state.productFilter.filter(item => {
        return productFilter != item;
      });
      return {
        ...state,
        productFilter: removeProductFilter,
      };
    case types.SET_LOCATION:
      return {
        ...state,
        location,
      };
    case types.SET_MESSAGES:
      let messenger = {
        unread,
        messages,
      };
      return {
        ...state,
        messenger,
      };
    case types.SET_MESSENGER_GROUP:
      return {
        ...state,
        messengerGroup,
      };
    case types.UPDATE_MESSENGER_GROUP:
      return {
        ...state,
        messengerGroup: {
          ...state.messengerGroup,
          created_at_human: messengerGroup.created_at_human,
          rating: messengerGroup.rating,
          status: parseInt(messengerGroup.status),
          validations: messengerGroup.validations,
        },
      };
    case types.SET_MESSAGES_ON_GROUP:
      return {
        ...state,
        messagesOnGroup,
      };
    case types.UPDATE_MESSAGES_ON_GROUP:
      let updatedMessagesOnGroup = null;
      if (state.messagesOnGroup != null) {
        let oldMessages = state.messagesOnGroup.messages;
        if (oldMessages == null) {
          let temp = [];
          temp.push(message);
          updatedMessagesOnGroup = {
            ...state.messagesOnGroup,
            messages: temp,
          };
        } else {
          if (
            parseInt(message.id) !=
            parseInt(oldMessages[oldMessages.length - 1].id)
          ) {
            updatedMessagesOnGroup = {
              ...state.messagesOnGroup,
              messages: oldMessages.push(message),
            };
          } else {
            updatedMessagesOnGroup = {
              ...state.messagesOnGroup,
            };
          }
        }
      } else {
        let temp = [];
        temp.push(message);
        updatedMessagesOnGroup = {
          groupId: parseInt(message.messenger_group_id),
          messages: temp,
        };
      }
      return {
        ...state,
        updatedMessagesOnGroup,
      };
    case types.UPDATE_MESSAGE_BY_CODE:
      let newMessagesOnGroup = state.messagesOnGroup.messages.map(
        (item, index) => {
          if (
            typeof item.code != undefined ||
            typeof item.code != 'undefined'
          ) {
            if (parseInt(item.code) == parseInt(message.code)) {
              return message;
            }
          }
          return item;
        },
      );
      return {
        ...state,
        messagesOnGroup: {
          ...state.messagesOnGroup,
          messages: newMessagesOnGroup,
        },
      };
    case types.UPDATE_MESSAGES_ON_GROUP_BY_PAYLOAD:
      let tempMessages = state.messagesOnGroup.messages.map((item, index) => {
        if (
          parseInt(item.id) == parseInt(action.messages[index].id) &&
          item.payload_value != null
        ) {
          return action.messages[index];
        }
        return item;
      });
      return {
        ...state,
        messagesOnGroup: {
          ...state.messagesOnGroup,
          messages: tempMessages,
        },
      };
    case types.SET_SELECTED_ORDER:
      return {
        ...state,
        selectedOrder,
      };

    case types.SET_TASK:
      return {
        ...state,
        task,
      };
    case types.SET_MIX_NAME:
      return {
        ...state,
        mix
      }
    case types.SET_PADDOCK:
      return {
        ...state,
        paddock
      }
    case types.SET_PRODUCT:
      return {
        ...state,
        product
      }
    case types.SET_DEDICATED_NFC:
      storeData('nfc', dedicatedNfc ? '1' : '0');
      return {
        ...state,
        dedicatedNfc
      }
    case types.SET_STAY_LOGGED_IN:
      storeData('logged_in', stayLoggedIn ? '1' : '0');
      return {
        ...state,
        stayLoggedIn
      }
    default:
      return {...state, nav: state.nav};
  }
};
export default reducer;
