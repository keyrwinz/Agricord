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

class AppSettingTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  onToggle = () => {
    this.setState({isEnabled: !this.state.isEnabled});
  };

  render() {
    const isEnabled = this.state.isEnabled;
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
            onToggle={this.onToggle}
            isEnabled={this.state.isEnabled}
          />
        </View>
      </View>
    );
  }
}

export default AppSettingTile;
