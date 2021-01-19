import {StyleSheet, Dimensions} from 'react-native';
import {BasicStyles, Color} from 'common';
const win = Dimensions.get('window');
const ratio = (win.width / 4336) * 0.7;
const styles = StyleSheet.create({
  MainContainer: {},
  BackgroundContainer: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    elevation: 2,
  },
  LoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '38%',
  },
  LogoContainer: {
    height: 180,
    width: 180,
  },
  TitleContainer: {
    width: 4336 * ratio,
    height: 882 * ratio,
  },
  TitleTextStyle: {},
  SignInTextContainer: {
    paddingBottom: 10,
    paddingTop: 15,
  },
  SignInTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  UsernameContainer: {
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
  },
  PasswordContainer: {
    width: '100%',
    alignItems: 'center',
  },
  CreateAccountContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingRight: '10%',
  },
  CreateAccountTextStyle: {
    color: '#A9A9A9',
    fontSize: 13,
  },
  SignInButtonContainer: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'flex-end',
    paddingRight: '10%',
    paddingTop: 30,
  },
  ForgottenPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  ForgottenPasswordTextContainer: {},
  ForgottenPasswordTextStyle: {
    fontSize: 13,
  },
  SendCodeContainer: {},
  SendCodeTextStyle: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  DrumScanContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '10%',
  },
  DrumScanTextContainer: {},
  DrumScanTextStyle: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  InputContainer: {
    flexDirection: 'row',
    width: '80%',
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  IconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    width: '15%'
  },
  IconStyle: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  ButtonContainer: {
    height: 50,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BADC78',
    borderRadius: 45,
    elevation: 5,
  },
  ButtonTextStyle: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  InstructionsContainer: {
    width: '70%',
    paddingTop: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InstructionsTextStyle: {
    textAlign: 'center',
    fontSize: BasicStyles.titleText.fontSize,
    fontWeight: 'bold',
  },
  messageContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: Color.danger
  },
  messageText: {
    color: Color.danger
  },
});

export default styles;
