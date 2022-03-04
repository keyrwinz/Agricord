import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Switch from 'components/Toggle/Switch.js';
import CustomSwitch from 'components/Toggle/CustomSwitch.js';
import styles from 'modules/appSettings/Styles.js';
import LogoutSvg from 'assets/settings/logout.svg';
import WifiSvg from 'assets/settings/wifi.svg';
import WifiOfflineSvg from 'assets/settings/wifioffline.svg';
import BellSvg from 'assets/settings/bell.svg';
import ImageSvg from 'assets/settings/image.svg';
import {connect} from 'react-redux';
import { BasicStyles, Color } from 'common';

class AppSettingTile extends Component {
  constructor(props) {
    super(props);
  }

  setDedicatedNfc = () => {
    const { setDedicatedNfc } = this.props;
    setDedicatedNfc(!this.props.state.dedicatedNfc)
    console.log(this.props.state, "===========1");
  };

  setStayLoggedIn = () => {
    const { setStayLoggedIn } = this.props;
    setStayLoggedIn(!this.props.state.stayLoggedIn)
  };

  switchAction = () => {
    if(this.props.icon === 'wifi') {
      this.setDedicatedNfc();
    } else if(this.props.icon === 'logout') {
      this.setStayLoggedIn();
      console.log(this.props.state.stayLoggedIn, "===========1");
    } else {
      return
    }
  }

  render() {
    let isEnabled = null
    if(this.props.icon === 'wifi') {
      isEnabled = this.props.state.dedicatedNfc
    } else if(this.props.icon === 'logout') {
      isEnabled = this.props.state.stayLoggedIn
    }
    return (
      <View style={{
        flexDirection: 'row',
        width: '100%',
        minHeight: 75,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: '4%',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '80%',
        }}>
          <View style={{
            width: '10%'
          }}>
            {
              this.props.icon == 'logout' && (
                <LogoutSvg/>
              )
            }
            {
              this.props.icon == 'wifi' && (
                <WifiSvg/>
              )
            }
            {
              this.props.icon == 'wifioffline' && (
                <WifiOfflineSvg/>
              )
            }
            {
              this.props.icon == 'bell' && (
                <BellSvg/>
              )
            }

            {
              this.props.icon == 'image' && (
                <ImageSvg/>
              )
            }
          </View>
          <View style={{
            width: '90%',
            paddingLeft: 10,
            paddingRight: 10
          }}>
            <Text style={{
              fontsize: BasicStyles.standardTitleFontSize,
              fontWeight: 'bold',
              width: '100%'
            }}>
              {this.props.title}
            </Text>
            {this.props.description && (
              <Text style={{
                fontsize: BasicStyles.standardFontSize,
                color: Color.gray,
                width: '100%',
                paddingTop: 5
              }}>
                {this.props.description}
              </Text>
            )}
          </View>
        </View>
        <View style={{
          width: '20%'
        }}>
          <CustomSwitch
            onToggle={this.switchAction}
            isEnabled={isEnabled}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({state: state});

const mapDispatchToProps = dispatch => {
  const {actions} = require('@redux');
  return {
    setDedicatedNfc: dedicatedNfc => dispatch(actions.setDedicatedNfc(dedicatedNfc)),
    setStayLoggedIn: stayLoggedIn => dispatch(actions.setStayLoggedIn(stayLoggedIn)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSettingTile);