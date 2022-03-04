import Color from './Color';
import { Dimensions, Platform } from 'react-native';
const width = Math.round(Dimensions.get('window').width);
export default {
  formControl: {
    height: 50,
    borderColor: Color.gray,
    borderWidth: 1,
    width: width - 40,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  formControlModal: {
    height: 50,
    borderColor: Color.gray,
    borderWidth: 1,
    width: '90%',
    marginLeft: '5%',
    marginBottom: 20,
    borderRadius: 5,
    paddingLeft: 10
  },
  formControlCreate: {
    height: 50,
    borderColor: Color.gray,
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    paddingLeft: 10
  },
  pickerStyle: {
    height: 50,
    borderBottomColor: Color.gray,
    borderBottomWidth: 1,
    width: '90%'
  },
  pickerStyleCreate: {
    height: 50,
    borderBottomColor: Color.gray,
    borderBottomWidth: 1,
    width: '100%',
    paddingLeft: 10
  },
  pickerStyleIOS: {
    inputIOS: {
      borderWidth: 1,
      borderColor: Color.gray,
      borderRadius: 5,
      color: '#000',
      paddingRight: 30,
      marginRight: 18,
      marginLeft: 10,
      height: 50,
      paddingLeft: 10
    }
  },
  pickerStyleIOSNoMargin: {
    inputIOS: {
      borderWidth: 1,
      borderColor: Color.gray,
      borderRadius: 5,
      color: '#000',
      height: 50,
      width: '100%',
      paddingLeft: 10
    }
  },
  btn: {
    height: 50,
    backgroundColor: Color.primary,
    width: width - 40,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  btnPrimary: {
    backgroundColor: Color.primary
  },
  btnSecondary: {
    backgroundColor: Color.secondary
  },
  btnWarning: {
    backgroundColor: Color.warning
  },
  textWhite: {
    color: Color.white
  },
  iconSize: 24,
  iconStyle: {
    color: Color.white,
    paddingLeft: 20,
    paddingRight: 20
  },
  titleText: {
    fontSize: 13,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 20,
    paddingRight: 20
  },
  normalText: {
    fontSize: 12,
    color: Color.gray,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 20,
    paddingRight: 20
  },
  Separator: {
    height: 0.5,
    width: width - 40,
    backgroundColor: Color.lightGray,
    marginLeft: 20
  },
  badge: {
    backgroundColor: Color.danger,
    color: Color.white,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginRight: 10
  },
  profileImageSize: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  profileIconSize: 30,
  paginationHolder: {
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: Platform.OS == 'android' ? 15 : 5,
    },
    shadowOpacity: Platform.OS == 'android' ? 0.22 : 0.15, // 0.22
    shadowRadius: Platform.OS == 'android' ? 2.22 : 10, // 2.22
    elevation: 5, // 15
    backgroundColor:Color.white,
    height: 60
  },
  standardFontSize: 12,
  standardTitleFontSize: 16,
  standardTitle2FontSize: 14,
  standardSubTitleFontSize: 14,
  standardHeaderFontSize: 18,
  standardBorderRadius: 12,
  headerDrawerStyle: {
    headerStyle: {
      elevation: 10,
      shadowColor: Color.black,
      shadowOffset: {
        width: 0,
        height: Platform.OS == 'android' ? 15 : 5,
      },
      shadowOpacity: Platform.OS == 'android' ? 0.22 : 0.15, // 0.22
      shadowRadius: Platform.OS == 'android' ? 2.22 : 10, // 2.22
      backgroundColor: Color.white,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 18
    },
    headerTitleContainerStyle: {
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: Platform.OS == 'ios' ? 0 : 50
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },  
  },
  headerDrawerStyleNoPadding: {
    headerStyle: {
      elevation: 10,
      shadowColor: Color.black,
      shadowOffset: {
        width: 0,
        height: Platform.OS == 'android' ? 15 : 5,
      },
      shadowOpacity: Platform.OS == 'android' ? 0.22 : 0.15, // 0.22
      shadowRadius: Platform.OS == 'android' ? 2.22 : 10, // 2.22
      backgroundColor: Color.white,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerTitleContainerStyle: {
      backgroundColor: Color.white,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  standardShadow: {
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23, // 0.23
    shadowRadius: 2.62, // 2.62
    elevation: 2, // 2
  },
  starndardDivider: {
    width: '90%',
    height: 0.5,
    marginLeft: '5%',
    marginRight: '5%',
  },
  standardDivider: {
    width: '90%',
    height: 0.5,
    marginLeft: '5%',
    marginRight: '5%',
  },
  standardCardContainer: {
    minHeight: 60,
    width: '100%',
    marginTop: 15,
    // box-shadow
    backgroundColor: Color.white,
    borderRadius: 12,
    borderColor: '#FFFFFF',
    borderWidth:1,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23, //0.23
    shadowRadius: 2.62, // 2.62
    elevation: 2, // 2
    alignItems:'center',
    flexDirection:'row',
    paddingTop: 15,
    paddingBottom: 15
  },
  standardButton: {
    height: 50,
    backgroundColor: Color.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },
  standardFormControl: {
    height: 50,
    borderColor: Color.lightGray,
    borderWidth: 1,
    width: '100%',
    borderRadius: 25,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  standardTextInputNotCentered: {
    height: 50,
    borderColor: Color.lightGray,
    borderWidth: 1,
    width: '100%',
    borderRadius: 25,
    paddingLeft: 10,
  },
  standardTextInputMultiline: {
    borderColor: Color.lightGray,
    borderWidth: 1,
    width: '100%',
    borderRadius: 25,
    paddingLeft: 10
  },
  standardLoginContainer: {
    width: '80%'
  }
}