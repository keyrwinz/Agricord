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
      <View style={styles.AppSettingTileContainer}>
        <View style={styles.AppSettingTileContainerLeft}>
          <View style={styles.AppSettingTileIconContainer}>
            {
              this.props.icon == 'logout' && (
                <LogoutSvg style={styles.AppSettingTileIconStyle}/>
              )
            }
            {
              this.props.icon == 'wifi' && (
                <WifiSvg style={styles.AppSettingTileIconStyle}/>
              )
            }
            {
              this.props.icon == 'wifioffline' && (
                <WifiOfflineSvg style={styles.AppSettingTileIconStyle}/>
              )
            }
            {
              this.props.icon == 'bell' && (
                <BellSvg style={styles.AppSettingTileIconStyle}/>
              )
            }

            {
              this.props.icon == 'image' && (
                <ImageSvg style={styles.AppSettingTileIconStyle}/>
              )
            }
          </View>
          <View style={styles.AppSettingTileTextContainer}>
            <Text style={styles.AppSettingTileTitleTextStyle}>
              {this.props.title}
            </Text>
            {this.props.description && (
              <Text style={styles.AppSettingTileDescriptionTextStyle}>
                {this.props.description}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.AppSettingTileContainerRight}>
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